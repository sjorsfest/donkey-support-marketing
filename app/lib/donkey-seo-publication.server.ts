// Article Publication Service
// Handles the full publication workflow for Donkey SEO articles

import { getDbPool } from "~/lib/db.server"
import { getDonkeySeoClient } from "~/lib/donkey-seo-client.server"
import { uploadImageToR2 } from "~/lib/r2.server"
import { CANONICAL_ORIGIN } from "~/lib/seo"
import type { ModularBlock, ModularDocument } from "~/lib/donkey-seo-client.server"

/**
 * Webhook article payload structure
 */
export interface WebhookArticlePayload {
  event_id: string
  event_type: string
  occurred_at: string
  project: {
    id: string
    domain: string
    locale: string
  }
  article: {
    article_id: string
    brief_id: string
    version_number: number
    title: string
    slug: string
    primary_keyword: string
    proposed_publication_date?: string | null
  }
  modular_document: ModularDocument
  rendered_html?: string
}

/**
 * Download image from URL and upload to R2
 */
async function downloadAndUploadImage(
  imageUrl: string,
  keyPrefix: string
): Promise<string> {
  try {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get("content-type") || "image/jpeg"
    const buffer = Buffer.from(await response.arrayBuffer())

    const result = await uploadImageToR2({
      body: buffer,
      contentType,
      keyPrefix,
    })

    return result.publicUrl
  } catch (error) {
    console.error(`Failed to process image ${imageUrl}:`, error)
    throw error
  }
}

/**
 * Process images in modular_document blocks
 * Downloads signed URLs and replaces with stable R2 URLs
 */
async function processBlockImages(
  blocks: ModularBlock[],
  keyPrefix: string
): Promise<ModularBlock[]> {
  const processedBlocks: ModularBlock[] = []

  for (const block of blocks) {
    const processedBlock = { ...block }

    // Process hero block image
    if (block.block_type === "hero" && block.image) {
      const imageData = block.image as { url?: string; alt_text?: string }
      if (imageData.url && imageData.url.startsWith("http")) {
        try {
          const publicUrl = await downloadAndUploadImage(imageData.url, keyPrefix)
          processedBlock.image = {
            ...imageData,
            url: publicUrl,
          }
        } catch (error) {
          console.error("Failed to process hero image:", error)
          // Keep original URL if processing fails
        }
      }
    }

    // Process comparison table images
    if (block.block_type === "comparison_table" && Array.isArray(block.items)) {
      processedBlock.items = await Promise.all(
        block.items.map(async (item: unknown) => {
          if (
            typeof item === "object" &&
            item !== null &&
            "image" in item &&
            typeof item.image === "object" &&
            item.image !== null &&
            "url" in item.image &&
            typeof item.image.url === "string" &&
            item.image.url.startsWith("http")
          ) {
            try {
              const publicUrl = await downloadAndUploadImage(item.image.url, keyPrefix)
              return {
                ...item,
                image: {
                  ...item.image,
                  url: publicUrl,
                },
              }
            } catch (error) {
              console.error("Failed to process comparison item image:", error)
              return item
            }
          }
          return item
        })
      )
    }

    processedBlocks.push(processedBlock)
  }

  return processedBlocks
}

/**
 * Extract article metadata from webhook payload
 */
function extractArticleMetadata(payload: WebhookArticlePayload) {
  const { modular_document, article } = payload

  // Extract SEO metadata
  const seoMeta = modular_document.seo_meta || {}
  const excerpt = modular_document.blocks
    .find((b) => b.block_type === "summary")
    ?.body?.substring(0, 200)

  // Extract pillar information from primary_pillar if present
  let pillarId: string | null = null
  let pillarSlug: string | null = null
  let pillarName: string | null = null

  // Note: Pillar info comes from the article metadata if enriched by the API
  // For now, we'll leave these null and can populate from separate pillar sync

  return {
    article_id: article.article_id,
    project_id: payload.project.id,
    slug: article.slug,
    title: article.title,
    excerpt: excerpt || null,
    seo_title: seoMeta.meta_title || article.title,
    seo_description: seoMeta.meta_description || excerpt || null,
    seo_h1: seoMeta.h1 || article.title,
    primary_keyword: article.primary_keyword,
    pillar_id: pillarId,
    pillar_slug: pillarSlug,
    pillar_name: pillarName,
    proposed_publication_date: article.proposed_publication_date || null,
  }
}

/**
 * Main publication workflow
 * Processes webhook payload and publishes article
 */
export async function processArticlePublication(
  eventId: string,
  payload: WebhookArticlePayload
): Promise<void> {
  const pool = getDbPool()
  const client = getDonkeySeoClient()

  try {
    console.log(`[Donkey SEO] Processing article publication: ${payload.article.article_id}`)

    const keyPrefix = `blog/${payload.article.slug}`

    // 1. Process featured image
    let featuredImageUrl: string | null = null
    let featuredImageAlt: string | null = null

    if (payload.modular_document.featured_image) {
      const featuredImage = payload.modular_document.featured_image
      if (featuredImage.signed_url) {
        try {
          featuredImageUrl = await downloadAndUploadImage(
            featuredImage.signed_url,
            keyPrefix
          )
          featuredImageAlt = featuredImage.title_text || null
        } catch (error) {
          console.error("[Donkey SEO] Failed to upload featured image:", error)
          // Continue anyway - featured image is optional
        }
      }
    }

    // 2. Process author profile image
    if (payload.modular_document.author?.profile_image?.signed_url) {
      try {
        const authorImageUrl = await downloadAndUploadImage(
          payload.modular_document.author.profile_image.signed_url,
          `authors/${payload.modular_document.author.id || "unknown"}`
        )
        // Update the author profile image URL in the document
        payload.modular_document.author.profile_image = {
          ...payload.modular_document.author.profile_image,
          signed_url: authorImageUrl,
        }
      } catch (error) {
        console.error("[Donkey SEO] Failed to upload author image:", error)
      }
    }

    // 3. Process block images
    const processedBlocks = await processBlockImages(
      payload.modular_document.blocks,
      keyPrefix
    )

    // 4. Update modular_document with processed blocks
    const processedDocument: ModularDocument = {
      ...payload.modular_document,
      blocks: processedBlocks,
    }

    // 5. Extract article metadata
    const metadata = extractArticleMetadata(payload)

    // 6. Store article in database (upsert)
    await pool.query(
      `INSERT INTO donkey_articles (
        article_id, project_id, slug, title, excerpt,
        seo_title, seo_description, seo_h1, primary_keyword,
        featured_image_url, featured_image_alt,
        pillar_id, pillar_slug, pillar_name,
        webhook_payload, publish_status, published_at, proposed_publication_date,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), $17, NOW(), NOW())
      ON CONFLICT (article_id) DO UPDATE SET
        project_id = EXCLUDED.project_id,
        slug = EXCLUDED.slug,
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        seo_title = EXCLUDED.seo_title,
        seo_description = EXCLUDED.seo_description,
        seo_h1 = EXCLUDED.seo_h1,
        primary_keyword = EXCLUDED.primary_keyword,
        featured_image_url = EXCLUDED.featured_image_url,
        featured_image_alt = EXCLUDED.featured_image_alt,
        pillar_id = EXCLUDED.pillar_id,
        pillar_slug = EXCLUDED.pillar_slug,
        pillar_name = EXCLUDED.pillar_name,
        webhook_payload = EXCLUDED.webhook_payload,
        publish_status = EXCLUDED.publish_status,
        published_at = EXCLUDED.published_at,
        proposed_publication_date = EXCLUDED.proposed_publication_date,
        updated_at = NOW()`,
      [
        metadata.article_id,
        metadata.project_id,
        metadata.slug,
        metadata.title,
        metadata.excerpt,
        metadata.seo_title,
        metadata.seo_description,
        metadata.seo_h1,
        metadata.primary_keyword,
        featuredImageUrl,
        featuredImageAlt,
        metadata.pillar_id,
        metadata.pillar_slug,
        metadata.pillar_name,
        JSON.stringify({ ...payload, modular_document: processedDocument }),
        "published",
        metadata.proposed_publication_date,
      ]
    )

    // 7. Notify Donkey SEO of successful publication
    const publishedUrl = `${CANONICAL_ORIGIN}/blog/${metadata.slug}`
    await client.patchPublicationStatus(metadata.article_id, {
      publish_status: "published",
      published_at: new Date().toISOString(),
      published_url: publishedUrl,
    })

    // 8. Mark webhook event as processed
    await pool.query(
      `UPDATE donkey_webhook_events
       SET processed = true, processed_at = NOW()
       WHERE event_id = $1`,
      [eventId]
    )

    console.log(`[Donkey SEO] Successfully published article: ${metadata.slug}`)
  } catch (error) {
    console.error(
      `[Donkey SEO] Failed to publish article ${payload.article.article_id}:`,
      error
    )

    // Store error in webhook event
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    await pool.query(
      `UPDATE donkey_webhook_events
       SET processed = true, processed_at = NOW(), error_message = $1
       WHERE event_id = $2`,
      [errorMessage, eventId]
    )

    // Update article status to failed
    await pool.query(
      `INSERT INTO donkey_articles (
        article_id, project_id, slug, title, webhook_payload, publish_status
      ) VALUES ($1, $2, $3, $4, $5, 'failed')
      ON CONFLICT (article_id) DO UPDATE SET
        publish_status = 'failed',
        updated_at = NOW()`,
      [
        payload.article.article_id,
        payload.project.id,
        payload.article.slug,
        payload.article.title,
        JSON.stringify(payload),
      ]
    )

    // Notify Donkey SEO of failure
    try {
      await client.patchPublicationStatus(payload.article.article_id, {
        publish_status: "failed",
      })
    } catch (notifyError) {
      console.error("[Donkey SEO] Failed to notify publication failure:", notifyError)
    }

    throw error
  }
}
