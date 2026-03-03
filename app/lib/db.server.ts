import { sql } from "drizzle-orm"
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

let pool: Pool | null = null
let db: NodePgDatabase | null = null

function getConnectionString() {
  const value = process.env.DATABASE_URL
  if (value) return value

  throw new Error("Missing Postgres connection string. Set DATABASE_URL.")
}

export function getDbPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: getConnectionString(),
    })
  }

  return pool
}

export function getDb() {
  if (!db) {
    db = drizzle(getDbPool())
  }

  return db
}

export async function pingDatabase() {
  await getDb().execute(sql`SELECT NOW()`)
}
