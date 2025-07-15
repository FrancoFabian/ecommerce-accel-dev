'use client';
import React, { useState, useEffect, useRef } from 'react';

// Cache simple para imágenes
const imageCache = new Map<string, boolean>();

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(src, true);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
};

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  skeleton?: React.ReactNode;
  fallback?: React.ReactNode;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  onLoad,
  onError,
  skeleton,
  fallback,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Si ya está en caché, marcar como cargada
    if (imageCache.has(src)) {
      setIsLoaded(true);
      onLoad?.();
      return;
    }

    // Precargar la imagen
    if (priority) {
      preloadImage(src)
        .then(() => {
          setIsLoaded(true);
          onLoad?.();
        })
        .catch((error) => {
          setHasError(true);
          onError?.(error);
        });
    }
  }, [src, priority, onLoad, onError]);

  const handleImageLoad = () => {
    imageCache.set(src, true);
    setIsLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setHasError(true);
    onError?.(new Error('Failed to load image'));
  };

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  if (!isLoaded && skeleton) {
    return (
      <div className={`relative ${className}`}>
        {skeleton}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="opacity-0 absolute inset-0"
          width={width}
          height={height}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      width={width}
      height={height}
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  );
};

// Hook simple para precargar imágenes
export const useImagePreloader = (urls: string[]) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const preloadImages = async () => {
    if (urls.length === 0) return;

    setIsLoading(true);
    let completed = 0;

    for (const url of urls) {
      try {
        await preloadImage(url);
        completed++;
        setLoadedCount(completed);
        setProgress((completed / urls.length) * 100);
      } catch (error) {
        console.error('Error preloading image:', url, error);
      }
    }

    setIsLoading(false);
  };

  return {
    loadedCount,
    progress,
    isLoading,
    preloadImages,
  };
}; 