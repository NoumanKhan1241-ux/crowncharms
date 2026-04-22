import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { apiAdmin } from '../lib/api'
import { getAdminToken, setAdminToken } from '../lib/api'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getAdminToken()))

  const login = useCallback(async (password) => {
    try {
      const response = await apiAdmin('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      })
      if (response?.token) {
        setAdminToken(response.token)
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch {
      return false
    }
  }, [])

  const verify = useCallback(async () => {
    try {
      await apiAdmin('/api/admin/me')
      setIsAuthenticated(true)
      return true
    } catch {
      setIsAuthenticated(false)
      setAdminToken(null)
      return false
    }
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setAdminToken(null)
  }, [])

  const value = useMemo(() => ({ isAuthenticated, login, logout, verify }), [isAuthenticated])

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}

