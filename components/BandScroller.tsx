'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

export default function BandScroller({ children }: { children: React.ReactNode }) {
  const trackRef   = useRef<HTMLDivElement>(null)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(false)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' })
  }

  const items = Array.isArray(children) ? children : [children]

  return (
    <div style={{ position: 'relative' }}>

      {/* Left button */}
      <button
        onClick={() => scroll('left')}
        aria-label="Nach links scrollen"
        style={{
          position:        'absolute',
          left:            '-20px',
          top:             '50%',
          transform:       'translateY(-50%)',
          zIndex:           10,
          width:           '40px',
          height:          '40px',
          borderRadius:    '50%',
          background:      'var(--color-cream)',
          border:          '1px solid var(--color-cream-dark)',
          boxShadow:       '0 2px 10px rgba(26,20,16,0.12)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          cursor:          'pointer',
          opacity:         canLeft ? 1 : 0,
          pointerEvents:   canLeft ? 'auto' : 'none',
          transition:      'opacity 0.2s, background 0.15s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-cream-dark)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-cream)' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3L5 8l5 5" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Right button */}
      <button
        onClick={() => scroll('right')}
        aria-label="Nach rechts scrollen"
        style={{
          position:        'absolute',
          right:           '-20px',
          top:             '50%',
          transform:       'translateY(-50%)',
          zIndex:           10,
          width:           '40px',
          height:          '40px',
          borderRadius:    '50%',
          background:      'var(--color-cream)',
          border:          '1px solid var(--color-cream-dark)',
          boxShadow:       '0 2px 10px rgba(26,20,16,0.12)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          cursor:          'pointer',
          opacity:         canRight ? 1 : 0,
          pointerEvents:   canRight ? 'auto' : 'none',
          transition:      'opacity 0.2s, background 0.15s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-cream-dark)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-cream)' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 3l5 5-5 5" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Scroll track – hide native scrollbar */}
      <div
        ref={trackRef}
        role="list"
        style={{
          display:                  'flex',
          overflowX:                'auto',
          gap:                      '20px',
          scrollSnapType:           'x mandatory',
          WebkitOverflowScrolling:  'touch',
          /* hide scrollbar cross-browser */
          scrollbarWidth:           'none',
          msOverflowStyle:          'none',
        }}
        // hide webkit scrollbar via className
        className="band-scroller-track"
      >
        {items.map((child, i) => (
          <div key={i} role="listitem" className="band-scroller-item">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
