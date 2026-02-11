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

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Donkey Support - Customer Support Widget for Web Apps" },
    {
      name: "description",
      content:
        "The simplest way to add customer support to your web app. Reply from Slack, Discord, or Telegram, with signed metadata and automatic missed-reply email follow-ups.",
    },
    { property: "og:title", content: "Donkey Support - Support Widget for Web Apps" },
    {
      property: "og:description",
      content:
        "Let visitors chat on your website. Get tickets in Slack, Discord, or Telegram threads with signed metadata and automatic missed-reply email follow-ups.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Donkey Support - Customer Support Widget",
    },
    {
      name: "twitter:description",
      content:
        "Support chat for indie builders with signed metadata and automatic missed-reply email follow-ups.",
    },
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
