import type { Route } from "./+types/non-technical-founders"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { NonTechnicalFoundersHero } from "~/components/sections/non-technical-founders-hero"
import { NonTechnicalFoundersBenefits } from "~/components/sections/non-technical-founders-benefits"
import {
  Credibility,
  HowItWorks,
  Integrations,
  Pricing,
  FinalCTA
} from "~/components/sections"

const SITE_URL = "https://www.donkey.support"
const PAGE_PATH = "/non-technical-founders"
const SOCIAL_IMAGE = `${SITE_URL}/og/og-image.png?v=3`

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Simple Support Software for Non-Technical Founders | Donkey Support" },
    {
      name: "description",
      content: "No-code support widget for non-technical SaaS founders. Reply from Discord/Slack, automatic follow-ups, flat pricing. 5-minute setup."
    },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}${PAGE_PATH}` },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Donkey Support" },
    { property: "og:title", content: "Simple Support Software for Non-Technical Founders | Donkey Support" },
    {
      property: "og:description",
      content: "No-code support widget for non-technical SaaS founders. Reply from Discord/Slack, automatic follow-ups, flat pricing. 5-minute setup."
    },
    { property: "og:url", content: `${SITE_URL}${PAGE_PATH}` },
    { property: "og:image", content: SOCIAL_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Simple Support Software for Non-Technical Founders | Donkey Support" },
    {
      name: "twitter:description",
      content: "No-code support widget for non-technical SaaS founders. Reply from Discord/Slack, automatic follow-ups, flat pricing. 5-minute setup."
    },
    { name: "twitter:image", content: SOCIAL_IMAGE },
  ]
}

export default function NonTechnicalFoundersPage() {
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
            description: "No-code support widget for non-technical SaaS founders. Reply from Discord or Slack, automatic follow-ups, flat pricing.",
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
