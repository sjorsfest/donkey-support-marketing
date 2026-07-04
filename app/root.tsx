import {
  redirect,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type HeadersArgs,
} from "react-router";
import { Analytics } from "@vercel/analytics/react"
import type { Route } from "./+types/root";
import "./app.css";
import { SupportWidget } from "./components/supportWidget/supportWidget";
import { AppConfigProvider } from "./context/appConfig";
import { getMarketingPillars } from "./lib/pillars";
import { getAllPublishedArticles } from "./lib/blog-data.server";

const MANAGED_HOSTS = new Set(["donkey.support", "www.donkey.support"])
const CANONICAL_HOST = "www.donkey.support"

// Applies to documents rendered from the root error boundary. Thrown 404/410
// responses bubble here and would otherwise lose the cache headers their
// loader attached (every bot hit on a pruned/dead URL would be an uncached
// function invocation). Forwarding errorHeaders keeps each thrown response's
// own policy; unexpected errors (500s) carry none and stay uncached.
export function headers({ errorHeaders }: HeadersArgs) {
  return errorHeaders ?? new Headers()
}

export async function loader({ request }: Route.LoaderArgs) {
  const requestUrl = new URL(request.url)
  if (MANAGED_HOSTS.has(requestUrl.hostname)) {
    let shouldRedirect = false
    if (requestUrl.hostname !== CANONICAL_HOST) {
      requestUrl.hostname = CANONICAL_HOST
      shouldRedirect = true
    }
    if (requestUrl.protocol !== "https:") {
      requestUrl.protocol = "https:"
      shouldRedirect = true
    }
    if (shouldRedirect) {
      return redirect(requestUrl.toString(), 301)
    }
  }

  const pillars = getMarketingPillars()
  // Footer renders 5 titles; fetch with headroom for prune/dedupe, then
  // strip to the fields the footer uses so every page's HTML stays small.
  const articles = await getAllPublishedArticles(30)
  const latestPosts = articles
    .slice(0, 5)
    .map(({ article_id, slug, title }) => ({ article_id, slug, title }))

  return {
    appUrl: process.env.APP_URL ?? "",
    pillars,
    latestPosts,
  };
}

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "shortcut icon", href: "/favicon.ico" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;500;600;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
        <SupportWidget
          accountId="cmko8jp0i0000lo09ghgzcul5"
          deferLoad="idle"
        />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <AppConfigProvider appUrl={loaderData.appUrl}>
      <Outlet context={{ pillars: loaderData.pillars, latestPosts: loaderData.latestPosts }} />
    </AppConfigProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message =
      error.status === 404 ? "404" : error.status === 410 ? "410" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.status === 410
          ? "This page has been permanently removed."
          : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
