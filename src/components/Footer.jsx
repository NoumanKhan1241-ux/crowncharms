import { Link } from 'react-router-dom'
import { Mail, Instagram, Facebook } from 'lucide-react'

/**
 * Minimal footer: links, newsletter placeholder, social, copyright.
 */
export function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-ivory-dark py-12 dark:border-ivory/10 dark:bg-charcoal-dark">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="font-serif text-xl font-semibold text-charcoal dark:text-ivory">
              Crown Charms
            </Link>
            <p className="mt-2 text-sm text-charcoal/70 dark:text-ivory/70">
              Timeless jewellery for every crown.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-medium text-charcoal dark:text-ivory">Shop</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link to="/shop?category=rings" className="text-charcoal/70 hover:text-champagne dark:text-ivory/70">Rings</Link></li>
              <li><Link to="/shop?category=necklaces" className="text-charcoal/70 hover:text-champagne dark:text-ivory/70">Necklaces</Link></li>
              <li><Link to="/shop?category=bracelets" className="text-charcoal/70 hover:text-champagne dark:text-ivory/70">Bracelets</Link></li>
              <li><Link to="/shop?category=earrings" className="text-charcoal/70 hover:text-champagne dark:text-ivory/70">Earrings</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-medium text-charcoal dark:text-ivory">Company</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link to="/about" className="text-charcoal/70 hover:text-champagne dark:text-ivory/70">About</Link></li>
              <li><Link to="/contact" className="text-charcoal/70 hover:text-champagne dark:text-ivory/70">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-medium text-charcoal dark:text-ivory">Stay in touch</h4>
            <p className="mt-2 text-sm text-charcoal/70 dark:text-ivory/70">
              hello@crowncharms.com
            </p>
            <div className="mt-3 flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-charcoal/70 hover:text-champagne dark:text-ivory/70" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-charcoal/70 hover:text-champagne dark:text-ivory/70" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-charcoal/10 pt-6 text-center text-sm text-charcoal/60 dark:border-ivory/10 dark:text-ivory/60">
          © {new Date().getFullYear()} Crown Charms. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
