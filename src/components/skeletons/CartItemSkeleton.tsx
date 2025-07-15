import React from 'react';

export const CartItemSkeleton: React.FC = () => {
  return (
    <li className="flex items-center gap-x-4 border-b border-gray-200 py-2 last:border-b-0 animate-pulse">
      {/* Imagen del producto */}
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center">
        <div className="w-14 h-14 bg-gray-300 rounded-lg" />
      </div>
      
      {/* Información del producto */}
      <div className="flex flex-1 flex-col gap-2">
        {/* Título del producto */}
        <div className="h-4 bg-gray-300 rounded w-4/5" />
        
        {/* Precio y controles */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 bg-gray-300 rounded w-16" />
            <div className="h-3 bg-gray-200 rounded w-8" />
          </div>
          
          {/* Controles de cantidad */}
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-gray-300 rounded-full" />
            <div className="w-6 h-4 bg-gray-200 rounded" />
            <div className="w-6 h-6 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Botón de eliminar */}
      <div className="w-7 h-7 bg-gray-300 rounded-full" />
    </li>
  );
};

export const CartSkeleton: React.FC<{ itemCount?: number }> = ({ itemCount = 3 }) => {
  return (
    <div className="w-full h-auto rounded-md bg-white py-6 px-3 shadow-lg">
      {/* Header */}
      <div className="h-5 bg-gray-300 rounded w-24 mb-3" />
      <hr className="border-gray-200 top-4" />
      
      {/* Items */}
      <ul className="pr-2 mt-4" style={{ maxHeight: '15.5rem' }}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <CartItemSkeleton key={index} />
        ))}
      </ul>
      
      <hr className="my-2 border-gray-200" />
      
      {/* Total */}
      <div className="flex justify-between items-center">
        <div className="h-5 bg-gray-300 rounded w-12" />
        <div className="h-6 bg-gray-300 rounded w-20" />
      </div>
      
      {/* Botones */}
      <div className="mt-4 h-12 bg-gray-300 rounded-xl" />
      <div className="mt-4 h-10 bg-gray-200 rounded-xl" />
    </div>
  );
}; 