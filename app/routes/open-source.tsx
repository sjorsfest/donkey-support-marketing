import type { Route } from "./+types/open-source"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { OpenSourceHero } from "~/components/sections/open-source-hero"
import { OpenSourceBenefits } from "~/components/sections/open-source-benefits"
import {
  Credibility,
  HowItWorks,
  Integrations,
  Pricing,
  FinalCTA
} from "~/components/sections"

const SITE_URL = "https://www.donkey.support"
const PAGE_PATH = "/open-source"
const SOCIAL_IMAGE = `${SITE_URL}/og/og-image.png?v=3`

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Free Support Software for Open Source Projects | Donkey Support" },
    {
      name: "description",
      content: "Free support inbox for OSS maintainers. Aggregate questions from Discord/Slack/Telegram. Verify users with signed tokens. Zero budget, zero complexity."
    },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}${PAGE_PATH}` },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Donkey Support" },
    { property: "og:title", content: "Free Support Software for Open Source Projects | Donkey Support" },
    {
      property: "og:description",
      content: "Free support inbox for OSS maintainers. Aggregate questions from Discord/Slack/Telegram. Verify users with signed tokens. Zero budget, zero complexity."
    },
    { property: "og:url", content: `${SITE_URL}${PAGE_PATH}` },
    { property: "og:image", content: SOCIAL_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Free Support Software for Open Source Projects | Donkey Support" },
    {
      name: "twitter:description",
      content: "Free support inbox for OSS maintainers. Aggregate questions from Discord/Slack/Telegram. Verify users with signed tokens. Zero budget, zero complexity."
    },
    { name: "twitter:image", content: SOCIAL_IMAGE },
  ]
}

export default function OpenSourcePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Donkey Support",
            applicationCategory: "BusinessApplication",
            description: "Free support inbox for OSS maintainers. Aggregate questions from Discord, Slack, and Telegram. Verify users with signed tokens.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD"
            }
          })
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
