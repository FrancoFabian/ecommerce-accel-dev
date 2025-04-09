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
  // Rutas que se pueden visitar sin estar autenticado
  const publicPaths = ['/', '/login', '/register', '/forgot-password'];

  // Extraemos el token y, si existe, lo validamos
  const token = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const isAuth = token ? validateToken(token) : false;

  // 1) Si la ruta es "/login" y el usuario YA está logueado, redirige a "/micuenta"
  if (request.nextUrl.pathname === '/login') {
    if (isAuth) {
      return NextResponse.redirect(new URL('/micuenta', request.url));
    }
    // Si no está logueado, puede ver la página /login
    return NextResponse.next();
  }

  // 2) Verificar si es una ruta pública distinta de "/login"
  //    (p.ej. "/", "/register", "/forgot-password")
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // 3) Para rutas protegidas, si no hay sesión válida:
  if (!isAuth) {
    // Intentar refrescar la sesión si tenemos un refresh token
    if (refreshToken) {
      try {
        const response = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            Cookie: `refresh_token=${refreshToken}`,
          },
        });
        if (response.ok) {
          // Sesión refrescada con éxito, deja pasar
          return NextResponse.next();
        }
      } catch (error) {
        // Ignoramos el error y redirigimos abajo
      }
    }
    // No se pudo refrescar (o no había refreshToken), redirigir a /login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    response.cookies.delete('refresh_token');
    return response;
  }

  // 4) Está logueado y la ruta no es pública => acceso permitido
  return NextResponse.next();
}

function validateToken(token: string): boolean {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    // Se suma un buffer de 30s para prevenir casos límite
    return decoded.exp * 1000 > Date.now() + 30000;
  } catch {
    return false;
  }
}

export const config = {
  matcher: [
    // Aplica este middleware a todas las rutas excepto:
    // - _next/static, _next/image, favicon.ico, public/ 
    // - y la ruta /api/auth/login (ya gestionada aparte)
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth/login).*)',
  ],
};
