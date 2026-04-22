import { Link } from 'react-router-dom'
import { Button } from '../components/Button'

export function About() {
  return (
    <main className="min-h-screen bg-ivory dark:bg-charcoal">
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h1 className="font-serif text-4xl font-semibold text-charcoal dark:text-ivory">Our Story</h1>
        <p className="mt-4 text-lg text-charcoal/80 dark:text-ivory/80">
          Crown Charms began with a simple idea: jewellery should feel both special and wearable every day.
        </p>

        <div className="prose prose-charcoal mt-12 max-w-none dark:prose-invert">
          <p className="leading-relaxed text-charcoal/80 dark:text-ivory/80">
            We source and design pieces that stand the test of time—whether it’s a delicate chain you never take off or a ring chosen for a milestone. Our collections blend classic shapes with a modern sensibility, so you can build a jewellery box that truly reflects you.
          </p>
          <p className="mt-6 leading-relaxed text-charcoal/80 dark:text-ivory/80">
            Every piece is chosen for its quality and craftsmanship. We work with trusted makers and materials—gold, rose gold, sterling silver, and carefully selected stones—so you can wear and gift with confidence.
          </p>
          <p className="mt-6 leading-relaxed text-charcoal/80 dark:text-ivory/80">
            Thank you for being part of our story. We hope you find something here that feels like yours.
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 rounded-lg border border-charcoal/10 bg-ivory-dark p-8 text-center dark:border-ivory/10 dark:bg-charcoal-dark">
          <h2 className="font-serif text-2xl font-semibold text-charcoal dark:text-ivory">Visit the collection</h2>
          <p className="text-charcoal/70 dark:text-ivory/70">Discover rings, necklaces, bracelets and earrings made for every moment.</p>
          <Link to="/shop">
            <Button variant="primary">Shop Now</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
