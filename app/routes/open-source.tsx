import type { Route } from "./+types/open-source"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { OpenSourceHero } from "~/components/sections/open-source-hero"
import { OpenSourceBenefits } from "~/components/sections/open-source-benefits"
import {
  buildBreadcrumbJsonLd,
  buildJsonLdGraph,
  buildMeta,
  buildSoftwareApplicationJsonLd,
} from "~/lib/seo"
import {
  Credibility,
  HowItWorks,
  Integrations,
  Pricing,
  FinalCTA
} from "~/components/sections"

const PAGE_PATH = "/open-source"
const PAGE_TITLE = "Open Source Support Software (Free) | Donkey Support"
const PAGE_DESCRIPTION =
  "Free support inbox for open source maintainers. Aggregate questions from Discord, Slack, and Telegram with verified user context."

const HTML_CACHE_CONTROL =
  "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"

export function headers() {
  return {
    "Cache-Control": HTML_CACHE_CONTROL,
  }
}

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    path: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  })
}

export default function OpenSourcePage() {
  const structuredData = buildJsonLdGraph(
    buildSoftwareApplicationJsonLd({
      path: PAGE_PATH,
      description: PAGE_DESCRIPTION,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Open Source", path: PAGE_PATH },
    ]),
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Navbar />
      <main>
        <OpenSourceHero />
        <Credibility />
        <OpenSourceBenefits />
        <HowItWorks />
        <Integrations />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
