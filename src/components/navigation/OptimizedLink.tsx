"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface OptimizedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showLoader?: boolean;
  prefetch?: boolean;
}

export const OptimizedLink = ({ 
  href, 
  children, 
  className = '', 
  showLoader = true,
  prefetch = true 
}: OptimizedLinkProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (showLoader) {
      setIsNavigating(true);
      
      // Simular un pequeño delay para mostrar el loader
      setTimeout(() => {
        router.push(href);
        // Reset después de navegar
        setTimeout(() => setIsNavigating(false), 100);
      }, 150);
      
      e.preventDefault();
    }
  }, [href, router, showLoader]);

  if (isNavigating && showLoader) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <LoadingSpinner size="sm" />
        <span className="text-sm text-gray-600">Cargando...</span>
      </div>
    );
  }

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
}; 