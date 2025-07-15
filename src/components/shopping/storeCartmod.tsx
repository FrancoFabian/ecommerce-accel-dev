'use client';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  decrement,
  addOrIncrement,
  remove,
} from '@/store/features/cartSlice';
import { CartItemMod } from "./CartItems/cartItemmod";
import { EmptyCart } from "./EmptyCart";
import { CartSkeleton } from "../skeletons/CartItemSkeleton";
import { Quicksand } from "next/font/google";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from 'react';
import './CartItems/styles.css';

const quickSans = Quicksand({ subsets: ["latin"] });

interface CartProps {
  isLoading?: boolean;
  onContinueShopping?: () => void;
  onWhatsAppQuote?: () => void;
}

export const Cart = ({ 
  isLoading = false, 
  onContinueShopping,
  onWhatsAppQuote 
}: CartProps) => {
  const router = useRouter();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const cartCount = useAppSelector(selectCartCount);
  const dispatch = useAppDispatch();
  
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleRemove = (productId: string) => {
    setActionLoading(productId);
    setTimeout(() => {
      dispatch(remove(productId));
      setActionLoading(null);
    }, 150);
  };

  const handleIncrement = (item: any) => {
    setActionLoading(item.producto_id);
    setTimeout(() => {
      dispatch(addOrIncrement(item));
      setActionLoading(null);
    }, 100);
  };

  const handleDecrement = (productId: string) => {
    setActionLoading(productId);
    setTimeout(() => {
      dispatch(decrement(productId));
      setActionLoading(null);
    }, 100);
  };

  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    } else {
      // Redirigir a checkout con los datos del carrito
      router.push('/checkout');
    }
  };

  const handleWhatsAppQuote = () => {
    const message = `Hola! Me gustaría cotizar los siguientes productos:\n\n${items.map(item => 
      `- ${item.titulo} (Cantidad: ${item.quantity})`
    ).join('\n')}\n\nTotal: $${total.toFixed(2)}`;
    
    const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onWhatsAppQuote?.();
  };

  // Mostrar skeleton durante carga inicial
  if (isInitialLoad || isLoading) {
    return <CartSkeleton itemCount={3} />;
  }

  return (
    <div className={`w-full h-auto rounded-md bg-white py-6 px-3 shadow-lg lg:flex-none ${quickSans.className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-600 text-md">Su pedido</h2>
        {cartCount > 0 && (
          <span className="text-xs text-gray-500">
            {cartCount} {cartCount === 1 ? 'producto' : 'productos'}
          </span>
        )}
      </div>
      
      <hr className="border-gray-200 mb-4" />

      {/* Contenido del carrito */}
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* Gradiente superior */}
          <div
            className="w-[92.8%] h-[40px] pointer-events-none"
            style={{
              position: 'absolute',
              background: 'linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.678) 100%)',
              zIndex: 10,
            }}
          />

          {/* Lista de productos */}
          <ul className="pr-2 overflow-y-auto" style={{ maxHeight: '15.5rem' }}>
            {items.map((item) => (
              <CartItemMod
                key={item.producto_id}
                {...item}
                onRemove={() => handleRemove(item.producto_id)}
                onInc={() => handleIncrement(item)}
                onDec={() => handleDecrement(item.producto_id)}
                isLoading={actionLoading === item.producto_id}
                maxQuantity={50}
              />
            ))}
          </ul>

          <hr className="my-4 border-gray-200" />

          {/* Total */}
          <div className="flex justify-between items-center">
            <dt className="text-md font-semibold text-gray-700">Total</dt>
            <dd className="text-xl font-semibold text-gray-700">
              ${total.toFixed(2)}
            </dd>
          </div>

          {/* Botones de acción */}
          <div className="mt-4 space-y-3">
            <button
              onClick={handleContinueShopping}
              disabled={isLoading || items.length === 0}
              className={`
                w-full px-6 py-3 font-semibold rounded-xl
                transition-all duration-200 ease-in-out
                ${isLoading || items.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/90 text-white active:scale-[0.98]'
                }
              `}
            >
              {isLoading ? 'Procesando...' : 'Continuar compra'}
            </button>

            <button
              onClick={handleWhatsAppQuote}
              disabled={isLoading}
              className={`
                w-full px-6 py-2 font-semibold rounded-xl
                flex items-center justify-center gap-2
                transition-all duration-300 ease-in-out
                ${isLoading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 active:scale-[0.98]'
                }
              `}
            >
              Cotizar por WhatsApp
              <FaWhatsapp className="text-2xl" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

