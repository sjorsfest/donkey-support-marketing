import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { FadeIn, StaggerContainer, StaggerItem } from "~/components/motion"

const codeExamples = [
  {
    title: "Script tag",
    description: "Drop this into your HTML and you're done.",
    language: "html",
    code: `<script>
  window.SupportWidget = {
    accountId: "YOUR_ACCOUNT_ID"
  };
</script>
<script async src="https://app.donkey.support/widget/loader.js"></script>`,
  },
  {
    title: "React component",
    description: "Full TypeScript support with visitor identification.",
    language: "tsx",
    code: `import { SupportWidget } from "./SupportWidget"

function App() {
  return (
    <SupportWidget
      accountId="YOUR_ACCOUNT_ID"
      email="user@example.com"
      name="Jane Doe"
    />
  )
}`,
  },
]

export function Developer() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="section-container overflow-hidden">
        <FadeIn className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Developer friendly
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Integrate in{" "}
            <span className="text-pink-500">minutes</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Simple APIs. Clear docs. No headaches.
          </p>
        </FadeIn>

        <StaggerContainer
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          staggerDelay={0.15}
        >
          {codeExamples.map((example) => (
            <StaggerItem key={example.title} className="min-w-0 overflow-hidden">
              <Card className="h-full overflow-hidden">
                <CardContent className="p-6 min-w-0 overflow-hidden">
                  <div className="mb-4">
                    <h3 className="font-display text-lg font-bold mb-1">
                      {example.title}
                    </h3>
                    <p className="text-sm text-muted">{example.description}</p>
                  </div>
                  <div className="code-block p-4 overflow-x-auto max-w-full">
                    <pre className="text-sm w-fit">
                      <code>
                        {example.language === "html" ? (
                          <HighlightHTML code={example.code} />
                        ) : (
                          <HighlightTSX code={example.code} />
                        )}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function HighlightHTML({ code }: { code: string }) {
  const safeCode = escapeHtml(code)
  const highlighted = injectTokens(
    safeCode
      .replace(
        /(&lt;|<)(\/?\w+)/g,
        `${TOKENS.tagOpen}$1$2${TOKENS.tagClose}`
      )
      .replace(
        /(\s)([\w-]+)(=)/g,
        `$1${TOKENS.attrOpen}$2${TOKENS.attrClose}$3`
      )
      .replace(
        /(&quot;.*?&quot;)/g,
        `${TOKENS.stringOpen}$1${TOKENS.stringClose}`
      )
  )

  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />
}

function HighlightTSX({ code }: { code: string }) {
  const safeCode = escapeHtml(code)
  const highlighted = injectTokens(
    safeCode
      .replace(
        /\b(import|export|function|return|const|from)\b/g,
        `${TOKENS.keywordOpen}$1${TOKENS.keywordClose}`
      )
      .replace(
        /(&lt;|<)(\/?\w+)/g,
        `${TOKENS.tagOpen}$1$2${TOKENS.tagClose}`
      )
      .replace(
        /(\s)([\w]+)(=\{)/g,
        `$1${TOKENS.attrOpen}$2${TOKENS.attrClose}$3`
      )
      .replace(
        /(&quot;.*?&quot;)/g,
        `${TOKENS.stringOpen}$1${TOKENS.stringClose}`
      )
  )

  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />
}

const TOKENS = {
  tagOpen: "@@TAG_OPEN@@",
  tagClose: "@@TAG_CLOSE@@",
  attrOpen: "@@ATTR_OPEN@@",
  attrClose: "@@ATTR_CLOSE@@",
  stringOpen: "@@STRING_OPEN@@",
  stringClose: "@@STRING_CLOSE@@",
  keywordOpen: "@@KEYWORD_OPEN@@",
  keywordClose: "@@KEYWORD_CLOSE@@",
}

function injectTokens(code: string) {
  return code
    .replace(new RegExp(TOKENS.tagOpen, "g"), '<span class="tag">')
    .replace(new RegExp(TOKENS.tagClose, "g"), "</span>")
    .replace(new RegExp(TOKENS.attrOpen, "g"), '<span class="attr">')
    .replace(new RegExp(TOKENS.attrClose, "g"), "</span>")
    .replace(new RegExp(TOKENS.stringOpen, "g"), '<span class="string">')
    .replace(new RegExp(TOKENS.stringClose, "g"), "</span>")
    .replace(new RegExp(TOKENS.keywordOpen, "g"), '<span class="keyword">')
    .replace(new RegExp(TOKENS.keywordClose, "g"), "</span>")
}

function escapeHtml(code: string) {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
