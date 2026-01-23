"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FaDiscord, FaSlack } from "react-icons/fa"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Float } from "~/components/motion"
import { Sparkles } from "lucide-react"

export function Hero() {
  const platforms = [
    {
      name: "Slack Workspace",
      colorClass: "text-[#7A4A7F]",
      badgeClass: "bg-[#7A4A7F]/10 border-[#7A4A7F]/30",
      sizeClass: "text-[0.85em]",
      icon: FaSlack,
    },
    {
      name: "Discord Server",
      colorClass: "text-[#5865F2]",
      badgeClass: "bg-[#5865F2]/10 border-[#5865F2]/30",
      sizeClass: "text-[0.85em]",
      icon: FaDiscord,
    },
  ]
  const [activePlatform, setActivePlatform] = useState(0)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlatform((prev) => (prev + 1) % platforms.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [platforms.length])

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
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
                Ship support without a helpdesk
              </Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              <span className="text-outline-hero">Support chat</span> that
              <br />
              <span className="text-foreground">lives in your</span>{" "}
              <span className="relative inline-flex items-center min-w-[13ch]">
                <motion.span
                  key={platforms[activePlatform].name}
                  initial={{ opacity: 0, y: 10, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -10, rotate: 2 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-flex items-center gap-2 font-bold ${platforms[activePlatform].colorClass} ${platforms[activePlatform].sizeClass}`}
                >
                  <span
                    className={`inline-flex h-[1em] w-[1em] items-center justify-center rounded-full border ${platforms[activePlatform].badgeClass}`}
                    aria-hidden
                  >
                    {(() => {
                      const Icon = platforms[activePlatform].icon
                      return <Icon className="h-[0.65em] w-[0.65em]" />
                    })()}
                  </span>
                  {platforms[activePlatform].name}
                </motion.span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8">
              Add a lightweight widget to your app. New messages become Slack or
              Discord threads, so you can reply where you already work.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" onClick={() => scrollToSection("pricing")}>
                Launch your widget
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToSection("how-it-works")}
              >
                See how it works
              </Button>
            </div>

            {/* Social Proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="mt-8 text-sm text-muted"
            >
              Built for indie founders and solo builders
            </motion.p>
          </motion.div>

          {/* Right Column - Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Dashboard Mockup */}
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

                {/* Dashboard Content Placeholder */}
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-xl border-2 border-outline">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pink-500 rounded-lg border-2 border-outline" />
                      <div className="space-y-1">
                        <div className="h-3 w-24 bg-foreground/20 rounded" />
                        <div className="h-2 w-16 bg-foreground/10 rounded" />
                      </div>
                    </div>
                    <Badge variant="success" size="sm">Open</Badge>
                  </div>

                  {/* Ticket Rows */}
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-border hover:border-outline transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded-lg" />
                        <div className="space-y-1">
                          <div className="h-3 w-32 bg-foreground/15 rounded" />
                          <div className="h-2 w-20 bg-foreground/10 rounded" />
                        </div>
                      </div>
                      <div className="h-2 w-12 bg-foreground/10 rounded" />
                    </div>
                  ))}
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

            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-pink-300/50 rounded-full blur-xl" />
            <div className="absolute -bottom-8 right-8 w-24 h-24 bg-yellow-300/50 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
