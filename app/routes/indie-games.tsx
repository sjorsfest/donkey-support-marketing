import type { Route } from "./+types/indie-games"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { IndieGamesHero } from "~/components/sections/indie-games-hero"
import { IndieGamesBenefits } from "~/components/sections/indie-games-benefits"
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

const PAGE_PATH = "/indie-games"
const PAGE_TITLE = "Indie Game Developer Support Software | Donkey Support"
const PAGE_DESCRIPTION =
  "Discord-native support for indie game studios. Centralize bug reports, verify players, and keep followers updated when replies are missed."

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    path: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  })
}

export default function IndieGamesPage() {
  const structuredData = buildJsonLdGraph(
    buildSoftwareApplicationJsonLd({
      path: PAGE_PATH,
      description: PAGE_DESCRIPTION,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Indie Games", path: PAGE_PATH },
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
        <IndieGamesHero />
        <Credibility />
        <IndieGamesBenefits />
        <HowItWorks />
        <Integrations />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
