'use client'

import { PageHeader } from '../_components/AdminShell'

const BANDS = [
  { slug: 'groove-control',   name: 'Groove Control',         category: 'Partyband' },
  { slug: 'spirit-of-soul',   name: 'Spirit of Soul',         category: 'Partyband' },
  { slug: 'time-warp',        name: 'Time Warp',              category: 'Partyband' },
  { slug: 'bobbastic',        name: 'BOBbastic',              category: 'Partyband' },
  { slug: 'kiss-tribute',     name: 'The Kiss Tribute Band',  category: 'Tribute' },
  { slug: 'coversnake',       name: 'CoverSnake',             category: 'Tribute' },
  { slug: 'adams-family',     name: 'The Adams Family',       category: 'Tribute' },
  { slug: 'sir-williams',     name: 'Sir Williams',           category: 'Tribute' },
  { slug: 'bobby-and-friends', name: 'Bobby & Friends',       category: 'Easy Listening' },
  { slug: 'marsch-mellows',   name: 'Marsch Mellows',         category: 'Easy Listening' },
]

const CATEGORY_STYLE: Record<string, { bg: string; color: string }> = {
  'Partyband':      { bg: '#F5E0E0', color: '#8B1A1A' },
  'Tribute':        { bg: '#EDE9FE', color: '#6D28D9' },
  'Easy Listening': { bg: '#D1FAE5', color: '#065F46' },
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
        {BANDS.map(band => {
          const style = CATEGORY_STYLE[band.category]
          return (
            <a
              key={band.slug}
              href={`/admin/bands/${band.slug}`}
              style={{
                display: 'block', padding: '18px 20px',
                borderRadius: 10,
                backgroundColor: '#fff',
                border: '1px solid #E8D8C8',
                textDecoration: 'none',
                transition: 'border-color 0.15s, transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#8B1A1A'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(139,26,26,0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E8D8C8'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span style={{
                display: 'inline-block', marginBottom: 10,
                fontSize: 10, fontFamily: 'var(--font-body)', fontWeight: 700,
                color: style.color,
                padding: '2px 8px', borderRadius: 4,
                backgroundColor: style.bg,
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                {band.category}
              </span>
              <p style={{ fontSize: 16, fontFamily: 'var(--font-display)', color: '#1A1A1A', marginBottom: 6, letterSpacing: '0.02em' }}>
                {band.name}
              </p>
              <p style={{ fontSize: 12, color: '#8B1A1A', fontFamily: 'var(--font-body)' }}>
                Bilder &amp; Bewertungen →
              </p>
            </a>
          )
        })}
      </div>
    </div>
  )
}
