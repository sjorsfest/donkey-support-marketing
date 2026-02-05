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
    description: "Everything you need to get started",
    monthlyPrice: 0,
    features: [
      "Slack, Discord, or Telegram integration",
      "Basic widget customization",
      "Visitor identification",
      "Up to 3 domains",
      "Unlimited tickets",
      "\"Powered by Donkey Support\" badge",
    ],
    badge: "Free forever",
    cta: "Start free",
  },
  {
    name: "Pro Monthly",
    tier: "pro",
    description: "For builders who want more control",
    monthlyPrice: 2.99,
    promoPrice: 0.99,
    features: [
      "Everything in Freemium",
      "Unlimited domains",
      "No widget branding",
      "Webhooks",
      "Extended customization (operator images)",
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
      "Priority support",
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
