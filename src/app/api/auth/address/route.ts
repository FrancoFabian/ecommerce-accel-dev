import { NextResponse } from 'next/server';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      street, 
      colony, 
      municipality, 
      state, 
      zipCode, 
      country 
    } = body;

    // Validar datos mínimos
    if (!street || !colony || !municipality || !state || !zipCode || !country) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos para la dirección' },
        { status: 400 }
      );
    }

    // Obtener accessToken desde las cookies
    const accessToken = request.headers.get('cookie')
      ?.split(';')
      .find(c => c.trim().startsWith('accessToken='))
      ?.split('=')[1];

    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: 'Token de acceso no encontrado. Por favor, inicie sesión nuevamente.' },
        { status: 401 }
      );
    }

    // Llamar al backend real con el accessToken
    const response = await fetch(`${BACKEND_URL}/api/auth/address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
          street,
          colony,
          municipality,
          state,
          zipCode,
          country
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Si el token expiró, devolver error específico
      if (response.status === 401) {
        return NextResponse.json(
          { success: false, error: 'Token expirado. Por favor, inicie sesión nuevamente.' },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { success: false, error: data.message || 'Error al actualizar la dirección' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error en endpoint de dirección:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 