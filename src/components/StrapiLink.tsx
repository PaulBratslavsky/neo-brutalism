import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/cn'
import type { StrapiLink as StrapiLinkType } from '@/types/strapi'

interface Props {
  link: StrapiLinkType
  className?: string
  children?: React.ReactNode
}

const buttonStyles = {
  PRIMARY:
    'brutal-btn inline-flex items-center justify-center bg-primary px-7 py-3.5 text-sm text-primary-foreground',
  SECONDARY:
    'brutal-btn inline-flex items-center justify-center bg-accent px-7 py-3.5 text-sm text-foreground',
}

export default function StrapiLink({ link, className, children }: Props) {
  const content = children || link.label
  const isExternal = link.isExternal || link.href?.startsWith('http')

  const btnClass = link.isButtonLink && link.type ? buttonStyles[link.type] : ''

  if (isExternal) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(btnClass, className)}
      >
        {content}
      </a>
    )
  }

  return (
    <Link to={link.href} className={cn(btnClass, className)}>
      {content}
    </Link>
  )
}
