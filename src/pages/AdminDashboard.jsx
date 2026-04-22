import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Truck, LogOut, Plus, Trash2 } from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'
import { useProductData } from '../context/ProductDataContext'
import { useOrders } from '../context/OrderContext'
import { Button } from '../components/Button'

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'shipments', label: 'Shipments', icon: Truck },
]

const blankProduct = {
  name: '',
  price: '',
  category: 'rings',
  material: 'gold colour',
  description: '',
  care: '',
  image: '',
  images: '',
  featured: false,
}

export function AdminDashboard() {
  const { logout } = useAdminAuth()
  const { products, categories, updateProduct, addProduct, deleteProduct } = useProductData()
  const { orders, stats, updateOrderStatus, updateShipmentStatus } = useOrders()
  const [activeTab, setActiveTab] = useState('overview')
  const [newProduct, setNewProduct] = useState(blankProduct)

  const topProducts = useMemo(() => {
    const soldMap = {}
    for (const order of orders) {
      for (const item of order.items) {
        soldMap[item.id] = (soldMap[item.id] || 0) + item.quantity
      }
    }
    return [...products]
      .map((p) => ({ ...p, sold: soldMap[p.id] || 0 }))
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5)
  }, [orders, products])

  const cardClass = 'rounded-xl border border-charcoal/10 bg-ivory-light p-4 dark:border-ivory/10 dark:bg-charcoal-dark'

  const handleAddProduct = (e) => {
    e.preventDefault()
    addProduct({
      ...newProduct,
      price: Number(newProduct.price || 0),
      image: newProduct.image,
      images: newProduct.images
        .split(',')
        .map((i) => i.trim())
        .filter(Boolean),
    })
    setNewProduct(blankProduct)
  }

  return (
    <main className="min-h-screen bg-ivory dark:bg-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">Seller Dashboard</h1>
            <p className="text-charcoal/70 dark:text-ivory/70">Manage products, orders, and shipments in one place.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/">
              <Button variant="secondary">Back to Store</Button>
            </Link>
            <Button variant="primary" onClick={logout}>
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const selected = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  selected
                    ? 'border-[#635BFF]/40 bg-[#635BFF]/10 text-[#635BFF]'
                    : 'border-charcoal/20 text-charcoal hover:border-charcoal/30 dark:border-ivory/20 dark:text-ivory'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {activeTab === 'overview' && (
          <section className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className={cardClass}><p className="text-sm opacity-70">Total revenue</p><p className="mt-1 text-2xl font-semibold">£{stats.totalRevenue.toFixed(2)}</p></div>
              <div className={cardClass}><p className="text-sm opacity-70">Total orders</p><p className="mt-1 text-2xl font-semibold">{stats.totalOrders}</p></div>
              <div className={cardClass}><p className="text-sm opacity-70">Products sold</p><p className="mt-1 text-2xl font-semibold">{stats.soldProducts}</p></div>
              <div className={cardClass}><p className="text-sm opacity-70">Pending shipments</p><p className="mt-1 text-2xl font-semibold">{stats.pendingShipments}</p></div>
            </div>
            <div className={cardClass}>
              <h2 className="font-serif text-xl font-semibold">Top sold products</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {topProducts.map((p) => (
                  <li key={p.id} className="flex items-center justify-between border-b border-charcoal/10 pb-2 last:border-0 dark:border-ivory/10">
                    <span>{p.name}</span>
                    <span className="font-medium">{p.sold} sold</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {activeTab === 'products' && (
          <section className="space-y-6">
            <form onSubmit={handleAddProduct} className={cardClass}>
              <h2 className="font-serif text-xl font-semibold">Add product</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <input placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct((s) => ({ ...s, name: e.target.value }))} className="rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal" />
                <input type="number" min="0" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct((s) => ({ ...s, price: e.target.value }))} className="rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal" />
                <select value={newProduct.category} onChange={(e) => setNewProduct((s) => ({ ...s, category: e.target.value }))} className="rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal">{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
                <input placeholder="Material" value={newProduct.material} onChange={(e) => setNewProduct((s) => ({ ...s, material: e.target.value }))} className="rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal" />
                <input placeholder="Main image URL" value={newProduct.image} onChange={(e) => setNewProduct((s) => ({ ...s, image: e.target.value }))} className="rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal md:col-span-2" />
                <input placeholder="Gallery URLs (comma separated)" value={newProduct.images} onChange={(e) => setNewProduct((s) => ({ ...s, images: e.target.value }))} className="rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal md:col-span-2" />
                <textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct((s) => ({ ...s, description: e.target.value }))} className="min-h-24 rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal md:col-span-2" />
                <textarea placeholder="Care instructions" value={newProduct.care} onChange={(e) => setNewProduct((s) => ({ ...s, care: e.target.value }))} className="min-h-20 rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal md:col-span-2" />
              </div>
              <Button type="submit" variant="primary" className="mt-4">
                <Plus size={16} />
                Add Product
              </Button>
            </form>

            <div className={cardClass}>
              <h2 className="font-serif text-xl font-semibold">Edit listings</h2>
              <div className="mt-4 space-y-4">
                {products.map((product) => (
                  <article key={product.id} className="rounded-lg border border-charcoal/10 p-4 dark:border-ivory/10">
                    <div className="grid gap-3 md:grid-cols-2">
                      <input value={product.name} onChange={(e) => updateProduct(product.id, { name: e.target.value })} className="rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal" />
                      <input type="number" min="0" value={product.price} onChange={(e) => updateProduct(product.id, { price: e.target.value })} className="rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal" />
                      <select value={product.category} onChange={(e) => updateProduct(product.id, { category: e.target.value })} className="rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal">{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
                      <input value={product.material} onChange={(e) => updateProduct(product.id, { material: e.target.value })} className="rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal" />
                      <input value={product.image} onChange={(e) => updateProduct(product.id, { image: e.target.value, images: [e.target.value, ...(product.images || []).slice(1)] })} className="rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal md:col-span-2" />
                      <textarea value={product.description} onChange={(e) => updateProduct(product.id, { description: e.target.value })} className="min-h-20 rounded border border-charcoal/20 bg-ivory px-3 py-2 dark:border-ivory/20 dark:bg-charcoal md:col-span-2" />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button type="button" onClick={() => deleteProduct(product.id)} className="inline-flex items-center gap-2 text-sm text-red-600 hover:underline dark:text-red-400">
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'orders' && (
          <section className={cardClass}>
            <h2 className="font-serif text-xl font-semibold">Orders</h2>
            <div className="mt-4 space-y-4">
              {orders.length === 0 && <p className="text-sm opacity-70">No orders yet. Place one via checkout to populate this.</p>}
              {orders.map((order) => (
                <article key={order.id} className="rounded-lg border border-charcoal/10 p-4 dark:border-ivory/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm opacity-70">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <p className="mt-2 text-sm">Customer: {order.shipping.name} - {order.shipping.city}</p>
                  <p className="text-sm">Total: £{Number(order.total).toFixed(2)} - {order.paymentMethod}</p>
                  <div className="mt-3">
                    <label className="mr-2 text-sm">Order status:</label>
                    <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)} className="rounded border border-charcoal/20 bg-ivory px-2 py-1 text-sm dark:border-ivory/20 dark:bg-charcoal">
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'shipments' && (
          <section className={cardClass}>
            <h2 className="font-serif text-xl font-semibold">Shipments</h2>
            <div className="mt-4 space-y-4">
              {orders.length === 0 && <p className="text-sm opacity-70">No shipments yet.</p>}
              {orders.map((order) => (
                <article key={order.id} className="rounded-lg border border-charcoal/10 p-4 dark:border-ivory/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm">To: {order.shipping.address}, {order.shipping.city}</p>
                  </div>
                  <div className="mt-3">
                    <label className="mr-2 text-sm">Shipment status:</label>
                    <select value={order.shipmentStatus} onChange={(e) => updateShipmentStatus(order.id, e.target.value)} className="rounded border border-charcoal/20 bg-ivory px-2 py-1 text-sm dark:border-ivory/20 dark:bg-charcoal">
                      <option>Preparing</option>
                      <option>Shipped</option>
                      <option>Out for Delivery</option>
                      <option>Delivered</option>
                    </select>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

