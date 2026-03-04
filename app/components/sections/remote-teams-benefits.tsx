import { Card, CardContent } from "~/components/ui/card"
import { FadeIn, StaggerContainer, StaggerItem } from "~/components/motion"

const benefits = [
  {
    icon: "💬",
    title: "Native Slack Threads",
    description: "Every customer question becomes a Slack thread. Tag teammates, add context, resolve together - all in the tool you live in."
  },
  {
    icon: "🌍",
    title: "Async-First Workflow",
    description: "Built for distributed teams across timezones. Handoffs are seamless, context never gets lost, everyone stays in sync."
  },
  {
    icon: "📬",
    title: "Never Miss Follow-Ups",
    description: "Automatic email notifications when customers don't see your replies. Close the loop even when they're offline."
  },
  {
    icon: "💰",
    title: "No Per-Seat Pricing",
    description: "Scale your remote team without scaling support costs. One flat price for unlimited Slack users."
  }
]

export function RemoteTeamsBenefits() {
  return (
    <section className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why remote teams{" "}
            <span className="text-pink-500">love it</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Support that works for distributed teams across every timezone.
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
