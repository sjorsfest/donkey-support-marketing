export interface PricingPlan {
  name: string
  tier: "freemium" | "pro"
  description: string
  monthlyPrice: number
  yearlyPrice?: number
  promoPrice?: number
  features: string[]
  highlighted?: boolean
  badge?: string
  cta?: string
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Freemium",
    tier: "freemium",
    description: "A seriously capable start, at exactly $0",
    monthlyPrice: 0,
    features: [
      "Full ticketing workflow (tickets, replies, and inbox views)",
      "Connect Slack, Discord, or Telegram",
      "Widget setup + appearance controls (name, greeting, colors)",
      "Office hours and signed widget metadata support",
      "Use up to 3 domains",
      "10 email notifications per month",
      "Donkey branding stays visible",
    ],
    badge: "Free forever",
    cta: "Start free",
  },
  {
    name: "Pro Monthly",
    tier: "pro",
    description: "For teams that want full control (and zero limits)",
    monthlyPrice: 2.99,
    promoPrice: 0.99,
    features: [
      "Everything in Freemium",
      "Unlimited domains",
      "Unlimited email notifications",
      "Remove Donkey branding from widget and emails",
      "Upload your own email logo and widget avatar",
      "Webhooks unlocked for automations",
    ],
    badge: "Most flexible",
    cta: "Go Pro",
  },
  {
    name: "Pro Yearly",
    tier: "pro",
    description: "Best value for committed builders",
    monthlyPrice: 1.67,
    yearlyPrice: 20,
    features: [
      "Everything in Pro Monthly",
      "Same unlimited setup, billed yearly",
      "Save 44% compared to monthly",
    ],
    highlighted: true,
    badge: "Best Value",
    cta: "Save 44% Now",
  },
]

export function calculateSavings(monthly: number, yearly: number): number {
  const yearlyIfMonthly = monthly * 12
  const savings = ((yearlyIfMonthly - yearly) / yearlyIfMonthly) * 100
  return Math.round(savings)
}
