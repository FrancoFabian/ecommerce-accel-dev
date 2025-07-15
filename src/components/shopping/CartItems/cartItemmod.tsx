'use client';
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";
import type { CartItem } from "@/store/features/cartSlice";
import { Tooltip } from "@/components/ui/Tooltip";
import { QuantityControls } from "@/components/shopping/QuantityControls";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { BaseSkeleton } from "@/components/skeletons/IntelligentSkeleton";
import { truncateText } from "@/utils/textUtils";

interface CartItemModProps extends CartItem {
  onRemove: () => void;
  onInc: () => void;
  onDec: () => void;
  isLoading?: boolean;
  maxQuantity?: number;
}

export const CartItemMod = ({
  img_portada,
  titulo,
  precios,
  quantity,
  onRemove,
  onInc,
  onDec,
  isLoading = false,
  maxQuantity = 99,
}: CartItemModProps) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  // Convertir precios a números seguros
  const safePrices = {
    precio_1: parsePrice(precios?.precio_1),
    precio_especial: parsePrice(precios?.precio_especial),
    precio_descuento: parsePrice(precios?.precio_descuento),
    precio_lista: parsePrice(precios?.precio_lista),
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove();
    }, 150);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (error: Error) => {
    console.warn('Error loading cart image:', error);
    setImageError(true);
  };

  const truncatedTitle = truncateText(titulo, 50);
  const shouldShowTooltip = titulo.length > 50;

  // Validar que tenemos los datos mínimos necesarios
  const hasValidData = titulo && precios && safePrices.precio_1 > 0;

  if (!hasValidData) {
    return (
      <li className="flex items-center gap-x-4 border-b border-gray-200 py-2 last:border-b-0 animate-pulse">
        <div className="w-14 h-14 bg-gray-200 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="flex items-center justify-between">
            <div className="h-3 bg-gray-200 rounded w-16" />
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
              <div className="w-6 h-4 bg-gray-200 rounded" />
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
        <div className="w-7 h-7 bg-gray-200 rounded-full" />
      </li>
    );
  }

  return (
    <li className={`
      flex items-center gap-x-4 border-b border-gray-200 py-2 last:border-b-0
      transition-all duration-200 ease-in-out
      ${isRemoving ? 'opacity-0 scale-95 translate-x-4' : 'opacity-100 scale-100 translate-x-0'}
      ${isLoading ? 'opacity-50' : ''}
    `}>
      {/* Imagen del producto */}
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center">
        <OptimizedImage
          src={img_portada}
          alt={titulo}
          width={56}
          height={56}
          className="rounded-lg object-cover transition-transform duration-200 hover:scale-105"
          onLoad={handleImageLoad}
          onError={handleImageError}
          priority={false}
        />
      </div>

      {/* Información del producto */}
      <div className="flex flex-1 flex-col">
        {/* Título con tooltip */}
        <div className="mb-1">
          <BaseSkeleton 
            isLoading={!titulo}
            width="80%"
            height="16px"
            className="mb-1"
          >
            {shouldShowTooltip ? (
              <Tooltip content={titulo} position="top">
                <h4 className="text-xs font-semibold text-gray-800 cursor-help">
                  {truncatedTitle}
                </h4>
              </Tooltip>
            ) : (
              <h4 className="text-xs font-semibold text-gray-800">
                {truncatedTitle}
              </h4>
            )}
          </BaseSkeleton>
        </div>

        {/* Precio y controles */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BaseSkeleton 
              isLoading={!precios}
              width="60px"
              height="14px"
            >
              <span className="text-sm font-semibold text-gray-700">
                ${safePrices.precio_1.toFixed(2)}
              </span>
            </BaseSkeleton>
            <BaseSkeleton 
              isLoading={false}
              width="20px"
              height="12px"
            >
              <span className="text-xs text-gray-500">
                c/u
              </span>
            </BaseSkeleton>
          </div>

          {/* Controles de cantidad */}
          <BaseSkeleton 
            isLoading={isLoading}
            width="70px"
            height="24px"
            rounded="full"
          >
            <QuantityControls
              quantity={quantity}
              onIncrement={onInc}
              onDecrement={onDec}
              disabled={isLoading}
              isLoading={isLoading}
              maxQuantity={maxQuantity}
            />
          </BaseSkeleton>
        </div>

        {/* Subtotal (solo visible en pantallas más grandes) */}
        <div className="hidden sm:block mt-1">
          <BaseSkeleton 
            isLoading={!precios || !quantity}
            width="80px"
            height="12px"
          >
            <span className="text-xs text-gray-500">
              Subtotal: ${(safePrices.precio_1 * quantity).toFixed(2)}
            </span>
          </BaseSkeleton>
        </div>
      </div>

      {/* Botón de eliminar */}
      <BaseSkeleton 
        isLoading={isLoading}
        width="28px"
        height="28px"
        rounded="full"
      >
        <button
          onClick={handleRemove}
          disabled={isLoading}
          className={`
            flex justify-center items-center h-7 w-7 rounded-full
            transition-all duration-200 ease-in-out
            ${isLoading
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 hover:bg-gray-200 hover:text-gray-700 text-gray-500 active:scale-95'
            }
          `}
          aria-label="Eliminar producto"
        >
          <HiMiniXMark size={20} />
        </button>
      </BaseSkeleton>
    </li>
  );
};
