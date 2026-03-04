import { Card, CardContent } from "~/components/ui/card"
import { FadeIn, StaggerContainer, StaggerItem } from "~/components/motion"

const benefits = [
  {
    icon: "💻",
    title: "Code-First Support",
    description: "Syntax highlighting, error capturing, and formatted stack traces. Built for technical conversations, not generic tickets."
  },
  {
    icon: "📋",
    title: "Technical Metadata",
    description: "Automatically capture SDK version, framework, browser info, and error context. Debug issues faster with complete technical details."
  },
  {
    icon: "⚡",
    title: "Reply from Slack",
    description: "Your engineering team can help customers without leaving Slack. Share code snippets, API examples, and technical fixes fast."
  },
  {
    icon: "🔐",
    title: "Developer Context",
    description: "See API usage, recent errors, and full developer details right in the thread. Every ticket includes technical context."
  }
]

export function DeveloperToolsBenefits() {
  return (
    <section className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why dev tools{" "}
            <span className="text-pink-500">love it</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Technical support designed for developer-first products.
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
