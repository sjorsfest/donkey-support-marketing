"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { FadeIn, StaggerContainer, StaggerItem } from "~/components/motion"
import { pricingPlans } from "~/data/pricing"

export function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <Badge variant="promo" className="mb-4">
            Launch offer: First 3 months at $0.99/mo
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Simple,{" "}
            <span className="text-pink-500">affordable</span> pricing
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            No per-seat pricing. No hidden fees. Just one low price for everything.
          </p>
        </FadeIn>

        <StaggerContainer
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          staggerDelay={0.15}
        >
          {pricingPlans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div className="relative h-full">
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <Badge
                      variant={plan.highlighted ? "default" : "secondary"}
                    >
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <Card
                  variant={plan.highlighted ? "shiny" : "default"}
                  className={`h-full ${
                    plan.highlighted
                      ? "border-pink-500 ring-2 ring-pink-500/20"
                      : ""
                  }`}
                >
                  <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="text-center flex-1 flex flex-col">
                  {/* Price */}
                  <div className="mb-6">
                    {plan.name === "Monthly" && plan.promoPrice && (
                      <div className="mb-2">
                        <span className="text-sm text-muted line-through">
                          ${plan.monthlyPrice}/mo
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-display font-bold">
                        $
                        {plan.name === "Monthly"
                          ? plan.promoPrice || plan.monthlyPrice
                          : plan.yearlyPrice}
                      </span>
                      <span className="text-muted">
                        /{plan.name === "Monthly" ? "mo" : "year"}
                      </span>
                    </div>
                    {plan.name === "Yearly" && (
                      <p className="text-sm text-pink-500 font-semibold mt-2">
                        Just ${plan.monthlyPrice}/month
                      </p>
                    )}
                    {plan.name === "Monthly" && plan.promoPrice && (
                      <p className="text-sm text-pink-500 font-semibold mt-2">
                        for first 3 months
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 text-left mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant={plan.highlighted ? "default" : "secondary"}
                    size="lg"
                    className="w-full mt-auto"
                    asChild
                  >
                    <a href="/go?ref=pricing">Get started</a>
                  </Button>
                </CardContent>
              </Card>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="text-center mt-8" delay={0.4}>
          <p className="text-sm text-muted">
            Questions? Open a support chat through the widget!
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
