// ProductsGrid.tsx
'use client';

import { ProductCardProps } from '@/types/product';
import { ProductCard } from '../ProductCard';


interface ProductsGridProps {
  products: ProductCardProps[];
}

export const ProductsGrid = ({ products }: ProductsGridProps) => {
  if (!products || products.length === 0) {
    return <div>No hay productos para esta categoría.</div>;
  }

  return (
    <div
      className="px-2 pt-2 pb-20 grid 
                 grid-cols-2 gap-4 
                 sm:flex sm:flex-wrap sm:justify-center sm:items-center
                 md:grid-cols-3 
                 lg:grid-cols-4 lg:flex lg:justify-center lg:items-center lg:flex-wrap"
    >
      {products.map((product) => (
        <ProductCard key={product.producto_id} {...product} />
      ))}
    </div>
  );
};
