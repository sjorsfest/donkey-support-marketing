export interface PricingPlan {
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  promoPrice?: number
  features: string[]
  highlighted?: boolean
  badge?: string
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Monthly",
    description: "Perfect for trying things out",
    monthlyPrice: 2.99,
    yearlyPrice: 2.99,
    promoPrice: 0.99,
    features: [
      "Slack, Discord, or Telegram integration",
      "Widget customization",
      "Visitor identification",
      "Webhooks",
      "Up to 5 domains",
      "Unlimited tickets",
    ],
    badge: "Flexible",
  },
  {
    name: "Yearly",
    description: "Best value for committed builders",
    monthlyPrice: 1.67,
    yearlyPrice: 20,
    features: [
      "Everything in Monthly",
      "Priority support",
      "Save 44% compared to monthly",
    ],
    highlighted: true,
    badge: "Best Value",
  },
]

export function calculateSavings(monthly: number, yearly: number): number {
  const yearlyIfMonthly = monthly * 12
  const savings = ((yearlyIfMonthly - yearly) / yearlyIfMonthly) * 100
  return Math.round(savings)
}
