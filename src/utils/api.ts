/**
 * Utilidad para manejar peticiones API
 */

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiOptions<T> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: T;
  credentials?: RequestCredentials;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Función para realizar peticiones HTTP a la API
 */
export async function fetchApi<TData, TResponse>(
  endpoint: string,
  options: ApiOptions<TData> = {}
): Promise<ApiResponse<TResponse>> {
  const {
    method = 'GET',
    headers = {},
    body,
    credentials = 'include',
  } = options;

  try {
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials,
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(endpoint, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || 'Error en la petición',
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error('Error en fetchApi:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Funciones helper para los diferentes métodos HTTP
 */
export const api = {
  get: <TResponse>(endpoint: string, options: Omit<ApiOptions<never>, 'method' | 'body'> = {}) =>
    fetchApi<never, TResponse>(endpoint, { ...options, method: 'GET' }),

  post: <TData, TResponse>(endpoint: string, data: TData, options: Omit<ApiOptions<TData>, 'method' | 'body'> = {}) =>
    fetchApi<TData, TResponse>(endpoint, { ...options, method: 'POST', body: data }),

  put: <TData, TResponse>(endpoint: string, data: TData, options: Omit<ApiOptions<TData>, 'method' | 'body'> = {}) =>
    fetchApi<TData, TResponse>(endpoint, { ...options, method: 'PUT', body: data }),

  patch: <TData, TResponse>(endpoint: string, data: TData, options: Omit<ApiOptions<TData>, 'method' | 'body'> = {}) =>
    fetchApi<TData, TResponse>(endpoint, { ...options, method: 'PATCH', body: data }),

  delete: <TResponse>(endpoint: string, options: Omit<ApiOptions<never>, 'method' | 'body'> = {}) =>
    fetchApi<never, TResponse>(endpoint, { ...options, method: 'DELETE' }),
}; 