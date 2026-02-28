"use client"

import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { FadeIn, Float } from "~/components/motion"
import { BrandLogo } from "~/components/ui/brand-logo"

export function FinalCTA() {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20">
      <div className="section-container">
        <FadeIn>
          <Card variant="elevated" className="relative overflow-hidden">
            <CardContent className="py-16 px-8 text-center relative z-10">
              <Float className="flex justify-center items-center" y={6}>
                <BrandLogo
                  width={80}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="w-20 h-20 object-contain mb-4 self-center"
                />
              </Float>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Ready to{" "}
                <span className="text-pink-500">launch</span>?
              </h2>

              <p className="text-lg text-muted max-w-xl mx-auto mb-8">
                Set up your support widget in minutes. Reply from Slack,
                Discord, or Telegram, keep context signed, and automatically
                follow up when visitors miss your reply.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/go?ref=cta">Start free</a>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => scrollToSection("how-it-works")}
                >
                  Learn more
                </Button>
              </div>

              <p className="text-sm text-muted mt-6">
                Or upgrade to Pro from $2.99/mo
              </p>
            </CardContent>

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-yellow-200/30 rounded-full blur-3xl" />
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}
