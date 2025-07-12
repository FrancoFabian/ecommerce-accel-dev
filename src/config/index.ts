// Configuración de la aplicación

// API URLs
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
export const API_AUTH_URL = `${API_BASE_URL}/auth`;

// Configuración general
export const APP_ENV = process.env.NEXT_PUBLIC_ENV || 'development';
export const IS_DEV = APP_ENV === 'development';

// Configuración de API
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    contact: '/api/auth/contact',
    verify: '/api/auth/verify',
    password: '/api/auth/password',
    profile: '/api/auth/profile',
    address: '/api/auth/address',
    refresh: '/api/auth/refresh',
    completeRegistration: '/api/auth/complete-registration'
  }
}; 