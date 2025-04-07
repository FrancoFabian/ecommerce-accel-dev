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
    const token = request.cookies.get('auth_token')?.value;
    const isAuth = token ? validateToken(token) : false;
    const isAuthPage = request.nextUrl.pathname === '/login';

    if (!isAuth && !isAuthPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAuth && isAuthPage) {
        return NextResponse.redirect(new URL('/micuenta', request.url));
    }

    return NextResponse.next();
}

function validateToken(token: string): boolean {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

export const config = {
    matcher: ['/micuenta/:path*', '/login']
};