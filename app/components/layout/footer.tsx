import { FadeIn } from "~/components/motion"
import { BrandLogo } from "~/components/ui/brand-logo"
import { ExternalBadges } from "./external-badges"

export function Footer() {
  return (
    <footer className="py-12 border-t-2 border-outline/20">
      <div className="section-container">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
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
                Built with ❤️ for indie builders
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
              </div>
            </div>
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
