import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import LoginPage from '../pages/LoginPage'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
