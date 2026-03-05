"use client"

import { motion } from "framer-motion"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Float } from "~/components/motion"
import { ArrowRight, Sparkles, Copy, Check } from "lucide-react"
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

export function VibecodersHero() {
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
    <section className="relative pt-40 sm:pt-36 pb-24 md:pt-44 md:pb-20 overflow-hidden">
      {/* Decorative blur elements */}
      <div className="absolute -top-8 -left-8 w-16 h-16 bg-pink-300/50 rounded-full blur-xl" />
      <div className="absolute -bottom-8 right-8 w-24 h-24 bg-yellow-300/50 rounded-full blur-xl" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
          >
            {/* Promo Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex mb-6"
            >
              <Badge variant="promo" size="lg">
                🤖 Built for Vibecoders
              </Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] mb-8 max-w-4xl mx-auto lg:mx-0">
              <span className="text-outline-hero">Support Chat</span>{" "}
              <span className="text-foreground">That</span>{" "}
              <span className="text-pink-500">Installs Itself</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8">
              Copy installation instructions. Paste into Claude Code, Cursor, or any AI agent. Done. Support chat configured and live in 60 seconds - built for developers who ship with LLMs.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="gradient" size="xl" className="group" asChild>
                <a href="/go?ref=vibecoders">
                  <span className="flex items-center gap-2">
                    Start for free
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - AI Installation Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* AI Agent Instructions Interface Mockup */}
            <Float delay={0} y={8}>
              <div className="relative bg-white rounded-2xl border-2 border-outline shadow-[8px_8px_0_#1a1a1a] overflow-hidden mx-auto max-w-md lg:max-w-none">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b-2 border-outline bg-gradient-to-r from-yellow-50 to-pink-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-lg border-2 border-outline flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">AI Agent Instructions</div>
                      <div className="text-xs text-muted">One-click setup for your AI assistant</div>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">
                    ✨ AI-Ready
                  </Badge>
                </div>

                {/* Instructions Content */}
                <div className="p-4">
                  <div className="mb-3">
                    <p className="text-xs text-muted mb-2">
                      Copy and paste these instructions into Claude Code, Cursor, or Codex
                    </p>
                  </div>

                  {/* Code Block */}
                  <div className="bg-slate-950 rounded-xl border-2 border-outline p-4 mb-4 font-mono text-xs overflow-x-auto">
                    <div className="text-emerald-400 mb-2"># Install Donkey Support Widget</div>
                    <div className="text-slate-300 mb-1">Install the support widget to our site:</div>
                    <div className="text-slate-300 mb-3">1. Add script tag to {'<head>'}</div>
                    <div className="text-slate-400 ml-4 mb-1">{'<script src="https://cdn.donkey.support/widget.js"'}</div>
                    <div className="text-slate-400 ml-4 mb-3">{'  data-widget-id="your-id"></script>'}</div>
                    <div className="text-slate-300 mb-1">2. Initialize with config:</div>
                    <div className="text-cyan-400 ml-4 mb-1">{'DonkeySupport.init({'}</div>
                    <div className="text-slate-400 ml-8 mb-1">{'  platform: "slack",'}</div>
                    <div className="text-slate-400 ml-8 mb-1">{'  primaryColor: "#ff4fa3"'}</div>
                    <div className="text-cyan-400 ml-4">{'});'}</div>
                  </div>

                  {/* Copy Button */}
                  <Button
                    variant="gradient"
                    className="w-full group"
                    onClick={handleCopy}
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

                  {/* Helper Text */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                    <div className="flex -space-x-2">
                      <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-white text-[8px] font-bold">C</span>
                      </div>
                      <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-white text-[8px] font-bold">C</span>
                      </div>
                      <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-white text-[8px] font-bold">A</span>
                      </div>
                    </div>
                    <span>Works with Claude Code, Cursor, and all AI agents</span>
                  </div>
                </div>

                {/* Steps Preview */}
                <div className="p-3 border-t-2 border-outline bg-slate-50">
                  <div className="flex items-center gap-2 text-xs">
                    <Badge size="sm" className="bg-green-100 text-green-700 border-green-300">
                      <span className="flex items-center gap-1">
                        <span className="text-[10px]">1.</span>
                        Copy
                      </span>
                    </Badge>
                    <span className="text-slate-400">→</span>
                    <Badge size="sm" className="bg-blue-100 text-blue-700 border-blue-300">
                      <span className="flex items-center gap-1">
                        <span className="text-[10px]">2.</span>
                        Paste to AI
                      </span>
                    </Badge>
                    <span className="text-slate-400">→</span>
                    <Badge size="sm" className="bg-purple-100 text-purple-700 border-purple-300">
                      <span className="flex items-center gap-1">
                        <span className="text-[10px]">3.</span>
                        Done
                      </span>
                    </Badge>
                  </div>
                </div>
              </div>
            </Float>

            {/* Widget Preview (smaller, in corner) */}
            <motion.div
              className="absolute -bottom-4 -right-4 lg:bottom-8 lg:-right-4 w-48"
              initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: [-3, 3, -3],
              }}
              transition={{
                scale: { delay: 0.5, duration: 0.4 },
                opacity: { delay: 0.5, duration: 0.4 },
                rotate: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }
              }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="bg-white rounded-3xl overflow-hidden border-3 border-black"
                  style={{ boxShadow: "5px 5px 0px 0px #1a1a1a" }}
                >
                  {/* Widget Header */}
                  <div
                    className="p-2.5 text-white border-b-3 border-black"
                    style={{ backgroundColor: "#ff4fa3" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-[10px]">Support</div>
                        <div className="text-[8px] opacity-90">Installed via AI ✨</div>
                      </div>
                    </div>
                  </div>

                  {/* Widget Body */}
                  <div className="p-3 bg-slate-50 h-28 flex flex-col">
                    <div className="flex-1 flex items-center justify-center text-center">
                      <div className="bg-white px-3 py-2 rounded-2xl shadow-sm border-2 border-slate-100">
                        <div className="text-lg mb-1">🤖</div>
                        <p className="font-bold text-xs text-slate-700">All set!</p>
                        <p className="text-[9px] text-slate-500">
                          Ready to help
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Widget Footer */}
                  <div className="p-2 bg-white border-t-3 border-black">
                    <div className="flex gap-1.5">
                      <div className="flex-1 h-7 bg-slate-50 rounded-full px-2.5 flex items-center text-[9px] text-slate-400 border border-slate-200">
                        Type a message...
                      </div>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#ff4fa3" }}
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
