import type { Route } from "./+types/home"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { faqItems } from "~/data/faq"
import {
  buildFaqJsonLd,
  buildJsonLdGraph,
  buildMeta,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
} from "~/lib/seo"
import {
  Hero,
  Credibility,
  HowItWorks,
  Benefits,
  Features,
  Integrations,
  Developer,
  Security,
  Pricing,
  Comparison,
  FAQ,
  FinalCTA,
} from "~/components/sections"

const PAGE_PATH = "/"
const PAGE_TITLE = "Customer Support Widget for Slack & Discord | Donkey"
const PAGE_DESCRIPTION =
  "Support chat that lives in your Discord server. Reply from Slack, Discord, or Telegram threads and follow up by email when replies go unseen."

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    path: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  })
}

export default function Home() {
  const structuredData = buildJsonLdGraph(
    buildOrganizationJsonLd(),
    buildSoftwareApplicationJsonLd({
      path: PAGE_PATH,
      description: PAGE_DESCRIPTION,
    }),
    buildFaqJsonLd(
      faqItems.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    ),
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
        <Hero />
        <Credibility />
        <HowItWorks />
        <Benefits />
        <Features />
        <Integrations />
        <Developer />
        <Security />
        <Pricing />
        <Comparison />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
