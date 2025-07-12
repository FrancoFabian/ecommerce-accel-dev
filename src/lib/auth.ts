import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export interface AuthToken {
    sub: string;
    exp: number;
    role: string[];
}

/**
 * Obtiene el token de autenticación desde las cookies del servidor
 */
export async function getAuthToken(): Promise<string | null> {
    try {
        const cookieStore = await cookies();
        
        // Buscar primero el accessToken nuevo
        const accessToken = cookieStore.get('accessToken')?.value;
        if (accessToken) {
            return accessToken;
        }
        
        // Mantener compatibilidad con token legacy
        const legacyToken = cookieStore.get('token')?.value;
        return legacyToken || null;
    } catch {
        return null;
    }
}

/**
 * Verifica si el usuario está autenticado validando el token
 */
export async function isAuthenticated(): Promise<boolean> {
    try {
        const token = await getAuthToken();
        if (!token) return false;

        const decoded = jwtDecode<AuthToken>(token);
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

/**
 * Obtiene los datos del usuario decodificando el token
 */
export async function getUserFromToken(): Promise<AuthToken | null> {
    try {
        const token = await getAuthToken();
        if (!token) return null;

        const decoded = jwtDecode<AuthToken>(token);
        
        // Verificar que el token no haya expirado
        if (decoded.exp * 1000 <= Date.now()) {
            return null;
        }
        
        return decoded;
    } catch {
        return null;
    }
}