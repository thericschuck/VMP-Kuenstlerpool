'use client'

type Stat = { table: string; label: string; count: number; href: string; color: string }

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: 14,
      marginBottom: 48,
    }}>
      {stats.map(s => (
        <a
          key={s.table}
          href={s.href}
          style={{
            display: 'block', padding: '22px 22px',
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
          <p style={{ fontSize: 40, fontFamily: 'var(--font-display)', color: '#8B1A1A', lineHeight: 1, marginBottom: 8, letterSpacing: '0.02em' }}>
            {s.count}
          </p>
          <p style={{ fontSize: 13, color: '#555555', fontFamily: 'var(--font-body)' }}>
            {s.label}
          </p>
        </a>
      ))}
    </div>
  )
}

export function QuickLinks() {
  const links = [
    { href: '/admin/hero',    label: 'Hero-Galerie verwalten' },
    { href: '/admin/galerie', label: 'Haupt-Galerie verwalten' },
    { href: '/admin/bands',   label: 'Bands verwalten' },
    { href: '/admin/events',  label: 'Event-Bilder verwalten' },
    { href: '/admin/seiten',  label: 'Seiten verwalten' },
  ]

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          style={{
            padding: '8px 18px', borderRadius: 7,
            border: '1px solid #E8D8C8',
            backgroundColor: '#fff',
            color: '#555555',
            fontSize: 13, fontFamily: 'var(--font-body)',
            textDecoration: 'none',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#8B1A1A'
            e.currentTarget.style.borderColor = '#8B1A1A'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#555555'
            e.currentTarget.style.borderColor = '#E8D8C8'
          }}
        >
          {link.label} →
        </a>
      ))}
    </div>
  )
}
