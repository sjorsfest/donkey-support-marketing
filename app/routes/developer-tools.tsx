import type { Route } from "./+types/developer-tools"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { DeveloperToolsHero } from "~/components/sections/developer-tools-hero"
import { DeveloperToolsBenefits } from "~/components/sections/developer-tools-benefits"
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

const PAGE_PATH = "/developer-tools"
const PAGE_TITLE = "Developer Support Software | Donkey Support"
const PAGE_DESCRIPTION =
  "Technical support built for dev tools. Code-first conversations in Slack with syntax highlighting and full developer context."

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    path: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  })
}

export default function DeveloperToolsPage() {
  const structuredData = buildJsonLdGraph(
    buildSoftwareApplicationJsonLd({
      path: PAGE_PATH,
      description: PAGE_DESCRIPTION,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Developer Tools", path: PAGE_PATH },
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
        <DeveloperToolsHero />
        <Credibility />
        <DeveloperToolsBenefits />
        <HowItWorks />
        <Integrations />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
