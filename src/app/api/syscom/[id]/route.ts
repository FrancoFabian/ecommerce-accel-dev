import { NextRequest, NextResponse } from 'next/server';
import { SyscomProducto } from '@/types/product';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Validar que tenemos el ID
    if (!id) {
      return NextResponse.json(
        { error: 'ID de producto requerido' },
        { status: 400 }
      );
    }

    // Obtener el token de las variables de entorno del servidor
    const syscomToken = process.env.SYSCOM_TOKEN;
    
    if (!syscomToken) {
      console.error('Token de Syscom no configurado');
      return NextResponse.json(
        { error: 'Token de Syscom no configurado' },
        { status: 500 }
      );
    }

    // Hacer la petición a Syscom
    const response = await fetch(`https://developers.syscom.mx/api/v1/productos/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${syscomToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de Syscom:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        url: response.url
      });
      
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Token de Syscom inválido o expirado' },
          { status: 401 }
        );
      }
      
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Producto no encontrado' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: 'Error al obtener el producto de Syscom' },
        { status: response.status }
      );
    }

    // Parsear la respuesta
    const product: SyscomProducto = await response.json();
    
    // Transformar y ordenar las imágenes
    const transformedProduct = {
      ...product,
      imagenes: product.imagenes?.sort((a, b) => a.orden - b.orden) || [],
    };

    return NextResponse.json(transformedProduct);
    
  } catch (error) {
    console.error('Error interno del servidor:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 