import { FadeIn } from "~/components/motion"

export function Footer() {
  return (
    <footer className="py-12 border-t-2 border-outline/20">
      <div className="section-container">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Logo & Tagline */}
            <div className="flex flex-col items-center md:items-start gap-2 lg:col-span-2">
              <div className="flex items-center gap-1">
                <img
                  src="/static/donkey.png"
                  alt="Donkey Support logo"
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
              <div className="flex items-center gap-2 mt-2">
                <a
                  href="https://www.producthunt.com/products/donkey-support?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-donkey-support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1068311&theme=light&t=1769434185538"
                    alt="Featured on Product Hunt"
                    width={120}
                    height={26}
                    loading="lazy"
                    decoding="async"
                    className="w-[120px] h-[26px] object-contain"
                  />
                </a>
                <a
                  href="https://rankinpublic.xyz/products/donkey.support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <img
                    src="https://rankinpublic.xyz/api/badges/badge3.png?site=donkey.support"
                    alt="Featured on RankInPublic"
                    width={120}
                    height={26}
                    loading="lazy"
                    decoding="async"
                    className="w-[120px] h-[26px] object-contain"
                  />
                </a>
                <a
                  href="https://neeed.directory/products/donkey-support?utm_source=donkey-support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <img
                    src="https://neeed.directory/badges/neeed-badge-light.svg"
                    alt="Featured on neeed.directory"
                    width={120}
                    height={26}
                    loading="lazy"
                    decoding="async"
                    className="w-[120px] h-[26px] object-contain"
                  />
                </a>
              </div>
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
