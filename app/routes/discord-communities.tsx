import type { Route } from "./+types/discord-communities"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { DiscordCommunitiesHero } from "~/components/sections/discord-communities-hero"
import { DiscordCommunitiesBenefits } from "~/components/sections/discord-communities-benefits"
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

const PAGE_PATH = "/discord-communities"
const PAGE_TITLE = "Discord Community Support Software | Donkey Support"
const PAGE_DESCRIPTION =
  "Support tool built for Discord communities. Reply from Discord, automatic email follow-ups, and verified member context."

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    path: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  })
}

export default function DiscordCommunitiesPage() {
  const structuredData = buildJsonLdGraph(
    buildSoftwareApplicationJsonLd({
      path: PAGE_PATH,
      description: PAGE_DESCRIPTION,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Discord Communities", path: PAGE_PATH },
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
        <DiscordCommunitiesHero />
        <Credibility />
        <DiscordCommunitiesBenefits />
        <HowItWorks />
        <Integrations />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
