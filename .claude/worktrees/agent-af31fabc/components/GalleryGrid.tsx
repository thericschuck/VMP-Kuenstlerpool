'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const PHOTOS = [
  { src: '/images/gallery-1.avif', ratio: '4 / 3'  },
  { src: '/images/gallery-2.avif', ratio: '1 / 1'  },
  { src: '/images/gallery-3.avif', ratio: '16 / 9' },
  { src: '/images/gallery-4.avif', ratio: '1 / 1'  },
  { src: '/images/gallery-5.avif', ratio: '4 / 3'  },
]

export default function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const prev  = useCallback(() => setActive(i => i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : null), [])
  const next  = useCallback(() => setActive(i => i !== null ? (i + 1) % PHOTOS.length : null), [])

  // Keyboard navigation + scroll lock
  useEffect(() => {
    if (active === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      close()
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close, prev, next])

  return (
    <>
      {/* ── Mobile: horizontal scroll strip ─────────────────────── */}
      <div
        className="sm:hidden flex gap-3 pb-2"
        style={{
          overflowX:               'auto',
          scrollSnapType:          'x mandatory',
          scrollbarWidth:          'none',
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}
      >
        {PHOTOS.map((photo, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="flex-shrink-0 rounded-xl overflow-hidden"
            style={{ width: '72vw', height: '220px', scrollSnapAlign: 'start', position: 'relative', cursor: 'pointer', border: 'none', padding: 0 }}
            aria-label={`Galeriefoto ${i + 1} vergrößern`}
          >
            <Image src={photo.src} alt={`Galeriefoto ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="72vw" />
          </button>
        ))}
      </div>

      {/* ── Desktop: masonry grid ────────────────────────────────── */}
      <div className="hidden sm:block columns-2 lg:columns-3 gap-4">
        {PHOTOS.map((photo, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="break-inside-avoid mb-4 rounded-xl overflow-hidden block w-full"
            style={{ aspectRatio: photo.ratio, position: 'relative', cursor: 'pointer', border: 'none', padding: 0 }}
            aria-label={`Galeriefoto ${i + 1} vergrößern`}
          >
            <Image
              src={photo.src}
              alt={`Galeriefoto ${i + 1}`}
              fill
              style={{ objectFit: 'cover', transition: 'transform 300ms ease' }}
              className="hover:scale-[1.03]"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Bildansicht"
          className="fixed inset-0 flex items-center justify-center"
          style={{ background: 'rgba(10,8,6,0.93)', zIndex: 2000, backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          onClick={close}
        >
          {/* Image container – stops click propagation so clicking image doesn't close */}
          <div
            style={{ position: 'relative', width: 'min(92vw, 1100px)', height: 'min(82vh, 760px)' }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              key={active}
              src={PHOTOS[active].src}
              alt={`Galeriefoto ${active + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              sizes="92vw"
              priority
            />
          </div>

          {/* Close button */}
          <button
            onClick={close}
            aria-label="Schließen"
            style={{
              position: 'fixed',
              top: '20px',
              right: '24px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              fontSize: '20px',
              lineHeight: 1,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              transition: 'background 150ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
          >
            ✕
          </button>

          {/* Prev arrow */}
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            aria-label="Vorheriges Foto"
            style={{
              position: 'fixed',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#ffffff',
              fontSize: '22px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              transition: 'background 150ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
          >
            ‹
          </button>

          {/* Next arrow */}
          <button
            onClick={e => { e.stopPropagation(); next() }}
            aria-label="Nächstes Foto"
            style={{
              position: 'fixed',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#ffffff',
              fontSize: '22px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              transition: 'background 150ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
          >
            ›
          </button>

          {/* Counter + thumbnail strip */}
          <div
            style={{ position: 'fixed', bottom: '20px', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Thumbnail strip */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {PHOTOS.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Galeriefoto ${i + 1}`}
                  style={{
                    width: '48px',
                    height: '36px',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    position: 'relative',
                    border: i === active ? '2px solid var(--blue)' : '2px solid rgba(255,255,255,0.15)',
                    cursor: 'pointer',
                    flexShrink: 0,
                    opacity: i === active ? 1 : 0.55,
                    transition: 'opacity 150ms, border-color 150ms',
                    padding: 0,
                  }}
                >
                  <Image src={photo.src} alt="" fill style={{ objectFit: 'cover' }} sizes="48px" />
                </button>
              ))}
            </div>

            {/* Counter */}
            <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.08em' }}>
              {active + 1} / {PHOTOS.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
