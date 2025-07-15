'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { EspecificacionProduct } from "@/components/products/oneproduct/EspecificationsProduct";
import { ProductDisplay } from "@/components/products/oneproduct/ProductDisplay";
import { Reviews } from "@/components/reviews/Reviews";
import { useGetSyscomProductByIdQuery } from '@/store/services/syscomApi';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

function OneProductContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const { 
    data: product, 
    isLoading, 
    error 
  } = useGetSyscomProductByIdQuery(productId || '', {
    skip: !productId
  });

  if (!productId) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Producto no encontrado</h1>
          <p className="text-gray-600">No se proporcionó un ID de producto válido.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error al cargar el producto</h1>
          <p className="text-gray-600">
            Hubo un problema al cargar la información del producto. 
            Por favor, intenta de nuevo más tarde.
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Producto no encontrado</h1>
          <p className="text-gray-600">El producto solicitado no existe.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-[100vw] h-[90vh] flex justify-center flex-wrap pb-12 overflow-auto">
      <div className="w-full lg:w-[78%] relative flex 
      flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <ProductDisplay product={product} />
        <EspecificacionProduct product={product} />
      </div>
      <Reviews />
    </main>
  );
}

export default function OneProductPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <OneProductContent />
    </Suspense>
  );
}

