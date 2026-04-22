import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

function normalizeConnectionString(url) {
  if (!url) return url
  // Avoid pg warning: normalize legacy sslmode=require to verify-full.
  return url.replace(/sslmode=require/gi, 'sslmode=verify-full')
}

const connectionString = normalizeConnectionString(process.env.DATABASE_URL)

if (!connectionString) {
  throw new Error('DATABASE_URL is missing. Add it to your .env file.')
}

const pool = new Pool({
  connectionString,
})

export const db = drizzle(pool)

