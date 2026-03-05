export interface MarketingPillar {
  slug: "blog" | "tools" | "guides"
  name: string
  description: string
  path: string
}

const MARKETING_PILLARS: MarketingPillar[] = [
  {
    slug: "blog",
    name: "Blog",
    description: "All published articles",
    path: "/blog",
  },
  {
    slug: "tools",
    name: "Tools",
    description: "Articles about tools and workflows",
    path: "/pillars/tools",
  },
  {
    slug: "guides",
    name: "Guides",
    description: "How-to articles and practical guides",
    path: "/pillars/guides",
  },
]

export function getMarketingPillars(): MarketingPillar[] {
  return MARKETING_PILLARS
}

export function getMarketingPillarBySlug(
  slug: string
): MarketingPillar | undefined {
  return MARKETING_PILLARS.find((pillar) => pillar.slug === slug)
}

export function getPillarPathBySlug(slug: string | null | undefined): string | null {
  if (!slug) {
    return null
  }

  const pillar = getMarketingPillarBySlug(slug)
  if (pillar) {
    return pillar.path
  }

  return `/pillars/${slug}`
}
