import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

/**
 * Reusable Axios instance for API communication.
 *
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 6.2
 */

// --- Configuration Constants ---

/**
 * Base URL for the backend API.
 * All requests made with this client will be prefixed with this URL.
 */
const API_BASE_URL = 'http://localhost:8080/api'

/**
 * Default timeout for API requests in milliseconds.
 * Prevents requests from hanging indefinitely.
 */
const TIMEOUT = 10000

// --- Axios Client Initialization ---

/**
 * Creates a configured Axios instance.
 *
 * Why use axios.create()?
 * - Centralized Configuration: Avoids repeating base URL, headers, and timeouts in every API call.
 * - Reusability: Provides a single, consistent client for all services.
 * - Interceptors: Allows easy addition of request/response interceptors for authentication, logging, and error handling.
 */
const axiosClient = axios.create({
  /**
   * Base URL for all API requests.
   * Example: A request to '/users' will become 'http://localhost:8080/api/users'.
   */
  baseURL: API_BASE_URL,

  /**
   * Request timeout in milliseconds.
   * If a request takes longer than 10 seconds, it will be aborted.
   */
  timeout: TIMEOUT,

  /**
   * Default headers for all requests.
   */
  headers: {
    /**
     * 'Accept': Informs the server that the client expects JSON responses.
     */
    Accept: 'application/json',
    /**
     * 'Content-Type': Informs the server that the request body is in JSON format.
     */
    'Content-Type': 'application/json',
  },
})

// --- Request Interceptor ---

/**
 * Attaches a request interceptor to the axiosClient instance.
 *
 * Why request interceptors?
 * Interceptors automatically modify outgoing requests. This one
 * ensures that every API request includes the JWT for authentication.
 */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    /**
     * Injects the JWT into the Authorization header for protected endpoints.
     * The token is retrieved from localStorage.
     */
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    /**
     * Allows requests without a token to proceed.
     * This is necessary for public endpoints like login or registration.
     */
    return config
  },
  (error: unknown): Promise<never> => {
    // Handle request error (e.g., network issues)
    return Promise.reject(error)
  },
)

// --- Response Interceptor ---

/**
 * Attaches a response interceptor to the axiosClient instance.
 *
 * Why response interceptors?
 * Interceptors allow centralized handling of all API responses.
 * This interceptor standardizes error handling by detecting
 * common HTTP status codes and logging them for improved
 * debugging before rejecting the promise.
 */
axiosClient.interceptors.response.use(
  // ----- Success Response -----
  (response) => {
    // Successful requests are returned unchanged.
    return response
  },
  // ----- Error Response -----
  (error: unknown) => {
    // Handle Axios-specific errors
    if (axios.isAxiosError(error)) {
      const status = error.response?.status

      // Reserved for future centralized error handling.
      switch (status) {
        case 400:
          // Reserved for validation error handling.
          break
        case 401:
          // Reserved for authentication handling.
          break
        case 403:
          // Reserved for authorization handling.
          break
        case 404:
          // Reserved for resource-not-found handling.
          break
        case 500:
          // Reserved for server error handling.
          break
        default:
          // Reserved for other HTTP errors.
          break
      }
    } else {
      // Network error: no response received (e.g., backend offline, timeout).
    }

    return Promise.reject(error)
  },
)

export default axiosClient

