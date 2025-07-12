import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { verifyAuth, logout, setInitialized } from '@/store/features/authSlice';
import { useCallback, useEffect, useRef, useState } from 'react';

// Importar tipos necesarios
interface AuthState {
  status: 'idle' | 'loading' | 'checking' | 'authenticated' | 'unauthenticated' | 'error';
  user: { id: string; email?: string; roles?: string[] } | null;
  lastVerified: number | null;
  expiresAt: number | null;
  isInitialized: boolean;
  error: string | null;
}

// ✅ NUEVO: Gestor de estado persistente más robusto
class PersistentAuthState {
  private static readonly STORAGE_KEY = 'auth_persistent_state';
  private static readonly SESSION_KEY = 'auth_session_state';
  
  static save(state: AuthState): void {
    if (typeof window === 'undefined') return;
    
    try {
      const stateToSave = {
        status: state.status,
        user: state.user,
        expiresAt: state.expiresAt,
        timestamp: Date.now()
      };
      
      // Guardar en ambos storages para máxima persistencia
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stateToSave));
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Could not save persistent auth state:', error);
    }
  }
  
  static load(): Partial<AuthState> | null {
    if (typeof window === 'undefined') return null;
    
    try {
      // Intentar cargar desde sessionStorage primero (más reciente)
      let stored = sessionStorage.getItem(this.SESSION_KEY);
      if (!stored) {
        // Fallback a localStorage
        stored = localStorage.getItem(this.STORAGE_KEY);
      }
      
      if (!stored) return null;
      
      const data = JSON.parse(stored);
      
      // Validar que no esté muy viejo (8 horas para ser más permisivo)
      const MAX_AGE = 8 * 60 * 60 * 1000;
      if (Date.now() - data.timestamp > MAX_AGE) {
        this.clear();
        return null;
      }
      
      // Solo devolver si es un estado autenticado válido
      if (data.status === 'authenticated' && data.user) {
        return data;
      }
      
      return null;
    } catch (error) {
      console.warn('Could not load persistent auth state:', error);
      return null;
    }
  }
  
  static clear(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      sessionStorage.removeItem(this.SESSION_KEY);
    } catch (error) {
      console.warn('Could not clear persistent auth state:', error);
    }
  }
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  
  const verificationTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastActivityRef = useRef<number>(Date.now());
  const initializationAttemptedRef = useRef<boolean>(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const lastAuthStateRef = useRef<Partial<AuthState> | null>(null);

  // ✅ NUEVO: Cargar estado desde localStorage después de hidratación
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // ✅ NUEVO: Guardar estado automáticamente cuando cambia
  useEffect(() => {
    if (isHydrated && authState.status === 'authenticated' && authState.user) {
      PersistentAuthState.save(authState);
      lastAuthStateRef.current = authState;
    }
  }, [isHydrated, authState.status, authState.user, authState.expiresAt]);

  // Verificación con cache inteligente
  const checkAuth = useCallback((force: boolean = false) => {
    return dispatch(verifyAuth({ force }));
  }, [dispatch]);

  // Programar próxima verificación basada en expiración
  const scheduleNextVerification = useCallback((expiresAt: number) => {
    if (verificationTimeoutRef.current) {
      clearTimeout(verificationTimeoutRef.current);
    }

    const now = Date.now();
    const timeToExpiry = expiresAt - now;
    
    // Verificar 5 minutos antes de expiración (mínimo 1 minuto)
    const checkTime = Math.max(timeToExpiry - (5 * 60 * 1000), 60 * 1000);
    
    verificationTimeoutRef.current = setTimeout(() => {
      checkAuth(true);
    }, checkTime);
  }, [checkAuth]);

  // Detectar inactividad del usuario
  const isUserActive = useCallback((): boolean => {
    const INACTIVITY_THRESHOLD = 15 * 60 * 1000; // 15 minutos (más permisivo)
    return (Date.now() - lastActivityRef.current) < INACTIVITY_THRESHOLD;
  }, []);

  // ✅ MEJORADA: Función más robusta para verificar indicios de auth
  const hasAuthIndicators = useCallback((): boolean => {
    try {
      // 1. Si ya tenemos estado autenticado válido, mantenerlo SIEMPRE
      if (authState.status === 'authenticated' && authState.user) {
        return true;
      }

      // 2. Si tenemos un estado previo válido, confiar en él
      if (lastAuthStateRef.current?.status === 'authenticated' && lastAuthStateRef.current?.user) {
        return true;
      }

      // 3. Verificar cookies
      const cookies = document.cookie;
      const hasAuthCookie = cookies.includes('accessToken') || 
                           cookies.includes('token') || 
                           cookies.includes('refreshToken');
      
      // 4. Verificar estado persistente
      const persistentState = PersistentAuthState.load();
      const hasPersistentAuth = persistentState?.status === 'authenticated' && persistentState?.user;
      
      return Boolean(hasAuthCookie || hasPersistentAuth);
    } catch {
      // En caso de error, ser muy conservador y mantener estado
      return true;
    }
  }, [authState.status, authState.user]);

  // Logout function
  const logoutUser = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
      PersistentAuthState.clear();
      lastAuthStateRef.current = null;
      
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }
      
      initializationAttemptedRef.current = false;
    }
  }, [dispatch]);

  // ✅ OPTIMIZADO: Effect de inicialización más conservador
  useEffect(() => {
    // Solo proceder si ya está hidratado y no se ha intentado inicializar
    if (!isHydrated || authState.isInitialized || initializationAttemptedRef.current) {
      return;
    }
    
    initializationAttemptedRef.current = true;
    console.log('🚀 Inicializando autenticación post-hidratación');
    
    // ✅ NUEVO: Intentar restaurar estado persistente primero
    const persistentState = PersistentAuthState.load();
    
    if (persistentState) {
      console.log('🔄 Estado autenticado encontrado en storage, restaurando...');
      lastAuthStateRef.current = persistentState;
      
      // Restaurar estado sin verificación inmediata para evitar pérdida
      // La verificación ocurrirá en background
      setTimeout(() => {
        if (hasAuthIndicators()) {
          checkAuth(false); // Verificación no forzada para no interrumpir UX
        }
      }, 1000);
      
      // Marcar como inicializado inmediatamente para mostrar UI
      dispatch(setInitialized());
      return;
    }
    
    // Si no hay estado persistente, proceder con verificación normal
    if (hasAuthIndicators()) {
      console.log('🔍 Indicios de autenticación detectados, verificando...');
      checkAuth(true);
    } else {
      console.log('ℹ️ No hay indicios de autenticación, verificando por seguridad...');
      checkAuth(true);
    }
  }, [
    isHydrated,
    authState.isInitialized, 
    authState.status,
    authState.user,
    hasAuthIndicators,
    checkAuth,
    dispatch
  ]);

  // ✅ SEPARADO: Effect para programar verificaciones
  useEffect(() => {
    if (authState.expiresAt && authState.status === 'authenticated') {
      scheduleNextVerification(authState.expiresAt);
    }
    
    return () => {
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }
    };
  }, [authState.expiresAt, authState.status, scheduleNextVerification]);

  // ✅ SEPARADO: Effect para event listeners
  useEffect(() => {
    if (!isHydrated) return;
    
    let focusTimeout: NodeJS.Timeout | undefined = undefined;

    const updateActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const handleFocus = () => {
      clearTimeout(focusTimeout);
      focusTimeout = setTimeout(() => {
        if (document.visibilityState === 'visible' && isUserActive()) {
          // Solo verificar si hace más de 5 minutos de la última verificación
          const timeSinceLastCheck = Date.now() - (authState.lastVerified || 0);
          if (timeSinceLastCheck > 5 * 60 * 1000) { // 5 minutos
            checkAuth(false); // Verificación no forzada
          }
        }
      }, 2000); // 2 segundos de delay para evitar verificaciones innecesarias
    };

    const handleOnline = () => {
      if (isUserActive()) {
        // Delay para evitar verificaciones inmediatas
        setTimeout(() => {
          checkAuth(false);
        }, 1000);
      }
    };

    // Listeners
    window.addEventListener('focus', handleFocus);
    window.addEventListener('online', handleOnline);
    document.addEventListener('visibilitychange', handleFocus);
    
    // Track user activity con menos eventos para mejor performance
    const activityEvents = ['mousedown', 'keydown'];
    activityEvents.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('online', handleOnline);
      document.removeEventListener('visibilitychange', handleFocus);
      
      activityEvents.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
      
      if (focusTimeout) clearTimeout(focusTimeout);
    };
  }, [isHydrated, checkAuth, isUserActive, authState.lastVerified]);

  // ✅ NUEVO: Determinar estado efectivo (incluye estado persistente)
  const effectiveAuthState = (() => {
    if (!isHydrated) {
      return { ...authState, isAuthenticated: false };
    }
    
    // Si tenemos estado autenticado actual, usarlo
    if (authState.status === 'authenticated' && authState.user) {
      return { ...authState, isAuthenticated: true };
    }
    
    // Si tenemos estado previo válido y no hemos recibido confirmación de no-auth, mantenerlo
    if (lastAuthStateRef.current?.status === 'authenticated' && 
        lastAuthStateRef.current?.user && 
        authState.status !== 'unauthenticated') {
      return {
        ...authState,
        status: 'authenticated',
        user: lastAuthStateRef.current.user,
        isAuthenticated: true
      };
    }
    
    return { ...authState, isAuthenticated: authState.status === 'authenticated' };
  })();

  return {
    ...effectiveAuthState,
    checkAuth,
    logout: logoutUser,
    isLoading: authState.status === 'loading',
    isChecking: authState.status === 'checking',
    isHydrated
  };
};
