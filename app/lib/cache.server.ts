// Redis cache layer with TTL
// All data is cached in Redis; falls back to fetcher function on cache miss

import Redis from "ioredis"

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
  const client = getRedis()

  // Try to get from Redis
  const cached = await client.get(key)
  if (cached !== null) {
    return JSON.parse(cached) as T
  }

  // Cache miss — execute function
  const result = await fn()

  // Store in Redis with TTL
  await client.set(key, JSON.stringify(result), "EX", ttlSeconds)

  return result
}

/**
 * Delete a specific cache key
 */
export async function deleteCache(key: string): Promise<void> {
  const client = getRedis()
  await client.del(key)
}

/**
 * Delete all cache keys matching a pattern (e.g. "articles:*")
 */
export async function deleteCachePattern(pattern: string): Promise<void> {
  const client = getRedis()
  const keys = await client.keys(pattern)
  if (keys.length > 0) {
    await client.del(...keys)
  }
}
