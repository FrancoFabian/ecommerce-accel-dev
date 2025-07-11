import { NextResponse } from 'next/server';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      middleName,
      lastName,
      secondLastName,
      alternativeContact,
      birthDate, // Cambiamos el nombre a alternativeContactEmail
      alternativeContactEmail   // Agregamos contactMethod para determinar el tipo
    } = body;

    // Validar datos mínimos según el DTO
    if (!firstName || !lastName || !alternativeContact || !birthDate || typeof alternativeContactEmail !== "boolean") {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos para el perfil (firstName, lastName, alternativeContact, birthDate, contactMethod son obligatorios)' },
        { status: 400 }
      );
    }

    // Determinar si alternativeContact es email basado en contactMethod
    // Si contactMethod es "email", entonces alternativeContact es teléfono (false)
    // Si contactMethod es "phone", entonces alternativeContact es email (true)
    //const alternativeContactEmail = contactMethod === "phone";

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

    // Preparar el cuerpo de la petición exactamente como espera el ProfileDTO
    const profileData = {
      firstName,
      middleName: middleName || null, // Enviar null si no existe
      lastName,
      secondLastName: secondLastName || null, // Enviar null si no existe
      alternativeContact,
      birthDate, // Obligatorio según el DTO
      alternativeContactEmail,
    };

    // Llamar al backend real con el accessToken
    const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(profileData),
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
        { success: false, error: data.message || 'Error al actualizar el perfil' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error en endpoint de perfil:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 