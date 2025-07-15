'use client';
import { ReactNode } from 'react';

interface SkeletonProps {
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animate?: boolean;
}

// Skeleton base reutilizable
export const BaseSkeleton: React.FC<SkeletonProps> = ({
  className = '',
  children,
  isLoading = true,
  width = '100%',
  height = '1rem',
  rounded = 'md',
  animate = true,
}) => {
  if (!isLoading && children) {
    return <>{children}</>;
  }

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const animationClasses = animate ? 'animate-pulse' : '';

  return (
    <div
      className={`bg-gray-200 ${animationClasses} ${roundedClasses[rounded]} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
};

// Skeleton específico para texto
export const TextSkeleton: React.FC<{
  lines?: number;
  width?: string[];
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
}> = ({ 
  lines = 1, 
  width = ['100%'], 
  className = '',
  isLoading = true,
  children 
}) => {
  if (!isLoading && children) {
    return <>{children}</>;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <BaseSkeleton
          key={index}
          width={width[index] || width[0] || '100%'}
          height="1rem"
          className="block"
        />
      ))}
    </div>
  );
}; 