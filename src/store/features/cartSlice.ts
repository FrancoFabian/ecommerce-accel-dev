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
    (acc, item) => acc + (item ? item.quantity * item.precios.precio_lista : 0),
    0,
  );
