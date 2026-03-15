import MarkdownRenderer from '@/components/MarkdownRenderer'
import type { MarkdownBlockType } from '@/types/strapi'

interface Props {
  block: MarkdownBlockType
}

export default function MarkdownBlock({ block }: Props) {
  if (!block.content) return null
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <div className="brutal-card p-8">
        <MarkdownRenderer content={block.content} />
      </div>
    </section>
  )
}
