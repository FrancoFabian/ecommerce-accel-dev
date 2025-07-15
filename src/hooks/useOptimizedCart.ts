'use client';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useCallback, useMemo, useState } from 'react';
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  decrement,
  addOrIncrement,
  remove,
} from '@/store/features/cartSlice';
import type { CartItem } from '@/store/features/cartSlice';

export const useOptimizedCart = () => {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const cartCount = useAppSelector(selectCartCount);
  const dispatch = useAppDispatch();
  
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());

  // Memoizar estadísticas del carrito
  const cartStats = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const uniqueItems = items.length;
    const averagePrice = items.length > 0 ? total / totalItems : 0;
    
    return {
      totalItems,
      uniqueItems,
      averagePrice,
      isEmpty: items.length === 0,
    };
  }, [items, total]);

  // Handlers optimizados con useCallback
  const handleRemove = useCallback((productId: string) => {
    setRemovingItems(prev => new Set(prev).add(productId));
    
    setTimeout(() => {
      dispatch(remove(productId));
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }, 150);
  }, [dispatch]);

  const handleIncrement = useCallback((item: CartItem) => {
    setLoadingItems(prev => new Set(prev).add(item.producto_id));
    
    setTimeout(() => {
      dispatch(addOrIncrement(item));
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.producto_id);
        return newSet;
      });
    }, 100);
  }, [dispatch]);

  const handleDecrement = useCallback((productId: string) => {
    setLoadingItems(prev => new Set(prev).add(productId));
    
    setTimeout(() => {
      dispatch(decrement(productId));
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }, 100);
  }, [dispatch]);

  const clearCart = useCallback(() => {
    // Implementar lógica de limpieza si es necesario
    items.forEach(item => {
      dispatch(remove(item.producto_id));
    });
  }, [dispatch, items]);

  // Función para generar mensaje de WhatsApp
  const generateWhatsAppMessage = useCallback(() => {
    const message = `Hola! Me gustaría cotizar los siguientes productos:\n\n${items.map(item => 
      `- ${item.titulo} (Cantidad: ${item.quantity}) - $${item.precios.precio_1}`
    ).join('\n')}\n\nTotal: $${total.toFixed(2)}`;
    
    return message;
  }, [items, total]);

  // Función para validar cantidad máxima
  const validateQuantity = useCallback((productId: string, quantity: number, maxQuantity: number = 50) => {
    return quantity <= maxQuantity;
  }, []);

  // Función para obtener el estado de un item específico
  const getItemState = useCallback((productId: string) => {
    return {
      isLoading: loadingItems.has(productId),
      isRemoving: removingItems.has(productId),
      canIncrement: validateQuantity(productId, 
        items.find(item => item.producto_id === productId)?.quantity || 0
      ),
      canDecrement: (items.find(item => item.producto_id === productId)?.quantity || 0) > 1,
    };
  }, [loadingItems, removingItems, items, validateQuantity]);

  return {
    // Datos del carrito
    items,
    total,
    cartCount,
    cartStats,
    
    // Estados de carga
    loadingItems,
    removingItems,
    
    // Handlers
    handleRemove,
    handleIncrement,
    handleDecrement,
    clearCart,
    
    // Utilidades
    generateWhatsAppMessage,
    validateQuantity,
    getItemState,
  };
}; 