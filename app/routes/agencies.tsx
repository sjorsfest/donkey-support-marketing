import type { Route } from "./+types/agencies"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { AgenciesHero } from "~/components/sections/agencies-hero"
import { AgenciesBenefits } from "~/components/sections/agencies-benefits"
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

const PAGE_PATH = "/agencies"
const PAGE_TITLE = "White Label Support Software for Agencies | Donkey Support"
const PAGE_DESCRIPTION =
  "Unbranded support widget for agency client work. Flat pricing, multi-client support, and replies from Slack or Discord."

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    path: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  })
}

export default function AgenciesPage() {
  const structuredData = buildJsonLdGraph(
    buildSoftwareApplicationJsonLd({
      path: PAGE_PATH,
      description: PAGE_DESCRIPTION,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Agencies", path: PAGE_PATH },
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
        <AgenciesHero />
        <Credibility />
        <AgenciesBenefits />
        <HowItWorks />
        <Integrations />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
