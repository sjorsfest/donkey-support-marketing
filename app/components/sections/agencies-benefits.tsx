import { Card, CardContent } from "~/components/ui/card"
import { FadeIn, StaggerContainer, StaggerItem } from "~/components/motion"

const benefits = [
  {
    icon: "🎨",
    title: "Unbranded Widget",
    description: "Remove all Donkey Support branding for just $2.99/mo - perfect for client work"
  },
  {
    icon: "💰",
    title: "Flat Pricing",
    description: "One price for unlimited client websites - no per-seat pricing killing your margins"
  },
  {
    icon: "💬",
    title: "Reply from Slack/Discord",
    description: "Handle all client support from your existing team chat - no new dashboards to learn"
  },
  {
    icon: "🔒",
    title: "Multi-Tenant Isolation",
    description: "Client data stays separate and secure - professional-grade without enterprise cost"
  }
]

export function AgenciesBenefits() {
  return (
    <section className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why agencies{" "}
            <span className="text-pink-500">love it</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Deliver premium support to clients without premium pricing.
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
