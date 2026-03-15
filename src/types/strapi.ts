// Strapi media
export interface StrapiImage {
  id: number
  url: string
  alternativeText?: string
  width?: number
  height?: number
  formats?: Record<string, { url: string; width: number; height: number }>
}

// Strapi link
export interface StrapiLink {
  id: number
  href: string
  label: string
  isExternal?: boolean
  isButtonLink?: boolean
  type?: 'PRIMARY' | 'SECONDARY'
}

// Logo link (with image)
export interface StrapiLogoLink {
  id: number
  label: string
  href: string
  image?: StrapiImage
}

// Banner
export interface Banner {
  id: number
  isVisible: boolean
  description?: string
  link?: StrapiLink
}

// Header
export interface HeaderData {
  id: number
  logo?: StrapiLogoLink
  navItems?: StrapiLink[]
  cta?: StrapiLink
}

// Footer
export interface FooterData {
  id: number
  logo?: StrapiLogoLink
  navItems?: StrapiLink[]
  socialLinks?: StrapiLogoLink[]
  text?: string
}

// Global single type
export interface GlobalData {
  id: number
  documentId: string
  title: string
  description?: string
  banner?: Banner
  header?: HeaderData
  footer?: FooterData
}

// Block types
export interface HeroBlock {
  __component: 'blocks.hero'
  id: number
  heading: string
  text?: string
  links?: StrapiLink[]
  image?: StrapiImage
}

export interface SectionHeadingBlock {
  __component: 'blocks.section-heading'
  id: number
  subHeading?: string
  heading: string
  anchorLink?: string
}

export interface Card {
  id: number
  heading: string
  text?: string
}

export interface CardGridBlock {
  __component: 'blocks.card-grid'
  id: number
  cards?: Card[]
}

export interface ContentWithImageBlock {
  __component: 'blocks.content-with-image'
  id: number
  reversed?: boolean
  heading?: string
  content?: string
  link?: StrapiLink
  image?: StrapiImage
}

export interface MarkdownBlockType {
  __component: 'blocks.markdown'
  id: number
  content?: string
}

export interface PersonCardBlock {
  __component: 'blocks.person-card'
  id: number
  image?: StrapiImage
  text?: string
  personName?: string
  personJob?: string
}

export interface FaqItem {
  id: number
  heading: string
  text?: string
}

export interface FaqsBlock {
  __component: 'blocks.faqs'
  id: number
  faq?: FaqItem[]
}

export interface Author {
  id: number
  fullName: string
}

export interface Tag {
  id: number
  title: string
}

export interface Article {
  id: number
  documentId: string
  title: string
  slug: string
  description?: string
  content?: string
  publishedAt?: string
  featuredImage?: StrapiImage
  author?: Author
  contentTags?: Tag[]
}

export interface FeaturedArticlesBlock {
  __component: 'blocks.featured-articles'
  id: number
  articles?: Article[]
}

export interface NewsletterBlock {
  __component: 'blocks.newsletter'
  id: number
  heading?: string
  text?: string
  placeholder?: string
  label?: string
  formId?: string
}

export type Block =
  | HeroBlock
  | SectionHeadingBlock
  | CardGridBlock
  | ContentWithImageBlock
  | MarkdownBlockType
  | PersonCardBlock
  | FaqsBlock
  | FeaturedArticlesBlock
  | NewsletterBlock

export interface LandingPageData {
  id: number
  documentId: string
  title: string
  description?: string
  blocks?: Block[]
}

export interface PageData {
  id: number
  documentId: string
  title: string
  description?: string
  slug: string
  blocks?: Block[]
}
