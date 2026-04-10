'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// ── Nav data ──────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { label: 'Home',                href: '/#hero',       dropdown: false },
  { label: 'Bands',               href: '/#bands',      dropdown: true  },
  { label: 'Galerie',             href: '/galerie',     dropdown: false },
  { label: 'Technik & Tonstudio', href: '/technik',     dropdown: false },
  { label: 'Über uns',            href: '/ueber-uns',   dropdown: false },
  { label: 'Social Media',        href: '/#social',     dropdown: false },
  { label: 'Kontakt',             href: '/#kontakt',    dropdown: false },
]

const BANDS_MENU = [
  {
    category: 'Partybands', href: '/#partybands',
    bands: [
      { name: 'Groove Control',  href: '/groove-control' },
      { name: 'Spirit of Soul',  href: '/spirit-of-soul' },
      { name: 'Time Warp',       href: '/time-warp'      },
      { name: 'BOBbastic',       href: '/bobbastic'      },
    ],
  },
  {
    category: 'Tribute Bands', href: '/#tribute-bands',
    bands: [
      { name: 'The Kiss Tribute Band', href: '/kiss-tribute'  },
      { name: 'CoverSnake',            href: '/coversnake'    },
      { name: 'The Adams Family',      href: '/adams-family'  },
      { name: 'Sir Williams',          href: '/sir-williams'  },
    ],
  },
  {
    category: 'Easy Listening', href: '/#easy-listening',
    bands: [
      { name: 'Bobby & Friends', href: '/bobby-and-friends' },
      { name: 'Marsch Mellows',  href: '/marsch-mellows'   },
    ],
  },
]

// ── Bands mega-dropdown ───────────────────────────────────────────────

function BandsMegaMenu({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="bands-menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.16 }}
          className="absolute top-full mt-2 rounded-2xl overflow-hidden"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1C1917',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
            minWidth: 500,
            zIndex: 300,
          }}
        >
          <div className="grid grid-cols-3 p-6 gap-6">
            {BANDS_MENU.map(cat => (
              <div key={cat.category}>
                <a
                  href={cat.href}
                  className="font-body font-semibold uppercase block mb-3 transition-opacity hover:opacity-70"
                  style={{ fontSize: 10, color: 'var(--color-orange)', letterSpacing: '0.15em', textDecoration: 'none' }}
                >
                  {cat.category}
                </a>
                <div className="flex flex-col gap-2.5">
                  {cat.bands.map(band => (
                    <a
                      key={band.name}
                      href={band.href}
                      className="font-body transition-colors"
                      style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                    >
                      {band.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '10px 24px' }}>
            <a
              href="/#bands"
              className="font-body font-semibold block text-center w-full transition-opacity hover:opacity-70"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}
            >
              Alle 10 Bands ansehen →
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Nav links (also exported for HeroSection inline nav) ──────────────

export function NavLinks({ color = 'rgba(255,255,255,0.6)' }: { color?: string }) {
  const [bandsOpen, setBandsOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const open  = () => { if (timerRef.current) clearTimeout(timerRef.current); setBandsOpen(true)  }
  const close = () => { timerRef.current = setTimeout(() => setBandsOpen(false), 140) }

  return (
    <>
      {NAV_ITEMS.map(item =>
        item.dropdown ? (
          <div key="bands-trigger" className="relative hidden md:block" onMouseEnter={open} onMouseLeave={close}>
            <button
              className="flex items-center gap-1 font-body text-sm font-medium bg-transparent border-none cursor-pointer"
              style={{ color, padding: 0, transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = color)}
            >
              {item.label}
              <svg width="9" height="6" viewBox="0 0 9 6" fill="none"
                style={{ transform: bandsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', marginTop: 1, opacity: 0.6 }}>
                <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <BandsMegaMenu open={bandsOpen} />
          </div>
        ) : (
          <a
            key={item.href}
            href={item.href}
            className="font-body text-sm font-medium hidden md:block"
            style={{ color, textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = color)}
          >
            {item.label}
          </a>
        )
      )}
    </>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────
// On home: hidden until user scrolls past 80px, then slides in.
// On all other pages: always visible at the top.

export default function Navbar() {
  const pathname = usePathname()
  const isHome   = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visible = !isHome || scrolled

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          key="navbar"
          initial={{ y: -56, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -56, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-14"
          style={{ backgroundColor: 'var(--color-dark)', boxShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
        >
          <a href="/">
            <Image
              src="/images/logo_light_transparent.png"
              alt="Vivid Music Productions"
              width={100}
              height={36}
              style={{ height: 36, width: 'auto' }}
            />
          </a>
          <nav className="hidden md:flex items-center gap-7">
            <NavLinks color="rgba(255,255,255,0.6)" />
          </nav>
          <a
            href="/#kontakt"
            className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full font-body font-semibold text-white text-sm"
            style={{ backgroundColor: 'var(--color-orange)' }}
          >
            Anfragen
          </a>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
