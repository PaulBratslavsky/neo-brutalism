import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import StrapiImage from '@/components/StrapiImage'
import StrapiLink from '@/components/StrapiLink'
import type { HeaderData } from '@/types/strapi'

interface Props {
  header: HeaderData
}

export default function Header({ header }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b-3 border-foreground bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        {header.logo && (
          <Link to={header.logo.href || '/'} className="flex items-center gap-3 group">
            <StrapiImage image={header.logo.image} className="h-8 w-auto" />
            <span className="text-xl font-black uppercase tracking-tight text-foreground">
              {header.logo.label}
            </span>
          </Link>
        )}

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {header.navItems?.map((item) => (
            <StrapiLink
              key={item.id}
              link={item}
              className="px-4 py-2 text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-accent"
            />
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          {header.cta && <StrapiLink link={header.cta} />}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 md:hidden text-foreground brutal-btn bg-accent"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
            {mobileOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            ) : (
              <><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t-3 border-foreground px-6 pb-6 md:hidden bg-background">
          <nav className="flex flex-col gap-1 pt-4">
            {header.navItems?.map((item) => (
              <StrapiLink
                key={item.id}
                link={item}
                className="px-4 py-3 text-sm font-bold uppercase tracking-wide text-foreground hover:bg-accent border-b-2 border-foreground"
              />
            ))}
            {header.cta && (
              <div className="pt-3">
                <StrapiLink link={header.cta} />
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
