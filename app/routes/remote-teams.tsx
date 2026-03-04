import type { Route } from "./+types/remote-teams"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { RemoteTeamsHero } from "~/components/sections/remote-teams-hero"
import { RemoteTeamsBenefits } from "~/components/sections/remote-teams-benefits"
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

const PAGE_PATH = "/remote-teams"
const PAGE_TITLE = "Remote Team Support Software | Donkey Support"
const PAGE_DESCRIPTION =
  "Slack-native customer support for distributed teams. Handle support from where your team works - no timezone chaos, no context switching."

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    path: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  })
}

export default function RemoteTeamsPage() {
  const structuredData = buildJsonLdGraph(
    buildSoftwareApplicationJsonLd({
      path: PAGE_PATH,
      description: PAGE_DESCRIPTION,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Remote Teams", path: PAGE_PATH },
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
        <RemoteTeamsHero />
        <Credibility />
        <RemoteTeamsBenefits />
        <HowItWorks />
        <Integrations />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
