// Author Archive Page
// Displays all articles by a specific author

import type { Route } from "./+types/blog.author.$name"
import { data, useOutletContext } from "react-router"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { getArticlesByAuthor } from "~/lib/blog-data.server"
import { buildMeta } from "~/lib/seo"
import type { MarketingPillar } from "~/lib/pillars"

const HTML_CACHE_CONTROL =
  "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"

export async function loader({ params }: Route.LoaderArgs) {
  const authorName = decodeURIComponent(params.name)
  const articles = await getArticlesByAuthor(authorName)

  if (articles.length === 0) {
    throw data({ message: "Author not found" }, { status: 404 })
  }

  return data(
    { authorName, articles },
    {
      headers: {
        "Cache-Control": HTML_CACHE_CONTROL,
      },
    }
  )
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Author Not Found | Donkey Support" }]
  }

  const { authorName, articles } = data
  const articleCount = articles.length

  return buildMeta({
    path: `/blog/author/${encodeURIComponent(authorName)}`,
    title: `${authorName} - Author at Donkey Support`,
    description: `Read ${articleCount} article${articleCount === 1 ? "" : "s"} by ${authorName} on customer support, help desk optimization, and SaaS best practices.`,
  })
}

export default function AuthorArchivePage({ loaderData }: Route.ComponentProps) {
  const { authorName, articles } = loaderData
  const { pillars } = useOutletContext<{ pillars: MarketingPillar[] }>()

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="section-container">
          {/* Author Header */}
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <a
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
              >
                <span>←</span>
                <span>Back to Blog</span>
              </a>
            </div>
            <h1 className="font-display text-5xl font-bold mb-4 text-foreground">
              {authorName}
            </h1>
            <p className="text-xl text-foreground/70">
              {articles.length} article{articles.length === 1 ? "" : "s"} published
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
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
                    <div className="mb-2">
                      <span className="inline-block text-xs font-medium text-pink-500 uppercase tracking-wide">
                        {article.pillar_name}
                      </span>
                    </div>
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
        </div>
      </main>
      <Footer pillars={pillars} />
    </>
  )
}
