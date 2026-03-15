import ReactMarkdown from 'react-markdown'

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-a:text-primary prose-a:underline prose-a:decoration-2 prose-a:underline-offset-2 hover:prose-a:text-primary/80 prose-li:text-foreground/80 prose-blockquote:text-foreground/70 prose-blockquote:border-foreground prose-blockquote:border-l-4 prose-blockquote:font-bold">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
