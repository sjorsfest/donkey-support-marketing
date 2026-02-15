import type { Route } from "./+types/home"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { faqItems } from "~/data/faq"
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
const SOCIAL_IMAGE_URL = `${SITE_URL}/og/og-image.png?v=3`
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Donkey Support",
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
    },
    {
      "@type": "SoftwareApplication",
      name: "Donkey Support",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description:
        "A lightweight customer support widget for your website. Reply from Slack, Discord, or Telegram threads, and follow up by email when replies go unseen.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
}

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
    { property: "og:image:secure_url", content: SOCIAL_IMAGE_URL },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    {
      property: "og:image:alt",
      content: "Donkey Support customer support widget preview",
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: `${SITE_URL}/` },
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
    {
      name: "twitter:image:alt",
      content: "Donkey Support customer support widget preview",
    },
  ]
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(STRUCTURED_DATA),
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
