# SEO Infra Rollout

This project now enforces canonical host redirects in `app/root.tsx`.
Use this checklist to finish infra-level SEO settings on Cloudflare or your reverse proxy.

## 1) Canonical Redirects

- Redirect `http://donkey.support/*` -> `https://www.donkey.support/:path` (301)
- Redirect `http://www.donkey.support/*` -> `https://www.donkey.support/:path` (301)
- Redirect `https://donkey.support/*` -> `https://www.donkey.support/:path` (301)

## 2) Compression

- Enable `Brotli` for text responses.
- Keep `Gzip` enabled as a fallback.
- Ensure HTML, CSS, JS, JSON, XML, and text MIME types are compressed.

## 3) Caching

Recommended cache policy:

- Hashed assets (`/assets/*`): `Cache-Control: public, max-age=31536000, immutable`
- Static media (`/static/*`, `/og/*`, `/icon-*.png`, `/icon-*.webp`):
  `Cache-Control: public, max-age=31536000, immutable`
- HTML pages: short edge cache with revalidation
  `Cache-Control: public, max-age=0, s-maxage=300, stale-while-revalidate=86400`
- Dynamic text routes (`/robots.txt`, `/sitemap.xml`, `/llms.txt`): keep `max-age=3600`

## 4) Cloudflare Recommendations

- Use "Cache Everything" only with the HTML cache TTL above and bypass for authenticated paths.
- Keep "Always Use HTTPS" enabled.
- Keep "Automatic HTTPS Rewrites" enabled.
- Verify Brotli toggle is enabled in Cloudflare Speed settings.

## 5) Verification

- Confirm redirect chain is exactly one hop to `https://www.donkey.support`.
- Confirm static assets return long-lived cache headers.
- Confirm HTML returns short cache headers.
- Confirm compressed responses via `content-encoding: br` or `gzip`.
