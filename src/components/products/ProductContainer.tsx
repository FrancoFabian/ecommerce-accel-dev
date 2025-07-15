'use client';
import { useState, useEffect } from 'react';
import { ProductResponse, ProductCardProps } from '@/types/product';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '@/components/skeletons/productos/ProductCardSkeleton';
import { useProductImagePreloader } from '@/hooks/useImagePreloader';
import { SimpleLoadingProgress } from '@/components/ui/SimpleLoadingProgress';

export const ProductsContainer = () => {
  const [data, setData] = useState<ProductResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedProducts, setLoadedProducts] = useState<ProductCardProps[]>([]);

  // Hook para precargar imágenes
  const {
    progress,
    loadedCount,
    totalImages,
    errorCount,
    isLoading: imagesLoading,
    retryFailedImages,
    getImageStatus,
  } = useProductImagePreloader(data?.productos || []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const categoria = '22';
        const response = await fetch(`/api/productscategory?categoria=${categoria}`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Error al cargar productos: ${response.statusText}`);
        }

        const result: ProductResponse = await response.json();
        setData(result);
        
        // Inicialmente mostrar productos sin imágenes cargadas
        setLoadedProducts(result.productos || []);
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

  // Mostrar productos gradualmente según las imágenes que se vayan cargando
  useEffect(() => {
    if (!data?.productos) return;

    const productsWithLoadedImages = data.productos.map(product => ({
      ...product,
      imageLoaded: getImageStatus(product.img_portada) === 'loaded',
    }));

    setLoadedProducts(productsWithLoadedImages);
  }, [data?.productos, getImageStatus]);

  if (isLoading) {
    return (
      <div className="px-2 pt-2 pb-20 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:items-center lg:flex lg:justify-center lg:items-center lg:flex-wrap md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-red-600 text-center mb-4">
          <h3 className="text-lg font-semibold mb-2">Error al cargar productos</h3>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data || data.productos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-gray-500 text-center">
          <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
          <p className="text-sm">Intenta con otra categoría o recarga la página</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Indicador de progreso de carga de imágenes */}
      <SimpleLoadingProgress
        progress={progress}
        isLoading={imagesLoading}
      />

      {/* Grid de productos */}
      <div className="px-2 pt-2 pb-20 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:items-center lg:flex lg:justify-center lg:items-center lg:flex-wrap md:grid-cols-3 lg:grid-cols-4">
        {loadedProducts.map((product: ProductCardProps) => (
          <ProductCard key={product.producto_id} {...product} />
        ))}
      </div>

      {/* Mensaje de carga de imágenes si hay errores */}
      {errorCount > 0 && !imagesLoading && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                {errorCount} imagen{errorCount > 1 ? 'es' : ''} no pudo{errorCount > 1 ? 'ron' : ''} cargar
              </p>
              <p className="text-xs mt-1">
                Los productos se muestran sin algunas imágenes
              </p>
            </div>
            <button
              onClick={retryFailedImages}
              className="ml-2 text-xs bg-yellow-200 hover:bg-yellow-300 px-2 py-1 rounded"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}
    </>
  );
};


