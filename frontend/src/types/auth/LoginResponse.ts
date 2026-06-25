/**
 * Response payload returned after successful login.
 *
 * @since Phase 6.4
 */
export interface LoginResponse {
  /**
   * JWT access token returned after successful authentication.
   * This token should be stored and included in subsequent API requests.
   */
  token: string

  /**
   * Authentication scheme.
   * Example: "Bearer"
   */
  tokenType: string

  /**
   * Authenticated user's unique identifier.
   */
  userId: number

  /**
   * Authenticated user's email address.
   */
  email: string
}
