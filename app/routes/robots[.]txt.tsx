import type { LoaderFunctionArgs } from "react-router";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const baseUrl = url.origin;

  const robotText = `
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`.trim();

  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      // s-maxage is required for Vercel's edge to cache function responses;
      // max-age alone only caches in the browser.
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
