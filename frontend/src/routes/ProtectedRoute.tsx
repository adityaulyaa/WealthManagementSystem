import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * A component that protects routes by checking user authentication status.
 *
 * @remarks
 * If the authentication state is still loading, it renders nothing.
 * If the user is not authenticated, it redirects to the login page.
 * If the user is authenticated, it renders the child routes via Outlet.
 *
 * @returns A React element or null during loading.
 */
function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
