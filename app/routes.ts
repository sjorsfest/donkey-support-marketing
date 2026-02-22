import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("discord-communities", "routes/discord-communities.tsx"),
  route("open-source", "routes/open-source.tsx"),
  route("indie-games", "routes/indie-games.tsx"),
  route("agencies", "routes/agencies.tsx"),
  route("non-technical-founders", "routes/non-technical-founders.tsx"),
  route("tos", "routes/tos.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("go", "routes/go.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("llms.txt", "routes/llms[.]txt.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
] satisfies RouteConfig;
