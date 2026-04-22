import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Menu, X, Moon, Sun } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'

/**
 * Sticky navbar: transparent on hero, solid on scroll. Cart count, theme toggle, mobile menu.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { cartCount } = useCart()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const linkClass = ({ isActive }) =>
    `font-medium transition-colors hover:text-champagne ${isActive ? 'text-champagne' : 'text-charcoal dark:text-ivory'}`

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-ivory/95 shadow-sm backdrop-blur dark:bg-charcoal/95' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6" aria-label="Main navigation">
        <Link to="/" className="font-serif text-2xl font-semibold text-charcoal dark:text-ivory">
          Crown Charms
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={linkClass} end={to === '/'}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded p-2 text-charcoal hover:bg-charcoal/5 dark:text-ivory dark:hover:bg-ivory/10"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link
            to="/cart"
            className="relative rounded p-2 text-charcoal hover:bg-charcoal/5 dark:text-ivory dark:hover:bg-ivory/10"
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-champagne text-xs font-medium text-charcoal">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="rounded p-2 text-charcoal md:hidden dark:text-ivory"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-charcoal/10 bg-ivory px-4 py-4 dark:border-ivory/10 dark:bg-charcoal md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={linkClass} end={to === '/'} onClick={() => setMobileOpen(false)}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
