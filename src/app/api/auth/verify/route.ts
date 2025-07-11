import { NextResponse } from 'next/server';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { verificationCode, identifier, method } = body;

    // Validar datos
    if (!verificationCode || !identifier || !method) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Llamar al backend real
    const response = await fetch(`${BACKEND_URL}/api/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.message || 'Error al procesar la verificación' },
        { status: response.status }
      );
    }

    // Crear respuesta exitosa
    const res = NextResponse.json({ 
      success: true, 
      message: data.message || 'Código verificado correctamente'
    });

    // Guardar token temporal de verificación en httpOnly cookie si está presente
    if (data.verificationToken || data.token) {
      const tempToken = data.verificationToken || data.token;
      res.cookies.set('verificationToken', tempToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 60, // 30 minutos - tiempo limitado para completar el registro
      });
    }

    return res;
  } catch (error) {
    console.error('Error en endpoint de verificación:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 