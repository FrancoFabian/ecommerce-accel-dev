'use client';
import { useState, useEffect } from 'react';

import { ProductResponse, ProductCardProps } from '@/types/product';
import { ProductCard } from './ProductCard';

export const ProductsContainer = () => {
  const [data, setData] = useState<ProductResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoria = '22';
        const response = await fetch(`/api/productscategory?categoria=${categoria}`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Error al cargar productos: ${response.statusText}`);
        }

        const result: ProductResponse = await response.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || data.productos.length === 0) {
    return <div>No se encontraron productos.</div>;
  }

  return (
    <div className="px-2 pt-2 pb-20 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:items-center lg:flex lg:justify-center lg:items-center lg:flex-wrap md:grid-cols-3 lg:grid-cols-4">
      {data.productos.map((product: ProductCardProps) => (
        <ProductCard key={product.producto_id} {...product} />
      ))}
    </div>
  );
};


