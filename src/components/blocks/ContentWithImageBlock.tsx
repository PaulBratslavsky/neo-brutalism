import StrapiImage from '@/components/StrapiImage'
import StrapiLink from '@/components/StrapiLink'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { cn } from '@/lib/cn'
import type { ContentWithImageBlock as ContentWithImageBlockType } from '@/types/strapi'

interface Props {
  block: ContentWithImageBlockType
}

export default function ContentWithImageBlock({ block }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div
        className={cn(
          'flex flex-col items-center gap-16 lg:flex-row',
          block.reversed && 'lg:flex-row-reverse'
        )}
      >
        {/* Text side */}
        <div className="flex-1">
          {block.heading && (
            <h2 className="text-4xl font-black uppercase tracking-tight text-foreground">
              {block.heading}
            </h2>
          )}
          {block.content && (
            <div className="mt-5">
              <MarkdownRenderer content={block.content} />
            </div>
          )}
          {block.link && (
            <div className="mt-8">
              <StrapiLink link={block.link} />
            </div>
          )}
        </div>

        {/* Image side */}
        {block.image && (
          <div className="flex-1">
            <StrapiImage
              image={block.image}
              className="w-full"
            />
          </div>
        )}
      </div>
    </section>
  )
}
