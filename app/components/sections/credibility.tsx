import { FadeIn, StaggerContainer, StaggerItem } from "~/components/motion"

const credibilityItems = [
  { emoji: "⚡", text: "5-min setup" },
  { emoji: "🎯", text: "Built for indie devs" },
  { emoji: "💬", text: "Slack, Discord & Telegram" },
  { emoji: "🚀", text: "Zero bloat" },
]

export function Credibility() {
  return (
    <section className="py-16">
      <div className="section-container">
        <FadeIn>
          <StaggerContainer className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {credibilityItems.map((item, index) => (
              <StaggerItem key={index}>
                <div
                  className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border-2 border-outline shadow-[3px_3px_0_#1a1a1a] hover:shadow-[1px_1px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span className="font-bold text-sm text-foreground">
                    {item.text}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>
      </div>
    </section>
  )
}
