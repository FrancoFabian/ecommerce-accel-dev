// src/hooks/useLogout.ts
"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuth } from '@/lib/hooks/useAuth';

/**
 * Hook para cerrar sesión y redirigir al usuario.
 *
 * @param redirectTo Ruta a la que se enviará al usuario después del logout ("/" por defecto)
 * @returns Función `logout()` que puedes llamar donde quieras
 */
export const useLogout = (redirectTo: string = "/") => {
  const router = useRouter();
  const { logout: logoutFromStore } = useAuth();

  const logout = useCallback(async () => {
    try {
      // Llamar al logout del store que maneja el estado
      await logoutFromStore();
      
      // Redirigir después de que el estado se haya actualizado
      router.push(redirectTo);
    } catch (err) {
      console.error("Error en el logout:", err);
      // Aún así redirigir en caso de error
      router.push(redirectTo);
    }
  }, [router, redirectTo, logoutFromStore]);

  return logout;
};
