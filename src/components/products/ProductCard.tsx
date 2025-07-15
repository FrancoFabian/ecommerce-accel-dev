'use client';
import { useState } from 'react';
import { ProductCardProps } from '@/types/product';
import { useAppDispatch } from '@/store/hooks';
import { addOrIncrement } from '@/store/features/cartSlice';
import { FavoriteBtn } from './FavoriteBtn';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { BaseSkeleton, TextSkeleton } from '@/components/skeletons/IntelligentSkeleton';

export const ProductCard = (props: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(true);
  const [priceLoaded, setPriceLoaded] = useState(true);
  
  const { titulo, img_portada, precios, existencia, marca, modelo, categorias } = props;

  // Función para convertir y validar precios
  const parsePrice = (price: any): number => {
    if (typeof price === 'number' && !isNaN(price)) {
      return price;
    }
    if (typeof price === 'string') {
      const parsed = parseFloat(price);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  // Convertir todos los precios a números
  const safePrices = {
    precio_1: parsePrice(precios?.precio_1),
    precio_especial: parsePrice(precios?.precio_especial),
    precio_descuento: parsePrice(precios?.precio_descuento),
    precio_lista: parsePrice(precios?.precio_lista),
    volumen: precios?.volumen ? Object.fromEntries(
      Object.entries(precios.volumen).map(([key, value]) => [key, parsePrice(value)])
    ) : {}
  };

  const highestPrice = Math.max(
    safePrices.precio_1,
    safePrices.precio_especial,
    safePrices.precio_descuento,
    safePrices.precio_lista,
    ...Object.values(safePrices.volumen)
  );

  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(addOrIncrement(props));
      setIsLoading(false);
    }, 300);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (error: Error) => {
    console.warn('Error loading product image:', error);
    setImageLoaded(false);
  };

  // Validar que tenemos los datos mínimos necesarios
  const hasValidData = titulo && precios && safePrices.precio_1 > 0;

  if (!hasValidData) {
    return (
      <div className="relative flex flex-col 
        w-64 lg:w-64 md:w-64 sm:w-72 
        h-[20rem] lg:h-[32rem] md:h-[32rem] sm:h-[32rem] max-w-full 
        gap-3 rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg">
        
        <div className="flex flex-col gap-2 animate-pulse">
          <div className="h-40 bg-gray-200 rounded-md"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col 
      w-64 lg:w-64 md:w-64 sm:w-72 
      h-[20rem] lg:h-[32rem] md:h-[32rem] sm:h-[32rem] max-w-full 
      gap-3 rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg">
      
      <FavoriteBtn />

      {/* Image container */}
      <div className="relative w-full h-40 overflow-hidden rounded-md">
        <OptimizedImage
          src={img_portada || "/placeholder.png"}
          alt={titulo}
          width={256}
          height={160}
          className="cursor-pointer transition-transform duration-300 hover:scale-110 object-contain w-full h-full"
          onLoad={handleImageLoad}
          onError={handleImageError}
          priority={false}
        />
      </div>

      {/* Product information */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          {/* Brand */}
          <BaseSkeleton 
            isLoading={!marca}
            width="80px"
            height="16px"
            className="text-xs font-semibold text-emerald-500"
          >
            <span className="text-xs font-semibold text-emerald-500">{marca}</span>
          </BaseSkeleton>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex md:flex sm:flex items-center gap-1">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100">
                <span className="text-[10px] font-medium text-blue-700">+</span>
              </div>
              <BaseSkeleton 
                isLoading={!existencia?.nuevo}
                width="24px"
                height="12px"
              >
                <span className="text-xs font-medium text-gray-600">
                  {existencia?.nuevo || 0}
                </span>
              </BaseSkeleton>
            </div>
          </div>
        </div>

        {/* Title */}
        <TextSkeleton 
          isLoading={!titleLoaded || !titulo}
          lines={2}
          width={['100%', '80%']}
          className="mb-1"
        >
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
            {titulo}
          </h3>
        </TextSkeleton>

        {/* Model */}
        <div className="hidden lg:flex md:flex sm:flex items-center gap-2 mt-1">
          <BaseSkeleton 
            isLoading={!modelo}
            width="100px"
            height="12px"
          >
            <p className="text-xs text-gray-500">
              Modelo: {modelo}
            </p>
          </BaseSkeleton>
        </div>

        {/* Categories */}
        <div className="hidden lg:flex lg:flex-wrap sm:flex sm:flex-wrap md:flex md:flex-wrap gap-1">
          {categorias && categorias.length > 0 ? (
            categorias.map((categoria) => (
              <BaseSkeleton 
                key={categoria.id}
                isLoading={false}
                width="auto"
                height="20px"
                rounded="full"
              >
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {categoria.nombre}
                </span>
              </BaseSkeleton>
            ))
          ) : (
            <BaseSkeleton 
              isLoading={true}
              width="80px"
              height="20px"
              rounded="full"
            >
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                Sin categoría
              </span>
            </BaseSkeleton>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2 mt-2">
          <BaseSkeleton 
            isLoading={!priceLoaded || !precios}
            width="80px"
            height="24px"
          >
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800">
                ${safePrices.precio_1.toFixed(2)}
              </span>
              {safePrices.precio_especial > 0 && safePrices.precio_especial < safePrices.precio_1 && (
                <span className="text-xs text-gray-500 line-through">
                  ${safePrices.precio_especial.toFixed(2)}
                </span>
              )}
            </div>
          </BaseSkeleton>

          {/* Action buttons */}
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={() => window.location.href = `/oneproduct?id=${props.producto_id}`}
              className="flex-1 px-3 py-1.5 rounded-md text-xs font-medium
                         bg-gray-100 hover:bg-gray-200 text-gray-700
                         transition-all duration-200 active:scale-95
                         border border-gray-300"
            >
              Ver
            </button>
            
            <BaseSkeleton 
              isLoading={isLoading}
              width="40px"
              height="32px"
              rounded="md"
            >
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className={`
                  px-3 py-1.5 rounded-md text-xs font-medium
                  transition-all duration-200
                  ${isLoading 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                  }
                `}
              >
                {isLoading ? '...' : '+'}
              </button>
            </BaseSkeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

