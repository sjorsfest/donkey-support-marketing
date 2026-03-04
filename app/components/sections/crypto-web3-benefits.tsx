import { Card, CardContent } from "~/components/ui/card"
import { FadeIn, StaggerContainer, StaggerItem } from "~/components/motion"

const benefits = [
  {
    icon: "🔐",
    title: "Token-Gated Verification",
    description: "Verify token holders with signed metadata. Give priority support to your most valuable community members."
  },
  {
    icon: "⚡",
    title: "Telegram-Native",
    description: "Reply directly from your Telegram group. No switching to dashboards during critical moments like launches or market events."
  },
  {
    icon: "🌐",
    title: "Web3-Ready Context",
    description: "See wallet addresses, token holdings, and transaction history right in the support thread. Built for crypto workflows."
  },
  {
    icon: "💰",
    title: "Community-Scale Pricing",
    description: "Flat pricing for unlimited admins and moderators. Support thousands of holders without per-seat fees."
  }
]

export function CryptoWeb3Benefits() {
  return (
    <section className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why crypto communities{" "}
            <span className="text-pink-500">love it</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Token-gated support that lives where your community already is.
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
