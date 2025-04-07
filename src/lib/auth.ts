import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export interface AuthToken {
    sub: string;
    exp: number;
    role: string[];
}

export async function setAuthCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'auth_token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 // 1 día
    });
}

export async function getAuthToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get('auth_token')?.value ?? null;
}

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