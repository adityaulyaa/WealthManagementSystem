import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

/**
 * Authentication state and actions available through the context.
 *
 * @since Phase 6.3
 */
export interface AuthContextType {
  /** Authenticated user object, or null when not authenticated. */
  user: null
  /** JWT token string, or null when not authenticated. */
  token: null
  /** Whether the user is currently authenticated. */
  isAuthenticated: boolean
  /** Whether authentication state is still being determined. */
  loading: boolean
}

/**
 * Props for the AuthProvider component.
 */
export interface AuthProviderProps {
  /** Child components that will consume the authentication context. */
  children: ReactNode
}

// --- Context Definition ---

/**
 * Default context value representing an unauthenticated user.
 */
const DEFAULT_AUTH_CONTEXT: AuthContextType = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// --- Provider Component ---

/**
 * Provides authentication state to its children.
 *
 * @remarks
 * The provider wraps child components to give them access to
 * authentication information via the useAuth() hook.
 */
function AuthProvider({ children }: AuthProviderProps) {
  const value: AuthContextType = DEFAULT_AUTH_CONTEXT

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }

// --- Custom Hook ---

/**
 * Returns the current authentication context.
 *
 * @remarks
 * Must be used within an AuthProvider. Throws an error otherwise.
 */
function useAuth(): AuthContextType {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { useAuth }
