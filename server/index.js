import 'dotenv/config'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import { desc, eq, inArray, sql } from 'drizzle-orm'
import { db } from './db/client.js'
import { adminUsers, orderItems, orders, productImages, products, shipments } from './db/schema.js'
import { categories } from '../src/data/products.js'
import { ADMIN_PASSWORD as APP_ADMIN_PASSWORD } from '../src/config/admin.js'

const app = express()
const PORT = Number(process.env.API_PORT || 8787)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || APP_ADMIN_PASSWORD
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-jwt-secret'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'owner'

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use(express.json({ limit: '2mb' }))

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
})

function signAdminToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' })
}

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.admin = decoded
    return next()
  } catch {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

app.post('/api/admin/login', authLimiter, async (req, res) => {
  const password = req.body?.password || ''
  const user = await db.select().from(adminUsers).where(eq(adminUsers.username, ADMIN_USERNAME)).limit(1).then((rows) => rows[0])

  if (!user || !user.isActive) return res.status(401).json({ error: 'Invalid credentials' })

  let passwordOk = false
  if (user.passwordHash.startsWith('$2')) {
    passwordOk = await bcrypt.compare(password, user.passwordHash)
  } else {
    // Temporary backward compatibility: migrate plain value to hash on successful login.
    passwordOk = password === user.passwordHash || password === ADMIN_PASSWORD
    if (passwordOk) {
      const upgradedHash = await bcrypt.hash(password, 10)
      await db.update(adminUsers).set({ passwordHash: upgradedHash, updatedAt: new Date() }).where(eq(adminUsers.id, user.id))
    }
  }

  if (!passwordOk) return res.status(401).json({ error: 'Invalid credentials' })

  const token = signAdminToken({ sub: String(user.id), username: user.username, role: 'admin' })
  res.json({
    token,
    admin: { username: user.username },
  })
})

app.get('/api/admin/me', requireAdmin, (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/health', async (_req, res) => {
  try {
    await db.execute(sql`select 1`)
    res.json({ ok: true })
  } catch {
    res.status(500).json({ ok: false })
  }
})

app.get('/api/categories', (_req, res) => {
  res.json(categories)
})

app.get('/api/products', async (_req, res) => {
  const productRows = await db.select().from(products).orderBy(desc(products.featured), desc(products.createdAt))
  if (productRows.length === 0) return res.json([])

  const imageRows = await db
    .select()
    .from(productImages)
    .where(inArray(productImages.productId, productRows.map((p) => p.id)))
    .orderBy(productImages.sortOrder)

  const imagesByProductId = imageRows.reduce((acc, row) => {
    if (!acc[row.productId]) acc[row.productId] = []
    acc[row.productId].push(row.url)
    return acc
  }, {})

  res.json(
    productRows.map((p) => ({
      ...p,
      price: Number(p.price),
      images: imagesByProductId[p.id]?.length ? imagesByProductId[p.id] : [p.image],
    }))
  )
})

app.post('/api/products', requireAdmin, async (req, res) => {
  const payload = req.body
  const images = Array.isArray(payload.images) && payload.images.length ? payload.images : [payload.image]

  await db.transaction(async (tx) => {
    await tx.insert(products).values({
      id: payload.id,
      name: payload.name,
      slug: payload.slug,
      price: String(payload.price ?? 0),
      category: payload.category,
      material: payload.material,
      description: payload.description,
      care: payload.care,
      image: payload.image,
      featured: Boolean(payload.featured),
    })
    if (images.length > 0) {
      await tx.insert(productImages).values(images.map((url, index) => ({ productId: payload.id, url, sortOrder: index })))
    }
  })
  res.status(201).json({ ok: true })
})

app.patch('/api/products/:id', requireAdmin, async (req, res) => {
  const id = req.params.id
  const payload = req.body

  await db.transaction(async (tx) => {
    await tx
      .update(products)
      .set({
        ...(payload.name !== undefined ? { name: payload.name } : {}),
        ...(payload.slug !== undefined ? { slug: payload.slug } : {}),
        ...(payload.price !== undefined ? { price: String(payload.price) } : {}),
        ...(payload.category !== undefined ? { category: payload.category } : {}),
        ...(payload.material !== undefined ? { material: payload.material } : {}),
        ...(payload.description !== undefined ? { description: payload.description } : {}),
        ...(payload.care !== undefined ? { care: payload.care } : {}),
        ...(payload.image !== undefined ? { image: payload.image } : {}),
        ...(payload.featured !== undefined ? { featured: Boolean(payload.featured) } : {}),
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))

    if (Array.isArray(payload.images)) {
      await tx.delete(productImages).where(eq(productImages.productId, id))
      if (payload.images.length > 0) {
        await tx
          .insert(productImages)
          .values(payload.images.map((url, index) => ({ productId: id, url, sortOrder: index })))
      }
    }
  })
  res.json({ ok: true })
})

app.delete('/api/products/:id', requireAdmin, async (req, res) => {
  await db.delete(products).where(eq(products.id, req.params.id))
  res.json({ ok: true })
})

app.get('/api/orders', requireAdmin, async (_req, res) => {
  const orderRows = await db.select().from(orders).orderBy(desc(orders.createdAt))
  if (orderRows.length === 0) return res.json([])

  const orderIds = orderRows.map((order) => order.id)
  const [itemRows, shipmentRows] = await Promise.all([
    db.select().from(orderItems).where(inArray(orderItems.orderId, orderIds)),
    db.select().from(shipments).where(inArray(shipments.orderId, orderIds)),
  ])

  const itemsByOrderId = itemRows.reduce((acc, row) => {
    if (!acc[row.orderId]) acc[row.orderId] = []
    acc[row.orderId].push({
      id: row.productId || row.id,
      name: row.productName,
      slug: row.productSlug || '',
      image: row.image || '',
      price: Number(row.unitPrice),
      quantity: row.quantity,
    })
    return acc
  }, {})

  const shipmentByOrderId = shipmentRows.reduce((acc, row) => {
    acc[row.orderId] = row
    return acc
  }, {})

  res.json(
    orderRows.map((order) => ({
      id: order.id,
      createdAt: order.createdAt,
      status: order.status,
      shipmentStatus: shipmentByOrderId[order.id]?.status || 'Preparing',
      paymentMethod: order.paymentMethod,
      items: itemsByOrderId[order.id] || [],
      shipping: {
        email: order.customerEmail,
        name: order.customerName,
        address: order.shippingAddress,
        city: order.shippingCity,
        postcode: order.shippingPostcode,
        country: order.shippingCountry,
      },
      total: Number(order.total),
    }))
  )
})

app.post('/api/orders', async (req, res) => {
  const payload = req.body
  await db.transaction(async (tx) => {
    await tx.insert(orders).values({
      id: payload.id,
      createdAt: payload.createdAt ? new Date(payload.createdAt) : new Date(),
      status: payload.status || 'Pending',
      shipmentStatus: payload.shipmentStatus || 'Preparing',
      paymentMethod: payload.paymentMethod || 'Cash on Delivery',
      items: payload.items || [],
      shipping: payload.shipping || {},
      customerEmail: payload.shipping.email,
      customerName: payload.shipping.name,
      shippingAddress: payload.shipping.address,
      shippingCity: payload.shipping.city,
      shippingPostcode: payload.shipping.postcode,
      shippingCountry: payload.shipping.country,
      total: String(payload.total ?? 0),
    })

    const items = Array.isArray(payload.items) ? payload.items : []
    if (items.length > 0) {
      await tx.insert(orderItems).values(
        items.map((item) => ({
          orderId: payload.id,
          productId: String(item.id),
          productName: item.name,
          productSlug: item.slug || '',
          image: item.image || '',
          unitPrice: String(item.price ?? 0),
          quantity: Number(item.quantity ?? 1),
          lineTotal: String((Number(item.price ?? 0) * Number(item.quantity ?? 1)).toFixed(2)),
        }))
      )
    }

    await tx.insert(shipments).values({
      orderId: payload.id,
      status: payload.shipmentStatus || 'Preparing',
    })
  })

  res.status(201).json({ ok: true })
})

app.patch('/api/orders/:id/status', requireAdmin, async (req, res) => {
  await db.update(orders).set({ status: req.body.status }).where(eq(orders.id, req.params.id))
  res.json({ ok: true })
})

app.patch('/api/orders/:id/shipment', requireAdmin, async (req, res) => {
  await db
    .update(shipments)
    .set({ status: req.body.shipmentStatus, updatedAt: new Date() })
    .where(eq(shipments.orderId, req.params.id))
  res.json({ ok: true })
})

app.get('/api/orders/stats', requireAdmin, async (_req, res) => {
  const [allOrders, allItems, allShipments] = await Promise.all([
    db.select().from(orders),
    db.select().from(orderItems),
    db.select().from(shipments),
  ])
  const totalRevenue = allOrders.reduce((sum, order) => sum + Number(order.total || 0), 0)
  const soldProducts = allItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
  const pendingShipments = allShipments.filter((shipment) => shipment.status !== 'Delivered').length
  res.json({
    totalOrders: allOrders.length,
    totalRevenue,
    soldProducts,
    pendingShipments,
  })
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API running at http://localhost:${PORT}`)
})

