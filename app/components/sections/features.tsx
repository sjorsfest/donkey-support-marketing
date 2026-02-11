"use client"

import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { FadeIn, StaggerContainer, StaggerItem, Float } from "~/components/motion"

const features = [
  {
    title: "Widget customization",
    description:
      "Match your brand perfectly. Set your company name, greeting text, profile picture, and pick primary and accent colors that fit your style.",
    badge: "Branding",
    visual: (
      <div className="relative">
        <div className="bg-white rounded-xl border-2 border-outline shadow-[4px_4px_0_#1a1a1a] p-4 max-w-xs mx-auto">
          <div className="space-y-3">
                        <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <svg className="w-3 h-3 text-gray-500 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
                </svg>
              </div>
              <span className="text-sm font-medium">Profile Picture</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink-500 rounded" />
              <span className="text-sm font-medium">Primary Color</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded" />
              <span className="text-sm font-medium">Accent Color</span>
            </div>

            <div className="h-2 w-full bg-muted rounded" />
            <div className="h-2 w-3/4 bg-muted rounded" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Trusted visitor context",
    description:
      "Know who you're talking to with email, name, and custom metadata. Add a signed metadata token so agents can trust the context they see.",
    badge: "Trust",
    visual: (
      <div className="relative">
        <div className="bg-white rounded-xl border-2 border-outline shadow-[4px_4px_0_#1a1a1a] p-4 max-w-xs mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-pink-100 rounded-full border-2 border-outline flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
            <div>
              <div className="font-semibold text-sm">Sarah Chen</div>
              <div className="text-xs text-muted">sarah@startup.io</div>
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted">Plan:</span>
              <span className="font-medium">Pro</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">User ID:</span>
              <span className="font-mono text-xs">usr_abc123</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Automatic missed-reply follow-ups",
    description:
      "If a visitor doesn't see your agent reply, Donkey Support sends a branded email nudge automatically and tracks delivery status.",
    badge: "Automation",
    visual: (
      <div className="relative">
        <div className="bg-white rounded-xl border-2 border-outline shadow-[4px_4px_0_#1a1a1a] p-2.5 max-w-[220px] mx-auto">
          <div className="text-[12px] text-foreground/80 font-bold mb-2 px-1">Follow-up activity</div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center space-x-3 justify-between px-2 py-1.5 rounded-md border-2 border-yellow-200/80 bg-yellow-50/60">
              <span className="font-semibold text-yellow-900">Agent reply unseen</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-yellow-300 text-yellow-900">
                waiting
              </span>
            </div>
            <div className="flex items-center justify-between px-2 py-1.5 rounded-md border-2 border-blue-200/80 bg-blue-50/60">
              <span className="font-semibold text-blue-900">Email follow-up sent</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-blue-300 text-blue-900">
                sent
              </span>
            </div>
            <div className="flex items-center justify-between px-2 py-1.5 rounded-md border-2 border-green-200/80 bg-green-50/60">
              <span className="font-semibold text-green-900">Delivery logged</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-green-300 text-green-900">
                delivered
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything you need,{" "}
            <span className="text-pink-500">nothing you don&apos;t</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Powerful features without the complexity. Built for builders who
            want simple support and reliable follow-up.
          </p>
        </FadeIn>

        <StaggerContainer className="space-y-8" staggerDelay={0.2}>
          {features.map((feature, index) => (
            <StaggerItem key={feature.title}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className={`grid md:grid-cols-2 gap-8 p-8`}
                  >
                    <div
                      className={`flex flex-col justify-center `}
                    >
                      <Badge variant="secondary" className="mb-4 self-start">
                        {feature.badge}
                      </Badge>
                      <h3 className="font-display text-2xl font-bold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <div
                      className={`flex items-center justify-center ${
                        index % 2 === 1 ? "md:order-1" : ""
                      }`}
                    >
                      <Float delay={index * 0.2} y={6}>
                        {feature.visual}
                      </Float>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
