"use client"

import { motion } from "framer-motion"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Float } from "~/components/motion"
import { ArrowRight, Hash, Sparkles } from "lucide-react"

export function DiscordCommunitiesHero() {
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
                💬 Built for Discord Communities
              </Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] mb-8">
              <span className="text-outline-hero">Community Support</span>{" "}
              <br />
              <span className="text-foreground">That Lives in</span>{" "}
              <span className="text-[#5865F2]">Discord</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8">
              Add a chat widget to your website. Messages from visitors appear instantly in your Discord server. Reply from Discord - they see it on your site in real-time.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="gradient" size="xl" className="group" asChild>
                <a href="/go?ref=discord-communities">
                  <span className="flex items-center gap-2">
                    Start for free
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Discord Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Discord Interface Mockup */}
            <Float delay={0} y={8}>
              <div className="relative bg-white rounded-2xl border-2 border-outline shadow-[8px_8px_0_#1a1a1a] p-4 mx-auto max-w-md lg:max-w-none">
                {/* Window Controls */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400 border border-outline" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400 border border-outline" />
                  <div className="w-3 h-3 rounded-full bg-green-400 border border-outline" />
                  <div className="flex-1 mx-4">
                    <div className="h-6 bg-muted rounded-lg border border-border" />
                  </div>
                </div>

                {/* Discord Interface */}
                <div className="flex gap-2 h-64">
                  {/* Channel Sidebar */}
                  <div className="w-16 bg-[#2b2d31] rounded-lg border-2 border-outline p-2 space-y-2">
                    <div className="w-full aspect-square bg-[#5865F2] rounded-full border-2 border-outline flex items-center justify-center">
                      <span className="text-white text-xs font-bold">CS</span>
                    </div>
                    <div className="w-full aspect-square bg-muted/50 rounded-full border border-border" />
                    <div className="w-full aspect-square bg-muted/50 rounded-full border border-border" />
                  </div>

                  {/* Main Chat Area */}
                  <div className="flex-1 bg-[#313338] rounded-lg border-2 border-outline p-3">
                    {/* Channel Header */}
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                      <Hash className="w-4 h-4 text-muted" />
                      <span className="text-sm font-semibold text-white">support</span>
                    </div>

                    {/* Messages */}
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="w-7 h-7 bg-pink-500 rounded-full border border-outline flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-xs font-semibold text-white">User123</span>
                            <span className="text-[9px] text-muted">2:34 PM</span>
                          </div>
                          <div className="text-[11px] text-white/80">Hey, I need help with my account</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <div className="w-7 h-7 bg-yellow-300 rounded-full border border-outline flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-xs font-semibold text-white">Member456</span>
                            <span className="text-[9px] text-muted">2:41 PM</span>
                          </div>
                          <div className="text-[11px] text-white/80">How do I upgrade my plan?</div>
                        </div>
                      </div>

                      <div className="flex gap-2 opacity-60">
                        <div className="w-7 h-7 bg-muted/50 rounded-full flex-shrink-0" />
                        <div className="flex-1">
                          <div className="h-2 w-20 bg-white/10 rounded mb-1" />
                          <div className="h-2 w-32 bg-white/10 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Float>

            {/* Widget Mockup - Smaller, more cartoony, dancing */}
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
                        <div className="text-[9px] opacity-90">We reply fast!</div>
                      </div>
                    </div>
                  </div>

                  {/* Widget Body */}
                  <div className="p-3 bg-slate-50 h-32 flex flex-col">
                    <div className="flex-1 flex items-center justify-center text-center">
                      <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border-2 border-slate-100">
                        <div className="text-xl mb-1">👋</div>
                        <p className="font-bold text-sm text-pink-500">Hi there!</p>
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
