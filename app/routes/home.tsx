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
        "The simplest way to add customer support to your web app. Reply to users from Slack, Discord, or Telegram. Built for indie founders and small teams.",
    },
    { property: "og:title", content: "Donkey Support - Support Widget for Web Apps" },
    {
      property: "og:description",
      content:
        "Let visitors chat on your website. Get tickets in Slack, Discord, or Telegram threads. Reply from where you already work.",
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
        "The simplest way to add customer support to your web app. Built for indie founders.",
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
