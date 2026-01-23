"use client"

import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { FadeIn, StaggerContainer, StaggerItem, Float } from "~/components/motion"

const features = [
  {
    title: "Widget customization",
    description:
      "Match your brand perfectly. Set your company name, greeting text, and pick primary and accent colors that fit your style.",
    badge: "Branding",
    visual: (
      <div className="relative">
        <div className="bg-white rounded-xl border-2 border-outline shadow-[4px_4px_0_#1a1a1a] p-4 max-w-xs mx-auto">
          <div className="space-y-3">
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
    title: "Visitor identification",
    description:
      "Know who you're talking to. Collect email and name, plus attach custom metadata to show your agents more context.",
    badge: "Context",
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
    title: "Ticket dashboard",
    description:
      "See all conversations in one place. Track open and closed tickets, view message history, and jump straight to Slack threads.",
    badge: "Overview",
    visual: (
      <div className="relative">
        <div className="bg-white rounded-xl border-2 border-outline shadow-[4px_4px_0_#1a1a1a] p-4 max-w-xs mx-auto">
          <div className="space-y-2">
            {["Open", "Closed", "Open"].map((status, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-muted rounded" />
                  <div className="h-2 w-16 bg-foreground/20 rounded" />
                </div>
                <Badge
                  variant={status === "Open" ? "success" : "secondary"}
                  size="sm"
                >
                  {status}
                </Badge>
              </div>
            ))}
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
            Powerful features without the complexity. Built for builders who value simplicity.
          </p>
        </FadeIn>

        <StaggerContainer className="space-y-8" staggerDelay={0.2}>
          {features.map((feature, index) => (
            <StaggerItem key={feature.title}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className={`grid md:grid-cols-2 gap-8 p-8 ${
                      index % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex flex-col justify-center ${
                        index % 2 === 1 ? "md:order-2" : ""
                      }`}
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
