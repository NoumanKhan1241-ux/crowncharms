/**
 * Accessible input field with label and optional error.
 */
export function Input({ label, id, error, className = '', ...props }) {
  const inputId = id || props.name
  return (
    <div className={`${className}`}>
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-charcoal dark:text-ivory">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className="w-full rounded-sm border border-charcoal/20 bg-ivory-light px-4 py-3 text-charcoal placeholder-charcoal/50 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne dark:border-ivory/20 dark:bg-charcoal dark:text-ivory dark:placeholder-ivory/50"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-rose-dark" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function Textarea({ label, id, error, className = '', ...props }) {
  const inputId = id || props.name
  return (
    <div className={`${className}`}>
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-charcoal dark:text-ivory">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={4}
        className="w-full resize-y rounded-sm border border-charcoal/20 bg-ivory-light px-4 py-3 text-charcoal placeholder-charcoal/50 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne dark:border-ivory/20 dark:bg-charcoal dark:text-ivory dark:placeholder-ivory/50"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-rose-dark" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
