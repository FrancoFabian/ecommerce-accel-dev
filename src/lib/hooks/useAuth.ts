import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { verifyAuth, logout } from '@/store/features/authSlice';
import { useCallback, useEffect, useRef } from 'react';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  
  const verificationTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastActivityRef = useRef<number>(Date.now());

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
    const INACTIVITY_THRESHOLD = 10 * 60 * 1000; // 10 minutos
    return (Date.now() - lastActivityRef.current) < INACTIVITY_THRESHOLD;
  }, []);

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
      
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }
    }
  }, [dispatch]);

  // Effect para inicialización y eventos
  useEffect(() => {
    // Verificación inicial (solo una vez)
    if (!authState.isInitialized) {
      checkAuth(true);
    }

    // Programar verificación si tenemos expiración
    if (authState.expiresAt && authState.status === 'authenticated') {
      scheduleNextVerification(authState.expiresAt);
    }

    // Event listeners optimizados
    let focusTimeout: NodeJS.Timeout | undefined = undefined;
    let activityTimeout: NodeJS.Timeout | undefined = undefined;

    const updateActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const handleFocus = () => {
      clearTimeout(focusTimeout);
      focusTimeout = setTimeout(() => {
        if (document.visibilityState === 'visible' && isUserActive()) {
          checkAuth(); // Solo si es necesario según cache
        }
      }, 1000); // Throttle de 1 segundo
    };

    const handleOnline = () => {
      if (isUserActive()) {
        checkAuth(true);
      }
    };

    // Listeners
    window.addEventListener('focus', handleFocus);
    window.addEventListener('online', handleOnline);
    document.addEventListener('visibilitychange', handleFocus);
    
    // Track user activity
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
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
      if (activityTimeout) clearTimeout(activityTimeout);
      
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }
    };
  }, [authState.isInitialized, authState.expiresAt, authState.status, checkAuth, scheduleNextVerification, isUserActive]);

  return {
    ...authState,
    checkAuth,
    logout: logoutUser,
    isLoading: authState.status === 'loading',
    isChecking: authState.status === 'checking',
    isAuthenticated: authState.status === 'authenticated'
  };
}; 