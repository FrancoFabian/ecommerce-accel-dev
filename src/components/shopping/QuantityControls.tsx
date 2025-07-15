'use client';
import { HiMinus, HiPlus } from 'react-icons/hi2';
import { useState } from 'react';

interface QuantityControlsProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  maxQuantity?: number;
  className?: string;
}

export const QuantityControls: React.FC<QuantityControlsProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  disabled = false,
  isLoading = false,
  maxQuantity = 99,
  className = ''
}) => {
  const [isChanging, setIsChanging] = useState(false);

  const handleIncrement = () => {
    if (disabled || isLoading || quantity >= maxQuantity) return;
    setIsChanging(true);
    onIncrement();
    setTimeout(() => setIsChanging(false), 150);
  };

  const handleDecrement = () => {
    if (disabled || isLoading || quantity <= 1) return;
    setIsChanging(true);
    onDecrement();
    setTimeout(() => setIsChanging(false), 150);
  };

  const isDecrementDisabled = disabled || isLoading || quantity <= 1;
  const isIncrementDisabled = disabled || isLoading || quantity >= maxQuantity;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Botón decrementar */}
      <button
        onClick={handleDecrement}
        disabled={isDecrementDisabled}
        className={`
          w-6 h-6 rounded-full flex items-center justify-center
          transition-all duration-200 ease-in-out
          ${isDecrementDisabled 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 active:scale-95'
          }
          ${isChanging ? 'scale-95' : ''}
        `}
      >
        <HiMinus size={12} />
      </button>

      {/* Cantidad */}
      <span className={`
        min-w-[20px] text-center text-sm font-medium text-gray-700
        transition-all duration-200 ease-in-out
        ${isChanging ? 'scale-110' : ''}
      `}>
        {quantity}
      </span>

      {/* Botón incrementar */}
      <button
        onClick={handleIncrement}
        disabled={isIncrementDisabled}
        className={`
          w-6 h-6 rounded-full flex items-center justify-center
          transition-all duration-200 ease-in-out
          ${isIncrementDisabled 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 active:scale-95'
          }
          ${isChanging ? 'scale-95' : ''}
        `}
      >
        <HiPlus size={12} />
      </button>
    </div>
  );
}; 