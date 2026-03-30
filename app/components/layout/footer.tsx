import { useOutletContext } from "react-router"
import { FadeIn } from "~/components/motion"
import { BrandLogo } from "~/components/ui/brand-logo"
import { ExternalBadges } from "./external-badges"
import { getMarketingPillars, type MarketingPillar } from "~/lib/pillars"
import type { BlogArticleSummary } from "~/lib/blog-data.server"

interface FooterProps {
  pillars?: MarketingPillar[]
}

const DEFAULT_PILLARS = getMarketingPillars()
const DONKEY_SEO_URL =
  "https://donkeyseo.io/?utm_source=donkey_support&utm_medium=footer&utm_campaign=partner_referral&utm_content=donkey_seo"
const DONKEY_DIRECTORY_URL =
  "https://donkey.directory/?utm_source=donkey_support&utm_medium=footer&utm_campaign=partner_referral&utm_content=donkey_directory"

export function Footer({ pillars = DEFAULT_PILLARS }: FooterProps) {
  const ctx = useOutletContext<{ pillars: MarketingPillar[]; latestPosts: BlogArticleSummary[] } | null>()
  const latestPosts = ctx?.latestPosts ?? []
  return (
    <footer className="py-12 border-t-2 border-outline/20">
      <div className="section-container">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-8 lg:gap-12">
            {/* Logo & Tagline */}
            <div className="flex flex-col items-center md:items-start gap-2 lg:col-span-2">
              <div className="flex items-center gap-1">
                <BrandLogo
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-10 object-contain"
                />
                <span className="font-display text-lg font-bold text-pink-500 tracking-tight">
                  Donkey Support
                </span>
              </div>
              <p className="text-sm text-muted text-center md:text-left">
                Built with ❤️ for founders doing their own support
              </p>
              <ExternalBadges />
            </div>

            {/* Product */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="text-sm font-bold text-foreground">Product</h3>
              <div className="flex flex-col items-center md:items-start gap-2">
                <a
                  href="/#features"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Features
                </a>
                <a
                  href="/#installation"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Installation
                </a>
                <a
                  href="/#pricing"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="/#faq"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  FAQ
                </a>
              </div>
            </div>

            {/* Solutions */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="text-sm font-bold text-foreground">Solutions</h3>
              <div className="flex flex-col items-center md:items-start gap-2">
                <a
                  href="/vibecoders"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Vibecoders
                </a>
                <a
                  href="/remote-teams"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Remote Teams
                </a>
                <a
                  href="/crypto-web3"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Crypto & Web3
                </a>
                <a
                  href="/developer-tools"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Developer Tools
                </a>
                <a
                  href="/discord-communities"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Discord Communities
                </a>
                <a
                  href="/open-source"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Open Source
                </a>
                <a
                  href="/indie-games"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Indie Games
                </a>
                <a
                  href="/agencies"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Agencies
                </a>
                <a
                  href="/non-technical-founders"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Non-Technical Founders
                </a>
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="text-sm font-bold text-foreground">Legal</h3>
              <div className="flex flex-col items-center md:items-start gap-2">
                <a
                  href="/tos"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/privacy-policy"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/contact"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Partner Tools */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="text-sm font-bold text-foreground">Partner Tools</h3>
              <div className="flex flex-col items-center md:items-start gap-2">
                <a
                  href={DONKEY_SEO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-md border-l-2 border-[#FFCD38] py-0.5 pl-2.5 text-sm font-semibold text-foreground no-underline transition-all duration-200 hover:scale-[1.03] hover:border-l-[3px] hover:bg-[#FFCD38]/15 hover:text-foreground"
                >
                  Donkey SEO
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:scale-110">↗</span>
                </a>
                <a
                  href={DONKEY_DIRECTORY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-md border-l-2 border-[#C3F73A] py-0.5 pl-2.5 text-sm font-semibold text-foreground no-underline transition-all duration-200 hover:scale-[1.03] hover:border-l-[3px] hover:bg-[#C3F73A]/15 hover:text-foreground"
                >
                  Donkey Directories
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:scale-110">↗</span>
                </a>
              </div>
            </div>

            {/* Resources */}
            {pillars.length > 0 && (
              <div className="flex flex-col items-center md:items-start gap-3">
                <h3 className="text-sm font-bold text-foreground">Resources</h3>
                <div className="flex flex-col items-center md:items-start gap-2">
                  {pillars.map((pillar) => (
                    <a
                      key={pillar.slug}
                      href={pillar.path}
                      className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {pillar.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Latest Blog Posts */}
            {latestPosts.length > 0 && (
              <div className="flex flex-col items-center md:items-start gap-3">
                <h3 className="text-sm font-bold text-foreground">Latest Blog Posts</h3>
                <div className="flex flex-col items-center md:items-start gap-2">
                  {latestPosts.map((post) => (
                    <a
                      key={post.article_id}
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {post.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-10 pt-6 border-t border-outline/20">
            <p className="text-sm text-muted text-center md:text-left">
              &copy; {new Date().getFullYear()} Donkey Support
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}
