import type { ImgHTMLAttributes } from "react"

type BrandLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  pngSrc?: string
  webpSrc?: string
}

export function BrandLogo({
  pngSrc = "/static/donkey.png",
  webpSrc = "/static/donkey.webp",
  alt = "Donkey Support logo",
  ...imgProps
}: BrandLogoProps) {
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={pngSrc} alt={alt} {...imgProps} />
    </picture>
  )
}
