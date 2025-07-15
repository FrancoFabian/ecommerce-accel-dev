'use client';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
    selectCartItems,
    selectCartTotal,
    selectCartCount,
    decrement,
    addOrIncrement,
    remove,
} from '@/store/features/cartSlice';
import { LeftArrowIcon } from '@/icons/LeftArrowIcon'




interface BackMenuCartProps {
    onBack: () => void;
    currentStep: number;
}
export const BackMenuCart = ({ onBack, currentStep }: BackMenuCartProps) => {
    const items = useAppSelector(selectCartItems);
    const total = useAppSelector(selectCartTotal);
    const cartCount = useAppSelector(selectCartCount);
    return (
        <div className="flex flex-wrap pr-4 gap-2 justify-between w-full items-center">
            <button
                className={`group relative inline-flex items-center justify-center appearance-none 
          whitespace-nowrap font-medium overflow-hidden px-4 h-10 gap-2 rounded-full 
          transition-transform bg-gray-200 text-gray-700
          ${currentStep === 1
                        ? 'opacity-50'
                        : 'hover:opacity-80 active:scale-95'
                    }`}
                type="button"
                onClick={onBack}
                disabled={currentStep === 1}
            >
                <LeftArrowIcon />
                Volver
            </button>

            <div className="flex items-center gap-2">
                <p>
                    <span className="text-small font-semibold text-default-700">
                        ${Number(total).toFixed(2)}
                    </span>
                    <span className="ml-1 text-default-500">
                        {cartCount > 0 && (
                            <span className="text-gray-500">
                                {`  ( ${cartCount}`} {cartCount === 1 ? 'articulo )' : 'articulos )'}
                            </span>
                        )}
                    </span>
                </p>
            </div>
        </div>
    )
}
