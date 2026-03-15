import { Link } from '@tanstack/react-router'
import StrapiImage from '@/components/StrapiImage'
import StrapiLink from '@/components/StrapiLink'
import { getStrapiMediaUrl } from '@/lib/strapi'
import type { FooterData } from '@/types/strapi'

interface Props {
  footer: FooterData
}

export default function Footer({ footer }: Props) {
  return (
    <footer className="border-t-3 border-foreground bg-accent">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between">
          {/* Logo */}
          {footer.logo && (
            <Link to={footer.logo.href || '/'} className="flex items-center gap-3 group">
              <StrapiImage image={footer.logo.image} className="h-8 w-auto" />
              <span className="text-xl font-black uppercase tracking-tight">
                {footer.logo.label}
              </span>
            </Link>
          )}

          {/* Nav links */}
          <nav className="flex flex-wrap items-center gap-6">
            {footer.navItems?.map((item) => (
              <StrapiLink
                key={item.id}
                link={item}
                className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
              />
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {footer.socialLinks?.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn bg-white p-2 text-foreground hover:bg-primary hover:text-white"
                aria-label={social.label}
              >
                {social.image ? (
                  <img
                    src={getStrapiMediaUrl(social.image.url)}
                    alt={social.label}
                    className="h-5 w-5"
                  />
                ) : (
                  <span className="text-sm font-bold">{social.label}</span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        {footer.text && (
          <p className="mt-12 text-center text-sm font-bold text-foreground/60">
            {footer.text}
          </p>
        )}
      </div>
    </footer>
  )
}
