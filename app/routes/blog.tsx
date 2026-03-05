// Blog Index Page
// Displays list of all published articles

import type { Route } from "./+types/blog"
import { data, useOutletContext } from "react-router"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { getAllPublishedArticles } from "~/lib/blog-data.server"
import { buildMeta } from "~/lib/seo"
import type { MarketingPillar } from "~/lib/pillars"

const PAGE_PATH = "/blog"
const PAGE_TITLE = "Blog | Donkey Support"
const PAGE_DESCRIPTION =
  "Insights, guides, and best practices for customer support automation"
const HTML_CACHE_CONTROL =
  "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"

export async function loader() {
  const articles = await getAllPublishedArticles()
  return data(
    { articles },
    {
      headers: {
        "Cache-Control": HTML_CACHE_CONTROL,
      },
    }
  )
}

export function meta() {
  return buildMeta({
    path: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  })
}

export default function BlogIndexPage({ loaderData }: Route.ComponentProps) {
  const { articles } = loaderData
  const { pillars } = useOutletContext<{ pillars: MarketingPillar[] }>()

  return (
    <>
      <Navbar />
      <main className="py-20">
        <div className="section-container">
          {/* Hero section */}
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="font-display text-5xl font-bold mb-4 text-foreground">
              Blog
            </h1>
            <p className="text-xl text-foreground/70">{PAGE_DESCRIPTION}</p>
          </div>

          {/* Articles grid */}
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/60">
                No articles published yet. Check back soon!
              </p>
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
                pillar_name: string | null
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
                    {article.pillar_name && (
                      <span className="text-sm font-medium text-pink-500 mb-2 block">
                        {article.pillar_name}
                      </span>
                    )}
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
