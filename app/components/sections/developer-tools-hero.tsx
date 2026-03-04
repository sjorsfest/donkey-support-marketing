"use client"

import { motion } from "framer-motion"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Float } from "~/components/motion"
import { ArrowRight, Sparkles, Hash, Terminal } from "lucide-react"

export function DeveloperToolsHero() {
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
                ⚙️ Built for Dev Tools
              </Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] mb-8 max-w-4xl mx-auto lg:mx-0">
              <span className="text-outline-hero">Technical Support</span>{" "}
              <span className="text-foreground">Built for</span>{" "}
              <span className="text-pink-500">Developers</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8">
              Widget with error capturing and technical context. Questions appear in your Slack channel with full stack traces. Reply with code snippets - they see it formatted. Built for technical conversations.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="gradient" size="xl" className="group" asChild>
                <a href="/go?ref=developer-tools">
                  <span className="flex items-center gap-2">
                    Start for free
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Slack Interface Mockup (Dark Theme) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Slack Interface Mockup - Dark Theme */}
            <Float delay={0} y={8}>
              <div className="relative bg-slate-900 rounded-2xl border-2 border-outline shadow-[8px_8px_0_#1a1a1a] overflow-hidden mx-auto max-w-md lg:max-w-none">
                {/* Slack Header */}
                <div className="flex items-center gap-2 p-3 border-b-2 border-slate-700 bg-slate-800">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-6 h-6 bg-emerald-500 rounded border-2 border-outline flex items-center justify-center">
                      <Hash className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-bold text-white">engineering-support</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 border border-outline" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400 border border-outline" />
                    <div className="w-2 h-2 rounded-full bg-red-400 border border-outline" />
                  </div>
                </div>

                {/* Slack Messages */}
                <div className="p-4 space-y-3 bg-slate-900">
                  {/* Message 1 - Support Ticket with Error */}
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded border-2 border-outline flex items-center justify-center flex-shrink-0">
                      <Terminal className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-white">Support Bot</span>
                        <span className="text-[10px] text-slate-400">2:14 PM</span>
                        <Badge size="sm" className="text-[8px] bg-red-500/20 text-red-300 border-red-500">
                          🔴 Error
                        </Badge>
                      </div>
                      <div className="bg-slate-800 border-2 border-slate-700 rounded-lg p-2.5">
                        <div className="text-xs font-semibold text-white mb-1">API Request Failed</div>
                        <div className="text-[11px] text-slate-300 mb-2">
                          "Getting 401 errors when calling /api/users endpoint"
                        </div>

                        {/* Code Block with Error */}
                        <div className="bg-slate-950 border border-slate-700 rounded p-2 mb-2 font-mono text-[9px] overflow-x-auto">
                          <div className="text-red-400">Error: Unauthorized</div>
                          <div className="text-slate-400 mt-1">  at fetch (/lib/api.js:42)</div>
                          <div className="text-slate-400">  at getUsers (/app/users.js:18)</div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          <Badge size="sm" className="text-[8px] bg-slate-700 text-slate-200 border-slate-600">
                            SDK v2.4.1
                          </Badge>
                          <Badge size="sm" className="text-[8px] bg-slate-700 text-slate-200 border-slate-600">
                            Node 18.x
                          </Badge>
                          <Badge size="sm" className="text-[8px] bg-blue-500/20 text-blue-300 border-blue-500">
                            dev@api.co
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message 2 - Engineer Reply */}
                  <div className="flex gap-2 pl-10">
                    <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded border-2 border-outline flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">S</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-white">Sarah</span>
                        <span className="text-[10px] text-slate-400">2:16 PM</span>
                      </div>
                      <div className="text-[11px] text-slate-200 mb-1.5">
                        You need to pass the API key in the Authorization header:
                      </div>

                      {/* Code Snippet */}
                      <div className="bg-slate-950 border border-emerald-500/30 rounded p-2 font-mono text-[9px] overflow-x-auto">
                        <div className="text-slate-400">headers: {'{'}</div>
                        <div className="text-emerald-300 ml-2">  'Authorization': `Bearer ${'${apiKey}'}`</div>
                        <div className="text-slate-400">{'}'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Message 3 - Quick Note */}
                  <div className="flex gap-2 pl-10">
                    <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded border-2 border-outline flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">S</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-white">Sarah</span>
                        <span className="text-[10px] text-slate-400">2:17 PM</span>
                      </div>
                      <div className="text-[11px] text-slate-200">
                        Docs here: api.example.com/auth ✅
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slack Footer */}
                <div className="p-2 border-t-2 border-slate-700 bg-slate-800 flex gap-1.5 text-[10px]">
                  <div className="px-2 py-1 bg-slate-700 border border-slate-600 rounded flex items-center gap-1 text-white">
                    <Hash className="w-3 h-3" />
                    <span className="font-medium">engineering-support</span>
                  </div>
                  <div className="px-2 py-1 bg-slate-900 border border-slate-700 rounded flex items-center gap-1 text-slate-400 opacity-60">
                    <Hash className="w-3 h-3" />
                    <span>api-logs</span>
                  </div>
                </div>
              </div>
            </Float>

            {/* Widget Mockup */}
            <motion.div
              className="absolute -bottom-4 -right-4 lg:bottom-8 lg:-right-4 w-52"
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
                    className="p-3 text-white border-b-3 border-black"
                    style={{ backgroundColor: "#ff4fa3" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-xs">DevTools API</div>
                        <div className="text-[9px] opacity-90">Technical Support</div>
                      </div>
                    </div>
                  </div>

                  {/* Widget Body */}
                  <div className="p-3 bg-slate-50 h-32 flex flex-col">
                    <div className="flex-1 flex items-center justify-center text-center">
                      <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border-2 border-slate-100">
                        <div className="text-xl mb-1">💻</div>
                        <p className="font-bold text-sm text-slate-700">Need help?</p>
                        <p className="text-[10px] text-slate-500">
                          Our engineers are here
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Widget Footer */}
                  <div className="p-2.5 bg-white border-t-3 border-black">
                    <div className="flex gap-2">
                      <div className="flex-1 h-8 bg-slate-50 rounded-full px-3 flex items-center text-[10px] text-slate-400 border border-slate-200">
                        Describe your issue...
                      </div>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#ff4fa3" }}
                      >
                        <svg
                          className="w-3.5 h-3.5 text-white"
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
