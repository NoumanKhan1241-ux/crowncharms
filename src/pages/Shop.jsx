import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { ProductCardSkeleton } from '../components/ProductCardSkeleton'
import { ChevronDown } from 'lucide-react'
import { useProductData } from '../context/ProductDataContext'

const materials = [
  { id: 'all', name: 'All materials' },
  { id: 'gold', name: 'Gold' },
  { id: 'rose gold', name: 'Rose gold' },
  { id: 'silver', name: 'Silver' },
]

const priceRanges = [
  { id: 'all', min: 0, max: Infinity, label: 'Any price' },
  { id: 'under100', min: 0, max: 100, label: 'Under £100' },
  { id: '100-300', min: 100, max: 300, label: '£100 – £300' },
  { id: '300-500', min: 300, max: 500, label: '£300 – £500' },
  { id: 'over500', min: 500, max: Infinity, label: 'Over £500' },
]

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Name A–Z' },
]

export function Shop() {
  const { products, categories } = useProductData()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category') || ''
  const [category, setCategory] = useState(categoryFromUrl || 'all')
  const [material, setMaterial] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sort, setSort] = useState('featured')
  const [loading] = useState(false)

  const filteredAndSorted = useMemo(() => {
    let list = [...products]
    if (category && category !== 'all') list = list.filter((p) => p.category === category)
    if (material && material !== 'all') list = list.filter((p) => p.material === material)
    const pr = priceRanges.find((r) => r.id === priceRange)
    if (pr && pr.id !== 'all') list = list.filter((p) => p.price >= pr.min && p.price < pr.max)
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [category, material, priceRange, sort])

  const handleCategoryChange = (value) => {
    setCategory(value)
    if (value === 'all') searchParams.delete('category')
    else searchParams.set('category', value)
    setSearchParams(searchParams)
  }

  return (
    <main className="min-h-screen bg-ivory dark:bg-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">Shop</h1>
        <p className="mt-1 text-charcoal/70 dark:text-ivory/70">Discover our collection of fine jewellery.</p>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          {/* Filters */}
          <aside className="w-full shrink-0 lg:w-56">
            <div className="rounded-lg border border-charcoal/10 bg-ivory-light p-4 dark:border-ivory/10 dark:bg-charcoal-dark">
              <h3 className="font-serif font-medium text-charcoal dark:text-ivory">Filters</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal dark:text-ivory">Category</label>
                  <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full rounded border border-charcoal/20 bg-ivory px-3 py-2 text-charcoal focus:border-champagne focus:outline-none dark:border-ivory/20 dark:bg-charcoal dark:text-ivory"
                    aria-label="Filter by category"
                  >
                    <option value="all">All</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal dark:text-ivory">Material</label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full rounded border border-charcoal/20 bg-ivory px-3 py-2 text-charcoal focus:border-champagne focus:outline-none dark:border-ivory/20 dark:bg-charcoal dark:text-ivory"
                    aria-label="Filter by material"
                  >
                    {materials.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal dark:text-ivory">Price</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full rounded border border-charcoal/20 bg-ivory px-3 py-2 text-charcoal focus:border-champagne focus:outline-none dark:border-ivory/20 dark:bg-charcoal dark:text-ivory"
                    aria-label="Filter by price"
                  >
                    {priceRanges.map((r) => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-charcoal/70 dark:text-ivory/70">
                {filteredAndSorted.length} {filteredAndSorted.length === 1 ? 'piece' : 'pieces'}
              </p>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none rounded border border-charcoal/20 bg-ivory py-2 pl-3 pr-8 text-sm text-charcoal focus:border-champagne focus:outline-none dark:border-ivory/20 dark:bg-charcoal dark:text-ivory"
                  aria-label="Sort by"
                >
                  {sortOptions.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/60 dark:text-ivory/60" />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredAndSorted.length === 0 ? (
              <p className="py-12 text-center text-charcoal/70 dark:text-ivory/70">No pieces match your filters.</p>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAndSorted.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
