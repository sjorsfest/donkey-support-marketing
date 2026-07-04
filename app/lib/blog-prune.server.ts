// Blog Prune Map
// Editorial prune decisions for published articles (July 2026 cleanup).
// Slugs listed here are removed from every article list (blog index, footer,
// pillar pages, author pages, sitemap) and the article route answers with a
// 301 redirect (consolidation into a stronger duplicate) or 410 Gone
// (off-topic content we want deindexed).
//
// GSC numbers in comments = clicks, impressions, avg position (Jan–Jul 2026).
// To un-prune an article, delete its line and redeploy.

export type BlogPruneAction =
  | { action: "redirect"; to: string }
  | { action: "gone" }

export const BLOG_PRUNE_MAP: Record<string, BlogPruneAction> = {
  // ── 410 Gone: off-topic drift (wrong audience, no surviving related page) ──
  // WorkOS pricing — dev-infra topic, 0 clicks / 345 impr / pos 9.3
  "workos-pricing-2026-transparent-costs-comparison": { action: "gone" },
  // Webhook testing tools — dev tooling, 1 click / 118 impr / pos 22
  "best-webhook-tester-tools-2026": { action: "gone" },
  // Stripe billing mechanics — not customer support
  "stripe-per-seat-pricing": { action: "gone" },
  // Telegram signup how-to — pure drift
  "how-to-sign-up-for-telegram": { action: "gone" },
  // Generic Telegram bot list — not support software
  "best-telegram-bots-list-2026": { action: "gone" },
  // Building bot dashboards — bot-developer audience, not support buyers
  "how-to-build-discord-bot-dashboard": { action: "gone" },
  // Searchers want Discord Inc.'s own support — unfixable intent mismatch
  "how-to-get-discord-support-complete-guide": { action: "gone" },
  // "helpdesk vs zendesk" — nonsense comparison, 0 clicks / 147 impr / pos 66
  "helpdesk-vs-zendesk": { action: "gone" },
  // Vague "indie pricing" guide — no coherent search intent
  "indie-pricing-guide-2026-costs-independent-projects-tools": { action: "gone" },
  // ServiceNow enterprise ITSM licensing — wrong ICP, 0 impressions
  "servicenow-pricing-2026-cost-breakdown-license-models": { action: "gone" },

  // ── 301: Discord ticket bot cluster → the only earner ──
  // Winner: best-ticket-discord-bot-alternatives-2026 (5 clicks / 868 impr / pos 12.5)
  "best-discord-ticket-bot-2026-compared-setup-guide": { action: "redirect", to: "best-ticket-discord-bot-alternatives-2026" },
  "best-ticket-discord-bot-2026": { action: "redirect", to: "best-ticket-discord-bot-alternatives-2026" },
  "best-discord-ticket-bots-2026": { action: "redirect", to: "best-ticket-discord-bot-alternatives-2026" },
  "best-discord-ticket-bots": { action: "redirect", to: "best-ticket-discord-bot-alternatives-2026" },
  "best-discord-ticket-bot": { action: "redirect", to: "best-ticket-discord-bot-alternatives-2026" },
  "best-discord-ticketing-software-it-support-2026": { action: "redirect", to: "best-ticket-discord-bot-alternatives-2026" },

  // ── 301: Slack alternatives cluster → proven winner (3 clicks / 878 impr / pos 13.1) ──
  "slack-alternatives-small-teams": { action: "redirect", to: "best-slack-alternatives-small-teams" }, // 1 click / 865 impr / pos 46 — direct cannibal
  "slack-alternatives-customer-support-2026": { action: "redirect", to: "best-slack-alternatives-small-teams" }, // 68 impr / pos 12.5
  "slack-alternatives-indie-founders-small-teams": { action: "redirect", to: "best-slack-alternatives-small-teams" },

  // ── 301: Slack guide duplicates ──
  "slack-as-customer-support-setup-guide-2026": { action: "redirect", to: "slack-customer-support-guide" },
  "slack-sms-integration-alternatives-2026": { action: "redirect", to: "slack-sms-integration-guide" },

  // ── 301: open-source ticketing cluster (7 articles, same SERP) ──
  // Winner: open-source-helpdesk-ticketing-system (0 clicks but 4,512 impr — all the query volume lands here)
  "best-open-source-ticketing-systems-small-teams-2026": { action: "redirect", to: "open-source-helpdesk-ticketing-system" },
  "best-open-source-helpdesk-ticketing-system-2026": { action: "redirect", to: "open-source-helpdesk-ticketing-system" },
  "best-open-source-helpdesk-ticketing-systems": { action: "redirect", to: "open-source-helpdesk-ticketing-system" },
  "best-open-source-ticketing-systems-small-business-2026": { action: "redirect", to: "open-source-helpdesk-ticketing-system" },
  "best-open-source-ticketing-system-alternatives-2026": { action: "redirect", to: "open-source-helpdesk-ticketing-system" },
  "open-source-ticketing-system-small-business": { action: "redirect", to: "open-source-helpdesk-ticketing-system" },

  // ── 301: generic "best ticketing software" cluster (8 near-duplicates) ──
  // Winner: best-support-ticket-software-2026-lightweight-tools-founders (1 click / 227 impr / pos 23, on-ICP angle)
  "best-ticketing-software-2026": { action: "redirect", to: "best-support-ticket-software-2026-lightweight-tools-founders" },
  "best-ticketing-system-software-small-teams-2026": { action: "redirect", to: "best-support-ticket-software-2026-lightweight-tools-founders" },
  "best-ticketing-system": { action: "redirect", to: "best-support-ticket-software-2026-lightweight-tools-founders" }, // 343 impr / pos 61
  "best-simple-ticketing-systems-indie-founders": { action: "redirect", to: "best-support-ticket-software-2026-lightweight-tools-founders" },
  "ticketing-system-software-indie-founders-small-teams-2026": { action: "redirect", to: "best-support-ticket-software-2026-lightweight-tools-founders" },
  "best-ticketing-software-small-teams-2026-donkey-support-review": { action: "redirect", to: "best-support-ticket-software-2026-lightweight-tools-founders" },
  "best-customer-support-ticketing-software-2026-small-teams": { action: "redirect", to: "best-support-ticket-software-2026-lightweight-tools-founders" }, // 31 impr / pos 19

  // ── 301: help desk pair ──
  // Winner: best-help-desk-software-small-business-2026 (54 impr / pos 18 vs 253 impr / pos 55)
  "best-small-business-help-desk-software": { action: "redirect", to: "best-help-desk-software-small-business-2026" },

  // ── 301: exact-duplicate pairs ──
  "intercom-alternatives": { action: "redirect", to: "intercom-alternatives-2026" }, // -2026 variant has 283 impr
  "discord-alternatives-2026": { action: "redirect", to: "best-discord-alternatives-2026" },
  "best-customer-follow-up-software": { action: "redirect", to: "best-customer-follow-up-software-2026" },

  // ── 301: chat widget / live chat clusters ──
  // Widget listicles → best-chat-widgets-2026
  "best-chat-widgets-small-business-2026": { action: "redirect", to: "best-chat-widgets-2026" },
  "best-live-chat-widgets-small-business-saas-2026": { action: "redirect", to: "best-chat-widgets-2026" },
  "chat-widget-alternatives-2026": { action: "redirect", to: "best-chat-widgets-2026" },
  "support-chat-widget-alternatives-indie-founders-2026": { action: "redirect", to: "best-chat-widgets-2026" },
  // Live chat software listicles → best-website-live-chat-software-2026
  "best-free-website-chat-software-2026": { action: "redirect", to: "best-website-live-chat-software-2026" },
  "best-free-live-support-software": { action: "redirect", to: "best-website-live-chat-software-2026" },
  "top-live-customer-support-chat-tools-2026": { action: "redirect", to: "best-website-live-chat-software-2026" },
  "best-live-chat-support-software-indie-founders": { action: "redirect", to: "best-website-live-chat-software-2026" },
  // Widget guides → live-chat-widget-guide (67 impr)
  "live-chat-widget-guide-founders-developers-2026": { action: "redirect", to: "live-chat-widget-guide" },
  "live-chat-widget-startups-guide": { action: "redirect", to: "live-chat-widget-guide" },
  "how-to-choose-live-chat-widget": { action: "redirect", to: "live-chat-widget-guide" },
  // "What is" informational pairs
  "what-is-a-chat-widget-guide-2026": { action: "redirect", to: "what-is-a-live-chat-widget" },
  "what-is-live-customer-support-chat": { action: "redirect", to: "what-is-chat-support" }, // 6 impr → 77 impr page
}

export function getPruneAction(slug: string): BlogPruneAction | undefined {
  return BLOG_PRUNE_MAP[slug]
}

/**
 * Drop pruned slugs from article lists and dedupe repeated slugs
 * (the sitemap/index previously listed some slugs 2-3x because the
 * donkey_articles table holds multiple published rows for one slug).
 */
export function filterPrunedArticles<T extends { slug: string }>(
  articles: T[]
): T[] {
  const seen = new Set<string>()
  return articles.filter((article) => {
    if (BLOG_PRUNE_MAP[article.slug]) return false
    if (seen.has(article.slug)) return false
    seen.add(article.slug)
    return true
  })
}

// A redirect target that is itself pruned would create a chain or loop.
for (const [slug, action] of Object.entries(BLOG_PRUNE_MAP)) {
  if (action.action === "redirect" && BLOG_PRUNE_MAP[action.to]) {
    throw new Error(
      `blog-prune: redirect target "${action.to}" (from "${slug}") is itself pruned`
    )
  }
}
