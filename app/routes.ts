import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("tos", "routes/tos.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("go", "routes/go.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
] satisfies RouteConfig;
