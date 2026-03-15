import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { fetchStrapi } from '@/lib/strapi'
import type { GlobalData, Article } from '@/types/strapi'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StrapiImage from '@/components/StrapiImage'

const PAGE_SIZE = 4

const cardAccents = [
  'bg-[#FFE156]',
  'bg-[#7EB4FF]',
  'bg-[#FF8FAB]',
  'bg-[#8FE388]',
]

interface ArticlesResponse {
  data: Article[]
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } }
}

export const Route = createFileRoute('/blog/')({ 
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page ?? 1),
    q: String(search.q ?? ''),
  }),
  component: BlogPage,
})

function BlogPage() {
  const { page, q } = Route.useSearch()
  const navigate = Route.useNavigate()

  const [global, setGlobal] = useState<GlobalData | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState(q)

  useEffect(() => {
    fetchStrapi<{ data: GlobalData }>('/api/global', {
      'populate[banner][populate][link][populate]': '*',
      'populate[header][populate][logo][populate]': '*',
      'populate[header][populate][navItems][populate]': '*',
      'populate[header][populate][cta][populate]': '*',
      'populate[footer][populate][logo][populate]': '*',
      'populate[footer][populate][navItems][populate]': '*',
      'populate[footer][populate][socialLinks][populate]': '*',
      status: 'published',
    }).then((res) => setGlobal(res.data)).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const params: Record<string, string> = {
      'populate[featuredImage]': '*',
      'populate[author]': '*',
      'populate[contentTags]': '*',
      'pagination[page]': String(page),
      'pagination[pageSize]': String(PAGE_SIZE),
      status: 'published',
      sort: 'publishedAt:desc',
    }
    if (q) {
      params['filters[title][$containsi]'] = q
    }
    fetchStrapi<ArticlesResponse>('/api/articles', params)
      .then((res) => {
        setArticles(res.data)
        setTotalPages(res.meta.pagination.pageCount)
        setTotalCount(res.meta.pagination.total)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [page, q])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    navigate({ search: { page: 1, q: searchInput } })
  }

  function goToPage(p: number) {
    navigate({ search: { page: p, q } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {global?.banner && <Banner banner={global.banner} />}
      {global?.header && <Header header={global.header} />}

      <main className="flex-1">
        {/* Hero header */}
        <div className="border-b-3 border-foreground bg-[#FFE156] px-6 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-2">
              <span className="brutal-sticker inline-block w-fit bg-foreground text-background">The Blog</span>
              <h1 className="text-5xl font-black uppercase tracking-tight text-foreground md:text-7xl">
                All Articles
              </h1>
              <p className="mt-2 text-lg font-bold text-foreground/70">
                {totalCount > 0 ? `${totalCount} post${totalCount !== 1 ? 's' : ''} found` : 'Explore our latest writing'}
              </p>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="border-b-3 border-foreground bg-background px-6 py-6">
          <div className="mx-auto max-w-7xl">
            <form onSubmit={handleSearch} className="flex gap-0">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles..."
                className="brutal-input flex-1 px-5 py-3 text-base font-bold uppercase tracking-wide placeholder:font-bold placeholder:uppercase placeholder:opacity-40"
              />
              <button
                type="submit"
                className="brutal-btn border-l-0 bg-primary px-8 py-3 text-sm font-black uppercase tracking-widest text-white"
              >
                Search
              </button>
              {q && (
                <button
                  type="button"
                  onClick={() => { setSearchInput(''); navigate({ search: { page: 1, q: '' } }) }}
                  className="brutal-btn border-l-0 bg-foreground px-4 py-3 text-sm font-black uppercase text-background"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </form>
            {q && (
              <p className="mt-3 text-sm font-bold uppercase text-foreground/60">
                Showing results for: <span className="text-primary">&ldquo;{q}&rdquo;</span>
              </p>
            )}
          </div>
        </div>

        {/* Articles grid */}
        <div className="mx-auto max-w-7xl px-6 py-12">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="brutal-card flex flex-col items-center gap-4 px-12 py-10">
                <div className="h-10 w-10 animate-spin border-4 border-foreground/20 border-t-primary" />
                <p className="text-sm font-black uppercase tracking-widest">Loading...</p>
              </div>
            </div>
          ) : articles.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="brutal-card px-12 py-10 text-center">
                <div className="mb-4 text-5xl">✦</div>
                <p className="text-xl font-black uppercase">No articles found</p>
                {q && (
                  <p className="mt-2 text-sm font-bold text-foreground/60">
                    Try a different search term
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2">
              {articles.map((article, i) => (
                <Link
                  key={article.id}
                  to="/blog/$slug"
                  params={{ slug: article.slug }}
                  className="brutal-card group flex flex-col overflow-hidden"
                >
                  {article.featuredImage ? (
                    <div className="overflow-hidden border-b-3 border-foreground">
                      <StrapiImage
                        image={article.featuredImage}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className={`aspect-video w-full border-b-3 border-foreground ${cardAccents[i % cardAccents.length]} flex items-center justify-center`}>
                      <span className="text-4xl font-black text-foreground/20">✦</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
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
                    <h2 className="text-xl font-black uppercase leading-tight text-foreground">
                      {article.title}
                    </h2>
                    {article.description && (
                      <p className="mt-3 line-clamp-2 flex-1 text-sm font-medium text-foreground/70">
                        {article.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center border-t-2 border-dashed border-foreground/30 pt-4">
                      {article.author && (
                        <p className="text-xs font-black uppercase tracking-wider text-foreground/50">
                          By {article.author.fullName}
                        </p>
                      )}
                      <span className="brutal-btn ml-auto bg-primary px-8 py-3 text-xs font-black uppercase tracking-wider text-white">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="brutal-btn bg-background px-5 py-3 text-sm font-black uppercase disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`brutal-btn px-5 py-3 text-sm font-black uppercase ${
                    p === page
                      ? 'bg-primary text-white'
                      : 'bg-background hover:bg-[#FFE156]'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="brutal-btn bg-background px-5 py-3 text-sm font-black uppercase disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}

          {!loading && articles.length > 0 && (
            <p className="mt-6 text-center text-xs font-bold uppercase tracking-widest text-foreground/40">
              Page {page} of {totalPages} — {totalCount} total article{totalCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </main>

      {global?.footer && <Footer footer={global.footer} />}
    </div>
  )
}
