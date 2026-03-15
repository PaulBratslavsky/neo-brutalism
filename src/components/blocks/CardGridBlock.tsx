import type { CardGridBlock as CardGridBlockType } from '@/types/strapi'

interface Props {
  block: CardGridBlockType
}

const accentColors = [
  'bg-[#FFE156]',
  'bg-[#7EB4FF]',
  'bg-[#FF8FAB]',
  'bg-[#8FE388]',
]

export default function CardGridBlock({ block }: Props) {
  if (!block.cards?.length) return null
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {block.cards.map((card, i) => (
          <div
            key={card.id}
            className="brutal-card p-6"
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center border-3 border-foreground ${accentColors[i % accentColors.length]}`}>
              <span className="text-lg font-black">0{i + 1}</span>
            </div>
            <h3 className="text-lg font-black uppercase text-foreground">{card.heading}</h3>
            {card.text && (
              <p className="mt-3 text-sm leading-relaxed text-foreground/70 font-medium">{card.text}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
