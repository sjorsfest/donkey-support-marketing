"use client"

import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "~/components/ui/button"
import { BrandLogo } from "~/components/ui/brand-logo"

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`)
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4">
      <div className="section-container">
        <nav className="flex items-center justify-between rounded-2xl px-4 py-3 glass border-2 border-outline shadow-[4px_4px_0_#1a1a1a]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative group">
              <BrandLogo
                width={48}
                height={48}
                decoding="async"
                className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-bounce-subtle" />
            </div>
            <span className="font-display text-3xl font-bold text-pink-500 hidden sm:inline tracking-tight">
              Donkey Support
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("features")}
              className="font-semibold text-foreground/80 hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("integrations")}
              className="font-semibold text-foreground/80 hover:text-foreground transition-colors"
            >
              Integrations
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="font-semibold text-foreground/80 hover:text-foreground transition-colors"
            >
              Pricing
            </button>
          </div>

          {/* CTA */}
          <Button size="sm" asChild>
            <a href="/go?ref=navbar">Get Started</a>
          </Button>
        </nav>
      </div>
    </header>
  )
}
