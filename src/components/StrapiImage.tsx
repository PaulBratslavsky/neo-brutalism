import { getStrapiMediaUrl } from '@/lib/strapi'
import type { StrapiImage as StrapiImageType } from '@/types/strapi'

interface Props {
  image?: StrapiImageType | null
  className?: string
}

export default function StrapiImage({ image, className }: Props) {
  if (!image?.url) return null
  return (
    <div className="relative inline-block">
      {/* Offset shadow background */}
      <div className="absolute top-[5px] left-[5px] w-full h-full bg-foreground" />
      {/* Main image with thick border */}
      <img
        src={getStrapiMediaUrl(image.url)}
        alt={image.alternativeText || ''}
        width={image.width}
        height={image.height}
        className={`relative border-3 border-foreground ${className || ''}`}
        loading="lazy"
      />
    </div>
  )
}
