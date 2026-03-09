import { Card, CardContent } from "~/components/ui/card"
import { FadeIn, StaggerContainer, StaggerItem } from "~/components/motion"

const benefits = [
  {
    icon: "⚡",
    title: "Lightning fast replies",
    description:
      "Reply from Slack, Discord, or Telegram the moment a message comes in. No context switching, no app hopping.",
  },
  {
    icon: "🎯",
    title: "Simple by design",
    description:
      "No complex ticket systems, no bloated dashboards. Just conversations that flow naturally.",
  },
  {
    icon: "📥",
    title: "One inbox",
    description:
      "Keep all your support in the tool you already use every day. Slack, Discord, or Telegram - your choice.",
  },
  {
    icon: "💰",
    title: "Priced for indie founders",
    description:
      "No per-seat pricing. No enterprise minimums. Pay for what you use, not team size.",
  },
]

export function Benefits() {
  return (
    <section className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Built for founders{" "}
            <span className="text-pink-500">doing their own support</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            When you&apos;re building, marketing, AND supporting - you can&apos;t afford to context switch. Stay in your flow, reply from where you already work.
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
