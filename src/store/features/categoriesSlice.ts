// src/store/features/categoriesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Category } from '@/types/category';
import type { RootState } from '@/store';

interface CategoriesState {
  entities: Record<string, Category[]>;
  loading: boolean;
}
const initialState: CategoriesState = { entities: {}, loading: false };

export const fetchSubcategories = createAsyncThunk<
  { categoryId: string; subcategories: Category[] },
  string
>('categories/fetchSubcategories', async (categoryId) => {
  const res = await fetch(`/api/subcategories?categoryId=${categoryId}`, { cache: 'no-store' });
  const data = await res.json();
   // ⬇️⬇️ Mapeamos para asegurar que description e icon existan
  const mapped: Category[] = (data.subcategorias ?? []).map(
    (s: { id: string; nombre: string }) => ({
      id: s.id,
      title: s.nombre,
      description: '',  // siempre al menos cadena vacía
      icon: undefined,  // por ahora sin icono
    }),
  );
  return { categoryId, subcategories: mapped };
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (s) => { s.loading = true; })
      .addCase(fetchSubcategories.fulfilled, (s, a) => {
        s.entities[a.payload.categoryId] = a.payload.subcategories;
        s.loading = false;
      })
      .addCase(fetchSubcategories.rejected, (s) => { s.loading = false; });
  },
});

export default categoriesSlice.reducer;
export const selectSubcategories =
  (id: string) => (state: RootState) => state.categories.entities[id] ?? [];
