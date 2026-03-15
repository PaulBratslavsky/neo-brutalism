import StrapiImage from '@/components/StrapiImage'
import type { PersonCardBlock as PersonCardBlockType } from '@/types/strapi'

interface Props {
  block: PersonCardBlockType
}

export default function PersonCardBlock({ block }: Props) {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <div className="brutal-card p-10 text-center flex flex-col items-center">
        {block.image && (
          <StrapiImage
            image={block.image}
            className="mb-6 h-20 w-20 object-cover"
          />
        )}
        {block.text && (
          <blockquote className="text-lg italic leading-relaxed text-foreground/80 font-medium border-l-4 border-foreground pl-4 text-left">
            &ldquo;{block.text}&rdquo;
          </blockquote>
        )}
        {block.personName && (
          <p className="mt-5 font-black uppercase text-foreground">{block.personName}</p>
        )}
        {block.personJob && (
          <p className="text-sm font-bold text-primary">{block.personJob}</p>
        )}
      </div>
    </section>
  )
}
