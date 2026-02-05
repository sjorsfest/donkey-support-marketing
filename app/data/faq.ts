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
    question: "Can I use multiple platforms like Slack, Discord, and Telegram?",
    answer:
      "You can connect Slack, Discord, or Telegram - one at a time. This keeps things simple and ensures all your support stays in one place. You can switch between them anytime.",
  },
  {
    question: "What's included in the free plan?",
    answer:
      "Freemium includes integration with Slack, Discord, or Telegram, basic widget customization, visitor identification, up to 3 domains, and unlimited tickets. Widgets show a small \"Powered by Donkey Support\" badge.",
  },
  {
    question: "What do I get with Pro?",
    answer:
      "Pro unlocks unlimited domains, removes widget branding, adds webhooks for automation, and extended customization options like operator images. First 3 months at $0.99/mo.",
  },
  {
    question: "How does the message sync work?",
    answer:
      "When a visitor sends a message through the widget, it creates a new thread in your chosen Slack, Discord, or Telegram channel. When you reply in the thread, your response syncs back to the visitor in real-time.",
  },
  {
    question: "Can I customize the widget appearance?",
    answer:
      "Yes! All plans let you set your company name, greeting text, and customize colors. Pro unlocks extended options like adding operator images and removing the Donkey Support badge.",
  },
]
