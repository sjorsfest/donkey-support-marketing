// Redis cache layer with TTL
// All data is cached in Redis; falls back to fetcher function on cache miss.
// A small in-process cache sits in front of Redis: on Fluid compute the
// instance stays warm across requests, so hot keys (e.g. the footer's
// article list) skip the Redis roundtrip and JSON.parse entirely. Nothing
// invalidates keys (pure TTL), so the only cost is up to MEMORY_TTL_MS of
// extra staleness on day-long Redis TTLs.

import Redis from "ioredis"

const MEMORY_TTL_MS = 5 * 60 * 1000
const MEMORY_MAX_ENTRIES = 200
const memoryCache = new Map<string, { value: unknown; expiresAt: number }>()

function getFromMemory(key: string): unknown | undefined {
  const entry = memoryCache.get(key)
  if (!entry) return undefined
  if (entry.expiresAt < Date.now()) {
    memoryCache.delete(key)
    return undefined
  }
  return entry.value
}

function setInMemory(key: string, value: unknown): void {
  if (memoryCache.size >= MEMORY_MAX_ENTRIES) {
    // Maps iterate in insertion order; drop the oldest entry.
    const oldest = memoryCache.keys().next().value
    if (oldest !== undefined) memoryCache.delete(oldest)
  }
  memoryCache.set(key, { value, expiresAt: Date.now() + MEMORY_TTL_MS })
}

let redis: Redis | null = null

function getRedis(): Redis {
  if (!redis) {
    const url = process.env.REDIS_URL
    if (!url) {
      throw new Error("REDIS_URL environment variable is required")
    }
    redis = new Redis(url)
  }
  return redis
}

/**
 * Helper function to cache the result of an async function in Redis.
 * Always reads from Redis first. On miss, executes fn, stores result in Redis with TTL, and returns it.
 */
export async function withCache<T>(
  key: string,
  ttlSeconds: number,
  fn: () => Promise<T>
): Promise<T> {
  const memoryHit = getFromMemory(key)
  if (memoryHit !== undefined) {
    return memoryHit as T
  }

  const client = getRedis()

  // Try to get from Redis
  const cached = await client.get(key)
  if (cached !== null) {
    console.log(`[cache HIT] ${key}`)
    const parsed = JSON.parse(cached) as T
    setInMemory(key, parsed)
    return parsed
  }

  // Cache miss — execute function and store in Redis
  console.log(`[cache MISS] ${key} — fetching from database`)
  const result = await fn()
  await client.set(key, JSON.stringify(result), "EX", ttlSeconds)
  setInMemory(key, result)

  return result
}

/**
 * Delete a specific cache key
 */
export async function deleteCache(key: string): Promise<void> {
  memoryCache.delete(key)
  const client = getRedis()
  await client.del(key)
}

/**
 * Delete all cache keys matching a pattern (e.g. "articles:*")
 */
export async function deleteCachePattern(pattern: string): Promise<void> {
  memoryCache.clear()
  const client = getRedis()
  const keys = await client.keys(pattern)
  if (keys.length > 0) {
    await client.del(...keys)
  }
}
