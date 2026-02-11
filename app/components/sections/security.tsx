import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { FadeIn, StaggerContainer, StaggerItem } from "~/components/motion"

const securityFeatures = [
  {
    icon: "🔒",
    title: "Allowed domains",
    description:
      "Restrict where your widget can be embedded with a domain allowlist.",
  },
  {
    icon: "🔐",
    title: "Signed metadata tokens",
    description:
      "Verify visitor metadata with HS256 tokens so unsigned context can be ignored when signing is enabled.",
  },
  {
    icon: "📜",
    title: "Email delivery logs",
    description:
      "Track follow-up sends and statuses so you can debug delivery issues fast.",
  },
  {
    icon: "🏢",
    title: "Multi-tenant isolation",
    description:
      "Your data is isolated. Accounts are completely separated.",
  },
]

const webhookEvents = [
  { event: "ticket.created", description: "New conversation started" },
  { event: "message.created", description: "New message sent" },
  { event: "ticket.updated", description: "Status changed" },
]

export function Security() {
  return (
    <section className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Built right
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Security &{" "}
            <span className="text-pink-500">automation</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Simple doesn&apos;t mean insecure. Verify visitor context and
            automate follow-ups with clear delivery visibility.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Security Features */}
          <StaggerContainer className="grid sm:grid-cols-2 gap-4" staggerDelay={0.1}>
            {securityFeatures.map((feature) => (
              <StaggerItem key={feature.title}>
                <Card variant="ghost" className="h-full bg-white/50">
                  <CardContent className="p-4">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <h3 className="font-display font-bold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted">{feature.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Webhook Events */}
          <FadeIn delay={0.3}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-bold mb-4">
                  Webhook events
                </h3>
                <div className="space-y-3">
                  {webhookEvents.map((item) => (
                    <div
                      key={item.event}
                      className="flex items-center justify-between p-3 bg-muted/10 rounded-xl"
                    >
                      <code className="text-sm font-mono text-pink-600 bg-pink-50 px-2 py-1 rounded">
                        {item.event}
                      </code>
                      <span className="text-sm text-muted">
                        {item.description}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted mt-4">
                  All events include timestamp, ticket data, and can trigger
                  your automations.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
