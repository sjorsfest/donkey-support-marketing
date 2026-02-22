import type { Route } from "./+types/agencies"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { AgenciesHero } from "~/components/sections/agencies-hero"
import { AgenciesBenefits } from "~/components/sections/agencies-benefits"
import {
  Credibility,
  HowItWorks,
  Integrations,
  Pricing,
  FinalCTA
} from "~/components/sections"

const SITE_URL = "https://www.donkey.support"
const PAGE_PATH = "/agencies"
const SOCIAL_IMAGE = `${SITE_URL}/og/og-image.png?v=3`

export function meta({}: Route.MetaArgs) {
  return [
    { title: "White Label Support Software for Agencies | Donkey Support" },
    {
      name: "description",
      content: "Unbranded support widget for agency client work. Flat pricing, multi-client support, reply from Slack/Discord. $2.99/month removes branding."
    },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}${PAGE_PATH}` },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Donkey Support" },
    { property: "og:title", content: "White Label Support Software for Agencies | Donkey Support" },
    {
      property: "og:description",
      content: "Unbranded support widget for agency client work. Flat pricing, multi-client support, reply from Slack/Discord. $2.99/month removes branding."
    },
    { property: "og:url", content: `${SITE_URL}${PAGE_PATH}` },
    { property: "og:image", content: SOCIAL_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "White Label Support Software for Agencies | Donkey Support" },
    {
      name: "twitter:description",
      content: "Unbranded support widget for agency client work. Flat pricing, multi-client support, reply from Slack/Discord. $2.99/month removes branding."
    },
    { name: "twitter:image", content: SOCIAL_IMAGE },
  ]
}

export default function AgenciesPage() {
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
            description: "Unbranded support widget for agency client work. Flat pricing, multi-client support, reply from Slack or Discord.",
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
