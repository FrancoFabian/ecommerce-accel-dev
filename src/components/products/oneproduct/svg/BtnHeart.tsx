"use client";

import { useState } from 'react';
import { HeartSvg } from './HeartSvg';

export const BtnHeart = () => {
  const [isFilled, setIsFilled] = useState(false);

  const handleClick = () => {
    setIsFilled(!isFilled);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="z-0 group relative inline-flex items-center justify-center box-border select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none text-medium gap-3 rounded-lg px-0 transition-transform-colors-opacity bg-default/40 min-w-12 w-12 h-12 text-default-600"
    >
      <HeartSvg isFilled={isFilled} />
    </button>
  );
};
