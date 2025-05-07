// src/hooks/useLogout.ts
"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Hook para cerrar sesión y redirigir al usuario.
 *
 * @param redirectTo Ruta a la que se enviará al usuario después del logout ("/" por defecto)
 * @returns Función `logout()` que puedes llamar donde quieras
 */
export const useLogout = (redirectTo: string = "/") => {
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });

      if (res.ok) {
        router.push(redirectTo);           // ✅ redirección centralizada
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (err) {
      console.error("Error en el logout:", err);
    }
  }, [router, redirectTo]);

  return logout;
};
