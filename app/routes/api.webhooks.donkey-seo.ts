// Donkey SEO Webhook Endpoint
// Receives and processes webhook events from Donkey SEO

import type { Route } from "./+types/api.webhooks.donkey-seo"
import { sql } from "drizzle-orm"
import { getDb } from "~/lib/db.server"
import { verifyWebhookSignature } from "~/lib/webhook-verification.server"
import {
  processArticlePublication,
  type WebhookArticlePayload,
} from "~/lib/donkey-seo-publication.server"

/**
 * GET handler - not allowed
 */
export async function loader() {
  return Response.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  )
}

/**
 * POST handler - process webhook events
 */
export async function action({ request }: Route.ActionArgs) {
  // Validate method
  if (request.method !== "POST") {
    return Response.json(
      { ok: false, error: "Method not allowed. Use POST." },
      { status: 405 }
    )
  }

  try {
    // 1. Read raw body for signature verification
    const rawBody = await request.text()

    // 2. Extract headers
    const signature = request.headers.get("x-donkey-signature")
    const timestamp = request.headers.get("x-donkey-timestamp")
    const deliveryId = request.headers.get("x-donkey-delivery-id")

    if (!signature) {
      console.warn("[Donkey SEO Webhook] Missing signature header")
      return Response.json(
        { ok: false, error: "Missing x-donkey-signature header" },
        { status: 401 }
      )
    }

    if (!timestamp) {
      console.warn("[Donkey SEO Webhook] Missing timestamp header")
      return Response.json(
        { ok: false, error: "Missing x-donkey-timestamp header" },
        { status: 401 }
      )
    }

    // 3. Verify signature
    const secret = process.env.DONKEY_SEO_WEBHOOK_SECRET
    if (!secret) {
      console.error("[Donkey SEO Webhook] DONKEY_SEO_WEBHOOK_SECRET not configured")
      return Response.json(
        { ok: false, error: "Server configuration error" },
        { status: 500 }
      )
    }

    const isValid = verifyWebhookSignature(rawBody, signature, timestamp, secret)
    if (!isValid) {
      console.warn("[Donkey SEO Webhook] Invalid signature", {
        deliveryId,
        timestamp,
      })
      return Response.json({ ok: false, error: "Invalid signature" }, { status: 401 })
    }

    // 4. Parse payload
    let payload: WebhookArticlePayload
    try {
      payload = JSON.parse(rawBody)
    } catch (error) {
      console.error("[Donkey SEO Webhook] Failed to parse JSON payload:", error)
      return Response.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 })
    }

    const { event_id, event_type } = payload

    if (!event_id || !event_type) {
      console.warn("[Donkey SEO Webhook] Missing event_id or event_type")
      return Response.json(
        { ok: false, error: "Missing event_id or event_type" },
        { status: 400 }
      )
    }

    console.log(`[Donkey SEO Webhook] Received event: ${event_type} (${event_id})`)

    // 5. Check idempotency
    const db = getDb()
    const existingEvent = await db.execute(sql`
      SELECT event_id, processed, error_message
      FROM donkey_webhook_events
      WHERE event_id = ${event_id}
    `)

    const existingRow = existingEvent.rows[0] as
      | { processed: boolean; error_message: string | null }
      | undefined

    if (existingRow?.processed && !existingRow.error_message) {
      console.log(`[Donkey SEO Webhook] Event ${event_id} already received, skipping`)
      return Response.json({
        ok: true,
        message: "Event already processed",
        event_id,
      })
    }

    // 6. Store event if this is the first delivery
    if (!existingRow) {
      await db.execute(sql`
        INSERT INTO donkey_webhook_events (event_id, event_type, payload, processed)
        VALUES (${event_id}, ${event_type}, ${payload}, false)
      `)
    } else {
      console.log(
        `[Donkey SEO Webhook] Reprocessing existing event ${event_id} (processed=${String(
          existingRow.processed
        )}, had_error=${String(Boolean(existingRow.error_message))})`
      )
    }

    // 7. Process event based on type
    if (event_type === "content.article.publish_requested") {
      // Process publication synchronously so serverless runtimes complete all work
      await processArticlePublication(event_id, payload)

      return Response.json({
        ok: true,
        message: "Publication processed",
        event_id,
      })
    }

    // Unknown event type - mark as processed
    await db.execute(sql`
      UPDATE donkey_webhook_events
      SET processed = true, processed_at = NOW()
      WHERE event_id = ${event_id}
    `)

    console.log(`[Donkey SEO Webhook] Unknown event type: ${event_type}`)
    return Response.json({
      ok: true,
      message: "Event received (unknown type)",
      event_id,
    })
  } catch (error) {
    console.error("[Donkey SEO Webhook] Processing error:", error)
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unexpected error",
      },
      { status: 500 }
    )
  }
}
