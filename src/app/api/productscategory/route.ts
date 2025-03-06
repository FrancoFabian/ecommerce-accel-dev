import { NextResponse } from 'next/server';
import { ProductResponse } from '@/types/product';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoria = searchParams.get('categoria');

  if (!categoria) {
    return NextResponse.json(
      { error: 'Se requiere una categoría' },
      { status: 400 }
    );
  }

  try {
    const syscomToken = process.env.SYSCOM_TOKEN;
    if (!syscomToken) {
      throw new Error('Falta el token de Syscom (SYSCOM_TOKEN)');
    }

    const syscomURL = new URL('https://developers.syscom.mx/api/v1/productos');
    syscomURL.searchParams.append('categoria', categoria);

    const response = await fetch(syscomURL, {
      headers: {
        Authorization: `Bearer ${syscomToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error de Syscom: ${response.status} ${response.statusText}`);
    }

    const data: ProductResponse = await response.json();
      // Imprimimos en la consola del servidor con formato JSON "bonito"
      console.log('Respuesta cruda de Syscom:', JSON.stringify(data, null, 2));

    // Limpiar los datos antes de enviarlos al cliente
    const cleanedData: ProductResponse = {
      ...data,
      productos: data.productos.map((product) => ({
        ...product,
        precios: {
          ...product.precios,
          volumen: cleanVolume(product.precios.volumen),
        },
      })),
    };

    return NextResponse.json(cleanedData);
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// Función para limpiar el objeto volumen
function cleanVolume(volumen: Record<string, number | undefined> | undefined | null): Record<string, number> {
  // Asignar un objeto vacío si 'volumen' es undefined o null
  const safeVolumen = volumen ?? {};

  return Object.fromEntries(
    Object.entries(safeVolumen)
      .filter(([, value]) => value !== undefined) // Filtra las entradas con valores undefined
      .map(([key, value]) => [key, value as number]) // Asegura que el valor sea tratado como número
  );
}
