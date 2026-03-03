// Webhook Signature Verification
// Verifies HMAC SHA256 signatures from Donkey SEO webhooks

import { createHmac, timingSafeEqual } from "node:crypto"

/**
 * Verify webhook signature using HMAC SHA256
 *
 * @param payload - Raw request body as string
 * @param signature - Signature from X-Donkey-Signature header (format: "sha256={hex}")
 * @param timestamp - Timestamp from X-Donkey-Timestamp header
 * @param secret - Webhook signing secret from environment
 * @returns true if signature is valid
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  timestamp: string,
  secret: string
): boolean {
  try {
    // Extract hex digest from "sha256={hex}" format
    const signatureHex = signature.startsWith("sha256=")
      ? signature.slice(7)
      : signature

    // Build message: "{timestamp}.{payload}"
    const message = `${timestamp}.${payload}`

    // Compute HMAC SHA256
    const hmac = createHmac("sha256", secret)
    hmac.update(message)
    const expectedSignature = hmac.digest("hex")

    // Constant-time comparison to prevent timing attacks
    const signatureBuffer = Buffer.from(signatureHex, "hex")
    const expectedBuffer = Buffer.from(expectedSignature, "hex")

    // Buffers must be same length for timingSafeEqual
    if (signatureBuffer.length !== expectedBuffer.length) {
      return false
    }

    return timingSafeEqual(signatureBuffer, expectedBuffer)
  } catch (error) {
    console.error("Webhook signature verification error:", error)
    return false
  }
}
