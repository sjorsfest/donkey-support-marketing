import {
  redirect,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Analytics } from "@vercel/analytics/react"
import type { Route } from "./+types/root";
import "./app.css";
import { SupportWidget } from "./components/supportWidget/supportWidget";
import { AppConfigProvider } from "./context/appConfig";

const MANAGED_HOSTS = new Set(["donkey.support", "www.donkey.support"])
const CANONICAL_HOST = "www.donkey.support"

export function loader({ request }: Route.LoaderArgs) {
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

  return {
    appUrl: process.env.APP_URL ?? "",
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
      <Outlet />
    </AppConfigProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
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
