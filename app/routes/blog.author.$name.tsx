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
        <div className="section-container max-w-5xl">
          {/* Author Header */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <a
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
              >
                <span>←</span>
                <span>Back to Blog</span>
              </a>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900 mb-2 sm:mb-3">
              {authorName}
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              {articles.length} article{articles.length === 1 ? "" : "s"} published
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-6 sm:gap-8 md:gap-10">
            {articles.map((article) => (
              <article
                key={article.article_id}
                className="group bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <a href={`/blog/${article.slug}`} className="block">
                  {article.featured_image_url && (
                    <div className="overflow-hidden aspect-[16/9]">
                      <img
                        src={article.featured_image_url}
                        alt={article.featured_image_alt || article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5 sm:p-6 md:p-8">
                    {article.pillar_name && (
                      <div className="mb-2 sm:mb-3">
                        <span className="inline-block text-xs sm:text-sm font-medium text-pink-500 uppercase tracking-wide">
                          {article.pillar_name}
                        </span>
                      </div>
                    )}
                    <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-gray-900 mb-2 sm:mb-3 group-hover:text-pink-600 transition-colors">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-sm sm:text-base leading-relaxed text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <time dateTime={article.published_at}>
                        {new Date(article.published_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </time>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer pillars={pillars} />
    </>
  )
}
