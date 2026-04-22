import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { Button } from './Button'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

/**
 * Product card for grid layouts: image, name, price, add to cart.
 */
export function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { addToast } = useToast()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
    addToast('Added to cart')
  }

  return (
    <article className="group animate-fade-in">
      <Link to={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-ivory-dark">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="font-serif text-lg font-medium text-charcoal dark:text-ivory">{product.name}</h3>
          <p className="text-champagne-dark font-medium">£{product.price}</p>
        </div>
      </Link>
      <Button
        variant="secondary"
        className="mt-3 w-full"
        onClick={handleAddToCart}
        aria-label={`Add ${product.name} to cart`}
      >
        <ShoppingBag size={18} />
        Add to Cart
      </Button>
    </article>
  )
}
