// components/StarsSvg.tsx

import React from 'react';

interface StarIconProps {
  isFilled: boolean;
  color?: string;
  className?: string;
}

export const StarsSvg: React.FC<StarIconProps> = ({ isFilled, color = 'currentColor', className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className={`w-4 h-4 pointer-events-none ${className}`}
      viewBox="0 0 24 24"
      fill={isFilled ? color : 'none'}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
};
