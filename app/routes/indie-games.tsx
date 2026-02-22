import type { Route } from "./+types/indie-games"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { IndieGamesHero } from "~/components/sections/indie-games-hero"
import { IndieGamesBenefits } from "~/components/sections/indie-games-benefits"
import {
  Credibility,
  HowItWorks,
  Integrations,
  Pricing,
  FinalCTA
} from "~/components/sections"

const SITE_URL = "https://www.donkey.support"
const PAGE_PATH = "/indie-games"
const SOCIAL_IMAGE = `${SITE_URL}/og/og-image.png?v=3`

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Indie Game Developer Support Software | Donkey Support" },
    {
      name: "description",
      content: "Discord-native support for indie game studios. Centralize bug reports, verify players, ensure followers never miss replies. Built for small teams."
    },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}${PAGE_PATH}` },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Donkey Support" },
    { property: "og:title", content: "Indie Game Developer Support Software | Donkey Support" },
    {
      property: "og:description",
      content: "Discord-native support for indie game studios. Centralize bug reports, verify players, ensure followers never miss replies. Built for small teams."
    },
    { property: "og:url", content: `${SITE_URL}${PAGE_PATH}` },
    { property: "og:image", content: SOCIAL_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Indie Game Developer Support Software | Donkey Support" },
    {
      name: "twitter:description",
      content: "Discord-native support for indie game studios. Centralize bug reports, verify players, ensure followers never miss replies. Built for small teams."
    },
    { name: "twitter:image", content: SOCIAL_IMAGE },
  ]
}

export default function IndieGamesPage() {
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
            description: "Discord-native support for indie game studios. Centralize bug reports, verify players, ensure followers never miss replies.",
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
