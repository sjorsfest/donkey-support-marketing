import { Pool } from "pg"

const CONNECTION_ENV_KEYS = [
  "DATABASE_POSTGRES_URL",
  "DATABASE_URL",
  "POSTGRES_URL",
  "DATABASE_POSTGRES_URL_NON_POOLING",
] as const

let pool: Pool | null = null

function getConnectionString() {
  for (const key of CONNECTION_ENV_KEYS) {
    const value = process.env[key]
    if (value) return value
  }

  throw new Error(
    `Missing Postgres connection string. Set one of: ${CONNECTION_ENV_KEYS.join(", ")}`,
  )
}

export function getDbPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: getConnectionString(),
    })
  }

  return pool
}

export async function pingDatabase() {
  await getDbPool().query("SELECT NOW()")
}
