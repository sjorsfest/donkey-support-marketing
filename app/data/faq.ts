export interface FAQItem {
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    question: "How do I install the widget?",
    answer:
      "Just add a simple script tag to your HTML, or use our React component if you're building with React. It takes less than 5 minutes to get up and running.",
  },
  {
    question: "Can I use both Slack and Discord?",
    answer:
      "You can connect either Slack or Discord - one at a time. This keeps things simple and ensures all your support stays in one place. You can switch between them anytime.",
  },
  {
    question: "How does the Slack/Discord sync work?",
    answer:
      "When a visitor sends a message through the widget, it creates a new thread in your chosen Slack or Discord channel. When you reply in the thread, your response syncs back to the visitor in real-time.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your data is yours. If you cancel, you can export everything. We don't hold your conversations hostage.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "We offer the first 3 months at just $0.99/month so you can try everything risk-free. No credit card tricks - just affordable pricing for indie builders.",
  },
  {
    question: "Can I customize the widget appearance?",
    answer:
      "Yes! You can set your company name, greeting text, and customize the primary and accent colors to match your brand perfectly.",
  },
]
