"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Card, CardContent } from "~/components/ui/card"
import { FadeIn } from "~/components/motion"
import { faqItems } from "~/data/faq"

export function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Frequently asked{" "}
            <span className="text-pink-500">questions</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Got questions? We&apos;ve got answers.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-border last:border-0"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold hover:no-underline py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}
