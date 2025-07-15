'use client';
import { forwardRef, memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cart } from "../shopping/storeCartmod";

type MenuCartShoppingProps = {
  isVisible: boolean;
  onClose?: () => void;
  isLoading?: boolean;
};

export const MenuCartShopping = memo(forwardRef<HTMLDivElement, MenuCartShoppingProps>(({ 
  isVisible, 
  onClose,
  isLoading = false 
}, ref) => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleContinueShopping = () => {
    setIsProcessing(true);
    setTimeout(() => {
      router.push('/checkout');
      onClose?.();
      setIsProcessing(false);
    }, 200);
  };

  const handleWhatsAppQuote = () => {
    // Cerrar el menú después de abrir WhatsApp
    setTimeout(() => {
      onClose?.();
    }, 500);
  };

  return (
    <div
      ref={ref}
      className={`hidden lg:flex sm:flex absolute transition-all duration-300 ${
        isVisible
          ? "scale-100 opacity-100"
          : "scale-95 opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: 39, maxHeight: 'auto' }}
    >
      <div
        className="relative
        bg-white shadow-2xl 
        rounded-xl 
        lg:w-[400px]
        md:w-[400px]
        sm:w-[25rem]
        w-[94%]
        left-1/2 transform 
        -translate-x-1/2 
        translate-y-[48%] 
        lg:translate-y-[48%] 
        lg:left-[85%]
        sm:left-[25%] 
        md:-translate-x-0 
        sm:-translate-x-0 
        sm:translate-y-[48%]
        top-14"
      >
        <Cart 
          isLoading={isLoading || isProcessing}
          onContinueShopping={handleContinueShopping}
          onWhatsAppQuote={handleWhatsAppQuote}
        />
      </div>
    </div>
  );
}));
