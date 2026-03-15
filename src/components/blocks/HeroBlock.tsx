import StrapiImage from '@/components/StrapiImage'
import StrapiLink from '@/components/StrapiLink'
import type { HeroBlock as HeroBlockType } from '@/types/strapi'

interface Props {
  block: HeroBlockType
}

export default function HeroBlock({ block }: Props) {
  return (
    <section className="relative overflow-hidden bg-accent border-b-3 border-foreground">
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-24 lg:flex-row lg:gap-16 lg:py-32">
        {/* Text content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <div className="brutal-sticker bg-primary text-white mb-8 rotate-[-3deg]">
            Now Live
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tight sm:text-6xl lg:text-7xl text-foreground leading-[0.9]">
            {block.heading}
          </h1>
          {block.text && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70 font-medium">
              {block.text}
            </p>
          )}
          {block.links && block.links.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-4">
              {block.links.map((link) => (
                <StrapiLink key={link.id} link={link} />
              ))}
            </div>
          )}
        </div>

        {/* Hero image */}
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
