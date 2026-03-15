import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { fetchStrapi } from '@/lib/strapi'
import type { GlobalData, Article } from '@/types/strapi'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StrapiImage from '@/components/StrapiImage'
import MarkdownRenderer from '@/components/MarkdownRenderer'

const cardAccents = [
  'bg-[#FFE156]',
  'bg-[#7EB4FF]',
  'bg-[#FF8FAB]',
  'bg-[#8FE388]',
]

interface ArticlePageData {
  global: GlobalData | null
  article: Article | null
  related: Article[]
}

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }): Promise<ArticlePageData> => {
    const [globalRes, articleRes] = await Promise.all([
      fetchStrapi<{ data: GlobalData }>('/api/global', {
        'populate[banner][populate][link][populate]': '*',
        'populate[header][populate][logo][populate]': '*',
        'populate[header][populate][navItems][populate]': '*',
        'populate[header][populate][cta][populate]': '*',
        'populate[footer][populate][logo][populate]': '*',
        'populate[footer][populate][navItems][populate]': '*',
        'populate[footer][populate][socialLinks][populate]': '*',
        status: 'published',
      }).catch(() => ({ data: null })),
      fetchStrapi<{ data: Article[] }>('/api/articles', {
        'filters[slug][$eq]': params.slug,
        'populate[featuredImage]': '*',
        'populate[author]': '*',
        'populate[contentTags]': '*',
        status: 'published',
      }).catch(() => ({ data: [] })),
    ])

    const article = articleRes.data?.[0] ?? null
    if (!article) throw notFound()

    const relatedRes = await fetchStrapi<{ data: Article[] }>('/api/articles', {
      'filters[slug][$ne]': params.slug,
      'populate[featuredImage]': '*',
      'populate[author]': '*',
      'populate[contentTags]': '*',
      'pagination[pageSize]': '3',
      status: 'published',
      sort: 'publishedAt:desc',
    }).catch(() => ({ data: [] }))

    return {
      global: globalRes.data,
      article,
      related: relatedRes.data ?? [],
    }
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="brutal-card px-12 py-10 text-center">
        <div className="mb-4 text-6xl font-black">404</div>
        <p className="text-xl font-black uppercase">Article not found</p>
        <Link to="/blog" className="brutal-btn mt-6 inline-block bg-primary px-6 py-3 font-black uppercase text-white">
          ← Back to Blog
        </Link>
      </div>
    </div>
  ),
})

function BlogPostPage() {
  const { global, article, related } = Route.useLoaderData()

  if (!article) return null

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {global?.banner && <Banner banner={global.banner} />}
      {global?.header && <Header header={global.header} />}

      <main className="flex-1">
        {/* Back nav */}
        <div className="border-b-3 border-foreground bg-background px-6 py-4">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/blog"
              className="brutal-btn inline-flex items-center gap-2 bg-background px-4 py-2 text-sm font-black uppercase tracking-widest hover:bg-[#FFE156]"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>

        {/* Hero area */}
        <div className="border-b-3 border-foreground bg-[#FFE156] px-6 py-10">
          <div className="mx-auto max-w-4xl">
            {article.contentTags && article.contentTags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {article.contentTags.map((tag, i) => (
                  <span
                    key={tag.id}
                    className={`brutal-sticker ${cardAccents[i % cardAccents.length]}`}
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl font-black uppercase leading-tight tracking-tight text-foreground md:text-6xl">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-6 border-t-3 border-foreground pt-6">
              {article.author && (
                <div className="flex items-center gap-3">
                  <div className="brutal-card h-10 w-10 bg-[#FF8FAB] p-0 flex items-center justify-center">
                    <span className="text-lg font-black">
                      {article.author.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground/50">Author</p>
                    <p className="text-sm font-black uppercase">{article.author.fullName}</p>
                  </div>
                </div>
              )}
              {publishedDate && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground/50">Published</p>
                  <p className="text-sm font-black uppercase">{publishedDate}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured image */}
        {article.featuredImage && (
          <div className="border-b-3 border-foreground">
            <div className="mx-auto max-w-4xl px-6 py-8">
              <div className="overflow-hidden border-3 border-foreground shadow-[6px_6px_0_black]">
                <StrapiImage
                  image={article.featuredImage}
                  className="aspect-video w-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Article content */}
        <div className="px-6 py-12">
          <div className="mx-auto max-w-4xl">
            {article.description && (
              <div className="brutal-card mb-10 border-l-8 border-primary bg-[#FFE156] p-6">
                <p className="text-lg font-bold leading-relaxed text-foreground">
                  {article.description}
                </p>
              </div>
            )}

            {article.content ? (
              <div className="brutal-card p-8">
                <MarkdownRenderer content={article.content} />
              </div>
            ) : (
              <div className="brutal-card p-8 text-center">
                <p className="font-bold uppercase text-foreground/50">No content available.</p>
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-3 border-foreground bg-foreground p-6 shadow-[4px_4px_0_#FF0000]">
              <div>
                {article.author && (
                  <p className="text-sm font-black uppercase text-background">
                    Written by {article.author.fullName}
                  </p>
                )}
                {publishedDate && (
                  <p className="text-xs font-bold uppercase text-background/60">{publishedDate}</p>
                )}
              </div>
              <Link
                to="/blog"
                className="brutal-btn bg-primary px-6 py-3 text-sm font-black uppercase tracking-widest text-white"
              >
                ← All Articles
              </Link>
            </div>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="border-t-3 border-foreground bg-background px-6 py-12">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex items-center gap-4">
                <span className="brutal-sticker bg-foreground text-background">More Reading</span>
                <h2 className="text-2xl font-black uppercase tracking-tight">More Articles</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                {related.map((rel, i) => (
                  <Link
                    key={rel.id}
                    to="/blog/$slug"
                    params={{ slug: rel.slug }}
                    className="brutal-card group flex flex-col overflow-hidden"
                  >
                    {rel.featuredImage ? (
                      <div className="overflow-hidden border-b-3 border-foreground">
                        <StrapiImage
                          image={rel.featuredImage}
                          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div
                        className={`aspect-video w-full border-b-3 border-foreground ${cardAccents[i % cardAccents.length]} flex items-center justify-center`}
                      >
                        <span className="text-3xl font-black text-foreground/20">✦</span>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-sm font-black uppercase leading-tight text-foreground">
                        {rel.title}
                      </h3>
                      <span className="brutal-btn mt-auto border-t-2 border-dashed border-foreground/30 pt-3 text-xs font-black uppercase text-primary">
                        Read →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {global?.footer && <Footer footer={global.footer} />}
    </div>
  )
}
