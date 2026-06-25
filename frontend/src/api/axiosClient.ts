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
 * Adds a request interceptor to the axiosClient instance.
 *
 * Why use request interceptors?
 * Request interceptors allow you to modify outgoing requests before they are sent to the server.
 * This is ideal for tasks like:
 * - Attaching authentication tokens
 * - Adding common headers
 * - Logging request details
 * - Transforming request data
 */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    /**
     * Automatically attaches the JWT token to the Authorization header of every outgoing request.
     * This is crucial for accessing protected API endpoints that require authentication.
     *
     * How Authorization is added:
     * 1. The token is retrieved from localStorage, where it is stored after a successful login.
     * 2. If a token exists, the 'Authorization' header is set with the format 'Bearer <token>'.
     *    The 'Bearer' scheme is a standard for sending OAuth 2.0 access tokens.
     */
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    /**
     * Why requests without a token are still allowed:
     * Not all API endpoints require authentication (e.g., login, registration).
     * If no token is found in localStorage, the request proceeds without the Authorization header.
     * The backend is responsible for enforcing authentication rules for specific endpoints.
     */
    return config
  },
  (error: any): Promise<any> => {
    // Do something with request error
    return Promise.reject(error)
  },
)

export default axiosClient
