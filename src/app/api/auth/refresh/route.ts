import { NextResponse } from 'next/server';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
export async function POST(request: Request) {
  try {
    // Obtener refreshToken desde las cookies
    const refreshToken = request.headers.get('cookie')
      ?.split(';')
      .find(c => c.trim().startsWith('refreshToken='))
      ?.split('=')[1];

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, error: 'Refresh token no encontrado' },
        { status: 401 }
      );
    }

    // Llamar al backend para refrescar el token
    const response = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.message || 'Error al refrescar token' },
        { status: response.status }
      );
    }

    // Crear respuesta exitosa
    const res = NextResponse.json({ 
      success: true, 
      message: 'Token refrescado correctamente'
    });

    // Actualizar accessToken si se devuelve uno nuevo
    if (data.accessToken) {
      res.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60, // 24 horas
      });
    }

    // Actualizar refreshToken si se devuelve uno nuevo
    if (data.refreshToken) {
      res.cookies.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 días
      });
    }

    return res;
  } catch (error) {
    console.error('Error en endpoint de refresh:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 