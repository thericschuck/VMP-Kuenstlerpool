'use client'

import { PageHeader } from '../_components/AdminShell'

const BANDS = [
  // Partybands
  { slug: 'groove-control',  name: 'Groove Control',         category: 'Partyband' },
  { slug: 'spirit-of-soul',  name: 'Spirit of Soul',         category: 'Partyband' },
  { slug: 'time-warp',       name: 'Time Warp',              category: 'Partyband' },
  { slug: 'bobbastic',       name: 'BOBbastic',              category: 'Partyband' },
  // Tribute
  { slug: 'kiss-tribute',    name: 'The Kiss Tribute Band',  category: 'Tribute' },
  { slug: 'coversnake',      name: 'CoverSnake',             category: 'Tribute' },
  { slug: 'adams-family',    name: 'The Adams Family',       category: 'Tribute' },
  { slug: 'sir-williams',    name: 'Sir Williams',           category: 'Tribute' },
  // Easy Listening
  { slug: 'bobby-and-friends', name: 'Bobby & Friends',     category: 'Easy Listening' },
  { slug: 'marsch-mellows',    name: 'Marsch Mellows',       category: 'Easy Listening' },
]

const CATEGORY_COLORS: Record<string, string> = {
  'Partyband':     '#ea580c',
  'Tribute':       '#8b5cf6',
  'Easy Listening':'#22c55e',
}

export default function BandsAdminPage() {
  return (
    <div>
      <PageHeader
        title="Bands"
        subtitle="Bilder und Bewertungen für jede Band verwalten. Band auswählen:"
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 12,
      }}>
        {BANDS.map(band => (
          <a
            key={band.slug}
            href={`/admin/bands/${band.slug}`}
            style={{
              display: 'block', padding: '18px 20px',
              borderRadius: 10,
              backgroundColor: '#141210',
              border: '1px solid rgba(255,255,255,0.06)',
              textDecoration: 'none',
              transition: 'border-color 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = CATEGORY_COLORS[band.category]
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Category badge */}
            <span style={{
              display: 'inline-block', marginBottom: 10,
              fontSize: 10, fontFamily: 'var(--font-body)', fontWeight: 700,
              color: CATEGORY_COLORS[band.category],
              padding: '2px 8px', borderRadius: 4,
              backgroundColor: `${CATEGORY_COLORS[band.category]}18`,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              {band.category}
            </span>
            <p style={{ fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-display)', color: '#fff', marginBottom: 6 }}>
              {band.name}
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}>
              Bilder &amp; Bewertungen →
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}
