'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

const SLIDES = [
  { src: '/images/hero-event.avif',      alt: 'VMP Live Event'             },
  { src: '/images/firmenevents.avif',    alt: 'Firmenevent & Gala'         },
  { src: '/images/stadtfeste.avif',      alt: 'Stadtfest & Festival'       },
  { src: '/images/groove-control.avif',  alt: 'Groove Control – Partyband' },
  { src: '/images/hochzeit.avif',        alt: 'Hochzeitsband'              },
  { src: '/images/KissTribute.avif',     alt: 'Kiss Tribute Band'          },
]

const AUTOPLAY_MS = 4500

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [prev,    setPrev]    = useState<number | null>(null)
  const [dir,     setDir]     = useState<'next' | 'prev'>('next')
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = useCallback((to: number, direction: 'next' | 'prev') => {
    if (animating) return
    setDir(direction)
    setPrev(current)
    setCurrent(to)
    setAnimating(true)
  }, [animating, current])

  const next = useCallback(() => {
    go((current + 1) % SLIDES.length, 'next')
  }, [current, go])

  const prev_ = useCallback(() => {
    go((current - 1 + SLIDES.length) % SLIDES.length, 'prev')
  }, [current, go])

  // Auto-play
  useEffect(() => {
    timerRef.current = setTimeout(next, AUTOPLAY_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, next])

  // Reset after transition
  useEffect(() => {
    if (!animating) return
    const t = setTimeout(() => { setAnimating(false); setPrev(null) }, 600)
    return () => clearTimeout(t)
  }, [animating])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* ── Slides ── */}
      {SLIDES.map((slide, i) => {
        const isCurrent = i === current
        const isPrev    = i === prev

        let transform = 'translateX(0)'
        let opacity   = 0
        let transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease'

        if (isCurrent && animating) {
          transform = 'translateX(0)'
          opacity   = 1
        } else if (isCurrent) {
          transform = 'translateX(0)'
          opacity   = 1
        } else if (isPrev && animating) {
          transform = dir === 'next' ? 'translateX(-4%)' : 'translateX(4%)'
          opacity   = 0
        } else {
          opacity   = 0
          transition = 'none'
          transform = dir === 'next' ? 'translateX(4%)' : 'translateX(-4%)'
        }

        return (
          <div
            key={slide.src}
            aria-hidden={!isCurrent}
            style={{
              position:   'absolute',
              inset:      0,
              transform,
              opacity,
              transition,
              willChange: 'transform, opacity',
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 1024px) 92vw, 52vw"
            />
          </div>
        )
      })}

      {/* ── Dark bottom fade ── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(11,11,24,0.7) 0%, transparent 45%)',
          zIndex:     2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Prev button ── */}
      <button
        onClick={prev_}
        aria-label="Vorheriges Bild"
        style={{
          position:      'absolute',
          left:          '12px',
          top:           '50%',
          transform:     'translateY(-50%)',
          zIndex:        10,
          width:         '40px',
          height:        '40px',
          borderRadius:  '50%',
          background:    'rgba(255,255,255,0.12)',
          border:        '1px solid rgba(255,255,255,0.22)',
          color:         '#ffffff',
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          cursor:        'pointer',
          backdropFilter:'blur(6px)',
          transition:    'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* ── Next button ── */}
      <button
        onClick={next}
        aria-label="Nächstes Bild"
        style={{
          position:      'absolute',
          right:         '12px',
          top:           '50%',
          transform:     'translateY(-50%)',
          zIndex:        10,
          width:         '40px',
          height:        '40px',
          borderRadius:  '50%',
          background:    'rgba(255,255,255,0.12)',
          border:        '1px solid rgba(255,255,255,0.22)',
          color:         '#ffffff',
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          cursor:        'pointer',
          backdropFilter:'blur(6px)',
          transition:    'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* ── Dot indicators ── */}
      <div
        role="tablist"
        aria-label="Slide-Auswahl"
        style={{
          position:       'absolute',
          bottom:         '16px',
          left:           '50%',
          transform:      'translateX(-50%)',
          display:        'flex',
          gap:            '7px',
          zIndex:         10,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            onClick={() => go(i, i > current ? 'next' : 'prev')}
            style={{
              width:         i === current ? '22px' : '7px',
              height:        '7px',
              borderRadius:  '999px',
              background:    i === current ? '#ffffff' : 'rgba(255,255,255,0.35)',
              border:        'none',
              cursor:        'pointer',
              padding:       0,
              transition:    'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* ── Bobby badge (always on top) ── */}
      <div className="absolute bottom-5 left-5 flex items-end gap-3" style={{ zIndex: 10 }}>
        <div style={{
          width:        '68px',
          height:       '68px',
          borderRadius: '50%',
          overflow:     'hidden',
          border:       '2px solid #ffffff',
          boxShadow:    '0 4px 16px rgba(0,0,0,0.4)',
          flexShrink:   0,
          position:     'relative',
        }}>
          <Image src="/images/bobby-profile.avif" alt="Bobby Stöcker" fill style={{ objectFit: 'cover' }} sizes="68px" />
        </div>
        <div>
          <p style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, lineHeight: 1.3, textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
            Bobby Stöcker
          </p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)', fontSize: '11px', textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
            Gründer & Musikalischer Leiter
          </p>
        </div>
      </div>

    </div>
  )
}
