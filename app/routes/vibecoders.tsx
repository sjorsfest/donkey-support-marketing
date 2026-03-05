import type { Route } from "./+types/vibecoders"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { VibecodersHero } from "~/components/sections/vibecoders-hero"
import { VibecodesBenefits } from "~/components/sections/vibecoders-benefits"
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

const PAGE_PATH = "/vibecoders"
const PAGE_TITLE = "Support Chat for AI-First Developers | Donkey Support"
const PAGE_DESCRIPTION =
  "Copy installation instructions, paste into Claude Code or Cursor, done. Support chat that installs itself via AI - built for developers who ship with LLMs."

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    path: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  })
}

export default function VibecodersPage() {
  const structuredData = buildJsonLdGraph(
    buildSoftwareApplicationJsonLd({
      path: PAGE_PATH,
      description: PAGE_DESCRIPTION,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Vibecoders", path: PAGE_PATH },
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
        <VibecodersHero />
        <Credibility />
        <VibecodesBenefits />
        <HowItWorks />
        <Integrations />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
