// Catch-all 404 route
// Without this, unknown URLs (bot noise, dead links) render the root
// ErrorBoundary with no cache headers, so every hit is a fresh function
// invocation. This route returns a proper 404 that the edge can cache.

import { data } from "react-router"
import type { Route } from "./+types/$"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"

const HTML_CACHE_CONTROL =
  "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"

export function loader() {
  return data(null, { status: 404 })
}

export function headers() {
  return {
    "Cache-Control": HTML_CACHE_CONTROL,
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Page Not Found | Donkey Support" },
    { name: "robots", content: "noindex" },
  ]
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-5xl font-bold mb-4">404</h1>
            <p className="text-lg text-foreground/70 mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <a
              href="/"
              className="inline-block text-pink-500 hover:text-pink-600 font-semibold transition-colors"
            >
              ← Back to the homepage
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
