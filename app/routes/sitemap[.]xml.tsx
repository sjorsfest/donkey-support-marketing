import type { LoaderFunctionArgs } from "react-router";
import { sitemapLastmodMap } from "~/data/sitemap-lastmod.generated";
import { getPublishedArticlesForSitemap } from "~/lib/blog-data.server";
import { getActivePillarsForSitemap } from "~/lib/pillar-data.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const baseUrl = url.origin;

  // List of static routes
  const staticRoutes = [
    { path: "/", changefreq: "daily", priority: "1.0" },
    { path: "/discord-communities", changefreq: "weekly", priority: "0.8" },
    { path: "/open-source", changefreq: "weekly", priority: "0.8" },
    { path: "/indie-games", changefreq: "weekly", priority: "0.8" },
    { path: "/agencies", changefreq: "weekly", priority: "0.8" },
    { path: "/non-technical-founders", changefreq: "weekly", priority: "0.8" },
    { path: "/privacy-policy", changefreq: "monthly", priority: "0.5" },
    { path: "/tos", changefreq: "monthly", priority: "0.5" },
  ];

  // Fetch dynamic routes from database
  const articles = await getPublishedArticlesForSitemap();
  const pillars = await getActivePillarsForSitemap();

  const articleRoutes = articles.map((article) => ({
    path: `/blog/${article.slug}`,
    changefreq: "weekly" as const,
    priority: "0.7",
    lastmod: new Date(article.updated_at).toISOString().split("T")[0],
  }));

  const pillarRoutes = pillars.map((pillar) => ({
    path: `/pillars/${pillar.slug}`,
    changefreq: "weekly" as const,
    priority: "0.6",
    lastmod: new Date(pillar.updated_at).toISOString().split("T")[0],
  }));

  // Add blog index if there are articles
  const blogIndexRoute = articles.length > 0
    ? [{ path: "/blog", changefreq: "daily" as const, priority: "0.8" }]
    : [];

  // Combine all routes
  const routes = [...staticRoutes, ...blogIndexRoute, ...articleRoutes, ...pillarRoutes];
 
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map((route) => {
      // Clean up path to ensure it doesn't have double slashes if we combine
      const loc = `${baseUrl}${route.path}`;
      // Use route's lastmod if available, otherwise check sitemapLastmodMap
      const lastmod = "lastmod" in route && route.lastmod
        ? route.lastmod
        : sitemapLastmodMap[route.path];
      const lastmodTag = lastmod ? `\n      <lastmod>${lastmod}</lastmod>` : "";
      return `
    <url>
      <loc>${loc}</loc>${lastmodTag}
      <changefreq>${route.changefreq}</changefreq>
      <priority>${route.priority}</priority>
    </url>`;
    })
    .join("")}
</urlset>
`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
};
