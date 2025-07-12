// Función para mostrar notificaciones de éxito
export const showSuccess = (message: string): void => {
  console.log(`✅ ${message}`);
  // Aquí podrías integrar un sistema de notificaciones como toast o alert
  // Ejemplo: toast.success(message);
};

// Función para mostrar errores
export const showError = (message: string): void => {
  console.error(`❌ ${message}`);
  // Aquí podrías integrar un sistema de notificaciones como toast o alert
  // Ejemplo: toast.error(message);
};

// Función para manejar errores de API
export const handleApiError = (error: unknown, defaultMessage: string): void => {
  if (error instanceof Error) {
    showError(error.message);
  } else {
    showError(defaultMessage);
  }
  console.error('Error detallado:', error);
}; 