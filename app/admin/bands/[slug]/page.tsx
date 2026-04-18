import { notFound } from 'next/navigation'
import { ImageManager } from '../../_components/ImageManager'
import { ReviewManager } from '../../_components/ReviewManager'
import { PageHeader } from '../../_components/AdminShell'

const BANDS: Record<string, { name: string; category: string }> = {
  'groove-control':    { name: 'Groove Control',        category: 'Partyband'      },
  'spirit-of-soul':    { name: 'Spirit of Soul',        category: 'Partyband'      },
  'time-warp':         { name: 'Time Warp',             category: 'Partyband'      },
  'bobbastic':         { name: 'BOBbastic',             category: 'Partyband'      },
  'kiss-tribute':      { name: 'The Kiss Tribute Band', category: 'Tribute'        },
  'coversnake':        { name: 'CoverSnake',            category: 'Tribute'        },
  'adams-family':      { name: 'The Adams Family',      category: 'Tribute'        },
  'sir-williams':      { name: 'Sir Williams',          category: 'Tribute'        },
  'bobby-and-friends': { name: 'Bobby & Friends',       category: 'Easy Listening' },
  'marsch-mellows':    { name: 'Marsch Mellows',        category: 'Easy Listening' },
}

export function generateStaticParams() {
  return Object.keys(BANDS).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const band = BANDS[slug]
  return { title: band ? `${band.name} — Admin` : 'Band nicht gefunden' }
}

export default async function BandAdminPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const band = BANDS[slug]
  if (!band) notFound()

  return (
    <div>
      {/* Back link */}
      <a
        href="/admin/bands"
        style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
      >
        ← Alle Bands
      </a>

      <PageHeader
        title={band.name}
        subtitle={band.category}
      />

      {/* Images */}
      <ImageManager
        table="band_images"
        folder={`bands/${slug}`}
        filter={{ column: 'band_slug', value: slug }}
        insertExtra={{ band_slug: slug }}
        title="Band-Bilder"
        description="Fotos der Band — Bühnenauftritte, Promofotos, Behind the Scenes."
      />

      {/* Reviews */}
      <ReviewManager bandSlug={slug} />
    </div>
  )
}
