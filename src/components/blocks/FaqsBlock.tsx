import { useState } from 'react'
import { cn } from '@/lib/cn'
import type { FaqsBlock as FaqsBlockType } from '@/types/strapi'

interface Props {
  block: FaqsBlockType
}

export default function FaqsBlock({ block }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!block.faq?.length) return null

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="border-3 border-foreground bg-white" style={{ boxShadow: 'var(--shadow-brutal)' }}>
        {block.faq.map((item, index) => (
          <div key={item.id} className={cn(index !== 0 && 'border-t-3 border-foreground')}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-accent transition-colors"
            >
              <span className="font-black uppercase text-foreground">{item.heading}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="square"
                strokeLinejoin="miter"
                className={cn(
                  'shrink-0 text-foreground transition-transform duration-200',
                  openIndex === index && 'rotate-180 text-primary'
                )}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openIndex === index && item.text && (
              <div className="px-6 pb-5 text-sm leading-relaxed text-foreground/70 font-medium border-t-2 border-dashed border-foreground/20 pt-4">
                {item.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
