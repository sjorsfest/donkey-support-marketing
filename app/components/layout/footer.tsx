import { FadeIn } from "~/components/motion"

export function Footer() {
  return (
    <footer className="py-12 border-t-2 border-outline/20">
      <div className="section-container">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Tagline */}
            <div className="flex flex-col items-center md:items-start gap-2">
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
              <p className="text-sm text-muted">
                Built with ❤️ for indie builders
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-center">
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
              <a
                href="/tos"
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Terms
              </a>
              <a
                href="/privacy-policy"
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Privacy
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} Donkey Support
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}
