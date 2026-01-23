"use client"

import { motion } from "framer-motion"
import { cn } from "~/lib/utils"

interface FloatProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  rotate?: number
}

export function Float({
  children,
  className,
  delay = 0,
  duration = 6,
  y = 10,
  rotate = 0,
}: FloatProps) {
  return (
    <motion.div
      animate={{
        y: [-y / 2, y / 2, -y / 2],
        rotate: rotate ? [-rotate, rotate, -rotate] : 0,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

interface BounceProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Bounce({ children, className, delay = 0 }: BounceProps) {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

interface WiggleProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Wiggle({ children, className, delay = 0 }: WiggleProps) {
  return (
    <motion.div
      animate={{
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 1,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

interface PopInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function PopIn({ children, className, delay = 0 }: PopInProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.3,
        delay,
        ease: [0.68, -0.55, 0.265, 1.55],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
