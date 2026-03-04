"use client"

import { motion } from "framer-motion"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Float } from "~/components/motion"
import { ArrowRight, Sparkles, Hash, MessageCircle } from "lucide-react"

export function RemoteTeamsHero() {
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
                💼 Built for Remote Teams
              </Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] mb-8 max-w-4xl mx-auto lg:mx-0">
              <span className="text-outline-hero">Customer Support</span>{" "}
              <span className="text-foreground">That Lives in</span>{" "}
              <span className="text-pink-500">Slack</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8">
              Add a chat widget to your site. Customer messages appear as Slack threads where your distributed team already works. Reply from Slack - customers see it instantly. No timezone chaos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="gradient" size="xl" className="group" asChild>
                <a href="/go?ref=remote-teams">
                  <span className="flex items-center gap-2">
                    Start for free
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Slack Interface Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Slack Interface Mockup */}
            <Float delay={0} y={8}>
              <div className="relative bg-white rounded-2xl border-2 border-outline shadow-[8px_8px_0_#1a1a1a] overflow-hidden mx-auto max-w-md lg:max-w-none">
                {/* Slack Header */}
                <div className="flex items-center gap-2 p-3 border-b-2 border-outline bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-6 h-6 bg-purple-500 rounded border-2 border-outline flex items-center justify-center">
                      <Hash className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-bold text-foreground">support</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 border border-outline" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400 border border-outline" />
                    <div className="w-2 h-2 rounded-full bg-red-400 border border-outline" />
                  </div>
                </div>

                {/* Slack Messages */}
                <div className="p-4 space-y-3 bg-white">
                  {/* Message 1 - Customer Ticket */}
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded border-2 border-outline flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-foreground">Support Bot</span>
                        <span className="text-[10px] text-muted">10:24 AM</span>
                        <Badge variant="secondary" size="sm" className="text-[8px]">🟢 active</Badge>
                      </div>
                      <div className="bg-slate-50 border-2 border-outline rounded-lg p-2.5">
                        <div className="text-xs font-semibold mb-1">New ticket from Sarah Chen</div>
                        <div className="text-[11px] text-foreground/80">
                          "Help! I can't access my dashboard after the update..."
                        </div>
                        <div className="flex gap-1 mt-2">
                          <Badge size="sm" className="text-[8px]">sarah@example.com</Badge>
                          <Badge size="sm" className="text-[8px]">🌏 UTC+8</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message 2 - Team Member Reply */}
                  <div className="flex gap-2 pl-10">
                    <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-green-500 rounded border-2 border-outline flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">J</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-foreground">Jessica</span>
                        <span className="text-[10px] text-muted">10:26 AM</span>
                        <Badge size="sm" className="text-[8px]">🌍 UTC+0</Badge>
                      </div>
                      <div className="text-[11px] text-foreground/90">
                        I'll check the logs and get back to her 👍
                      </div>
                    </div>
                  </div>

                  {/* Message 3 - Status Update */}
                  <div className="flex gap-2 pl-10">
                    <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded border-2 border-outline flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">M</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-foreground">Marcus</span>
                        <span className="text-[10px] text-muted">10:28 AM</span>
                        <Badge size="sm" className="text-[8px]">🌎 UTC-5</Badge>
                      </div>
                      <div className="text-[11px] text-foreground/90">
                        Found the issue - pushing a fix now ✅
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slack Footer with Channels */}
                <div className="p-2 border-t-2 border-outline bg-slate-50 flex gap-1.5 text-[10px]">
                  <div className="px-2 py-1 bg-white border border-border rounded flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    <span className="font-medium">support</span>
                  </div>
                  <div className="px-2 py-1 bg-white border border-border rounded flex items-center gap-1 opacity-60">
                    <Hash className="w-3 h-3" />
                    <span>urgent-tickets</span>
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
                        <div className="font-bold text-xs">Donkey Support</div>
                        <div className="text-[9px] opacity-90">We're here to help</div>
                      </div>
                    </div>
                  </div>

                  {/* Widget Body */}
                  <div className="p-3 bg-slate-50 h-32 flex flex-col">
                    <div className="flex-1 flex items-center justify-center text-center">
                      <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border-2 border-slate-100">
                        <div className="text-xl mb-1">👋</div>
                        <p className="font-bold text-sm text-slate-700">Hi there!</p>
                        <p className="text-[10px] text-slate-500">
                          How can we help?
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Widget Footer */}
                  <div className="p-2.5 bg-white border-t-3 border-black">
                    <div className="flex gap-2">
                      <div className="flex-1 h-8 bg-slate-50 rounded-full px-3 flex items-center text-[10px] text-slate-400 border border-slate-200">
                        Type a message...
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
