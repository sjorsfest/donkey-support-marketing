// Blog Data Access Layer
// Handles all database queries for blog articles

import { sql } from "drizzle-orm"
import { getDb } from "~/lib/db.server"
import { withCache } from "~/lib/cache.server"
import type { ModularDocument } from "~/lib/donkey-seo-client.server"

// Cache TTLs (in seconds)
const ARTICLE_CACHE_TTL = 3600 // 60 minutes
const ARTICLES_LIST_CACHE_TTL = 3600 // 60 minutes
const SITEMAP_CACHE_TTL = 3600 // 60 minutes

export interface BlogArticle {
  article_id: string
  slug: string
  title: string
  excerpt: string | null
  seo_title: string | null
  seo_description: string | null
  seo_h1: string | null
  featured_image_url: string | null
  featured_image_alt: string | null
  pillar_slug: string | null
  pillar_name: string | null
  webhook_payload: {
    modular_document: ModularDocument
  }
  published_at: string
  updated_at: string
}

export interface BlogArticleSummary {
  article_id: string
  slug: string
  title: string
  excerpt: string | null
  featured_image_url: string | null
  featured_image_alt: string | null
  pillar_slug: string | null
  pillar_name: string | null
  published_at: string
}

export interface BlogArticleForSitemap {
  slug: string
  updated_at: string
}

/**
 * Get a single published article by slug
 * Returns null if not found or not published
 * Cached for 2 minutes
 */
export async function getPublishedArticleBySlug(
  slug: string
): Promise<BlogArticle | null> {
  return withCache(`article:${slug}`, ARTICLE_CACHE_TTL, async () => {
    const db = getDb()

    const result = await db.execute(sql`
      SELECT
        article_id, slug, title, excerpt,
        seo_title, seo_description, seo_h1,
        featured_image_url, featured_image_alt,
        pillar_slug, pillar_name,
        webhook_payload, published_at
      FROM donkey_articles
      WHERE slug = ${slug} AND publish_status = 'published'
    `)

    if (result.rows.length === 0) {
      return null
    }

    return result.rows[0] as unknown as BlogArticle
  })
}

/**
 * Get all published articles ordered by publish date (newest first)
 * Cached for 1 minute
 */
export async function getAllPublishedArticles(
  limit?: number
): Promise<BlogArticleSummary[]> {
  const limitClause =
    typeof limit === "number" ? sql`LIMIT ${limit}` : sql``

  return withCache(`articles:all:${limit}`, ARTICLES_LIST_CACHE_TTL, async () => {
    const db = getDb()

    const result = await db.execute(sql`
      SELECT
        article_id, slug, title, excerpt,
        featured_image_url, featured_image_alt,
        pillar_slug, pillar_name, published_at
      FROM donkey_articles
      WHERE publish_status = 'published'
      ORDER BY published_at DESC
      ${limitClause}
    `)

    return result.rows as unknown as BlogArticleSummary[]
  })
}

/**
 * Get all published articles for sitemap generation
 * Cached for 5 minutes
 */
export async function getPublishedArticlesForSitemap(): Promise<
  BlogArticleForSitemap[]
> {
  return withCache("articles:sitemap", SITEMAP_CACHE_TTL, async () => {
    const db = getDb()

    const result = await db.execute(sql`
      SELECT slug, updated_at
      FROM donkey_articles
      WHERE publish_status = 'published'
      ORDER BY published_at DESC
    `)

    return result.rows as unknown as BlogArticleForSitemap[]
  })
}

/**
 * Get articles in a specific pillar
 * Cached for 1 minute
 */
export async function getArticlesByPillar(
  pillarSlug: string
): Promise<BlogArticleSummary[]> {
  return withCache(`articles:pillar:${pillarSlug}`, ARTICLES_LIST_CACHE_TTL, async () => {
    const db = getDb()

    const result = await db.execute(sql`
      SELECT
        article_id, slug, title, excerpt,
        featured_image_url, featured_image_alt, published_at
      FROM donkey_articles
      WHERE pillar_slug = ${pillarSlug} AND publish_status = 'published'
      ORDER BY published_at DESC
    `)

    return result.rows as unknown as BlogArticleSummary[]
  })
}
