// src/store/features/cartSlice.ts
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { ProductCardProps } from '@/types/product';
import type { RootState } from '@/store';

/* ── tipo que guardará el carrito ─────────────────────────────────────── */
export interface CartItem extends ProductCardProps {
  quantity: number;
}

/* ── adapter para normalizar ─────────────────────────────────────────── */
const cartAdapter = createEntityAdapter<CartItem, string>({
  selectId: (i) => i.producto_id,
});
const initialState = cartAdapter.getInitialState();

/* ── función helper para parsear precios ─────────────────────────────── */
const parsePrice = (price: any): number => {
  if (typeof price === 'number' && !isNaN(price)) {
    return price;
  }
  if (typeof price === 'string') {
    const parsed = parseFloat(price);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

/* ── slice ───────────────────────────────────────────────────────────── */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOrIncrement(state, action: PayloadAction<ProductCardProps>) {
      const id = action.payload.producto_id;
      const existing = state.entities[id];
      if (existing) {
        existing.quantity += 1;
      } else {
        cartAdapter.addOne(state, { ...action.payload, quantity: 1 });
      }
    },
    decrement(state, action: PayloadAction<string>) {
      const item = state.entities[action.payload];
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) cartAdapter.removeOne(state, action.payload);
    },
    remove(state, action: PayloadAction<string>) {
      cartAdapter.removeOne(state, action.payload);
    },
    clear: () => initialState,
  },
});

export const { addOrIncrement, decrement, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;

/* ── selectores reutilizables ────────────────────────────────────────── */
export const {
  selectAll: selectCartItems,
  selectTotal: selectCartEntities,
} = cartAdapter.getSelectors((s: RootState) => s.cart);

export const selectCartCount = (s: RootState) =>
  Object.values(s.cart.entities).reduce(
    (acc, item) => acc + (item?.quantity ?? 0),
    0,
  );

export const selectCartTotal = (s: RootState) =>
  Object.values(s.cart.entities).reduce(
    (acc, item) => {
      if (!item || !item.precios) return acc;
      const price = parsePrice(item.precios.precio_1);
      return acc + (item.quantity * price);
    },
    0,
  );

/* ── selector para obtener el total formateado ──────────────────────── */
export const selectCartTotalFormatted = (s: RootState) => {
  const total = selectCartTotal(s);
  return total.toFixed(2);
};

/* ── selector para obtener información detallada del carrito ─────────── */
export const selectCartSummary = (s: RootState) => {
  const items = Object.values(s.cart.entities);
  const count = items.reduce((acc, item) => acc + (item?.quantity ?? 0), 0);
  const total = items.reduce((acc, item) => {
    if (!item || !item.precios) return acc;
    const price = parsePrice(item.precios.precio_1);
    return acc + (item.quantity * price);
  }, 0);
  
  return {
    count,
    total,
    totalFormatted: total.toFixed(2),
    isEmpty: count === 0,
    items: items.filter(Boolean),
  };
};
