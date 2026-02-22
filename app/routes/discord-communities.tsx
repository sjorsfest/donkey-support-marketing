import type { Route } from "./+types/discord-communities"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { DiscordCommunitiesHero } from "~/components/sections/discord-communities-hero"
import { DiscordCommunitiesBenefits } from "~/components/sections/discord-communities-benefits"
import {
  Credibility,
  HowItWorks,
  Integrations,
  Pricing,
  FinalCTA
} from "~/components/sections"

const SITE_URL = "https://www.donkey.support"
const PAGE_PATH = "/discord-communities"
const SOCIAL_IMAGE = `${SITE_URL}/og/og-image.png?v=3`

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Discord Community Support Software | Donkey Support" },
    {
      name: "description",
      content: "Support tool built for Discord communities. Reply from Discord, automatic email follow-ups, verified member context. Free forever plan."
    },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}${PAGE_PATH}` },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Donkey Support" },
    { property: "og:title", content: "Discord Community Support Software | Donkey Support" },
    {
      property: "og:description",
      content: "Support tool built for Discord communities. Reply from Discord, automatic email follow-ups, verified member context. Free forever plan."
    },
    { property: "og:url", content: `${SITE_URL}${PAGE_PATH}` },
    { property: "og:image", content: SOCIAL_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Discord Community Support Software | Donkey Support" },
    {
      name: "twitter:description",
      content: "Support tool built for Discord communities. Reply from Discord, automatic email follow-ups, verified member context. Free forever plan."
    },
    { name: "twitter:image", content: SOCIAL_IMAGE },
  ]
}

export default function DiscordCommunitiesPage() {
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
            description: "Support tool built for Discord communities. Reply from Discord, automatic email follow-ups, verified member context.",
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
