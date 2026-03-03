// Blog Article Page
// Displays individual article from Donkey SEO

import type { Route } from "./+types/blog.$slug"
import { data, useOutletContext } from "react-router"
import { Navbar } from "~/components/layout/Navbar"
import { Footer } from "~/components/layout/Footer"
import { ArticleRenderer } from "~/components/blog/ArticleRenderer"
import { getPublishedArticleBySlug } from "~/lib/blog-data.server"
import { buildMeta, buildJsonLdGraph, CANONICAL_ORIGIN } from "~/lib/seo"
import type { FooterPillar } from "~/lib/footer-pillars.server"

export async function loader({ params }: Route.LoaderArgs) {
  const article = await getPublishedArticleBySlug(params.slug)

  if (!article) {
    throw data({ message: "Article not found" }, { status: 404 })
  }

  const blocks = article.webhook_payload.modular_document.blocks

  return { article, blocks }
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Article Not Found | Donkey Support" }]
  }

  const { article } = data

  return buildMeta({
    path: `/blog/${article.slug}`,
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    ogType: "article",
    socialImagePath: article.featured_image_url,
    socialImageAlt: article.featured_image_alt,
  })
}

export default function BlogArticlePage({ loaderData }: Route.ComponentProps) {
  const { article, blocks } = loaderData
  const { pillars } = useOutletContext<{ pillars: FooterPillar[] }>()

  const structuredData = buildJsonLdGraph({
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image_url || `${CANONICAL_ORIGIN}/og/og-image.png`,
    datePublished: article.published_at,
    author: {
      "@type": "Organization",
      name: "Donkey Support",
      url: CANONICAL_ORIGIN,
    },
    publisher: {
      "@type": "Organization",
      name: "Donkey Support",
      url: CANONICAL_ORIGIN,
      logo: {
        "@type": "ImageObject",
        url: `${CANONICAL_ORIGIN}/icon-512.png`,
      },
    },
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Navbar />
      <main className="py-20">
        <div className="section-container max-w-4xl">
          {/* Pillar breadcrumb */}
          {article.pillar_slug && article.pillar_name && (
            <div className="mb-6">
              <a
                href={`/pillars/${article.pillar_slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
              >
                <span>←</span>
                <span>{article.pillar_name}</span>
              </a>
            </div>
          )}

          {/* Article content */}
          <ArticleRenderer blocks={blocks} />

          {/* Back to pillar */}
          {article.pillar_slug && article.pillar_name && (
            <div className="mt-12 pt-8 border-t-2 border-border">
              <a
                href={`/pillars/${article.pillar_slug}`}
                className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium transition-colors"
              >
                <span>←</span>
                <span>More articles in {article.pillar_name}</span>
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer pillars={pillars} />
    </>
  )
}
