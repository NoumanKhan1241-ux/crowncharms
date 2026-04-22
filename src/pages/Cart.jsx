import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { Button } from '../components/Button'
import { useCart } from '../context/CartContext'

export function Cart() {
  const { items, cartTotal, updateQuantity, removeFromCart } = useCart()

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">Your cart is empty</h1>
        <p className="mt-2 text-charcoal/70 dark:text-ivory/70">Add something beautiful to get started.</p>
        <Link to="/shop" className="mt-6 inline-block">
          <Button variant="primary">Shop Collection</Button>
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-ivory dark:bg-charcoal">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <h1 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">Shopping Cart</h1>
        <p className="mt-1 text-charcoal/70 dark:text-ivory/70">{items.length} {items.length === 1 ? 'item' : 'items'}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ul className="divide-y divide-charcoal/10 dark:divide-ivory/10">
              {items.map((item) => (
                <li key={`${item.id}-${item.variant ?? 'x'}`} className="flex gap-6 py-6">
                  <Link to={`/shop/${item.slug}`} className="h-28 w-28 shrink-0 overflow-hidden rounded-sm bg-ivory-dark dark:bg-charcoal-dark">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <Link to={`/shop/${item.slug}`} className="font-serif font-medium text-charcoal hover:text-champagne dark:text-ivory">
                          {item.name}
                        </Link>
                        <p className="mt-1 text-champagne-dark dark:text-champagne-light">£{item.price}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.variant)}
                        className="rounded p-2 text-charcoal/70 hover:bg-charcoal/5 hover:text-charcoal dark:text-ivory/70 dark:hover:bg-ivory/10 dark:hover:text-ivory"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded border border-charcoal/20 dark:border-ivory/20">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1), item.variant)}
                          className="px-3 py-1 text-charcoal hover:bg-charcoal/5 dark:text-ivory dark:hover:bg-ivory/10"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm" aria-live="polite">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                          className="px-3 py-1 text-charcoal hover:bg-charcoal/5 dark:text-ivory dark:hover:bg-ivory/10"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-medium text-charcoal dark:text-ivory">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-charcoal/10 bg-ivory-light p-6 dark:border-ivory/10 dark:bg-charcoal-dark">
              <h2 className="font-serif text-xl font-semibold text-charcoal dark:text-ivory">Order summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-charcoal/80 dark:text-ivory/80">
                  <span>Subtotal</span>
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-charcoal/80 dark:text-ivory/80">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between border-t border-charcoal/10 pt-4 font-medium text-charcoal dark:border-ivory/10 dark:text-ivory">
                <span>Total</span>
                <span>£{cartTotal.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="mt-6 block">
                <Button variant="primary" className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
