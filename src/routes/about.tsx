import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { fetchStrapi } from '@/lib/strapi'
import type { GlobalData, PageData } from '@/types/strapi'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlockRenderer from '@/components/blocks/BlockRenderer'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  const [global, setGlobal] = useState<GlobalData | null>(null)
  const [page, setPage] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [globalRes, pagesRes] = await Promise.all([
          fetchStrapi<{ data: GlobalData }>(
            '/api/global',
            {
              'populate[banner][populate][link][populate]': '*',
              'populate[header][populate][logo][populate]': '*',
              'populate[header][populate][navItems][populate]': '*',
              'populate[header][populate][cta][populate]': '*',
              'populate[footer][populate][logo][populate]': '*',
              'populate[footer][populate][navItems][populate]': '*',
              'populate[footer][populate][socialLinks][populate]': '*',
              'status': 'published',
            }
          ),
          fetchStrapi<{ data: PageData[] }>(
            '/api/pages',
            {
              'filters[slug][$eq]': 'about',
              'populate[blocks][on][blocks.hero][populate][links][populate]': '*',
              'populate[blocks][on][blocks.hero][populate][image][populate]': '*',
              'populate[blocks][on][blocks.section-heading][populate]': '*',
              'populate[blocks][on][blocks.card-grid][populate][cards][populate]': '*',
              'populate[blocks][on][blocks.content-with-image][populate][link][populate]': '*',
              'populate[blocks][on][blocks.content-with-image][populate][image][populate]': '*',
              'populate[blocks][on][blocks.markdown][populate]': '*',
              'populate[blocks][on][blocks.person-card][populate][image][populate]': '*',
              'populate[blocks][on][blocks.faqs][populate][faq][populate]': '*',
              'populate[blocks][on][blocks.featured-articles][populate][articles][populate][0]': 'featuredImage',
              'populate[blocks][on][blocks.featured-articles][populate][articles][populate][1]': 'author',
              'populate[blocks][on][blocks.featured-articles][populate][articles][populate][2]': 'contentTags',
              'populate[blocks][on][blocks.newsletter][populate]': '*',
              'status': 'published',
            }
          ),
        ])
        setGlobal(globalRes.data)
        if (pagesRes.data && pagesRes.data.length > 0) {
          setPage(pagesRes.data[0])
        } else {
          setError('About page not found')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-500/20 border-t-red-500" />
          <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="brutal-card px-8 py-6 text-center">
          <p className="font-black uppercase text-foreground">Something went wrong</p>
          <p className="mt-2 text-sm text-foreground/70">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {global?.banner && <Banner banner={global.banner} />}
      {global?.header && <Header header={global.header} />}

      <main className="flex-1">
        {page?.blocks && page.blocks.length > 0 ? (
          <BlockRenderer blocks={page.blocks} />
        ) : (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground">No content blocks found.</p>
          </div>
        )}
      </main>

      {global?.footer && <Footer footer={global.footer} />}
    </div>
  )
}
