'use client';
// FavoriteBtn.tsx
import { useState } from 'react';
import { StarsSvg } from './StarsSvg';

interface FavoriteBtnProps {
  isAd?: boolean;
}

export const FavoriteBtn = ({ isAd = false }: FavoriteBtnProps) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleClick = () => {
    setIsFilled(!isFilled);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`absolute ${isAd ? 'top-6 right-6' : 'top-3 right-3'} z-20 inline-flex
         items-center justify-center w-8 h-8 min-w-8 gap-0 px-0 rounded-full 
         bg-gray-100 text-gray-500 text-tiny transition-transform 
          hover:text-gray-600 hover:bg-gray-200
          active:scale-95 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2`}
    >
      <StarsSvg isFilled={isFilled} />
    </button>
  );
};