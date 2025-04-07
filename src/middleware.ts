// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    exp: number;
    sub: string;
    role: string[];
}

export async function middleware(request: NextRequest) {
    // Public paths that don't require authentication
    const publicPaths = ['/login', '/register', '/forgot-password'];
    const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

    // Get the token from the cookies
    const token = request.cookies.get('token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    // Check if the token is valid
    const isAuth = token ? validateToken(token) : false;

    // Handle public paths
    if (isPublicPath) {
        if (isAuth) {
            // Redirect authenticated users away from public paths
            return NextResponse.redirect(new URL('/micuenta', request.url));
        }
        return NextResponse.next();
    }

    // Handle protected paths
    if (!isAuth) {
        // If we have a refresh token, try to refresh the session
        if (refreshToken) {
            try {
                const response = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
                    method: 'POST',
                    headers: {
                        'Cookie': `refresh_token=${refreshToken}`
                    }
                });

                if (response.ok) {
                    // Successfully refreshed, allow the request
                    return NextResponse.next();
                }
            } catch (error) {
                // Refresh failed, redirect to login
                const response = NextResponse.redirect(new URL('/login', request.url));
                response.cookies.delete('token');
                response.cookies.delete('refresh_token');
                return response;
            }
        }

        // No refresh token or refresh failed, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

function validateToken(token: string): boolean {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        // Add some buffer time (30 seconds) to prevent edge cases
        return (decoded.exp * 1000) > (Date.now() + 30000);
    } catch {
        return false;
    }
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public|api/auth/login).*)',
    ],
};

