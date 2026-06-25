import axiosClient from '../api/axiosClient'
import type { LoginRequest } from '../types/auth/LoginRequest'
import type { LoginResponse } from '../types/auth/LoginResponse'

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
   * Authenticates a user with the backend.
   *
   * @param email The user's email.
   * @param password The user's password.
   * @returns A promise that resolves with the LoginResponse DTO.
   */
  public async login(
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    const request: LoginRequest = {
      email,
      password,
    }

    const response = await axiosClient.post<LoginResponse>(
      '/auth/login',
      request,
    )

    return response.data
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
