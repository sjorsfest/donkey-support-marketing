import type { Route } from "./+types/crypto-web3"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { CryptoWeb3Hero } from "~/components/sections/crypto-web3-hero"
import { CryptoWeb3Benefits } from "~/components/sections/crypto-web3-benefits"
import {
  buildBreadcrumbJsonLd,
  buildJsonLdGraph,
  buildMeta,
  buildSoftwareApplicationJsonLd,
} from "~/lib/seo"
import {
  Credibility,
  HowItWorks,
  Integrations,
  Pricing,
  FinalCTA
} from "~/components/sections"

const PAGE_PATH = "/crypto-web3"
const PAGE_TITLE = "Token-Gated Support for Crypto & Web3 | Donkey Support"
const PAGE_DESCRIPTION =
  "Telegram-native support for crypto projects and DAOs. Verify token holders, reply from Telegram, scale your community support."

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    path: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  })
}

export default function CryptoWeb3Page() {
  const structuredData = buildJsonLdGraph(
    buildSoftwareApplicationJsonLd({
      path: PAGE_PATH,
      description: PAGE_DESCRIPTION,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Crypto & Web3", path: PAGE_PATH },
    ]),
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
        <CryptoWeb3Hero />
        <Credibility />
        <CryptoWeb3Benefits />
        <HowItWorks />
        <Integrations />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
