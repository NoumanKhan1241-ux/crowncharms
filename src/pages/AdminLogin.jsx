import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'
import { Button } from '../components/Button'

export function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/admin/dashboard'

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const ok = await login(password)
    setLoading(false)
    if (!ok) {
      setError('Incorrect password.')
      return
    }
    setError('')
    navigate(redirectTo, { replace: true })
  }

  return (
    <main className="min-h-screen bg-ivory dark:bg-charcoal">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 md:px-6">
        <section className="w-full rounded-xl border border-charcoal/10 bg-ivory-light p-6 shadow-sm dark:border-ivory/10 dark:bg-charcoal-dark">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-[#635BFF]/10 p-2 text-[#635BFF]">
              <LockKeyhole size={20} />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-semibold text-charcoal dark:text-ivory">Admin Login</h1>
              <p className="text-sm text-charcoal/70 dark:text-ivory/70">Secure seller dashboard access</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="mb-1 block text-sm font-medium text-charcoal dark:text-ivory">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border border-charcoal/20 bg-ivory px-3 py-2 text-charcoal focus:border-[#635BFF] focus:outline-none dark:border-ivory/20 dark:bg-charcoal dark:text-ivory"
              />
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Login to Dashboard'}
            </Button>
          </form>
        </section>
      </div>
    </main>
  )
}

