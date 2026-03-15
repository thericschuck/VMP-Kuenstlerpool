'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Home',          href: '/',               sectionId: ''              },
  { label: 'Easy Listening', href: '/#easy-listening', sectionId: 'easy-listening' },
  { label: 'Partybands',    href: '/#partybands',     sectionId: 'partybands'     },
  { label: 'Tribute Bands', href: '/#tribute-bands',  sectionId: 'tribute-bands'  },
  { label: 'Galerie',       href: '/#galerie',        sectionId: 'galerie'        },
  { label: 'News',          href: '/#news',           sectionId: 'news'           },
  { label: 'Kontakt',       href: '/#kontakt',        sectionId: 'kontakt'        },
] as const

interface IndicatorState {
  left: number
  width: number
  opacity: number
}

export default function Navbar() {
  const pathname = usePathname()
  const isHome   = pathname === '/'

  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [indicator,     setIndicator]     = useState<IndicatorState>({ left: 0, width: 0, opacity: 0 })

  const navContainerRef = useRef<HTMLDivElement>(null)
  const linkRefs        = useRef<Record<string, HTMLAnchorElement | null>>({})

  // On dark-hero pages (detail pages): show light text when not scrolled
  const darkHero    = !isHome
  const lightMode   = darkHero && !scrolled

  // ── Scroll: navbar background ──────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll() // initialise on mount
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── IntersectionObserver: active section (home page only) ──────
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

    return () => observers.forEach((obs) => obs.disconnect())
  }, [isHome])

  // ── Gliding underline ─────────────────────────────────────────
  useEffect(() => {
    const updateIndicator = () => {
      const container = navContainerRef.current
      const activeEl  = activeSection ? linkRefs.current[activeSection] : null

      if (!container || !activeEl) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }))
        return
      }

      const cRect = container.getBoundingClientRect()
      const aRect = activeEl.getBoundingClientRect()

      setIndicator({ left: aRect.left - cRect.left, width: aRect.width, opacity: 1 })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator, { passive: true })
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeSection])

  // ── Body scroll lock when mobile menu is open ─────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // ── Close on Escape ───────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Resolved colours based on context
  const inkColor      = lightMode ? 'rgba(255,255,255,0.85)' : 'var(--color-ink)'
  const hamburgerColor= lightMode ? 'rgba(255,255,255,0.9)'  : 'var(--color-ink)'
  const headerBg      = scrolled
    ? 'var(--color-cream)'
    : lightMode
      ? 'rgba(26,20,16,0.55)'
      : 'transparent'

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

          {/* ── Desktop links + gliding indicator ── */}
          <div ref={navContainerRef} className="relative hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8" role="list">
              {NAV_LINKS.map(({ label, href, sectionId }) => {
                const isActive = isHome && sectionId !== '' && activeSection === sectionId
                return (
                  <li key={label}>
                    <a
                      ref={(el) => { if (sectionId) linkRefs.current[sectionId] = el }}
                      href={href}
                      className="text-sm font-medium transition-colors duration-200 block py-1"
                      style={{ color: isActive ? 'var(--color-gold)' : inkColor }}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Gliding underline */}
            <span
              className="nav-indicator absolute pointer-events-none rounded-sm"
              style={{
                bottom:     '-2px',
                height:     '2px',
                background: 'var(--color-gold)',
                left:       `${indicator.left}px`,
                width:      `${indicator.width}px`,
                opacity:    indicator.opacity,
              }}
              aria-hidden="true"
            />
          </div>

          {/* ── Hamburger (mobile) ── */}
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

      {/* ── Mobile fullscreen overlay ── */}
      <div
        id="mobile-menu"
        className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden transition-all duration-300"
        style={{
          background:    'var(--color-cream)',
          opacity:       menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href, sectionId }) => (
            <li key={label}>
              <a
                href={href}
                className="text-2xl font-medium transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: isHome && sectionId !== '' && activeSection === sectionId
                    ? 'var(--color-gold)'
                    : 'var(--color-ink)',
                }}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
