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
      "Yep. You can connect Slack, Discord, or Telegram in a couple clicks. Pick the one your team actually lives in, and keep support flowing there.",
  },
  {
    question: "What's included in the free plan?",
    answer:
      "Freemium is more than a teaser: full ticketing workflow, widget setup, Slack/Discord/Telegram integration, office hours, signed widget metadata, and up to 3 domains. You also get 10 email notifications per month, with Donkey branding visible.",
  },
  {
    question: "What do I get with Pro?",
    answer:
      "Pro removes the caps and polishes the look: unlimited domains, unlimited email notifications, no Donkey branding, custom email logo, custom widget avatar, and access to webhooks. Plus the launch offer is still spicy: first 3 months at $2.99/mo, then $4.99/mo.",
  },
  {
    question: "How does the message sync work?",
    answer:
      "When a visitor sends a message through the widget, it creates a new thread in your chosen Slack, Discord, or Telegram channel. When you reply in the thread, your response syncs back to the visitor in real-time.",
  },
  {
    question: "Can I customize the widget appearance?",
    answer:
      "Absolutely. Freemium gives you company name, greeting text, colors, and embed options. Pro goes further with custom avatar/logo uploads and a fully unbranded widget + email experience.",
  },
]
