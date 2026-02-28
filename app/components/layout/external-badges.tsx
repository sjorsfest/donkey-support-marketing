"use client"

import { useEffect, useRef, useState } from "react"

const BADGES = [
  {
    href: "https://www.producthunt.com/products/donkey-support?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-donkey-support",
    src: "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1068311&theme=light&t=1769434185538",
    alt: "Featured on Product Hunt",
  },
  {
    href: "https://rankinpublic.xyz/products/donkey.support",
    src: "https://rankinpublic.xyz/api/badges/badge3.png?site=donkey.support",
    alt: "Featured on RankInPublic",
  },
  {
    href: "https://neeed.directory/products/donkey-support?utm_source=donkey-support",
    src: "https://neeed.directory/badges/neeed-badge-light.svg",
    alt: "Featured on neeed.directory",
  },
]

export function ExternalBadges() {
  const [shouldRenderBadges, setShouldRenderBadges] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) {
          return
        }
        setShouldRenderBadges(true)
        observer.disconnect()
      },
      { rootMargin: "200px 0px" },
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="flex items-center gap-2 mt-2">
      {shouldRenderBadges
        ? BADGES.map((badge) => (
            <a
              key={badge.href}
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <img
                src={badge.src}
                alt={badge.alt}
                width={120}
                height={26}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="w-[120px] h-[26px] object-contain"
              />
            </a>
          ))
        : null}
    </div>
  )
}
