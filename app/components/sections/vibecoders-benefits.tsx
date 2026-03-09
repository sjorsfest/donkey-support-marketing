import { Card, CardContent } from "~/components/ui/card"
import { FadeIn, StaggerContainer, StaggerItem } from "~/components/motion"

const benefits = [
  {
    icon: "⚡",
    title: "One-Prompt Setup",
    description: "Copy instructions, paste into your AI agent, done. No manual configuration, no reading docs. Your AI handles everything."
  },
  {
    icon: "🤖",
    title: "AI-Native Installation",
    description: "Let Claude Code, Cursor, or any AI coding assistant install and configure it for you. Built for the AI-first workflow."
  },
  {
    icon: "💬",
    title: "Your Choice of Platform",
    description: "Slack, Discord, or Telegram - pick what works for you. Same zero-config AI installation experience across all platforms."
  },
  {
    icon: "🎯",
    title: "Built for Indie Hackers",
    description: "Perfect for founders shipping fast with AI assistance. Reply to support without leaving your coding flow or breaking your momentum."
  }
]

export function VibecodesBenefits() {
  return (
    <section className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why vibecoders{" "}
            <span className="text-pink-500">love it</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Support chat designed for developers who build with AI agents.
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
