// src/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import categoriesReducer from '@/store/features/categoriesSlice';
import productsReducer from '@/store/features/productsSlice';
import cartReducer from '@/store/features/cartSlice';
import { ecommerceApi } from '@/store/services/ecommerceApi';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
   cart: cartReducer,  
  [ecommerceApi.reducerPath]: ecommerceApi.reducer, // <-- opcional
});

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (gDM) =>
      gDM({ serializableCheck: false }).concat(ecommerceApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

  setupListeners(store.dispatch);
  return store;
};

// Tipos útiles
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
