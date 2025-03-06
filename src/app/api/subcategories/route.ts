import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');

  if (!categoryId) {
    return NextResponse.json(
      { error: 'Se requiere un categoryId válido' },
      { status: 400 }
    );
  }

  try {
    const url = `https://developers.syscom.mx/api/v1/categorias/${categoryId}`;
    const syscomToken = process.env.SYSCOM_TOKEN;

    if (!syscomToken) {
      throw new Error('El token de Syscom no está configurado');
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${syscomToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener subcategorías de ${categoryId}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Error desconocido', error);
    }
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
