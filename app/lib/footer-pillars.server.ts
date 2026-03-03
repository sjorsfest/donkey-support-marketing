// Footer Pillars Data Loader
// Fetches active pillars for display in footer

import { getDbPool } from "~/lib/db.server"
import { withCache } from "~/lib/cache.server"

export interface FooterPillar {
  pillar_id: string
  slug: string
  name: string
}

// Cache for 10 minutes - footer pillars change very infrequently
const FOOTER_PILLARS_CACHE_TTL = 600

/**
 * Get active pillars for footer display
 * Ordered by published article count (most popular first)
 * Limited to 6 pillars
 * Cached for 10 minutes
 */
export async function getActivePillars(): Promise<FooterPillar[]> {
  return withCache("pillars:footer", FOOTER_PILLARS_CACHE_TTL, async () => {
    const pool = getDbPool()

    try {
      const result = await pool.query(
        `SELECT pillar_id, slug, name
         FROM donkey_pillars
         WHERE status = 'active'
         ORDER BY published_primary_article_count DESC, name ASC
         LIMIT 6`
      )

      return result.rows
    } catch (error) {
      console.error("[Footer Pillars] Failed to fetch pillars:", error)
      // Return empty array on error to prevent footer from breaking
      return []
    }
  })
}
