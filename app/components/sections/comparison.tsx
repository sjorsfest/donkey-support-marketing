import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { FadeIn } from "~/components/motion"

const comparisons = [
  {
    name: "Donkey Support",
    isUs: true,
    attributes: {
      pricing: "$2.99/mo",
      setup: "5 minutes",
      complexity: "Simple",
      integration: "Slack/Discord",
    },
  },
  {
    name: "Big Helpdesk",
    isUs: false,
    attributes: {
      pricing: "$50+/seat/mo",
      setup: "Days to weeks",
      complexity: "Complex",
      integration: "Custom dashboard",
    },
  },
  {
    name: "Shared Inbox",
    isUs: false,
    attributes: {
      pricing: "$15+/seat/mo",
      setup: "Hours",
      complexity: "Medium",
      integration: "Email only",
    },
  },
  {
    name: "DIY Build",
    isUs: false,
    attributes: {
      pricing: "Dev time",
      setup: "Weeks+",
      complexity: "You maintain it",
      integration: "Whatever you build",
    },
  },
]

const attributeLabels: Record<string, string> = {
  pricing: "Pricing",
  setup: "Setup time",
  complexity: "Complexity",
  integration: "Where you reply",
}

export function Comparison() {
  return (
    <section className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why choose{" "}
            <span className="text-pink-500">Donkey Support</span>?
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            See how we compare to alternatives.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card className="overflow-hidden max-w-5xl mx-auto">
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-outline/20">
                      <th className="p-4 text-left font-display font-bold">
                        Feature
                      </th>
                      {comparisons.map((item) => (
                        <th
                          key={item.name}
                          className={`p-4 text-center font-display font-bold ${
                            item.isUs ? "bg-pink-50" : ""
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            {item.name}
                            {item.isUs && (
                              <Badge variant="default" size="sm">
                                That&apos;s us!
                              </Badge>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(attributeLabels).map((key, rowIndex) => (
                      <tr
                        key={key}
                        className={
                          rowIndex < Object.keys(attributeLabels).length - 1
                            ? "border-b border-border"
                            : ""
                        }
                      >
                        <td className="p-4 font-semibold text-sm">
                          {attributeLabels[key]}
                        </td>
                        {comparisons.map((item) => (
                          <td
                            key={`${item.name}-${key}`}
                            className={`p-4 text-center text-sm ${
                              item.isUs ? "bg-pink-50 font-semibold" : ""
                            }`}
                          >
                            {item.attributes[key as keyof typeof item.attributes]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4 p-4">
                {comparisons.map((item) => (
                  <div
                    key={item.name}
                    className={`p-4 rounded-xl border-2 ${
                      item.isUs
                        ? "border-pink-500 bg-pink-50"
                        : "border-border bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display font-bold">{item.name}</h3>
                      {item.isUs && <Badge variant="default">That&apos;s us!</Badge>}
                    </div>
                    <div className="space-y-2 text-sm">
                      {Object.keys(attributeLabels).map((key) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted">
                            {attributeLabels[key]}
                          </span>
                          <span className={item.isUs ? "font-semibold" : ""}>
                            {item.attributes[key as keyof typeof item.attributes]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}
