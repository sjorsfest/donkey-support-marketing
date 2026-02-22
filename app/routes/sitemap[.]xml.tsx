import type { LoaderFunctionArgs } from "react-router";
import { sitemapLastmodMap } from "~/data/sitemap-lastmod.generated";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const baseUrl = url.origin;

  // List of static routes
  const routes = [
    { path: "/", changefreq: "daily", priority: "1.0" },
    { path: "/discord-communities", changefreq: "weekly", priority: "0.8" },
    { path: "/open-source", changefreq: "weekly", priority: "0.8" },
    { path: "/indie-games", changefreq: "weekly", priority: "0.8" },
    { path: "/agencies", changefreq: "weekly", priority: "0.8" },
    { path: "/non-technical-founders", changefreq: "weekly", priority: "0.8" },
    { path: "/privacy-policy", changefreq: "monthly", priority: "0.5" },
    { path: "/tos", changefreq: "monthly", priority: "0.5" },
  ];

  /* 
     If we had dynamic routes (e.g. blog posts), we would fetch them here.
     const posts = await getPosts();
     const postRoutes = posts.map(post => ({ path: `/blog/${post.slug}`, ... }));
     const allRoutes = [...routes, ...postRoutes];
  */
 
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map((route) => {
      // Clean up path to ensure it doesn't have double slashes if we combine
      const loc = `${baseUrl}${route.path}`; 
      const lastmod = sitemapLastmodMap[route.path];
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
