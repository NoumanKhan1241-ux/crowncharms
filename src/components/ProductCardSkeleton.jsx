/**
 * Loading skeleton for product cards.
 */
export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] rounded-sm bg-ivory-dark dark:bg-charcoal-light" />
      <div className="mt-4 h-5 w-3/4 rounded bg-charcoal/10 dark:bg-ivory/10" />
      <div className="mt-2 h-4 w-1/4 rounded bg-charcoal/10 dark:bg-ivory/10" />
      <div className="mt-3 h-10 w-full rounded bg-charcoal/10 dark:bg-ivory/10" />
    </div>
  )
}
