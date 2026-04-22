import { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

/**
 * Accessible modal with overlay and close button.
 */
export function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md animate-fade-in rounded-lg bg-ivory p-6 shadow-xl dark:bg-charcoal">
        <div className="flex items-center justify-between gap-4">
          <h2 id="modal-title" className="font-serif text-xl font-semibold text-charcoal dark:text-ivory">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-charcoal hover:bg-charcoal/10 dark:text-ivory dark:hover:bg-ivory/10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
