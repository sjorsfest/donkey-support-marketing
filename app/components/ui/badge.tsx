import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-4 gap-1.5 [&>svg]:pointer-events-none transition-all",
  {
    variants: {
      variant: {
        default:
          "bg-pink-500 text-white border-2 border-outline shadow-[2px_2px_0_#1a1a1a]",
        secondary:
          "bg-white text-foreground border-2 border-outline shadow-[2px_2px_0_#1a1a1a]",
        outline:
          "bg-transparent text-foreground border-2 border-outline",
        success:
          "bg-green-500 text-white border-2 border-outline shadow-[2px_2px_0_#1a1a1a]",
        warning:
          "bg-yellow-400 text-foreground border-2 border-outline shadow-[2px_2px_0_#1a1a1a]",
        promo:
          "bg-gradient-to-r from-pink-500 to-pink-400 text-white border-2 border-outline shadow-[2px_2px_0_#1a1a1a] animate-pulse",
        slack:
          "bg-slack-aubergine text-white border-2 border-outline shadow-[2px_2px_0_#1a1a1a]",
        discord:
          "bg-discord-blurple text-white border-2 border-outline shadow-[2px_2px_0_#1a1a1a]",
        telegram:
          "bg-telegram-blue text-white border-2 border-outline shadow-[2px_2px_0_#1a1a1a]",
      },
      size: {
        default: "text-sm px-3 py-1",
        sm: "text-xs px-2 py-0.5",
        lg: "text-base px-4 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
