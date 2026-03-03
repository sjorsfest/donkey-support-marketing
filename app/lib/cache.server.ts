// Simple in-memory cache with TTL
// Caches data to reduce database queries

interface CacheEntry<T> {
  data: T
  expiresAt: number
}

class MemoryCache {
  private cache: Map<string, CacheEntry<unknown>> = new Map()

  /**
   * Get cached data if it exists and hasn't expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined

    if (!entry) {
      return null
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  /**
   * Set data in cache with TTL in seconds
   */
  set<T>(key: string, data: T, ttlSeconds: number): void {
    const expiresAt = Date.now() + ttlSeconds * 1000

    this.cache.set(key, {
      data,
      expiresAt,
    })
  }

  /**
   * Clear specific cache key
   */
  delete(key: string): void {
    this.cache.delete(key)
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get cache stats (useful for monitoring)
   */
  getStats() {
    const now = Date.now()
    let validEntries = 0
    let expiredEntries = 0

    this.cache.forEach((entry) => {
      if (now > entry.expiresAt) {
        expiredEntries++
      } else {
        validEntries++
      }
    })

    return {
      totalEntries: this.cache.size,
      validEntries,
      expiredEntries,
    }
  }

  /**
   * Clean up expired entries (can be called periodically)
   */
  cleanup(): void {
    const now = Date.now()
    const keysToDelete: string[] = []

    this.cache.forEach((entry, key) => {
      if (now > entry.expiresAt) {
        keysToDelete.push(key)
      }
    })

    keysToDelete.forEach((key) => this.cache.delete(key))
  }
}

// Singleton instance
const cache = new MemoryCache()

// Cleanup expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    cache.cleanup()
  }, 5 * 60 * 1000)
}

export { cache }

/**
 * Helper function to cache the result of an async function
 */
export async function withCache<T>(
  key: string,
  ttlSeconds: number,
  fn: () => Promise<T>
): Promise<T> {
  // Try to get from cache
  const cached = cache.get<T>(key)
  if (cached !== null) {
    return cached
  }

  // If not in cache, execute function
  const result = await fn()

  // Store in cache
  cache.set(key, result, ttlSeconds)

  return result
}
