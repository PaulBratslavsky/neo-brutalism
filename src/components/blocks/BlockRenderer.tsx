import type { Block } from '@/types/strapi'
import HeroBlock from '@/components/blocks/HeroBlock'
import SectionHeadingBlock from '@/components/blocks/SectionHeadingBlock'
import CardGridBlock from '@/components/blocks/CardGridBlock'
import ContentWithImageBlock from '@/components/blocks/ContentWithImageBlock'
import MarkdownBlock from '@/components/blocks/MarkdownBlock'
import PersonCardBlock from '@/components/blocks/PersonCardBlock'
import FaqsBlock from '@/components/blocks/FaqsBlock'
import FeaturedArticlesBlock from '@/components/blocks/FeaturedArticlesBlock'
import NewsletterBlock from '@/components/blocks/NewsletterBlock'

interface Props {
  blocks: Block[]
}

export default function BlockRenderer({ blocks }: Props) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.__component) {
          case 'blocks.hero':
            return <HeroBlock key={block.id} block={block} />
          case 'blocks.section-heading':
            return <SectionHeadingBlock key={block.id} block={block} />
          case 'blocks.card-grid':
            return <CardGridBlock key={block.id} block={block} />
          case 'blocks.content-with-image':
            return <ContentWithImageBlock key={block.id} block={block} />
          case 'blocks.markdown':
            return <MarkdownBlock key={block.id} block={block} />
          case 'blocks.person-card':
            return <PersonCardBlock key={block.id} block={block} />
          case 'blocks.faqs':
            return <FaqsBlock key={block.id} block={block} />
          case 'blocks.featured-articles':
            return <FeaturedArticlesBlock key={block.id} block={block} />
          case 'blocks.newsletter':
            return <NewsletterBlock key={block.id} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
