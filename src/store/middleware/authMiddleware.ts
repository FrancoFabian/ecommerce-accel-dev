import { createListenerMiddleware } from '@reduxjs/toolkit';
import { verifyAuth } from '../features/authSlice';

export const authListenerMiddleware = createListenerMiddleware();

// Interceptar acciones que requieren verificación
authListenerMiddleware.startListening({
  actionCreator: verifyAuth.fulfilled,
  effect: async (action, listenerApi) => {
    const { expiresAt } = action.payload;
    
    // Si tenemos expiración, programar próxima verificación
    if (expiresAt) {
      const timeToExpiry = expiresAt - Date.now();
      const checkTime = Math.max(timeToExpiry - (5 * 60 * 1000), 60 * 1000);
      
      setTimeout(() => {
        listenerApi.dispatch(verifyAuth({ force: true }));
      }, checkTime);
    }
  }
});

// Interceptar logout para limpiar verificaciones programadas
authListenerMiddleware.startListening({
  actionCreator: verifyAuth.rejected,
  effect: async (action, listenerApi) => {
    // Si falla la verificación, intentar de nuevo en 30 segundos
    setTimeout(() => {
      listenerApi.dispatch(verifyAuth({ force: true }));
    }, 30000);
  }
}); 