'use client'

type Stat = { table: string; label: string; count: number; href: string; color: string }

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: 16,
      marginBottom: 48,
    }}>
      {stats.map(s => (
        <a
          key={s.table}
          href={s.href}
          style={{
            display: 'block', padding: '22px 22px',
            borderRadius: 10,
            backgroundColor: '#141210',
            border: '1px solid rgba(255,255,255,0.06)',
            textDecoration: 'none',
            transition: 'border-color 0.15s, transform 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = s.color
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <p style={{ fontSize: 36, fontWeight: 700, fontFamily: 'var(--font-display)', color: s.color, lineHeight: 1, marginBottom: 8 }}>
            {s.count}
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
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
            border: '1px solid rgba(255,255,255,0.09)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 13, fontFamily: 'var(--font-body)',
            textDecoration: 'none',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
          }}
        >
          {link.label} →
        </a>
      ))}
    </div>
  )
}
