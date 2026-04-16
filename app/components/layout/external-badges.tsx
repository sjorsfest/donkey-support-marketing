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
  {
    href: "https://launchigniter.com/product/donkey-support?ref=badge-donkey-support",
    src: "https://launchigniter.com/api/badge/donkey-support?theme=neutral",
    alt: "Featured on LaunchIgniter",
  },
  {
    href: "https://weliketools.com",
    src: "https://weliketools.com/assets/images/badge.png",
    alt: "We Like Tools",
  },
  {
    href: "https://saaswheel.com",
    src: "https://saaswheel.com/assets/images/badge.png",
    alt: "SaaS Wheel",
  },
  {
    href: "https://themegatools.com",
    src: "https://themegatools.com/assets/images/badge.png",
    alt: "The Mega Tools",
  },
  {
    href: "https://saasfame.com/item/donkey-support",
    src: "https://saasfame.com/badge-light.svg",
    alt: "Featured on saasfame.com",
  },
]

export function ExternalBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-10 gap-y-6 mt-4 max-w-[260px]">
      {BADGES.map((badge) => (
        <a
          key={badge.href}
          href={badge.href}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
        >
          <img
            src={badge.src}
            alt={badge.alt}
            height={28}
            loading="lazy"
            decoding="async"
            className="h-[28px] w-auto object-contain"
          />
        </a>
      ))}
    </div>
  )
}
