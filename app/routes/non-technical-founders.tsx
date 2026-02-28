import type { Route } from "./+types/non-technical-founders"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { NonTechnicalFoundersHero } from "~/components/sections/non-technical-founders-hero"
import { NonTechnicalFoundersBenefits } from "~/components/sections/non-technical-founders-benefits"
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

const PAGE_PATH = "/non-technical-founders"
const PAGE_TITLE = "Support Software for Non-Technical Founders | Donkey"
const PAGE_DESCRIPTION =
  "No-code support widget for non-technical SaaS founders. Reply from Discord or Slack with automatic follow-ups and flat pricing."

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    path: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  })
}

export default function NonTechnicalFoundersPage() {
  const structuredData = buildJsonLdGraph(
    buildSoftwareApplicationJsonLd({
      path: PAGE_PATH,
      description: PAGE_DESCRIPTION,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Non-Technical Founders", path: PAGE_PATH },
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
        <NonTechnicalFoundersHero />
        <Credibility />
        <NonTechnicalFoundersBenefits />
        <HowItWorks />
        <Integrations />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
