import { Card, CardContent } from "~/components/ui/card"
import { FadeIn, StaggerContainer, StaggerItem } from "~/components/motion"

const benefits = [
  {
    icon: "🎉",
    title: "Free Forever",
    description: "Full ticketing workflow on the freemium plan - no credit card, no time limits"
  },
  {
    icon: "📥",
    title: "One Unified Inbox",
    description: "Aggregate support from Discord, Slack, Telegram - reply from anywhere"
  },
  {
    icon: "🔐",
    title: "Verified User Context",
    description: "Signed metadata tokens help verify legitimate users from random visitors"
  },
  {
    icon: "⚡",
    title: "5-Minute Setup",
    description: "Quick integration means you can add support without pulling focus from your project"
  }
]

export function OpenSourceBenefits() {
  return (
    <section className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why maintainers{" "}
            <span className="text-pink-500">love it</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Support tools for open source shouldn&apos;t cost a fortune. We built this for you.
          </p>
        </FadeIn>

        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={0.1}
        >
          {benefits.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <Card hover className="h-full">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 bg-yellow-200 rounded-xl border-2 border-outline shadow-[2px_2px_0_#1a1a1a] flex items-center justify-center mb-4">
                    <span className="text-2xl">{benefit.icon}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
