import { notFound } from 'next/navigation'
import { ImageManager } from '../../_components/ImageManager'
import { ReviewManager } from '../../_components/ReviewManager'
import { PageHeader } from '../../_components/AdminShell'
import { ContextBanner } from '../../_components/ContextBanner'
import { AdminBackLink } from '../../_components/AdminBackLink'

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
      <AdminBackLink href="/admin/bands" label="← Alle Bands" />

      <PageHeader
        title={band.name}
        subtitle={band.category}
      />

      {/* ── Showcase-Bild ──────────────────────────────────── */}
      <ContextBanner
        location={`Bands → ${band.name} — Karte auf /bands`}
        url="/bands"
        dimensions="mind. 800 × 600 px (4:3)"
        note="Dieses Bild erscheint als Vorschaukarte auf der Bands-Übersichtsseite. Nur 1 Bild möglich — zeigt die Band am besten von vorne."
        preview="band-showcase"
      />

      <ImageManager
        table="band_images"
        folder={`bands/${slug}`}
        filter={{ column: 'band_slug', value: slug }}
        extraFilters={[{ column: 'role', value: 'showcase' }]}
        insertExtra={{ band_slug: slug, role: 'showcase' }}
        maxImages={1}
        title="Showcase-Bild"
        description="Erscheint als Karten-Bild auf der Bands-Übersichtsseite (/bands)."
      />

      <div style={{ borderTop: '1px solid #E8D8C8', margin: '8px 0 40px' }} />

      {/* ── Hintergrundbild ────────────────────────────────── */}
      <ContextBanner
        location={`/${slug} — Hero-Hintergrund`}
        url={`/${slug}`}
        dimensions="mind. 1920 × 1080 px (16:9)"
        note="Vollflächiger Hintergrund der Band-Detailseite. Wird mit dunklem Overlay überlagert — ein stimmungsvolles Bühnenfoto funktioniert am besten."
        preview="band-hero"
      />

      <ImageManager
        table="band_images"
        folder={`bands/${slug}`}
        filter={{ column: 'band_slug', value: slug }}
        extraFilters={[{ column: 'role', value: 'hero' }]}
        insertExtra={{ band_slug: slug, role: 'hero' }}
        maxImages={1}
        title="Hintergrundbild"
        description="Hero-Hintergrund der Band-Detailseite (/${slug})."
      />

      <div style={{ borderTop: '1px solid #E8D8C8', margin: '8px 0 40px' }} />

      {/* ── Galerie ────────────────────────────────────────── */}
      <ContextBanner
        location={`/${slug} — Bildergalerie`}
        url={`/${slug}`}
        dimensions="mind. 1200 × 800 px (Querformat empfohlen)"
        note="Erscheinen als Foto-Grid auf der Band-Detailseite. Erstes Bild wird als Hauptbild groß dargestellt, weitere folgen im Grid und als Lightbox."
        preview="band-gallery"
      />

      <ImageManager
        table="band_images"
        folder={`bands/${slug}`}
        filter={{ column: 'band_slug', value: slug }}
        extraFilters={[{ column: 'role', value: 'gallery' }]}
        insertExtra={{ band_slug: slug, role: 'gallery' }}
        title="Galerie-Bilder"
        description="Foto-Grid + Lightbox auf der Band-Detailseite. Reihenfolge per Drag & Drop."
      />

      <div style={{ borderTop: '1px solid #E8D8C8', margin: '8px 0 40px' }} />

      {/* ── Bewertungen ────────────────────────────────────── */}
      <ReviewManager bandSlug={slug} />
    </div>
  )
}
