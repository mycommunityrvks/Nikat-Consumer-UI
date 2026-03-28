import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Environment variables (in a real app, these would come from .env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle 401 errors (retry once)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // In a real app, you would refresh the token here
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

// Generic API call wrapper with retry logic
export async function apiCall<T>(
  config: AxiosRequestConfig,
  retries = 2
): Promise<T> {
  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    if (retries > 0 && axios.isAxiosError(error)) {
      // Retry on network errors or 5xx errors
      if (!error.response || (error.response.status >= 500 && error.response.status < 600)) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return apiCall<T>(config, retries - 1);
      }
    }
    throw error;
  }
}
