import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  roles: string[];
  email?: string;
}

interface AuthState {
  status: 'idle' | 'loading' | 'checking' | 'authenticated' | 'unauthenticated' | 'error';
  user: User | null;
  lastVerified: number | null;
  expiresAt: number | null;
  isInitialized: boolean;
  error: string | null;
}

// ✅ NUEVO: Utilidad para persistir estado localmente (como backup)
class AuthStateManager {
  private static readonly STORAGE_KEY = 'auth_backup_state';
  private static readonly MAX_AGE = 24 * 60 * 60 * 1000; // 24 horas

  static saveState(state: Partial<AuthState>): void {
    try {
      if (typeof window === 'undefined') return;
      
      const dataToStore = {
        status: state.status,
        user: state.user,
        lastVerified: Date.now(),
        expiresAt: state.expiresAt,
        timestamp: Date.now()
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.warn('Could not save auth state:', error);
    }
  }

  static loadState(): Partial<AuthState> | null {
    try {
      if (typeof window === 'undefined') return null;
      
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;
      
      const data = JSON.parse(stored);
      
      // Verificar que no esté muy viejo (24 horas)
      if (Date.now() - data.timestamp > this.MAX_AGE) {
        this.clearState();
        return null;
      }
      
      // Solo devolver si es un estado autenticado válido
      if (data.status === 'authenticated' && data.user) {
        return {
          status: data.status,
          user: data.user,
          lastVerified: data.lastVerified,
          expiresAt: data.expiresAt
        };
      }
      
      return null;
    } catch (error) {
      console.warn('Could not load auth state:', error);
      this.clearState();
      return null;
    }
  }

  static clearState(): void {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('Could not clear auth state:', error);
    }
  }
}

// Cache global para evitar verificaciones redundantes
class TokenCache {
  private static instance: TokenCache;
  private lastVerified: number = 0;
  private isValid: boolean | null = null;
  private expiresAt: number | null = null;
  private readonly MINIMUM_INTERVAL = 30 * 1000; // 30 segundos

  static getInstance(): TokenCache {
    if (!TokenCache.instance) {
      TokenCache.instance = new TokenCache();
    }
    return TokenCache.instance;
  }

  shouldVerify(force: boolean = false): boolean {
    if (force) return true;
    
    const now = Date.now();
    const timeSinceLastCheck = now - this.lastVerified;
    
    if (timeSinceLastCheck < this.MINIMUM_INTERVAL) return false;
    if (this.expiresAt && now >= this.expiresAt - (5 * 60 * 1000)) return true;
    
    return true;
  }

  updateCache(isValid: boolean, expiresAt?: number) {
    this.lastVerified = Date.now();
    this.isValid = isValid;
    this.expiresAt = expiresAt || null;
  }

  clear() {
    this.lastVerified = 0;
    this.isValid = null;
    this.expiresAt = null;
  }
}

// ✅ MEJORADO: Async thunk con manejo más inteligente de errores
export const verifyAuth = createAsyncThunk(
  'auth/verify',
  async (params: { force?: boolean } = {}, { getState, rejectWithValue }) => {
    const { force = false } = params;
    const cache = TokenCache.getInstance();
    const state = getState() as { auth: AuthState };
    
    // Verificar si necesitamos hacer la llamada
    if (!cache.shouldVerify(force)) {
      return {
        isAuthenticated: state.auth.status === 'authenticated',
        user: state.auth.user,
        expiresAt: state.auth.expiresAt,
        fromCache: true
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // Reducido a 5s

      const response = await fetch('/api/auth/status', {
        credentials: 'include',
        cache: 'no-store',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Manejo más agresivo de errores - mantener estado actual por defecto
        console.warn(`⚠️ Auth API error ${response.status} - manteniendo estado actual`);
        
        // Solo limpiar estado en errores 401/403 específicos
        if (response.status === 401 || response.status === 403) {
          cache.clear();
          AuthStateManager.clearState();
          throw new Error(`Authentication failed: ${response.status}`);
        }
        
        // Para todos los demás errores, mantener estado actual
        return {
          isAuthenticated: state.auth.status === 'authenticated',
          user: state.auth.user,
          expiresAt: state.auth.expiresAt,
          fromCache: true,
          error: `HTTP ${response.status}`,
          shouldMaintainState: true
        };
      }

      const data = await response.json();
      
      // Validar estructura de respuesta
      if (typeof data.isAuthenticated !== 'boolean') {
        console.warn('⚠️ Invalid auth response format - manteniendo estado actual');
        return {
          isAuthenticated: state.auth.status === 'authenticated',
          user: state.auth.user,
          expiresAt: state.auth.expiresAt,
          fromCache: true,
          shouldMaintainState: true
        };
      }
      
      // Actualizar cache
      cache.updateCache(data.isAuthenticated, data.expiresAt);
      
      return {
        isAuthenticated: data.isAuthenticated,
        user: data.user || null,
        expiresAt: data.expiresAt || null,
        fromCache: false
      };
    } catch (error) {
      // Manejo conservador de errores
      if (error instanceof Error) {
        // Solo errores de autenticación específicos limpian el estado
        if (error.message.includes('Authentication failed')) {
          cache.clear();
          AuthStateManager.clearState();
          return rejectWithValue({
            message: error.message,
            shouldClearState: true
          });
        }
        
        // Todos los demás errores mantienen el estado actual
        console.warn('⚠️ Network/other error - manteniendo estado actual:', error.message);
        return {
          isAuthenticated: state.auth.status === 'authenticated',
          user: state.auth.user,
          expiresAt: state.auth.expiresAt,
          fromCache: true,
          error: error.message,
          shouldMaintainState: true
        };
      }
      
      // Error desconocido - mantener estado actual
      return {
        isAuthenticated: state.auth.status === 'authenticated',
        user: state.auth.user,
        expiresAt: state.auth.expiresAt,
        fromCache: true,
        error: 'Unknown error',
        shouldMaintainState: true
      };
    }
  }
);

// ✅ CORREGIDO: Estado inicial siempre neutral para SSR
const initialState: AuthState = {
  status: 'idle',
  user: null,
  lastVerified: null,
  expiresAt: null,
  isInitialized: false,
  error: null
};

// Slice con estado inicial neutral (sin localStorage en SSR)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = 'unauthenticated';
      state.user = null;
      state.lastVerified = Date.now();
      state.expiresAt = null;
      state.error = null;
      TokenCache.getInstance().clear();
      AuthStateManager.clearState(); // ✅ Limpiar backup local
    },
    clearError: (state) => {
      state.error = null;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
    preserveStateOnError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.lastVerified = Date.now();
      if (!state.isInitialized) {
        state.isInitialized = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyAuth.pending, (state, action) => {
        // Solo mostrar 'loading' en primera carga, 'checking' para verificaciones silenciosas
        if (!state.isInitialized) {
          state.status = 'loading';
        } else if (action.meta.arg?.force) {
          state.status = 'checking';
        }
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        const { isAuthenticated, user, expiresAt, fromCache, error, shouldMaintainState } = action.payload;
        
        // Si se indica que debemos mantener el estado, solo actualizar error y timestamp
        if (shouldMaintainState) {
          state.error = error || null;
          state.lastVerified = Date.now();
          if (!state.isInitialized) {
            state.isInitialized = true;
          }
          return;
        }
        
        // Si viene del cache con error, solo actualizar el error, no el estado
        if (fromCache && error) {
          state.error = error;
          state.lastVerified = Date.now();
          if (!state.isInitialized) {
            state.isInitialized = true;
          }
          return;
        }
        
        // Actualizar estado
        const newStatus = isAuthenticated ? 'authenticated' : 'unauthenticated';
        state.status = newStatus;
        state.user = user;
        state.expiresAt = expiresAt;
        state.lastVerified = Date.now();
        state.error = null;
        state.isInitialized = true;
        
        // ✅ Guardar backup local si está autenticado
        if (isAuthenticated && user) {
          AuthStateManager.saveState(state);
        } else {
          AuthStateManager.clearState();
        }
      })
      .addCase(verifyAuth.rejected, (state, action) => {
        const payload = action.payload as { message: string; shouldClearState?: boolean } | undefined;
        
        if (payload?.shouldClearState) {
          // Error de autenticación específico - limpiar estado
          state.status = 'unauthenticated';
          state.user = null;
          state.error = payload.message;
          state.expiresAt = null;
          AuthStateManager.clearState(); // ✅ Limpiar backup
        } else {
          // Otros errores - mantener estado actual, solo actualizar error
          state.error = payload?.message || 'Unknown error';
        }
        
        state.lastVerified = Date.now();
        state.isInitialized = true;
      });
  }
});

export const { logout, clearError, setInitialized, preserveStateOnError } = authSlice.actions;
export default authSlice.reducer;