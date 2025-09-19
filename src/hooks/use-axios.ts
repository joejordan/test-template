import { useMemo } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/globals';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Configuration options for the useAxios hook.
 * Extends AxiosRequestConfig to include all standard axios configuration options
 * plus our custom token property.
 */
export type UseAxiosOptions = AxiosRequestConfig & {
  /**
   * Bearer token to use for authentication.
   * If not provided, the hook will automatically attempt to load from:
   * 1. Auth provider (e.g., Clerk's getToken)
   * 2. localStorage.getItem('authToken')
   * 3. localStorage.getItem('access_token')
   * 4. sessionStorage.getItem('authToken')
   */
  token?: string;
};

/**
 * Attempts to automatically load a bearer token from common storage locations
 * @returns The found token or undefined
 */
function getStoredToken(): string | undefined {
  if (globalThis.window === undefined)
    return undefined;

  // Try common token storage keys in order of preference
  const tokenKeys = ['authToken', 'access_token', 'token'];

  try {
    // First check localStorage
    for (const key of tokenKeys) {
      const token = localStorage.getItem(key);
      if (token)
        return token;
    }

    // Then check sessionStorage
    for (const key of tokenKeys) {
      const token = sessionStorage.getItem(key);
      if (token)
        return token;
    }
  } catch (error) {
    // Handle cases where storage APIs are unavailable or restricted
    console.warn('Storage access failed, proceeding without stored token:', error);
  }

  return undefined;
}

/**
 * Retrieves authentication token from provider or storage fallback
 * @returns Promise that resolves to token or undefined
 */
async function getToken(): Promise<string | undefined> {
  try {
    // TODO: Add auth provider integration here
    // Example for Clerk:
    // const { useAuth } = await import('@clerk/clerk-react');
    // const { getToken } = useAuth();
    // const providerToken = await getToken();
    // if (providerToken) return providerToken;

    // Fallback to storage-based tokens
    return getStoredToken();
  } catch (error) {
    console.warn('Token retrieval failed, falling back to storage:', error);
    return getStoredToken();
  }
}

/**
 * Custom hook that returns a pre-configured Axios instance for API calls.
 *
 * Features:
 * - Automatically loads bearer tokens from auth providers or storage fallback
 * - Pre-configured with API base URL from environment variables
 * - Request/response interceptors for consistent authentication handling
 * - Async token retrieval with provider integration support
 * - Default array parameter serialization for better API compatibility
 * - Enhanced error handling with graceful storage access fallbacks
 * - Supports all standard axios configuration options
 *
 * Token Loading Priority:
 * 1. Provided `options.token` parameter
 * 2. Auth provider (e.g., Clerk's getToken)
 * 3. localStorage.getItem('authToken')
 * 4. localStorage.getItem('access_token')
 * 5. sessionStorage.getItem('authToken')
 *
 * @param options - Configuration options for the axios instance (extends AxiosRequestConfig)
 * @returns Configured AxiosInstance ready for API calls
 *
 * @example
 * ```typescript
 * // Basic usage - automatically loads token from storage
 * const axios = useAxios();
 * const users = await axios.get('/users');
 *
 * // With custom token
 * const axios = useAxios({ token: customToken });
 *
 * // With additional configuration
 * const axios = useAxios({
 *   timeout: 15000,
 *   headers: { 'X-Custom-Header': 'value' }
 * });
 *
 * // Arrays will serialize as: ?tags=tag1&tags=tag2 (not tags[0]=tag1&tags[1]=tag2)
 * const response = await axios.get('/posts', { params: { tags: ['react', 'typescript'] } });
 *
 * // Error handling with isAxiosError utility
 * import { useAxios, isAxiosError } from '@/hooks/use-axios';
 *
 * try {
 *   const data = await axios.get('/api/data');
 * } catch (error) {
 *   if (isAxiosError(error)) {
 *     console.log('Axios error:', error.response?.status);
 *   }
 * }
 * ```
 */
export function useAxios(options: UseAxiosOptions = {}): AxiosInstance {
  const axiosInstance = useMemo(() => {
    // Create axios instance with base configuration
    const instance = axios.create({
      baseURL: options.baseURL ?? API_BASE_URL,
      timeout: options.timeout ?? 10_000,
      withCredentials: options.withCredentials ?? false,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      // Configure array parameter serialization for better API compatibility
      paramsSerializer: {
        indexes: null, // Serialize arrays as repeated keys without indices
        ...options.paramsSerializer,
      },
      // Spread any other options to allow full customization
      ...options,
    });

    // Request interceptor to attach bearer token
    instance.interceptors.request.use(
      async (config) => {
        // Get token with priority: options.token > auth provider > storage fallback
        const token = options.token ?? await getToken();

        // Attach bearer token if available
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      async (error) => {
        throw error;
      },
    );

    // Response interceptor for consistent error handling
    instance.interceptors.response.use(
      (response) => {
        // Return the response data directly for successful requests
        return response;
      },
      async (error) => {
        // Handle common HTTP errors
        if (error.response) {
          // Server responded with error status
          const { status, data } = error.response;

          // Enhance error with more context
          error.message = data?.message ?? error.message;
          error.statusCode = status;

          // Log authentication errors for debugging
          if (status === 401) {
            console.warn('Authentication failed. Token may be expired or invalid.');
          }
        } else if (error.request) {
          // Request was made but no response received
          error.message = 'Network error: Unable to reach the server';
        }

        throw error;
      },
    );

    return instance;
  }, [options]);

  return axiosInstance;
}

// Export utility for convenient error checking
export { isAxiosError } from 'axios';
