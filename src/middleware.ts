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
  // Permitir siempre las rutas de la API de autenticación
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Rutas que se pueden visitar sin estar autenticado
  const publicPaths = ['/', '/login', '/signup', '/forgot-password',  '/categorias', '/doblefactorauth'];

  // Extraemos los tokens y, si existen, los validamos
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  
  // Mantener compatibilidad con cookies legacy
  const legacyToken = request.cookies.get('token')?.value;
  const legacyRefreshToken = request.cookies.get('refresh_token')?.value;
  
  const tokenToValidate = accessToken || legacyToken;
  const refreshTokenToUse = refreshToken || legacyRefreshToken;
  
  const isAuth = tokenToValidate ? validateToken(tokenToValidate) : false;

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
    if (refreshTokenToUse) {
      try {
        const response = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            Cookie: `refreshToken=${refreshTokenToUse}`,
          },
        });
        if (response.ok) {
          // Sesión refrescada con éxito, deja pasar
          return NextResponse.next();
        }
      } catch (error) {
        // Ignoramos el error y redirigimos abajo
        console.warn('Error al intentar refrescar token:', error);
      }
    }
    // No se pudo refrescar (o no había refreshToken), redirigir a /login
    const response = NextResponse.redirect(new URL('/login', request.url));
    
    // Limpiar todas las cookies de autenticación
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    response.cookies.delete('verificationToken');
    // Limpiar cookies legacy
    response.cookies.delete('token');
    response.cookies.delete('refresh_token');
    
    return response;
  }

  // 4) Si llegamos hasta acá, la sesión es válida → pasar la petición
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
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
