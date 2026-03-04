"use client"

import { motion } from "framer-motion"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Float } from "~/components/motion"
import { ArrowRight, Sparkles, Send } from "lucide-react"

export function CryptoWeb3Hero() {
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
                🪙 Built for Crypto & Web3
              </Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] mb-8 max-w-4xl mx-auto lg:mx-0">
              <span className="text-outline-hero">Token-Gated Support</span>{" "}
              <span className="text-foreground">for</span>{" "}
              <span className="text-pink-500">Telegram Communities</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8">
              Add a widget to your dApp or docs. Messages from token holders appear in your Telegram group. Reply from Telegram - they see it instantly. Verify wallet ownership with signed tokens.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="gradient" size="xl" className="group" asChild>
                <a href="/go?ref=crypto-web3">
                  <span className="flex items-center gap-2">
                    Start for free
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Telegram Interface Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Telegram Interface Mockup */}
            <Float delay={0} y={8}>
              <div className="relative bg-white rounded-2xl border-2 border-outline shadow-[8px_8px_0_#1a1a1a] overflow-hidden mx-auto max-w-md lg:max-w-none">
                {/* Telegram Header */}
                <div className="flex items-center gap-3 p-3 border-b-2 border-outline" style={{ backgroundColor: "#0088cc" }}>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-8 h-8 bg-white/20 rounded-full border-2 border-white/30 flex items-center justify-center">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">CryptoDAO Support</div>
                      <div className="text-[10px] text-white/80">142 members, 8 online</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-white/30" />
                    <div className="w-2 h-2 rounded-full bg-white/30" />
                    <div className="w-2 h-2 rounded-full bg-white/30" />
                  </div>
                </div>

                {/* Telegram Messages */}
                <div className="p-4 space-y-3 bg-gradient-to-b from-blue-50/30 to-white">
                  {/* Bot Message - New Ticket */}
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full border-2 border-outline flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">🤖</span>
                      </div>
                      <span className="text-xs font-bold text-foreground">Support Bot</span>
                      <span className="text-[10px] text-muted">11:42</span>
                    </div>
                    <div className="bg-white border-2 border-outline rounded-2xl rounded-tl-sm p-3 max-w-[85%] shadow-sm">
                      <div className="text-xs font-semibold mb-1.5">🎫 New Support Ticket</div>
                      <div className="text-[11px] text-foreground/80 mb-2">
                        "Can't claim my airdrop rewards - transaction keeps failing"
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Badge size="sm" className="text-[8px] bg-yellow-100 text-yellow-700 border-yellow-300">
                            🏆 Gold Holder
                          </Badge>
                          <span className="text-[10px] text-muted">5,000 $TOKEN</span>
                        </div>
                        <div className="text-[10px] font-mono text-muted truncate">
                          0x742d...3f91
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Admin Reply 1 */}
                  <div className="flex flex-col items-start pl-8">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-outline flex items-center justify-center">
                        <span className="text-white text-[9px] font-bold">A</span>
                      </div>
                      <span className="text-xs font-bold text-foreground">Alex</span>
                      <Badge size="sm" className="text-[8px] bg-purple-100 text-purple-700 border-purple-300">Admin</Badge>
                      <span className="text-[10px] text-muted">11:44</span>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-outline rounded-2xl rounded-tl-sm p-2.5 max-w-[80%] shadow-sm">
                      <div className="text-[11px] text-foreground/90">
                        Hey! Let me check the contract logs for your wallet...
                      </div>
                    </div>
                  </div>

                  {/* Admin Reply 2 */}
                  <div className="flex flex-col items-start pl-8">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-outline flex items-center justify-center">
                        <span className="text-white text-[9px] font-bold">A</span>
                      </div>
                      <span className="text-xs font-bold text-foreground">Alex</span>
                      <span className="text-[10px] text-muted">11:46</span>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-outline rounded-2xl rounded-tl-sm p-2.5 max-w-[80%] shadow-sm">
                      <div className="text-[11px] text-foreground/90">
                        Found it! Try increasing your gas limit to 250k. The airdrop contract needs extra gas for the rewards calculation ⛽
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-center pt-1">
                    <Badge variant="success" size="sm" className="text-[9px]">
                      ✅ Ticket In Progress
                    </Badge>
                  </div>
                </div>

                {/* Telegram Input */}
                <div className="p-2.5 border-t-2 border-outline bg-white flex gap-2">
                  <div className="flex-1 h-8 bg-slate-50 rounded-full px-3 flex items-center text-[10px] text-slate-400 border border-slate-200">
                    Type a message...
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#0088cc" }}
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
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
                        <div className="font-bold text-xs">CryptoDAO</div>
                        <div className="text-[9px] opacity-90">Support Team</div>
                      </div>
                    </div>
                  </div>

                  {/* Widget Body */}
                  <div className="p-3 bg-slate-50 h-32 flex flex-col">
                    <div className="flex-1 flex items-center justify-center text-center">
                      <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border-2 border-slate-100">
                        <div className="text-xl mb-1">🪙</div>
                        <p className="font-bold text-sm text-slate-700">Need help?</p>
                        <p className="text-[10px] text-slate-500">
                          Connect your wallet
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
