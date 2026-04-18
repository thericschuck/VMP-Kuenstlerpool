'use client'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'

const NAV = [
  { href: '/admin',         label: 'Dashboard',     icon: GridIcon },
  { href: '/admin/hero',    label: 'Hero-Galerie',  icon: ImageIcon },
  { href: '/admin/galerie', label: 'Haupt-Galerie', icon: GalleryIcon },
  { href: '/admin/bands',   label: 'Bands',         icon: MusicIcon },
  { href: '/admin/events',  label: 'Event-Bilder',  icon: StarIcon },
  { href: '/admin/seiten',  label: 'Seiten',        icon: PageIcon },
]

// ── Tiny SVG icon components ──────────────────────────────────

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}
function ImageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  )
}
function GalleryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 2H8L2 7h20l-6-5z"/>
    </svg>
  )
}
function MusicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
    </svg>
  )
}
function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}
function PageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  )
}

// ── Shell ────────────────────────────────────────────────────

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode
  email: string
}) {
  const pathname = usePathname()
  const router   = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f0e0d', color: '#fff', fontFamily: 'var(--font-body)' }}>

      {/* ── Sidebar ─────────────────────────────────── */}
      <aside style={{
        width: 232, flexShrink: 0,
        backgroundColor: '#141210',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Image
            src="/images/logo_light_transparent.png"
            alt="VMP"
            width={120} height={40}
            style={{ height: 30, width: 'auto' }}
          />
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 7, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Admin Bereich
          </p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px 8px' }}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(href)
            return (
              <a
                key={href}
                href={href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px', borderRadius: 7, marginBottom: 1,
                  fontSize: 13, fontWeight: active ? 600 : 400,
                  color: active ? '#fff' : 'rgba(255,255,255,0.4)',
                  backgroundColor: active ? 'rgba(234,88,12,0.14)' : 'transparent',
                  borderLeft: `2px solid ${active ? '#ea580c' : 'transparent'}`,
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <Icon />
                {label}
              </a>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{
            fontSize: 11, color: 'rgba(255,255,255,0.28)', marginBottom: 10,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {email}
          </p>
          <button
            onClick={logout}
            style={{
              width: '100%', padding: '7px 10px', borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.09)',
              background: 'none', color: 'rgba(255,255,255,0.4)',
              fontSize: 12, cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)' }}
          >
            Abmelden →
          </button>
        </div>
      </aside>

      {/* ── Main content ────────────────────────────── */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '36px 40px', maxWidth: 1200 }}>
        {children}
      </main>
    </div>
  )
}

// ── Page header helper ────────────────────────────────────────

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, fontFamily: 'var(--font-display)', color: '#fff', marginBottom: 4 }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
