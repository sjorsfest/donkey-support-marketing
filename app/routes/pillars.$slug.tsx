// Pillar Disambiguation Page
// Displays all articles in a specific pillar category

import type { Route } from "./+types/pillars.$slug"
import { data, useOutletContext } from "react-router"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { getAllPublishedArticles, getArticlesByPillar } from "~/lib/blog-data.server"
import { getMarketingPillarBySlug } from "~/lib/pillars"
import { buildMeta } from "~/lib/seo"
import type { MarketingPillar } from "~/lib/pillars"

const HTML_CACHE_CONTROL =
  "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"

export async function loader({ params }: Route.LoaderArgs) {
  const pillar = getMarketingPillarBySlug(params.slug)

  if (!pillar) {
    throw data({ message: "Pillar not found" }, { status: 404 })
  }

  const articles =
    params.slug === "blog"
      ? await getAllPublishedArticles()
      : await getArticlesByPillar(params.slug)

  return data(
    { pillar, articles },
    {
      headers: {
        "Cache-Control": HTML_CACHE_CONTROL,
      },
    }
  )
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Pillar Not Found | Donkey Support" }]
  }

  const { pillar } = data

  return buildMeta({
    path: pillar.path,
    title: `${pillar.name} | Donkey Support`,
    description: pillar.description,
  })
}

export default function PillarPage({ loaderData }: Route.ComponentProps) {
  const { pillar, articles } = loaderData
  const { pillars } = useOutletContext<{ pillars: MarketingPillar[] }>()

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="section-container">
          {/* Hero section */}
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="font-display text-5xl font-bold mb-4 text-foreground">
              {pillar.name}
            </h1>
            {pillar.description && (
              <p className="text-xl text-foreground/70">{pillar.description}</p>
            )}
          </div>

          {/* Articles grid */}
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/60">
                No articles in this category yet. Check back soon!
              </p>
              <div className="mt-6">
                <a
                  href="/blog"
                  className="inline-block text-pink-500 hover:text-pink-600 font-medium transition-colors"
                >
                  ← Browse all articles
                </a>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article: {
                article_id: string
                slug: string
                title: string
                excerpt: string | null
                featured_image_url: string | null
                featured_image_alt: string | null
                published_at: string
              }) => (
                <a
                  key={article.article_id}
                  href={`/blog/${article.slug}`}
                  className="group bg-white border-2 border-outline rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  {article.featured_image_url && (
                    <img
                      src={article.featured_image_url}
                      alt={article.featured_image_alt || ""}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="font-display text-2xl font-bold mb-2 group-hover:text-pink-500 transition-colors">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-foreground/70 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="mt-4 text-sm text-foreground/50">
                      {new Date(article.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer pillars={pillars} />
    </>
  )
}
