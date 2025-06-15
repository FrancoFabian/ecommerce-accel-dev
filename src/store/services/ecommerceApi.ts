// src/store/services/ecommerceApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ProductResponse } from '@/types/product';
import type { Category } from '@/types/category';

export const ecommerceApi = createApi({
  reducerPath: 'ecommerceApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Category', 'Product'],
  endpoints: (builder) => ({
    getSubcategories: builder.query<Category[], string>({
      query: (id) => `/subcategories?categoryId=${id}`,
      transformResponse: (d: { subcategorias: Category[] }) => d.subcategorias ?? [],
      providesTags: (_r, _e, id) => [{ type: 'Category', id }],
    }),
    getProducts: builder.query<ProductResponse, string>({
      query: (id) => `/productscategory?categoria=${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const { useGetSubcategoriesQuery, useGetProductsQuery } = ecommerceApi;
