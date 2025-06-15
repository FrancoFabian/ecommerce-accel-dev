// src/store/features/productsSlice.ts
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import type { ProductCardProps } from '@/types/product';
import type { RootState } from '@/store';

export const productsAdapter = createEntityAdapter<ProductCardProps,string>({
  selectId: (p) => p.producto_id,
});

export const fetchProducts = createAsyncThunk<
  { categoryId: string; productos: ProductCardProps[] },
  string
>('products/fetchProducts', async (categoryId) => {
  const res = await fetch(`/api/productscategory?categoria=${categoryId}`, { cache: 'no-store' });
  const data = await res.json();
  return { categoryId, productos: data.productos ?? [] };
});

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState({
     currentCategory: null as string | null,
      loading: false,
    }),
  reducers: {
    clearProducts: (state) => {
      productsAdapter.removeAll(state);
      state.currentCategory = null;
      state.loading = true;
    },
  },
  extraReducers: (builder) =>
     builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategory = action.payload.categoryId;
        productsAdapter.setAll(state, action.payload.productos);
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      }),
});

export const { clearProducts } = productsSlice.actions;
export const {
  selectAll: selectProducts,
  selectById: selectProductById,
} = productsAdapter.getSelectors((state: RootState) => state.products);
export const selectProductsLoading = (state: RootState) => state.products.loading;
export default productsSlice.reducer;
