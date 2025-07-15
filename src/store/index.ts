// src/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import categoriesReducer from '@/store/features/categoriesSlice';
import productsReducer from '@/store/features/productsSlice';
import cartReducer from '@/store/features/cartSlice';
import authReducer from '@/store/features/authSlice';
import { ecommerceApi } from '@/store/services/ecommerceApi';
import { syscomApi } from '@/store/services/syscomApi';
import { authListenerMiddleware } from './middleware/authMiddleware';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
  [ecommerceApi.reducerPath]: ecommerceApi.reducer,
  [syscomApi.reducerPath]: syscomApi.reducer,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (gDM) =>
      gDM({ 
        serializableCheck: {
          ignoredActions: ['auth/verify/pending', 'auth/verify/fulfilled', 'auth/verify/rejected']
        }
      }).concat(ecommerceApi.middleware, syscomApi.middleware, authListenerMiddleware.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

  setupListeners(store.dispatch);
  return store;
};

// Tipos útiles
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
