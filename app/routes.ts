import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("tos", "routes/tos.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
] satisfies RouteConfig;
