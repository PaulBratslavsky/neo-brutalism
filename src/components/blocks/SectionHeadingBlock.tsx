import type { SectionHeadingBlock as SectionHeadingBlockType } from '@/types/strapi'

interface Props {
  block: SectionHeadingBlockType
}

export default function SectionHeadingBlock({ block }: Props) {
  return (
    <div
      id={block.anchorLink || undefined}
      className="mx-auto max-w-3xl px-6 py-20 text-center"
    >
      {block.subHeading && (
        <span className="brutal-sticker bg-primary text-white mb-6 inline-block">
          {block.subHeading}
        </span>
      )}
      <h2 className="text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl leading-[0.95]">
        {block.heading}
      </h2>
    </div>
  )
}
