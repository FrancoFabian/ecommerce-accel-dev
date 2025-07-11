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

// Async thunk para verificación inteligente
export const verifyAuth = createAsyncThunk(
  'auth/verify',
  async (params: { force?: boolean } = {}, { getState, rejectWithValue }) => {
    const { force = false } = params;
    const cache = TokenCache.getInstance();
    
    // Verificar si necesitamos hacer la llamada
    if (!cache.shouldVerify(force)) {
      const state = getState() as { auth: AuthState };
      return {
        isAuthenticated: state.auth.status === 'authenticated',
        user: state.auth.user,
        expiresAt: state.auth.expiresAt,
        fromCache: true
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

      const response = await fetch('/api/auth/status', {
        credentials: 'include',
        cache: 'no-store',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Actualizar cache
      cache.updateCache(data.isAuthenticated, data.expiresAt);
      
      return {
        isAuthenticated: data.isAuthenticated,
        user: data.user || null,
        expiresAt: data.expiresAt || null,
        fromCache: false
      };
    } catch (error) {
      cache.clear();
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle',
    user: null,
    lastVerified: null,
    expiresAt: null,
    isInitialized: false,
    error: null
  } as AuthState,
  reducers: {
    logout: (state) => {
      state.status = 'unauthenticated';
      state.user = null;
      state.lastVerified = Date.now();
      state.expiresAt = null;
      state.error = null;
      TokenCache.getInstance().clear();
    },
    clearError: (state) => {
      state.error = null;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
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
        // Para verificaciones rutinarias, mantener estado actual (sin parpadeo)
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        const { isAuthenticated, user, expiresAt, fromCache } = action.payload;
        
        // Solo actualizar si el estado realmente cambió (evitar re-renders)
        const newStatus = isAuthenticated ? 'authenticated' : 'unauthenticated';
        if (state.status !== newStatus) {
          state.status = newStatus;
        }
        
        state.user = user;
        state.expiresAt = expiresAt;
        state.lastVerified = Date.now();
        state.error = null;
        state.isInitialized = true;
      })
      .addCase(verifyAuth.rejected, (state, action) => {
        state.status = 'unauthenticated';
        state.user = null;
        state.error = action.payload as string;
        state.lastVerified = Date.now();
        state.isInitialized = true;
      });
  }
});

export const { logout, clearError, setInitialized } = authSlice.actions;
export default authSlice.reducer; 