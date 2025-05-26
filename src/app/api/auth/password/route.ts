import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, confirmPassword,username } = body;

    // Validar datos
    if (!password || !confirmPassword || !username) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'Las contraseñas no coinciden' },
        { status: 400 }
      );
    }

    // Obtener verificationToken desde las cookies
    const verificationToken = request.headers.get('cookie')
      ?.split(';')
      .find(c => c.trim().startsWith('verificationToken='))
      ?.split('=')[1];

    if (!verificationToken) {
      return NextResponse.json(
        { success: false, error: 'Token de verificación no encontrado. Por favor, verifique su código nuevamente.' },
        { status: 401 }
      );
    }

    // Llamar al backend real con el verificationToken
    const response = await fetch('http://localhost:8080/api/auth/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${verificationToken}`,
      },
      body: JSON.stringify({
        password,
        confirmPassword,
        username, // Asegúrate de enviar el nombre de usuario si es necesario
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Si el token de verificación expiró o es inválido
      if (response.status === 401) {
        return NextResponse.json(
          { success: false, error: 'Token de verificación expirado. Por favor, verifique su código nuevamente.' },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { success: false, error: data.message || 'Error al establecer la contraseña' },
        { status: response.status }
      );
    }

    // Crear respuesta exitosa
    const res = NextResponse.json({ 
      success: true, 
      message: data.message || 'Contraseña establecida correctamente'
    });

    // Eliminar el token temporal de verificación ya que ya no se necesita
    res.cookies.set('verificationToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // Eliminar inmediatamente
    });

    // Guardar tokens finales en httpOnly cookies si están presentes
    if (data.accessToken) {
      res.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60, // 24 horas
      });
    }

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
    console.error('Error en endpoint de contraseña:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 