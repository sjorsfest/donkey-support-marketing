// Admin Pillar Sync Endpoint
// Manual trigger to sync pillars from Donkey SEO API to database

import type { Route } from "./+types/api.admin.sync-pillars"
import { syncPillars } from "~/lib/donkey-seo-pillar-sync.server"

/**
 * Simple authentication check using bearer token
 */
function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization")
  const expectedToken = process.env.ADMIN_API_TOKEN

  if (!expectedToken) {
    console.error("[Admin Sync] ADMIN_API_TOKEN not configured")
    return false
  }

  return authHeader === `Bearer ${expectedToken}`
}

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
 * POST handler - sync pillars from Donkey SEO
 */
export async function action({ request }: Route.ActionArgs) {
  // Validate method
  if (request.method !== "POST") {
    return Response.json(
      { ok: false, error: "Method not allowed. Use POST." },
      { status: 405 }
    )
  }

  // Authenticate
  if (!isAuthorized(request)) {
    console.warn("[Admin Sync] Unauthorized pillar sync attempt")
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    console.log("[Admin Sync] Starting pillar sync...")
    const syncedCount = await syncPillars()

    return Response.json({
      ok: true,
      synced_count: syncedCount,
      message: `Successfully synced ${syncedCount} pillars`,
    })
  } catch (error) {
    console.error("[Admin Sync] Pillar sync failed:", error)
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Sync failed",
      },
      { status: 500 }
    )
  }
}
