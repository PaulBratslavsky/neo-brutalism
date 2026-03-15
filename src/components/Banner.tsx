import { useState } from 'react'
import StrapiLink from '@/components/StrapiLink'
import type { Banner as BannerType } from '@/types/strapi'

interface Props {
  banner: BannerType
}

export default function Banner({ banner }: Props) {
  const [dismissed, setDismissed] = useState(false)
  if (!banner.isVisible || dismissed) return null

  return (
    <div className="relative bg-primary border-b-3 border-foreground text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-3 text-sm font-black uppercase tracking-wide">
        {banner.description && <p>{banner.description}</p>}
        {banner.link && (
          <StrapiLink
            link={banner.link}
            className="font-black underline underline-offset-4 decoration-2 hover:no-underline"
          />
        )}
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 font-black"
          aria-label="Dismiss banner"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  )
}
