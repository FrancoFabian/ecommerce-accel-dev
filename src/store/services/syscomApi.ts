// src/store/services/syscomApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SyscomProducto } from '@/types/product';

// Base query que usa nuestro endpoint interno
const syscomBaseQuery = fetchBaseQuery({
  baseUrl: '/api/syscom',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const syscomApi = createApi({
  reducerPath: 'syscomApi',
  baseQuery: syscomBaseQuery,
  tagTypes: ['SyscomProduct'],
  endpoints: (builder) => ({
    // Obtener producto por ID de Syscom usando nuestro endpoint interno
    getSyscomProductById: builder.query<SyscomProducto, string | number>({
      query: (id) => `/${id}`,
      transformResponse: (response: SyscomProducto) => {
        // La transformación ya se hace en el servidor
        return response;
      },
      providesTags: (result, error, id) => [{ type: 'SyscomProduct', id }],
    }),
  }),
});

export const { useGetSyscomProductByIdQuery } = syscomApi; 