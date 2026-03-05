"use client"

import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { FadeIn, StaggerContainer, StaggerItem } from "~/components/motion"
import { Copy, Check } from "lucide-react"
import { SiClaude, SiOpenai } from "react-icons/si"
import { useState } from "react"

const INSTALLATION_INSTRUCTIONS = `# Install Donkey Support Widget

## Task
Install the Donkey Support widget into this codebase. Detect the framework and follow the appropriate installation pattern below.

## Required Configuration
- Account ID: "LOGIN_TO_DONKEY_SUPPORT_FOR_AN_ACCOUNT_ID"


## Step 1: Detect Framework
Analyze the codebase to identify the framework:
- **HTML/Static**: Look for .html files or simple static sites
- **React**: Check for React/Next.js (package.json has "react")
- **Turbo**: Check for Hotwire Turbo (look for turbo in package.json or HTML)
- **Vue**: Check for Vue.js (package.json has "vue")
- **Angular**: Check for Angular (package.json has "@angular/core")
- **Other**: Adapt the installation pattern as needed

## Step 2: Installation Patterns

### HTML/Static Sites
Add before closing </body> tag in your HTML:

\`\`\`html
<script>
  window.SupportWidget = {
    accountId: "LOGIN_TO_DONKEY_SUPPORT_FOR_AN_ACCOUNT_ID"
  };
</script>
<script async src="https://app.donkey.support/widget/loader.js"></script>
\`\`\`

### React/Next.js
1. Create \`components/SupportWidget.tsx\`:

\`\`\`tsx
import { useEffect } from "react";

interface SupportWidgetProps {
  accountId: string;
  email?: string;
  name?: string;
  metadata?: Record<string, any>;
  metadataToken?: string;
  controlledByHost?: boolean;
  widgetIsOpen?: boolean;
}

export function SupportWidget({
  accountId,
  email,
  name,
  metadata,
  metadataToken,
  controlledByHost,
  widgetIsOpen,
}: SupportWidgetProps) {
  useEffect(() => {
    if (controlledByHost && (window as any).SupportWidget) {
      (window as any).SupportWidget.widgetIsOpen = widgetIsOpen;
    }
  }, [controlledByHost, widgetIsOpen]);

  useEffect(() => {
    (window as any).SupportWidget = {
      accountId,
      email,
      name,
      metadata,
      metadataToken,
      controlledByHost,
      widgetIsOpen,
    };

    const scriptId = "support-widget-loader";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://app.donkey.support/widget/loader.js";
    script.async = true;
    document.body.appendChild(script);
  }, [accountId, email, name, metadata, metadataToken, controlledByHost, widgetIsOpen]);

  return null;
}
\`\`\`

2. Add to your app layout/root component:

\`\`\`tsx
import { SupportWidget } from "./components/SupportWidget";

<SupportWidget accountId="LOGIN_TO_DONKEY_SUPPORT_FOR_AN_ACCOUNT_ID" />
\`\`\`

### Turbo/Rails
Add to your application layout (before </body>):

\`\`\`html
<script>
  window.SupportWidget = {
    accountId: "LOGIN_TO_DONKEY_SUPPORT_FOR_AN_ACCOUNT_ID"
  };
</script>
<script src="https://app.donkey.support/widget/loader.js" data-turbo-track="reload"></script>
<div id="support-widget-container" data-turbo-permanent></div>
\`\`\`

### Vue.js
Create a component and add to App.vue:

\`\`\`vue
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  window.SupportWidget = {
    accountId: "LOGIN_TO_DONKEY_SUPPORT_FOR_AN_ACCOUNT_ID"
  };

  const script = document.createElement('script');
  script.src = 'https://app.donkey.support/widget/loader.js';
  script.async = true;
  document.body.appendChild(script);
});
</script>
\`\`\`

### Angular
Add to index.html before </body>:

\`\`\`html
<script>
  window.SupportWidget = {
    accountId: "LOGIN_TO_DONKEY_SUPPORT_FOR_AN_ACCOUNT_ID"
  };
</script>
<script async src="https://app.donkey.support/widget/loader.js"></script>
\`\`\`

## Step 3: Optional - User Identification
If the app has authenticated users, add email and name:

\`\`\`javascript
window.SupportWidget = {
  accountId: "LOGIN_TO_DONKEY_SUPPORT_FOR_AN_ACCOUNT_ID",
  email: user.email,    // User's email
  name: user.name       // User's name
};
\`\`\`

## Step 4: Advanced - Signed Metadata (Recommended)
For tamper-proof metadata, use signed tokens from your backend.

**Backend (Node.js example)**:
\`\`\`javascript
import jwt from "jsonwebtoken";

const metadataToken = jwt.sign(
  {
    metadata: {
      userId: user.id,
      plan: user.plan,
      // Reserved keys (optional):
      donkeySharedSessionId: user.id,      // Cross-device sessions
      donkeyVisitorName: user.name,        // Tamper-proof name
      donkeyVisitorEmail: user.email       // Tamper-proof email
    }
  },
  process.env.SUPPORT_WIDGET_METADATA_SECRET,
  { algorithm: "HS256", expiresIn: "4h" }
);
\`\`\`

**Frontend**:
\`\`\`javascript
window.SupportWidget = {
  accountId: "LOGIN_TO_DONKEY_SUPPORT_FOR_AN_ACCOUNT_ID",
  metadataToken: user.supportWidgetMetadataToken  // From your backend
};
\`\`\`

**Note**: You must generate a signing secret in Settings → Signed Widget Metadata before using signed tokens.

## Verification
After installation:
1. Load the page in a browser
2. You should see a floating chat button in the bottom-right corner
3. Click it to open the widget
4. Send a test message to verify it works

## Need Help?
- Domain restrictions: Configure in Settings → Widget Access
- Office hours: Configure in Settings → Office Hours
- Signing secret: Settings → Signed Widget Metadata
`

const codeExamples = [
  {
    title: "Script tag",
    description: "Drop this into your HTML and you're done.",
    language: "html",
    code: `<script>
  window.SupportWidget = {
    accountId: "YOUR_ACCOUNT_ID",
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
      metadata={{ plan: "pro", userId: "usr_123" }}
    />
  )
}`,
  },
]

export function Developer() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALLATION_INSTRUCTIONS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <section className="py-20">
      <div className="section-container">
        <FadeIn className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Developer friendly
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Integrate in{" "}
            <span className="text-pink-500">minutes</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Simple APIs. Clear docs. Add signed metadata when you need
            verified context.
          </p>
        </FadeIn>

        <StaggerContainer
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.15}
        >
          {/* AI Agent Installation Callout */}
          <StaggerItem className="min-w-0">
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold mb-1">
                    Let AI install it for you
                  </h3>
                  <p className="text-sm text-muted">
                    Copy instructions, paste into Claude Code, Cursor, or Codex, and let your AI agent handle the setup automatically.
                  </p>
                </div>
                <div className="flex items-center justify-center flex-1 min-h-[80px]">
                  <Button
                    variant="gradient"
                    size="lg"
                    onClick={handleCopy}
                    className="w-full"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Instructions
                        </>
                      )}
                    </span>
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-2 pt-4 border-t border-border">
                  <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                    <SiClaude className="text-[#D4A574]" />
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                    <SiOpenai className="text-[#10A37F]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
          {codeExamples.map((example) => (
            <StaggerItem key={example.title} className="min-w-0">
              <Card className="h-full">
                <CardContent className="p-6 min-w-0">
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
