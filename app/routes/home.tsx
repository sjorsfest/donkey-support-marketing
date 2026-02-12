import type { Route } from "./+types/home"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
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

const SITE_URL = "https://www.donkey.support"
const SOCIAL_IMAGE_URL = `${SITE_URL}/og/og-image.png`

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Donkey Support - Customer Support Widget" },
    {
      name: "description",
      content:
        "Support chat that lives in your Discord Server. Reply from Slack, Discord, or Telegram threads, and follow up by email when replies go unseen.",
    },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/` },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Donkey Support" },
    { property: "og:title", content: "Donkey Support - Customer Support Widget" },
    {
      property: "og:description",
      content:
        "Support chat that lives in your Discord Server. Reply from Slack, Discord, or Telegram threads, and follow up by email when replies go unseen.",
    },
    { property: "og:url", content: `${SITE_URL}/` },
    { property: "og:image", content: SOCIAL_IMAGE_URL },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Donkey Support - Customer Support Widget",
    },
    {
      name: "twitter:description",
      content:
        "Support chat that lives in your Discord Server. Reply from Slack, Discord, or Telegram threads, and follow up by email when replies go unseen.",
    },
    { name: "twitter:image", content: SOCIAL_IMAGE_URL },
    { name: "twitter:image:src", content: SOCIAL_IMAGE_URL },
  ]
}

export default function Home() {
  return (
    <>
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
