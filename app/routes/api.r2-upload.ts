import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { uploadImageToR2 } from "~/lib/r2.server"

const DEFAULT_MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024

function getMaxImageSizeBytes() {
  const raw = process.env.R2_MAX_IMAGE_SIZE_BYTES
  if (!raw) return DEFAULT_MAX_IMAGE_SIZE_BYTES

  const parsed = Number(raw)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_MAX_IMAGE_SIZE_BYTES
  }

  return parsed
}

export async function loader({}: LoaderFunctionArgs) {
  return Response.json(
    {
      ok: false,
      error: "Method not allowed. Use POST with multipart/form-data.",
    },
    { status: 405 },
  )
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return Response.json(
      {
        ok: false,
        error: "Method not allowed. Use POST.",
      },
      { status: 405 },
    )
  }

  try {
    const formData = await request.formData()
    const image = formData.get("image")

    if (!(image instanceof File)) {
      return Response.json(
        {
          ok: false,
          error: "Missing file. Send multipart/form-data with an 'image' field.",
        },
        { status: 400 },
      )
    }

    if (!image.type) {
      return Response.json(
        {
          ok: false,
          error: "Missing image content type.",
        },
        { status: 400 },
      )
    }

    if (image.size === 0) {
      return Response.json(
        {
          ok: false,
          error: "Image is empty.",
        },
        { status: 400 },
      )
    }

    const maxImageSizeBytes = getMaxImageSizeBytes()
    if (image.size > maxImageSizeBytes) {
      return Response.json(
        {
          ok: false,
          error: `Image too large. Max size is ${maxImageSizeBytes} bytes.`,
        },
        { status: 413 },
      )
    }

    const keyPrefixRaw = formData.get("keyPrefix")
    const keyPrefix =
      typeof keyPrefixRaw === "string" && keyPrefixRaw.trim().length > 0
        ? keyPrefixRaw.trim()
        : "images"

    const body = Buffer.from(await image.arrayBuffer())
    const result = await uploadImageToR2({
      body,
      contentType: image.type,
      keyPrefix,
    })

    return Response.json({
      ok: true,
      key: result.key,
      publicUrl: result.publicUrl,
      contentType: image.type,
      bytes: image.size,
    })
  } catch (error) {
    console.error("R2 upload failed:", error)

    return Response.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unexpected upload error.",
      },
      { status: 500 },
    )
  }
}
