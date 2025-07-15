'use client';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import Link from 'next/link';

export const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 mb-4 text-gray-400">
        <HiOutlineShoppingCart className="w-full h-full" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Tu carrito está vacío
      </h3>
      
      <p className="text-sm text-gray-500 text-center mb-6 max-w-xs">
        Agrega productos a tu carrito para comenzar tu compra
      </p>
      
      <Link
        href="/productos"
        className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-colors duration-200"
      >
        Explorar productos
      </Link>
    </div>
  );
}; 