import { Card, CardContent } from "~/components/ui/card"
import { FadeIn, StaggerContainer, StaggerItem } from "~/components/motion"

const steps = [
  {
    number: "1",
    icon: "📦",
    title: "Embed the widget",
    description:
      "Add a simple script tag or React component to your app. Customize colors and branding to match your style.",
  },
  {
    number: "2",
    icon: "🔗",
    title: "Connect your platform",
    description:
      "Connect Slack, Discord, or Telegram in minutes. Choose your support channel. New tickets become threads automatically.",
  },
  {
    number: "3",
    icon: "💬",
    title: "Reply from threads",
    description:
      "Answer customers right from Slack, Discord, or Telegram. Your replies sync back to the widget in real-time.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Get up and running in minutes, not days. No complex configuration required.
          </p>
        </FadeIn>

        <StaggerContainer
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          staggerDelay={0.15}
        >
          {steps.map((step, index) => (
            <StaggerItem key={step.number}>
              <Card hover className="h-full relative overflow-visible">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-pink-500 rounded-xl border-2 border-outline shadow-[2px_2px_0_#1a1a1a] flex items-center justify-center">
                  <span className="font-display text-lg font-bold text-white">
                    {step.number}
                  </span>
                </div>

                <CardContent className="pt-8 pb-6 px-6">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>

                {/* Connector Line (not on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-7 w-6 border-t-2 border-dashed border-outline/30" />
                )}
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
