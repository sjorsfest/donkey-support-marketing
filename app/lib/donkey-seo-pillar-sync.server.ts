// Pillar Sync Service
// Syncs pillar data from Donkey SEO API to local database

import { sql } from "drizzle-orm"
import { getDb } from "~/lib/db.server"
import { getDonkeySeoClient } from "~/lib/donkey-seo-client.server"
import { cache } from "~/lib/cache.server"

function invalidatePillarCaches(pillarSlugs: string[]): void {
  cache.delete("pillars:sitemap")
  cache.delete("pillars:footer")

  for (const slug of pillarSlugs) {
    cache.delete(`pillar:${slug}`)
  }
}

/**
 * Sync pillars from Donkey SEO API to database
 * Fetches all active pillars and upserts into donkey_pillars table
 *
 * @param includeArchived - Whether to include archived pillars
 * @returns Number of pillars synced
 */
export async function syncPillars(includeArchived = false): Promise<number> {
  const db = getDb()
  const client = getDonkeySeoClient()

  try {
    console.log("[Donkey SEO] Starting pillar sync...")

    // Fetch pillars from API
    const { items: pillars } = await client.getPillars(includeArchived)

    console.log(`[Donkey SEO] Fetched ${pillars.length} pillars from API`)

    // Upsert each pillar
    for (const pillar of pillars) {
      await db.execute(sql`
        INSERT INTO donkey_pillars (
          pillar_id, project_id, slug, name, description,
          seo_title, seo_description, status,
          primary_article_count, published_primary_article_count,
          last_synced_at, created_at, updated_at
        ) VALUES (
          ${pillar.id},
          ${pillar.project_id},
          ${pillar.slug},
          ${pillar.name},
          ${pillar.description || null},
          ${pillar.name},
          ${pillar.description || null},
          ${pillar.status},
          ${pillar.primary_article_count},
          ${pillar.published_primary_article_count},
          NOW(),
          NOW(),
          NOW()
        )
        ON CONFLICT (pillar_id) DO UPDATE SET
          project_id = EXCLUDED.project_id,
          slug = EXCLUDED.slug,
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          seo_title = EXCLUDED.seo_title,
          seo_description = EXCLUDED.seo_description,
          status = EXCLUDED.status,
          primary_article_count = EXCLUDED.primary_article_count,
          published_primary_article_count = EXCLUDED.published_primary_article_count,
          last_synced_at = NOW(),
          updated_at = NOW()
      `)
    }

    invalidatePillarCaches(pillars.map((pillar) => pillar.slug))

    console.log(`[Donkey SEO] Successfully synced ${pillars.length} pillars`)
    return pillars.length
  } catch (error) {
    console.error("[Donkey SEO] Failed to sync pillars:", error)
    throw error
  }
}
