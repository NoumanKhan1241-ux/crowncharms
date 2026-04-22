import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import { useEffect, useState } from 'react'

export function AdminRoute({ children }) {
  const { isAuthenticated, verify } = useAdminAuth()
  const location = useLocation()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let mounted = true
    verify().finally(() => {
      if (mounted) setChecking(false)
    })
    return () => {
      mounted = false
    }
  }, [verify])

  if (checking) {
    return (
      <main className="min-h-screen bg-ivory dark:bg-charcoal">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center text-charcoal/70 dark:text-ivory/70">Checking admin session...</div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return children
}

