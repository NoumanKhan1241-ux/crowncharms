import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { Button } from '../components/Button'
import { ProductCard } from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useProductData } from '../context/ProductDataContext'

export function ProductDetail() {
  const { slug } = useParams()
  const { getProductBySlug, getRelatedProducts } = useProductData()
  const product = getProductBySlug(slug)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const { addToCart } = useCart()
  const { addToast } = useToast()

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="font-serif text-2xl text-charcoal dark:text-ivory">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-champagne-dark hover:underline dark:text-champagne-light">Back to shop</Link>
      </main>
    )
  }

  const related = getRelatedProducts(product)
  const images = product.images && product.images.length ? product.images : [product.image]

  const handleAddToCart = () => {
    addToCart(product, quantity)
    addToast('Added to cart')
  }

  return (
    <main className="min-h-screen bg-ivory dark:bg-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <nav className="mb-8 text-sm text-charcoal/70 dark:text-ivory/70" aria-label="Breadcrumb">
          <Link to="/shop" className="hover:text-champagne">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal dark:text-ivory">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-ivory-dark">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded border-2 transition ${
                      activeImage === i ? 'border-champagne' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">{product.name}</h1>
            <p className="mt-2 text-xl text-champagne-dark dark:text-champagne-light">£{product.price}</p>
            <p className="mt-6 leading-relaxed text-charcoal/80 dark:text-ivory/80">{product.description}</p>

            <div className="mt-6 rounded-lg border border-charcoal/10 bg-ivory-dark p-4 dark:border-ivory/10 dark:bg-charcoal-dark">
              <h3 className="font-medium text-charcoal dark:text-ivory">Material & care</h3>
              <p className="mt-1 text-sm capitalize text-charcoal/80 dark:text-ivory/80">Material: {product.material}</p>
              <p className="mt-2 text-sm text-charcoal/80 dark:text-ivory/80">{product.care}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded border border-charcoal/20 dark:border-ivory/20">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-charcoal hover:bg-charcoal/5 dark:text-ivory dark:hover:bg-ivory/10"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-12 text-center font-medium" aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 text-charcoal hover:bg-charcoal/5 dark:text-ivory dark:hover:bg-ivory/10"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <Button variant="primary" onClick={handleAddToCart} className="inline-flex">
                <ShoppingBag size={20} />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-2xl font-semibold text-charcoal dark:text-ivory">You may also like</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
