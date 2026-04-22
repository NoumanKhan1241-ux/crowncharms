import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiAdmin, apiGet } from '../lib/api'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const rows = await apiAdmin('/api/orders')
        if (Array.isArray(rows)) setOrders(rows)
      } catch {
        setOrders([])
      }
    }
    fetchOrders()
  }, [])

  const createOrder = async ({ items, shipping, total, paymentMethod = 'Cash on Delivery' }) => {
    const order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      shipmentStatus: 'Preparing',
      paymentMethod,
      items,
      shipping,
      total,
    }
    setOrders((prev) => [order, ...prev])
    try {
      await apiGet('/api/health')
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })
    } catch {
      // Checkout still works even when API is offline.
    }
    return order
  }

  const updateOrderStatus = async (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    try {
      await apiAdmin(`/api/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
    } catch {
      // Keep optimistic update in dashboard.
    }
  }

  const updateShipmentStatus = async (id, shipmentStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, shipmentStatus } : o)))
    try {
      await apiAdmin(`/api/orders/${id}/shipment`, {
        method: 'PATCH',
        body: JSON.stringify({ shipmentStatus }),
      })
    } catch {
      // Keep optimistic update in dashboard.
    }
  }

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0)
    const soldProducts = orders.reduce(
      (sum, o) => sum + o.items.reduce((acc, item) => acc + Number(item.quantity || 0), 0),
      0
    )
    const pendingShipments = orders.filter((o) => o.shipmentStatus !== 'Delivered').length
    return {
      totalOrders: orders.length,
      totalRevenue,
      soldProducts,
      pendingShipments,
    }
  }, [orders])

  const value = useMemo(
    () => ({
      orders,
      stats,
      createOrder,
      updateOrderStatus,
      updateShipmentStatus,
    }),
    [orders, stats]
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders must be used within OrderProvider')
  return ctx
}

