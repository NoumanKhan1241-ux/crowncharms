import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from './db/client.js'
import { adminUsers, productImages, products as productsTable } from './db/schema.js'
import { products as defaultProducts } from '../src/data/products.js'
import { ADMIN_PASSWORD as APP_ADMIN_PASSWORD } from '../src/config/admin.js'

async function seed() {
  const adminPassword = process.env.ADMIN_PASSWORD || APP_ADMIN_PASSWORD
  const passwordHash = await bcrypt.hash(adminPassword, 10)

  for (const product of defaultProducts) {
    const productValue = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: String(product.price),
      category: product.category,
      material: product.material,
      description: product.description,
      care: product.care,
      image: product.image,
      featured: Boolean(product.featured),
      updatedAt: new Date(),
    }

    await db
      .insert(productsTable)
      .values(productValue)
      .onConflictDoUpdate({
        target: productsTable.id,
        set: productValue,
      })

    await db.delete(productImages).where(eq(productImages.productId, product.id))

    const gallery = product.images?.length ? product.images : [product.image]
    if (gallery.length > 0) {
      await db.insert(productImages).values(
        gallery.map((url, index) => ({
          productId: product.id,
          url,
          sortOrder: index,
        }))
      )
    }
  }

  await db
    .insert(adminUsers)
    .values({
      username: 'owner',
      passwordHash,
      isActive: true,
    })
    .onConflictDoUpdate({
      target: adminUsers.username,
      set: {
        passwordHash,
        isActive: true,
        updatedAt: new Date(),
      },
    })
}

seed()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Seed complete')
    process.exit(0)
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Seed failed', err)
    process.exit(1)
  })

