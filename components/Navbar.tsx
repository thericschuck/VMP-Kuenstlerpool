'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'

// ── Band sub-menus ────────────────────────────────────────────────

const DROPDOWNS: Record<string, { label: string; href: string }[]> = {
  'easy-listening': [
    { label: 'Bobby & Friends', href: '/bobby-and-friends' },
    { label: 'Marsch Mellows',  href: '/marsch-mellows'   },
  ],
  'partybands': [
    { label: 'Groove Control',  href: '/groove-control'  },
    { label: 'Spirit of Soul',  href: '/spirit-of-soul'  },
    { label: 'Time Warp',       href: '/time-warp'       },
    { label: 'BOBbastic',       href: '/bobbastic'       },
  ],
  'tribute-bands': [
    { label: 'The Kiss Tribute Band', href: '/kiss-tribute'  },
    { label: 'CoverSnake',            href: '/coversnake'    },
    { label: 'The Adams Family',      href: '/adams-family'  },
    { label: 'Sir Williams',          href: '/sir-williams'  },
  ],
}

const NAV_LINKS = [
  { label: 'Home',                  href: '/#hero',          sectionId: 'hero'          },
  { label: 'Easy Listening',        href: '/#easy-listening', sectionId: 'easy-listening' },
  { label: 'Partybands',            href: '/#partybands',     sectionId: 'partybands'     },
  { label: 'Tribute Bands',         href: '/#tribute-bands',  sectionId: 'tribute-bands'  },
  { label: 'Galerie',               href: '/#galerie',        sectionId: 'galerie'        },
  { label: 'News',                  href: '/#news',           sectionId: 'news'           },
  { label: 'Technik & Tonstudio',   href: '/#studio',         sectionId: 'studio'         },
  { label: 'Kontakt',               href: '/#kontakt',        sectionId: 'kontakt'        },
] as const

interface IndicatorState { left: number; width: number; opacity: number }

export default function Navbar() {
  const pathname = usePathname()
  const isHome   = pathname === '/'

  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [indicator,     setIndicator]     = useState<IndicatorState>({ left: 0, width: 0, opacity: 0 })
  const [openDropdown,  setOpenDropdown]  = useState<string | null>(null)

  const navContainerRef = useRef<HTMLDivElement>(null)
  const linkRefs        = useRef<Record<string, HTMLAnchorElement | null>>({})
  const closeTimer      = useRef<ReturnType<typeof setTimeout> | null>(null)

  const darkHero  = !isHome
  const lightMode = darkHero && !scrolled

  // ── Scroll ───────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── IntersectionObserver (home only) ─────────────────────────
  useEffect(() => {
    if (!isHome) return
    const observers: IntersectionObserver[] = []
    NAV_LINKS.forEach(({ sectionId }) => {
      if (!sectionId) return
      const el = document.getElementById(sectionId)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(sectionId) },
        { rootMargin: '-20% 0px -65% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [isHome])

  // ── Gliding underline ────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      const container = navContainerRef.current
      const activeEl  = activeSection ? linkRefs.current[activeSection] : null
      if (!container || !activeEl) { setIndicator((p) => ({ ...p, opacity: 0 })); return }
      const cRect = container.getBoundingClientRect()
      const aRect = activeEl.getBoundingClientRect()
      setIndicator({ left: aRect.left - cRect.left, width: aRect.width, opacity: 1 })
    }
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [activeSection])

  // ── Body lock ────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // ── Escape ───────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); setOpenDropdown(null) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Dropdown open/close with small delay to prevent flicker
  const handleMouseEnter = (sectionId: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (DROPDOWNS[sectionId]) setOpenDropdown(sectionId)
  }
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120)
  }

  const inkColor       = lightMode ? 'rgba(255,255,255,0.85)' : 'var(--color-ink)'
  const hamburgerColor = lightMode ? 'rgba(255,255,255,0.9)'  : 'var(--color-ink)'
  const headerBg       = scrolled
    ? 'var(--color-cream)'
    : lightMode ? 'rgba(26,20,16,0.55)' : 'transparent'

  return (
    <>
      {/* ── Main header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-sm' : ''}`}
        style={{ background: headerBg, backdropFilter: lightMode && !scrolled ? 'blur(4px)' : undefined }}
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between"
          aria-label="Hauptnavigation"
        >
          {/* Logo */}
          <a
            href="/"
            aria-label="Vivid Music Productions – zur Startseite"
            className="text-2xl font-bold tracking-widest select-none"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold)' }}
          >
            VMP
          </a>

          {/* ── Desktop links ── */}
          <div ref={navContainerRef} className="relative hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8" role="list">
              {NAV_LINKS.map(({ label, href, sectionId }) => {
                const isActive  = isHome && activeSection === sectionId
                const hasDropdown = Boolean(DROPDOWNS[sectionId])
                const isOpen    = openDropdown === sectionId
                const items     = DROPDOWNS[sectionId] ?? []

                return (
                  <li
                    key={label}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => handleMouseEnter(sectionId)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a
                      ref={(el) => { if (sectionId) linkRefs.current[sectionId] = el }}
                      href={href}
                      className="text-sm font-medium transition-colors duration-200 block py-1"
                      style={{
                        color: isActive ? 'var(--color-gold)' : inkColor,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                      aria-current={isActive ? 'true' : undefined}
                      aria-haspopup={hasDropdown ? 'true' : undefined}
                      aria-expanded={hasDropdown ? isOpen : undefined}
                    >
                      {label}
                      {hasDropdown && (
                        <svg
                          width="10" height="6" viewBox="0 0 10 6" fill="none"
                          aria-hidden="true"
                          style={{
                            transition:  'transform 0.2s',
                            transform:   isOpen ? 'rotate(180deg)' : 'none',
                            opacity:     0.6,
                            flexShrink:  0,
                          }}
                        >
                          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </a>

                    {/* Dropdown panel */}
                    {hasDropdown && (
                      <div
                        role="menu"
                        aria-label={`${label} Untermenü`}
                        style={{
                          position:     'absolute',
                          top:          'calc(100% + 8px)',
                          left:         '50%',
                          transform:    'translateX(-50%)',
                          background:   scrolled || !lightMode ? 'var(--color-cream)' : 'rgba(30,22,14,0.92)',
                          backdropFilter: 'blur(8px)',
                          border:       `1px solid ${scrolled || !lightMode ? 'var(--color-cream-dark)' : 'rgba(139,105,20,0.3)'}`,
                          borderRadius: '10px',
                          padding:      '8px 0',
                          minWidth:     '200px',
                          boxShadow:    '0 8px 24px rgba(0,0,0,0.12)',
                          zIndex:       60,
                          opacity:      isOpen ? 1 : 0,
                          pointerEvents: isOpen ? 'auto' : 'none',
                          transition:   'opacity 0.15s ease',
                        }}
                      >
                        {items.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            style={{
                              display:        'block',
                              padding:        '9px 18px',
                              fontSize:       '13px',
                              fontFamily:     'var(--font-body)',
                              color:          scrolled || !lightMode ? 'var(--color-ink)' : '#e8dfc8',
                              textDecoration: 'none',
                              transition:     'color 0.15s, background 0.15s',
                              whiteSpace:     'nowrap',
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'
                              ;(e.currentTarget as HTMLElement).style.background = scrolled || !lightMode ? 'rgba(139,105,20,0.06)' : 'rgba(139,105,20,0.15)'
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.color = scrolled || !lightMode ? 'var(--color-ink)' : '#e8dfc8'
                              ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                            }}
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* Gliding underline */}
            <span
              className="nav-indicator absolute pointer-events-none rounded-sm"
              style={{
                bottom: '-2px', height: '2px',
                background: 'var(--color-gold)',
                left:    `${indicator.left}px`,
                width:   `${indicator.width}px`,
                opacity: indicator.opacity,
              }}
              aria-hidden="true"
            />
          </div>

          {/* ── Hamburger ── */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2 rounded"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="block h-0.5 w-6 rounded-full transition-all duration-300 origin-center"
              style={{ background: hamburgerColor, transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
            <span className="block h-0.5 w-6 rounded-full transition-all duration-300"
              style={{ background: hamburgerColor, opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-0.5 w-6 rounded-full transition-all duration-300 origin-center"
              style={{ background: hamburgerColor, transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
          </button>
        </nav>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        id="mobile-menu"
        className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden transition-all duration-300"
        style={{
          background:    'var(--color-cream)',
          opacity:       menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          overflowY:     'auto',
        }}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col items-center gap-6 py-12" role="list">
          {NAV_LINKS.map(({ label, href, sectionId }) => {
            const isActive = isHome && activeSection === sectionId
            const items    = DROPDOWNS[sectionId] ?? []
            return (
              <li key={label} className="text-center">
                <a
                  href={href}
                  className="text-2xl font-medium transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: isActive ? 'var(--color-gold)' : 'var(--color-ink)',
                  }}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {label}
                </a>
                {/* Sub-items */}
                {items.length > 0 && (
                  <ul className="flex flex-col items-center gap-2 mt-2">
                    {items.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          style={{
                            fontFamily:     'var(--font-body)',
                            fontSize:       '14px',
                            color:          'var(--color-brown)',
                            textDecoration: 'none',
                          }}
                          onClick={closeMenu}
                          tabIndex={menuOpen ? 0 : -1}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
