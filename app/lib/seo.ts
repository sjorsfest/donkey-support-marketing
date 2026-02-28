const CANONICAL_ORIGIN = "https://www.donkey.support"
const DEFAULT_SITE_NAME = "Donkey Support"
const DEFAULT_SOCIAL_IMAGE = "/og/og-image.png?v=3"
const DEFAULT_SOCIAL_IMAGE_ALT = "Donkey Support customer support widget preview"

type MetaLinkTag = {
  tagName: "link"
  rel: "canonical"
  href: string
}

type MetaTitleTag = {
  title: string
}

type MetaNameTag = {
  name: string
  content: string
}

type MetaPropertyTag = {
  property: string
  content: string
}

export type SeoMetaTag = MetaLinkTag | MetaTitleTag | MetaNameTag | MetaPropertyTag

export interface SeoConfig {
  path: string
  title: string
  description: string
  siteName?: string
  ogType?: "website" | "article"
  socialImagePath?: string
  socialImageAlt?: string
  twitterCard?: "summary" | "summary_large_image"
}

type JsonLdRecord = Record<string, unknown>

export interface BreadcrumbItem {
  name: string
  path: string
}

export interface FaqJsonLdItem {
  question: string
  answer: string
}

export interface SoftwareApplicationJsonLdInput {
  description: string
  path?: string
  name?: string
  applicationCategory?: string
  operatingSystem?: string
  price?: string
  priceCurrency?: string
}

function normalizePath(path: string): string {
  if (!path.startsWith("/")) {
    return `/${path}`
  }
  return path
}

function toCanonicalUrl(path: string): string {
  return `${CANONICAL_ORIGIN}${normalizePath(path)}`
}

function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl
  }
  return toCanonicalUrl(pathOrUrl)
}

function withLengthGuardrail(label: string, value: string, maxLength: number): string {
  const normalized = value.replace(/\s+/g, " ").trim()
  if (normalized.length <= maxLength) {
    return normalized
  }

  const trimmed = `${normalized.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`
  if (import.meta.env.DEV) {
    console.warn(`[seo] ${label} exceeded ${maxLength} chars and was trimmed.`, {
      originalLength: normalized.length,
      trimmedLength: trimmed.length,
    })
  }
  return trimmed
}

export function buildMeta(config: SeoConfig): SeoMetaTag[] {
  const siteName = config.siteName ?? DEFAULT_SITE_NAME
  const canonicalUrl = toCanonicalUrl(config.path)
  const title = withLengthGuardrail("title", config.title, 60)
  const description = withLengthGuardrail("description", config.description, 160)
  const socialImage = toAbsoluteUrl(config.socialImagePath ?? DEFAULT_SOCIAL_IMAGE)
  const socialImageAlt = config.socialImageAlt ?? DEFAULT_SOCIAL_IMAGE_ALT
  const twitterCard =
    config.twitterCard ?? (socialImage ? "summary_large_image" : "summary")

  const meta: SeoMetaTag[] = [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    { property: "og:type", content: config.ogType ?? "website" },
    { property: "og:site_name", content: siteName },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonicalUrl },
    { name: "twitter:card", content: twitterCard },
    { name: "twitter:url", content: canonicalUrl },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ]

  if (socialImage) {
    meta.push(
      { property: "og:image", content: socialImage },
      { property: "og:image:secure_url", content: socialImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: socialImageAlt },
      { name: "twitter:image", content: socialImage },
      { name: "twitter:image:src", content: socialImage },
      { name: "twitter:image:alt", content: socialImageAlt },
    )
  }

  return meta
}

export function buildJsonLdGraph(...nodes: JsonLdRecord[]): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  }
}

export function buildOrganizationJsonLd(): JsonLdRecord {
  return {
    "@type": "Organization",
    name: DEFAULT_SITE_NAME,
    url: CANONICAL_ORIGIN,
    logo: `${CANONICAL_ORIGIN}/icon-512.png`,
  }
}

export function buildSoftwareApplicationJsonLd(
  input: SoftwareApplicationJsonLdInput,
): JsonLdRecord {
  return {
    "@type": "SoftwareApplication",
    name: input.name ?? DEFAULT_SITE_NAME,
    applicationCategory: input.applicationCategory ?? "BusinessApplication",
    operatingSystem: input.operatingSystem ?? "Web",
    url: toCanonicalUrl(input.path ?? "/"),
    description: input.description,
    offers: {
      "@type": "Offer",
      price: input.price ?? "0",
      priceCurrency: input.priceCurrency ?? "USD",
    },
  }
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdRecord {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toCanonicalUrl(item.path),
    })),
  }
}

export function buildFaqJsonLd(items: FaqJsonLdItem[]): JsonLdRecord {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export { CANONICAL_ORIGIN }
