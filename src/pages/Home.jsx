import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '../components/Button'
import { ProductCard } from '../components/ProductCard'
import { useProductData } from '../context/ProductDataContext'

export function Home() {
  const { categories, getFeaturedProducts } = useProductData()
  const featured = getFeaturedProducts()

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center bg-ivory px-4 text-center dark:bg-charcoal">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920')] bg-cover bg-center opacity-10 dark:opacity-5" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-charcoal dark:text-ivory md:text-5xl lg:text-6xl">
            Timeless Jewellery for Every Crown
          </h1>
          <p className="mt-6 text-lg text-charcoal/80 dark:text-ivory/80">
            Discover pieces crafted for elegance and everyday wear. From delicate chains to statement rings.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/shop">
              <Button variant="primary">Shop Collection</Button>
            </Link>
            <Link to="/shop?new=true">
              <Button variant="secondary">Explore New Arrivals</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h2 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">Featured Pieces</h2>
        <p className="mt-2 text-charcoal/70 dark:text-ivory/70">Handpicked favourites for this season.</p>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/shop">
            <Button variant="secondary">
              View All <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-ivory-dark py-16 dark:bg-charcoal-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">Shop by Category</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className="group flex flex-col items-center rounded-lg border border-charcoal/10 bg-ivory p-6 transition-all hover:border-champagne/40 hover:shadow-md dark:border-ivory/10 dark:bg-charcoal dark:hover:border-champagne/40"
              >
                <span className="font-serif text-lg font-medium text-charcoal group-hover:text-champagne dark:text-ivory">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6">
        <h2 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">Our Story</h2>
        <p className="mt-6 leading-relaxed text-charcoal/80 dark:text-ivory/80">
          Crown Charms was born from a love of understated luxury. We believe every piece should feel special—
          whether it’s a daily staple or a once-in-a-lifetime gift. Each design is chosen for its timeless appeal and quality.
        </p>
        <Link to="/about" className="mt-6 inline-block font-medium text-champagne-dark hover:underline dark:text-champagne-light">
          Read more about us
        </Link>
      </section>

      {/* Newsletter */}
      <section className="border-t border-charcoal/10 bg-ivory-dark py-16 dark:border-ivory/10 dark:bg-charcoal-dark">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="font-serif text-2xl font-semibold text-charcoal dark:text-ivory">Join our world</h2>
          <p className="mt-2 text-charcoal/70 dark:text-ivory/70">
            Be the first to know about new arrivals and exclusive offers.
          </p>
          <form
            className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-sm border border-charcoal/20 bg-ivory px-4 py-3 text-charcoal placeholder-charcoal/50 focus:border-champagne focus:outline-none sm:max-w-xs dark:border-ivory/20 dark:bg-charcoal dark:text-ivory"
              aria-label="Email for newsletter"
            />
            <Button type="submit" variant="primary">Subscribe</Button>
          </form>
        </div>
      </section>
    </main>
  )
}
