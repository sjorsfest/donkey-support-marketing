import type { LoaderFunctionArgs } from "react-router"
import { pingDatabase } from "~/lib/db.server"

export async function loader({}: LoaderFunctionArgs) {
  try {
    await pingDatabase()

    return Response.json({
      ok: true,
      message: "Database connection is working.",
    })
  } catch (error) {
    console.error("Database connection failed:", error)

    return Response.json(
      {
        ok: false,
        error: "Database connection failed.",
      },
      { status: 500 },
    )
  }
}
