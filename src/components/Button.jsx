/**
 * Reusable primary and secondary buttons with consistent styling.
 */
export function Button({ children, variant = 'primary', className = '', disabled, type = 'button', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-charcoal text-ivory hover:bg-charcoal-light active:scale-[0.98]',
    secondary: 'border-2 border-charcoal text-charcoal bg-transparent hover:bg-charcoal hover:text-ivory dark:border-ivory dark:text-ivory dark:hover:bg-ivory dark:hover:text-charcoal',
    gold: 'bg-champagne text-charcoal hover:bg-champagne-dark active:scale-[0.98]',
  }
  return (
    <button
      type={type}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
