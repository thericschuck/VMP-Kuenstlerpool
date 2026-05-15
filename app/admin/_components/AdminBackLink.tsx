'use client'

export function AdminBackLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      style={{
        fontSize: 13, color: '#8B1A1A', fontFamily: 'var(--font-body)',
        textDecoration: 'none', display: 'inline-block', marginBottom: 20,
        transition: 'color 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = '#A52020')}
      onMouseLeave={e => (e.currentTarget.style.color = '#8B1A1A')}
    >
      {label}
    </a>
  )
}
