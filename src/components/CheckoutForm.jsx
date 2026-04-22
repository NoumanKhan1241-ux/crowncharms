/**
 * Stripe-ready checkout form. Uses PaymentElement when Stripe key is set.
 * Shows a mock message when key is placeholder (demo mode).
 */
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { Button } from './Button'

export function CheckoutForm({ amount }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const isDemo = !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY === 'pk_test_placeholder'

  if (isDemo) {
    return (
      <div className="mt-4 rounded border border-champagne/40 bg-champagne/10 p-4 text-sm text-charcoal dark:text-ivory">
        <p className="font-medium">Demo mode</p>
        <p className="mt-1 opacity-90">Add your Stripe publishable key to enable live payment elements. Total: £{(amount / 100).toFixed(2)}</p>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/`,
        receipt_email: undefined,
      },
    })
    setLoading(false)
    if (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {/* When Stripe key is set, inject PaymentElement via Stripe.js */}
      <div id="payment-element" className="min-h-[120px]" />
      <Button type="submit" variant="primary" className="mt-4 w-full" disabled={!stripe || loading}>
        {loading ? 'Processing…' : 'Pay now'}
      </Button>
    </form>
  )
}
