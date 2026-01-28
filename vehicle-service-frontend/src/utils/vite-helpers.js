// Vite-specific helper functions

// Get environment variable with fallback
export const getEnv = (key, defaultValue = '') => {
  return import.meta.env[key] || defaultValue;
};

// Check if we're in development mode
export const isDevelopment = () => {
  return import.meta.env.DEV;
};

// Check if we're in production mode
export const isProduction = () => {
  return import.meta.env.PROD;
};

// Get API URL based on environment
export const getApiUrl = (endpoint = '') => {
  const baseUrl = getEnv('VITE_API_BASE_URL', '/api');
  return `${baseUrl}${endpoint}`;
};

// Get payment service URL
export const getPaymentServiceUrl = (endpoint = '') => {
  const baseUrl = getEnv('VITE_PAYMENT_SERVICE_URL', '/payment-service');
  return `${baseUrl}${endpoint}`;
};

// Image optimization helper for Vite
export const getImageUrl = (path) => {
  if (path.startsWith('http')) return path;
  return new URL(path, import.meta.url).href;
};

// Dynamic import helper for code splitting
export const lazyImport = (path) => {
  return import(/* @vite-ignore */ path);
};