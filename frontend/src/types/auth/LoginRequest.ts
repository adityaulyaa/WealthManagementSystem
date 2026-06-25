/**
 * Request payload for the login endpoint.
 *
 * @since Phase 6.4
 */
export interface LoginRequest {
  /** The user's email address used for authentication. */
  email: string

  /** The user's plain-text password. */
  password: string
}
