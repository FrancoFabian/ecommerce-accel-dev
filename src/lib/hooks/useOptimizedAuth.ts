import { useAuth } from './useAuth';
import { useCallback, useMemo } from 'react';

/**
 * Hook optimizado para autenticación que minimiza re-renderizados
 * y mejora el rendimiento en componentes que solo necesitan datos básicos
 */
export const useOptimizedAuth = () => {
  const authState = useAuth();

  // Memoizar valores derivados para evitar re-cálculos
  const memoizedValues = useMemo(() => ({
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    isInitialized: authState.isInitialized,
    userEmail: authState.user?.email,
    userId: authState.user?.id,
    hasUser: Boolean(authState.user),
  }), [
    authState.isAuthenticated,
    authState.isLoading,
    authState.isInitialized,
    authState.user?.email,
    authState.user?.id,
    authState.user
  ]);

  // Funciones memoizadas
  const logout = useCallback(() => {
    authState.logout();
  }, [authState.logout]);

  const checkAuth = useCallback((force?: boolean) => {
    return authState.checkAuth(force);
  }, [authState.checkAuth]);

  return {
    ...memoizedValues,
    logout,
    checkAuth,
    // Solo exponer datos esenciales para reducir dependencias
    user: authState.user,
    error: authState.error,
  };
}; 