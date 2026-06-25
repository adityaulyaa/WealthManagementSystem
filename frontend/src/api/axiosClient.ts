import axios from 'axios'

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

export default axiosClient
