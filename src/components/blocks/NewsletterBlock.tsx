import type { NewsletterBlock as NewsletterBlockType } from '@/types/strapi'

interface Props {
  block: NewsletterBlockType
}

export default function NewsletterBlock({ block }: Props) {
  return (
    <section className="border-y-3 border-foreground bg-[#FFE156]">
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        {block.heading && (
          <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">
            {block.heading}
          </h2>
        )}
        {block.text && (
          <p className="mt-4 text-foreground/70 text-lg font-medium">{block.text}</p>
        )}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <input
            type="email"
            placeholder={block.placeholder || 'Enter your email'}
            className="brutal-input px-5 py-3.5 text-sm text-foreground placeholder:text-foreground/50 sm:w-72"
          />
          <button
            type="submit"
            className="brutal-btn bg-primary px-7 py-3.5 text-sm text-white"
          >
            {block.label || 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  )
}
