import { NextRequest, NextResponse } from 'next/server';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

const createCookie = (name: string, value: string, maxAge: number): ResponseCookie => ({
  name,
  value,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge,
});

export async function POST(
  request: NextRequest,
  { params }: { params: { auth: string[] } }
) {
  const authType = params.auth[0]; // 'login' or 'logout'
  
  if (authType === 'login') {
    const body = await request.json();
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(
          { success: false, error: data.message || 'Credenciales incorrectas' },
          { status: response.status }
        );
      }
      
      // Create response with cookies
      const res = NextResponse.json({ success: true, data });
      
      // Guardar accessToken en httpOnly cookie
      if (data.accessToken) {
        res.cookies.set(createCookie('accessToken', data.accessToken, 24 * 60 * 60)); // 24 horas
      }

      // Guardar refreshToken en httpOnly cookie
      if (data.refreshToken) {
        res.cookies.set(createCookie('refreshToken', data.refreshToken, 7 * 24 * 60 * 60)); // 7 días
      }

      // Mantener compatibilidad con token legacy si existe
      if (data.token && !data.accessToken) {
        res.cookies.set(createCookie('accessToken', data.token, 24 * 60 * 60)); // 24 horas
      }

      return res;
      
    } catch (error) {
      console.error('Error en login:', error);
      return NextResponse.json(
        { success: false, error: 'Error interno del servidor' },
        { status: 500 }
      );
    }
  }
  
  if (authType === 'logout') {
    try {
      // Get the accessToken from cookies
      const accessToken = request.cookies.get('accessToken')?.value;

      // Call backend logout endpoint if we have a token
      if (accessToken) {
        const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          console.warn('Logout en backend falló, pero continuamos con limpieza local');
        }
      }

      // Create response that clears cookies
      const res = NextResponse.json({ success: true });
      res.cookies.delete('accessToken');
      res.cookies.delete('refreshToken');
      res.cookies.delete('token'); // Limpiar token legacy si existe
      
      return res;
    } catch (error) {
      console.error('Error en logout:', error);
      return NextResponse.json(
        { success: false, error: 'Error al cerrar sesión' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { success: false, error: 'Tipo de autenticación inválido' },
    { status: 400 }
  );
}

/**
 * Uso del endpoint de autenticación desde el frontend:
 * 
 * Para cerrar sesión:
 * ```typescript
 * import { useRouter } from 'next/navigation';
 * 
 * const handleLogout = async () => {
 *   const response = await fetch("/api/auth/logout", { 
 *     method: "POST",
 *   });
 *   
 *   if (response.ok) {
 *     // Redirigir al usuario a la página principal
 *     router.push("/");
 *   }
 * };
 * ```
 */
