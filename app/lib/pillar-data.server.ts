// Pillar Data Access Layer
// Handles all database queries for pillar categories

import { sql } from "drizzle-orm"
import { getDb } from "~/lib/db.server"
import { withCache } from "~/lib/cache.server"

// Cache TTLs (in seconds)
const PILLAR_CACHE_TTL = 300 // 5 minutes - pillars change infrequently
const SITEMAP_CACHE_TTL = 300 // 5 minutes

export interface Pillar {
  pillar_id: string
  slug: string
  name: string
  description: string | null
  seo_title: string | null
  seo_description: string | null
  status: string
  updated_at: string
}

export interface PillarForSitemap {
  slug: string
  updated_at: string
}

/**
 * Get a single active pillar by slug
 * Returns null if not found or not active
 * Cached for 5 minutes
 */
export async function getActivePillarBySlug(slug: string): Promise<Pillar | null> {
  return withCache(`pillar:${slug}`, PILLAR_CACHE_TTL, async () => {
    const db = getDb()

    const result = await db.execute(sql`
      SELECT pillar_id, slug, name, description, seo_title, seo_description
      FROM donkey_pillars
      WHERE slug = ${slug} AND status = 'active'
    `)

    if (result.rows.length === 0) {
      return null
    }

    return result.rows[0] as unknown as Pillar
  })
}

/**
 * Get all active pillars for sitemap generation
 * Cached for 5 minutes
 */
export async function getActivePillarsForSitemap(): Promise<PillarForSitemap[]> {
  return withCache("pillars:sitemap", SITEMAP_CACHE_TTL, async () => {
    const db = getDb()

    const result = await db.execute(sql`
      SELECT slug, updated_at
      FROM donkey_pillars
      WHERE status = 'active'
      ORDER BY name ASC
    `)

    return result.rows as unknown as PillarForSitemap[]
  })
}
