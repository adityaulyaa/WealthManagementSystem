import axiosClient from '../api/axiosClient'

/**
 * Service class for handling all authentication-related API communication.
 * This class acts as a single entry point for authentication requests to the backend.
 *
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 6.4
 */
class AuthService {
  /**
   * Placeholder method for user login.
   *
   * @param email The user's email.
   * @param password The user's password.
   * @returns A promise that resolves when login is complete.
   * @throws Error indicating that the method is not yet implemented.
   */
  public async login(email: string, password: string): Promise<void> {
    // Parameters are intentionally unused for now.
    void email
    void password

    // This method will be implemented in a later batch to make the actual API call.
    throw new Error('AuthService.login() not implemented yet')
  }

  /**
   * Placeholder method for user registration.
   *
   * @returns A promise that resolves when registration is complete.
   * @throws Error indicating that the method is not yet implemented.
   */
  public async register(): Promise<void> {
    // This method will be implemented in a later batch to make the actual API call.
    throw new Error('AuthService.register() not implemented yet')
  }

  /**
   * Placeholder method for user logout.
   *
   * @remarks
   * For JWT authentication, logout typically involves clearing the token client-side.
   * There is usually no backend communication required for stateless JWT logout.
   */
  public logout(): void {
    // Logout logic (clearing client-side token) will be handled by AuthContext.
    // No backend API call is typically needed for JWT-based logout.
  }
}

/**
 * Exports a singleton instance of AuthService.
 * This ensures that all components use the same service instance.
 */
export default new AuthService()
