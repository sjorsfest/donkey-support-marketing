// Blog Article Page
// Displays individual article from Donkey SEO

import type { Route } from "./+types/blog.$slug"
import { data, useOutletContext } from "react-router"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { ArticleRenderer } from "~/components/blog/ArticleRenderer"
import { getPublishedArticleBySlug } from "~/lib/blog-data.server"
import { getPillarPathBySlug } from "~/lib/pillars"
import { buildMeta, buildJsonLdGraph, CANONICAL_ORIGIN } from "~/lib/seo"
import type { MarketingPillar } from "~/lib/pillars"

const HTML_CACHE_CONTROL =
  "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"

export async function loader({ params }: Route.LoaderArgs) {
  const article = await getPublishedArticleBySlug(params.slug)

  if (!article) {
    throw data({ message: "Article not found" }, { status: 404 })
  }

  const modularDocument = article.webhook_payload.modular_document

  return data(
    { article, modularDocument },
    {
      headers: {
        "Cache-Control": HTML_CACHE_CONTROL,
      },
    }
  )
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Article Not Found | Donkey Support" }]
  }

  const { article } = data

  return buildMeta({
    path: `/blog/${article.slug}`,
    title: article.seo_title || article.title,
    description:
      article.seo_description ??
      article.excerpt ??
      "Insights and guidance from Donkey Support.",
    ogType: "article",
    socialImagePath: article.featured_image_url ?? undefined,
    socialImageAlt: article.featured_image_alt ?? undefined,
  })
}

export default function BlogArticlePage({ loaderData }: Route.ComponentProps) {
  const { article, modularDocument } = loaderData
  const { pillars } = useOutletContext<{ pillars: MarketingPillar[] }>()
  const pillarPath = getPillarPathBySlug(article.pillar_slug)

  // Use author from modular_document if available, otherwise fallback to organization
  const authorName = modularDocument.author?.name || "Donkey Support"
  const authorType = modularDocument.author?.name ? "Person" : "Organization"

  const structuredData = buildJsonLdGraph({
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: modularDocument.featured_image?.signed_url || article.featured_image_url || `${CANONICAL_ORIGIN}/og/og-image.png`,
    datePublished: article.published_at,
    author: {
      "@type": authorType,
      name: authorName,
      ...(authorType === "Organization" ? { url: CANONICAL_ORIGIN } : {}),
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
      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="section-container max-w-4xl">
          {/* Pillar breadcrumb */}
          {pillarPath && article.pillar_name && (
            <div className="mb-4 sm:mb-5 md:mb-6">
              <a
                href={pillarPath}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
              >
                <span>←</span>
                <span>{article.pillar_name}</span>
              </a>
            </div>
          )}

          {/* Article content */}
          <ArticleRenderer
            document={modularDocument}
            featuredImageUrl={article.featured_image_url}
            featuredImageAlt={article.featured_image_alt}
            publishedAt={article.published_at}
            updatedAt={article.updated_at}
          />

          {/* Back to pillar */}
          {pillarPath && article.pillar_name && (
            <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-7 md:pt-8 border-t-2 border-border">
              <a
                href={pillarPath}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-pink-500 hover:text-pink-600 font-medium transition-colors"
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
