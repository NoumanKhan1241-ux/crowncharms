import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Truck, WalletCards } from 'lucide-react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrderContext'

export function Checkout() {
  const navigate = useNavigate()
  const { items, cartTotal, clearCart } = useCart()
  const { createOrder } = useOrders()
  const [shipping, setShipping] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
  })

  if (items.length === 0) {
    navigate('/shop')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createOrder({
      items,
      shipping,
      total: cartTotal,
      paymentMethod: 'Cash on Delivery',
    })
    alert('Thank you! Your order has been placed with Cash on Delivery.')
    clearCart()
    navigate('/')
  }

  return (
    <main className="min-h-screen bg-ivory dark:bg-charcoal">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <h1 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <section className="rounded-lg border border-charcoal/10 bg-ivory-light p-6 dark:border-ivory/10 dark:bg-charcoal-dark">
              <h2 className="font-serif text-xl font-semibold text-charcoal dark:text-ivory">Shipping details</h2>
              <div className="mt-4 space-y-4">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={shipping.email}
                  onChange={(e) => setShipping((s) => ({ ...s, email: e.target.value }))}
                />
                <Input
                  label="Full name"
                  name="name"
                  required
                  placeholder="Full name"
                  value={shipping.name}
                  onChange={(e) => setShipping((s) => ({ ...s, name: e.target.value }))}
                />
                <Input
                  label="Address"
                  name="address"
                  required
                  placeholder="Street address"
                  value={shipping.address}
                  onChange={(e) => setShipping((s) => ({ ...s, address: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    required
                    value={shipping.city}
                    onChange={(e) => setShipping((s) => ({ ...s, city: e.target.value }))}
                  />
                  <Input
                    label="Postcode"
                    name="postcode"
                    required
                    value={shipping.postcode}
                    onChange={(e) => setShipping((s) => ({ ...s, postcode: e.target.value }))}
                  />
                </div>
                <Input
                  label="Country"
                  name="country"
                  value={shipping.country}
                  onChange={(e) => setShipping((s) => ({ ...s, country: e.target.value }))}
                />
              </div>
            </section>

            <section className="rounded-lg border border-charcoal/10 bg-ivory-light p-6 dark:border-ivory/10 dark:bg-charcoal-dark">
              <h2 className="font-serif text-xl font-semibold text-charcoal dark:text-ivory">Payment</h2>
              <p className="mt-2 text-sm text-charcoal/70 dark:text-ivory/70">
                Secure checkout with a clean, card-style experience.
              </p>

              <div className="mt-5 overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-sm dark:border-ivory/10 dark:bg-charcoal">
                <div className="border-b border-charcoal/10 bg-gradient-to-r from-[#635BFF]/10 via-[#5A67FF]/5 to-transparent px-4 py-3 dark:border-ivory/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-charcoal dark:text-ivory">
                      <WalletCards size={18} />
                      <span className="text-sm font-semibold tracking-wide">Payment method</span>
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      Active
                    </span>
                  </div>
                </div>

                <div className="space-y-4 p-4">
                  <label className="block cursor-pointer rounded-lg border border-[#635BFF]/35 bg-[#635BFF]/5 p-4 ring-2 ring-[#635BFF]/25">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment-method"
                        defaultChecked
                        readOnly
                        className="mt-1 h-4 w-4 accent-[#635BFF]"
                      />
                      <div>
                        <p className="font-medium text-charcoal dark:text-ivory">Cash on Delivery</p>
                        <p className="mt-1 text-sm text-charcoal/70 dark:text-ivory/70">
                          Pay in cash when your order arrives at your doorstep.
                        </p>
                      </div>
                    </div>
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-charcoal/10 bg-ivory p-3 dark:border-ivory/10 dark:bg-charcoal-dark">
                      <div className="flex items-center gap-2 text-sm font-medium text-charcoal dark:text-ivory">
                        <Truck size={16} />
                        Fast dispatch
                      </div>
                      <p className="mt-1 text-xs text-charcoal/70 dark:text-ivory/70">Usually ships within 1-2 business days.</p>
                    </div>
                    <div className="rounded-lg border border-charcoal/10 bg-ivory p-3 dark:border-ivory/10 dark:bg-charcoal-dark">
                      <div className="flex items-center gap-2 text-sm font-medium text-charcoal dark:text-ivory">
                        <ShieldCheck size={16} />
                        Verified checkout
                      </div>
                      <p className="mt-1 text-xs text-charcoal/70 dark:text-ivory/70">Order and address details are securely handled.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div>
            <div className="sticky top-24 rounded-lg border border-charcoal/10 bg-ivory-light p-6 dark:border-ivory/10 dark:bg-charcoal-dark">
              <h2 className="font-serif text-xl font-semibold text-charcoal dark:text-ivory">Order summary</h2>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={`${item.id}-${item.variant ?? 'x'}`} className="flex justify-between text-sm">
                    <span className="text-charcoal/80 dark:text-ivory/80">
                      {item.name} × {item.quantity}
                    </span>
                    <span>£{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between border-t border-charcoal/10 pt-4 font-medium text-charcoal dark:border-ivory/10 dark:text-ivory">
                <span>Total</span>
                <span>£{cartTotal.toFixed(2)}</span>
              </div>
              <Button type="submit" variant="primary" className="mt-6 w-full">
                Place order (demo)
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
