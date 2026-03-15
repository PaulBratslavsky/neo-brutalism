import { Link } from '@tanstack/react-router'
import StrapiImage from '@/components/StrapiImage'
import type { FeaturedArticlesBlock as FeaturedArticlesBlockType } from '@/types/strapi'

interface Props {
  block: FeaturedArticlesBlockType
}

const cardAccents = [
  'bg-[#FFE156]',
  'bg-[#7EB4FF]',
  'bg-[#FF8FAB]',
  'bg-[#8FE388]',
  'bg-[#FFE156]',
  'bg-[#7EB4FF]',
]

export default function FeaturedArticlesBlock({ block }: Props) {
  if (!block.articles?.length) return null

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {block.articles.map((article, i) => (
          <Link
            key={article.id}
            to={`/blog/${article.slug}`}
            className="brutal-card overflow-hidden group"
          >
            {article.featuredImage && (
              <div className="overflow-hidden border-b-3 border-foreground">
                <StrapiImage
                  image={article.featuredImage}
                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-6">
              {article.contentTags && article.contentTags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {article.contentTags.map((tag, tagIdx) => (
                    <span
                      key={tag.id}
                      className={`brutal-sticker rotate-0 ${cardAccents[tagIdx % cardAccents.length]}`}
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
              )}
              <h3 className="text-lg font-black uppercase text-foreground">
                {article.title}
              </h3>
              {article.description && (
                <p className="mt-2 line-clamp-2 text-sm text-foreground/70 font-medium">
                  {article.description}
                </p>
              )}
              {article.author && (
                <p className="mt-4 text-xs font-bold uppercase text-foreground/50">
                  By {article.author.fullName}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
