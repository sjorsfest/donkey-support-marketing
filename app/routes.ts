import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/db-connection", "routes/api.db-connection.ts"),
  route("api/admin/sync-pillars", "routes/api.admin.sync-pillars.ts"),
  route("api/r2-upload", "routes/api.r2-upload.ts"),
  route("api/webhooks/donkey-seo", "routes/api.webhooks.donkey-seo.ts"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog.$slug.tsx"),
  route("discord-communities", "routes/discord-communities.tsx"),
  route("open-source", "routes/open-source.tsx"),
  route("indie-games", "routes/indie-games.tsx"),
  route("agencies", "routes/agencies.tsx"),
  route("non-technical-founders", "routes/non-technical-founders.tsx"),
  route("pillars/:slug", "routes/pillars.$slug.tsx"),
  route("tos", "routes/tos.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("go", "routes/go.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("llms.txt", "routes/llms[.]txt.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
] satisfies RouteConfig;
