// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  sub: string;
  role: string[];
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* ------------------------------------------------------------------ */
  /* 1) Dejar pasar siempre llamadas de autenticación /api/auth/*       */
  /* ------------------------------------------------------------------ */
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  if (
    pathname.startsWith('/api/productscategory') ||
    pathname.startsWith('/api/subcategories')
  ) {
    return NextResponse.next();
  }

  /* ------------------------------------------------------------------ */
  /* 2) Obtener tokens (nuevo y legacy)                                 */
  /* ------------------------------------------------------------------ */
  const accessToken  =
    request.cookies.get('accessToken')?.value ||
    request.cookies.get('token')?.value;  // legacy
  const refreshToken =
    request.cookies.get('refreshToken')?.value ||
    request.cookies.get('refresh_token')?.value; // legacy

  const isAuth = accessToken ? validateToken(accessToken) : false;

  /* ------------------------------------------------------------------ */
  /* 3) Rutas que requieren NO estar autenticado (login, signup)        */
  /* ------------------------------------------------------------------ */
  if (pathname === '/login' || pathname === '/signup') {
    if (isAuth) {
      return NextResponse.redirect(new URL('/micuenta', request.url));
    }
    return NextResponse.next(); // no autenticado ⇒ puede ver estas páginas
  }

  /* ------------------------------------------------------------------ */
  /* 4) Definir rutas públicas (permitidas sin login)                   */
  /* ------------------------------------------------------------------ */
  const publicPaths = [
    '/',                // home
    '/forgot-password', // recuperar contraseña
    '/categorias',      // categorías y sub-categorías
    '/productos',       // productos (público)
    '/doblefactorauth', // verificación 2FA
    '/oauth-success',   // autenticación OAuth exitosa
    '/api/auth/google-callback'
  ];

  const isPublic = publicPaths.some(p =>
    pathname === p || pathname.startsWith(p + '/')
  );
  
  if (isPublic) {
    return NextResponse.next();
  }

  /* ------------------------------------------------------------------ */
  /* 5) Rutas protegidas: si no hay sesión válida                       */
  /* ------------------------------------------------------------------ */
  if (!isAuth) {
    // Intentar refrescar con refreshToken
    if (refreshToken) {
      try {
        const resp = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
          method: 'POST',
          headers: { Cookie: `refreshToken=${refreshToken}` },
        });
        if (resp.ok) {
          return NextResponse.next(); // refrescado con éxito
        }
      } catch (err) {
        console.warn('Error al refrescar token:', err);
      }
    }

    // Solo redirigir a login si es una ruta protegida específica
    // NO redirigir en rutas 404 o desconocidas para mantener el estado de auth
    const protectedPaths = [
      '/micuenta',
      '/carrito',
      '/checkout',
      '/admin'
    ];

    const isProtectedPath = protectedPaths.some(p =>
      pathname === p || pathname.startsWith(p + '/')
    );

    if (isProtectedPath) {
      // No autenticado y sin refresh válido ⇒ limpiar cookies y redirigir
      const res = NextResponse.redirect(new URL('/login', request.url));
      ['accessToken', 'refreshToken', 'verificationToken', 'token', 'refresh_token']
        .forEach(name => res.cookies.delete(name));
      return res;
    }

    // Para rutas no protegidas (incluyendo 404), permitir acceso
    return NextResponse.next();
  }

  /* ------------------------------------------------------------------ */
  /* 6) Si llega aquí significa que la sesión es válida                 */
  /* ------------------------------------------------------------------ */
  return NextResponse.next();
}

/* -------------------------------------------------------------------- */
/* Validar JWT (30 s de margen para evitar race conditions)             */
/* -------------------------------------------------------------------- */
function validateToken(token: string): boolean {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 > Date.now() + 30_000;
  } catch {
    return false;
  }
}

/* -------------------------------------------------------------------- */
/* Aplicar middleware a todo excepto estáticos                          */
/* -------------------------------------------------------------------- */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
