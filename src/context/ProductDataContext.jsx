import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { categories as defaultCategories, products as defaultProducts } from '../data/products'
import { apiAdmin, apiGet } from '../lib/api'

const ProductDataContext = createContext(null)

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function ProductDataProvider({ children }) {
  const [products, setProducts] = useState(defaultProducts)
  const [categories, setCategories] = useState(defaultCategories)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRows, categoryRows] = await Promise.all([
          apiGet('/api/products'),
          apiGet('/api/categories'),
        ])
        if (Array.isArray(productRows) && productRows.length > 0) setProducts(productRows)
        if (Array.isArray(categoryRows) && categoryRows.length > 0) setCategories(categoryRows)
      } catch {
        // Keep local defaults when API is not connected yet.
      }
    }
    fetchData()
  }, [])

  const updateProduct = async (id, updates) => {
    const current = products.find((p) => p.id === id)
    if (!current) return
    const name = updates.name ?? current.name
    const nextProduct = {
      ...current,
      ...updates,
      slug: updates.slug || slugify(name),
      price: Number(updates.price ?? current.price),
    }
    setProducts((prev) => prev.map((p) => (p.id === id ? nextProduct : p)))
    try {
      await apiAdmin(`/api/products/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(nextProduct),
      })
    } catch {
      // Keep optimistic UI data; API sync can be retried from dashboard edits.
    }
  }

  const addProduct = async (payload) => {
    const id = String(Date.now())
    const name = payload.name?.trim() || 'New Product'
    const image = payload.image?.trim() || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'
    const nextProduct = {
      id,
      name,
      slug: slugify(name),
      price: Number(payload.price ?? 0),
      category: payload.category || 'rings',
      material: payload.material || 'gold colour',
      description: payload.description || '',
      care: payload.care || '',
      image,
      images: payload.images?.length ? payload.images : [image],
      featured: Boolean(payload.featured),
    }
    setProducts((prev) => [nextProduct, ...prev])
    try {
      await apiAdmin('/api/products', { method: 'POST', body: JSON.stringify(nextProduct) })
    } catch {
      // Keep optimistic UI data; API sync can be retried by editing this item again.
    }
  }

  const deleteProduct = async (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    try {
      await apiAdmin(`/api/products/${id}`, { method: 'DELETE' })
    } catch {
      // If API call fails, local dashboard view still updates for now.
    }
  }

  const resetProducts = () => {
    setProducts(defaultProducts)
  }

  const value = useMemo(
    () => ({
      categories,
      products,
      getProductBySlug: (slug) => products.find((p) => p.slug === slug),
      getFeaturedProducts: () => products.filter((p) => p.featured),
      getRelatedProducts: (product, limit = 4) =>
        products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, limit),
      updateProduct,
      addProduct,
      deleteProduct,
      resetProducts,
    }),
    [products, categories]
  )

  return <ProductDataContext.Provider value={value}>{children}</ProductDataContext.Provider>
}

export function useProductData() {
  const ctx = useContext(ProductDataContext)
  if (!ctx) throw new Error('useProductData must be used within ProductDataProvider')
  return ctx
}

