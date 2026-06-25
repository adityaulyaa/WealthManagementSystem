import { createContext, useContext, useEffect, useState } from 'react'
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
  token: string | null
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
  // Authentication state
  const [user] = useState<null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Derived state: isAuthenticated is true if a token exists
  const isAuthenticated = token !== null

  // Initialize authentication state from localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        setToken(storedToken)
      }
    } finally {
      // Finished initial loading check, even if localStorage fails
      setLoading(false)
    }
  }, []) // Effect runs only once on initial mount

  const value: AuthContextType = {
    user,
    token,
    loading,
    isAuthenticated,
  }

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
