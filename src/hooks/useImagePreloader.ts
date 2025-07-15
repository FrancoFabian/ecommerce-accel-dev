'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { preloadImage } from '@/components/ui/OptimizedImage';

interface ImagePreloaderOptions {
  priority?: boolean;
  retryCount?: number;
  retryDelay?: number;
  batchSize?: number;
  delayBetweenBatches?: number;
}

interface PreloadResult {
  url: string;
  status: 'loading' | 'loaded' | 'error';
  error?: Error;
}

export const useImagePreloader = (
  urls: string[],
  options: ImagePreloaderOptions = {}
) => {
  const {
    priority = false,
    retryCount = 2,
    retryDelay = 1000,
    batchSize = 5,
    delayBetweenBatches = 100,
  } = options;

  const [results, setResults] = useState<PreloadResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Usar refs para evitar dependencias problemáticas
  const urlsRef = useRef<string[]>([]);
  const hasInitializedRef = useRef(false);

  const preloadBatch = useCallback(async (batchUrls: string[]) => {
    const batchPromises = batchUrls.map(async (url) => {
      let attempts = 0;
      let lastError: Error | undefined;

      while (attempts <= retryCount) {
        try {
          await preloadImage(url);
          return { url, status: 'loaded' as const };
        } catch (error) {
          lastError = error as Error;
          attempts++;
          
          if (attempts <= retryCount) {
            await new Promise(resolve => setTimeout(resolve, retryDelay));
          }
        }
      }

      return { url, status: 'error' as const, error: lastError };
    });

    return Promise.allSettled(batchPromises);
  }, [retryCount, retryDelay]);

  const startPreloading = useCallback(async () => {
    const currentUrls = urlsRef.current;
    if (currentUrls.length === 0) return;

    setIsLoading(true);
    setProgress(0);
    
    const initialResults: PreloadResult[] = currentUrls.map(url => ({
      url,
      status: 'loading',
    }));
    setResults(initialResults);

    let completed = 0;
    const totalUrls = currentUrls.length;

    // Procesar en lotes para evitar sobrecarga
    for (let i = 0; i < currentUrls.length; i += batchSize) {
      const batch = currentUrls.slice(i, i + batchSize);
      
      try {
        const batchResults = await preloadBatch(batch);
        
        // Actualizar resultados
        setResults(prev => {
          const newResults = [...prev];
          batchResults.forEach((result, index) => {
            const urlIndex = i + index;
            if (result.status === 'fulfilled') {
              newResults[urlIndex] = result.value;
            } else {
              newResults[urlIndex] = {
                url: batch[index],
                status: 'error',
                error: new Error('Failed to preload image'),
              };
            }
          });
          return newResults;
        });

        completed += batch.length;
        setProgress((completed / totalUrls) * 100);

        // Delay entre lotes para no saturar la red
        if (i + batchSize < currentUrls.length) {
          await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
        }
      } catch (error) {
        console.error('Error in batch preloading:', error);
        
        // Marcar el lote como error
        setResults(prev => {
          const newResults = [...prev];
          batch.forEach((url, index) => {
            const urlIndex = i + index;
            newResults[urlIndex] = {
              url,
              status: 'error',
              error: error as Error,
            };
          });
          return newResults;
        });

        completed += batch.length;
        setProgress((completed / totalUrls) * 100);
      }
    }

    setIsLoading(false);
  }, [batchSize, delayBetweenBatches, preloadBatch]);

  // Actualizar URLs solo cuando realmente cambien
  useEffect(() => {
    const urlsChanged = JSON.stringify(urls) !== JSON.stringify(urlsRef.current);
    if (urlsChanged) {
      urlsRef.current = urls;
      hasInitializedRef.current = false;
    }
  }, [urls]);

  // Inicializar solo una vez cuando priority sea true
  useEffect(() => {
    if (priority && !hasInitializedRef.current && urlsRef.current.length > 0) {
      hasInitializedRef.current = true;
      startPreloading();
    }
  }, [priority, startPreloading]);

  const manualPreload = useCallback(() => {
    startPreloading();
  }, [startPreloading]);

  const getImageStatus = useCallback((url: string) => {
    const result = results.find(r => r.url === url);
    return result?.status || 'loading';
  }, [results]);

  const getLoadedCount = useCallback(() => {
    return results.filter(r => r.status === 'loaded').length;
  }, [results]);

  const getErrorCount = useCallback(() => {
    return results.filter(r => r.status === 'error').length;
  }, [results]);

  const getFailedImages = useCallback(() => {
    return results.filter(r => r.status === 'error');
  }, [results]);

  const retryFailedImages = useCallback(async () => {
    const failedUrls = results
      .filter(r => r.status === 'error')
      .map(r => r.url);

    if (failedUrls.length === 0) return;

    setIsLoading(true);
    
    // Marcar como loading
    setResults(prev => prev.map(r => 
      failedUrls.includes(r.url) 
        ? { ...r, status: 'loading' as const, error: undefined }
        : r
    ));

    try {
      const retryResults = await preloadBatch(failedUrls);
      
      setResults(prev => {
        const newResults = [...prev];
        retryResults.forEach((result, index) => {
          const url = failedUrls[index];
          const resultIndex = newResults.findIndex(r => r.url === url);
          
          if (resultIndex !== -1) {
            if (result.status === 'fulfilled') {
              newResults[resultIndex] = result.value;
            } else {
              newResults[resultIndex] = {
                url,
                status: 'error',
                error: new Error('Retry failed'),
              };
            }
          }
        });
        return newResults;
      });
    } catch (error) {
      console.error('Error in retry:', error);
    } finally {
      setIsLoading(false);
    }
  }, [results, preloadBatch]);

  return {
    results,
    isLoading,
    progress,
    loadedCount: getLoadedCount(),
    errorCount: getErrorCount(),
    failedImages: getFailedImages(),
    totalImages: urls.length,
    getImageStatus,
    manualPreload,
    retryFailedImages,
  };
};

// Hook específico para productos
export const useProductImagePreloader = (products: any[]) => {
  const imageUrls = products
    .filter(p => p.img_portada)
    .map(p => p.img_portada);

  return useImagePreloader(imageUrls, {
    priority: true,
    batchSize: 3,
    delayBetweenBatches: 200,
  });
};

// Hook para precargar imágenes de una categoría
export const useCategoryImagePreloader = (categoryId: string | null) => {
  const [productImages, setProductImages] = useState<string[]>([]);
  const hasInitializedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!categoryId || hasInitializedRef.current === categoryId) return;

    hasInitializedRef.current = categoryId;

    // Aquí podrías hacer fetch de los productos de la categoría
    // y extraer las URLs de las imágenes
    const fetchCategoryImages = async () => {
      try {
        const response = await fetch(`/api/productscategory?categoria=${categoryId}`);
        const data = await response.json();
        
        if (data.productos) {
          const images = data.productos
            .filter((p: any) => p.img_portada)
            .map((p: any) => p.img_portada);
          setProductImages(images);
        }
      } catch (error) {
        console.error('Error fetching category images:', error);
      }
    };

    fetchCategoryImages();
  }, [categoryId]);

  return useImagePreloader(productImages, {
    priority: true,
    batchSize: 4,
    delayBetweenBatches: 150,
  });
}; 