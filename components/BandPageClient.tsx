'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { Band, Review } from '@/lib/bands-data'

// ─── Stars ────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i < rating ? 'var(--color-orange)' : '#E0D8CE'}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

// ─── ReviewCard ───────────────────────────────────────────────────────

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [hovered, setHovered] = useState(false)
  const platformColors: Record<string, string> = {
    Google:   '#4285F4',
    Facebook: '#1877F2',
    Direkt:   'var(--color-orange)',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#fff',
        border: `1px solid ${hovered ? 'rgba(234,88,12,0.3)' : '#EAE3D8'}`,
        borderRadius: 14,
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(234,88,12,0.1)' : 'none',
        transition: 'border-color 0.2s, transform 0.22s ease, box-shadow 0.22s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <Stars rating={review.rating} />
        <span style={{
          fontSize: 10,
          fontWeight: 600,
          fontFamily: 'var(--font-body)',
          color: platformColors[review.platform] ?? 'var(--color-orange)',
          letterSpacing: '0.06em',
        }}>
          {review.platform}
        </span>
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: '#4A3F35',
        lineHeight: 1.65,
        fontStyle: 'italic',
      }}>
        „{review.text}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: '#1C1917' }}>
          {review.name}
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#A09080' }}>
          {review.date}
        </span>
      </div>
    </motion.div>
  )
}

// ─── VideoPlaceholder ─────────────────────────────────────────────────

function VideoPlaceholder({ title, large = false }: { title: string; large?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        aspectRatio: '16/9',
        background: '#111010',
        borderRadius: large ? 12 : 8,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${hovered ? 'rgba(234,88,12,0.35)' : 'rgba(255,255,255,0.07)'}`,
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'border-color 0.2s, transform 0.25s ease',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: large ? 52 : 38,
          height: large ? 52 : 38,
          borderRadius: '50%',
          background: 'var(--color-orange)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: hovered ? 'scale(1.15)' : 'scale(1)',
          boxShadow: hovered ? '0 0 0 8px rgba(234,88,12,0.18)' : '0 0 0 0px rgba(234,88,12,0)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}>
          <svg viewBox="0 0 24 24" fill="white" width={large ? 18 : 13} height={large ? 18 : 13}>
            <polygon points="6,4 20,12 6,20" />
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
        <span style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: large ? 12 : 10,
          fontFamily: 'var(--font-body)',
          display: 'block',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {title}
        </span>
      </div>
    </div>
  )
}

// ─── Image Lightbox ───────────────────────────────────────────────────

function ImageLightbox({ images, startIndex, onClose }: {
  images: string[]
  startIndex: number
  onClose: () => void
}) {
  const [active, setActive] = useState(startIndex)
  const prev = useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label="Bildansicht"
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: 'rgba(10,8,6,0.94)', zIndex: 2000, backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      {/* Image */}
      <div
        style={{ position: 'relative', width: 'min(92vw, 1100px)', height: 'min(82vh, 760px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.22 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={images[active]}
              alt={`Foto ${active + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              sizes="92vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Close */}
      <button onClick={onClose} aria-label="Schließen" style={{
        position: 'fixed', top: 20, right: 24, width: 40, height: 40,
        borderRadius: '50%', background: 'rgba(255,255,255,0.12)',
        border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
        fontSize: 20, cursor: 'pointer', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
      }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
      >✕</button>

      {/* Prev */}
      {images.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Vorheriges Bild" style={{
          position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, borderRadius: '50%',
          background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)',
          color: '#fff', fontSize: 22, cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
        >‹</button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); next() }} aria-label="Nächstes Bild" style={{
          position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, borderRadius: '50%',
          background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)',
          color: '#fff', fontSize: 22, cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
        >›</button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div style={{
          position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: 12,
        }}>
          {active + 1} / {images.length}
        </div>
      )}
    </motion.div>
  )
}

// ─── EyebrowLabel ─────────────────────────────────────────────────────

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 10,
      color: 'var(--color-orange)',
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      fontWeight: 600,
      marginBottom: 14,
      fontFamily: 'var(--font-body)',
    }}>
      {children}
    </p>
  )
}

// ─── RelatedBandCard ──────────────────────────────────────────────────

function RelatedBandCard({ band, index, inView }: { band: Band; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={`/${band.slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.09 }}
      whileHover={{ y: -4, boxShadow: '0 18px 48px rgba(0,0,0,0.55)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-xl block"
      style={{
        height: 260,
        textDecoration: 'none',
        border: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: '#1A1714',
      }}
    >
      {band.images[0] && (
        <Image
          src={band.images[0]}
          alt={band.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      )}

      {/* Base gradient */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />

      {/* Orange hover tint */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(234,88,12,0.3) 0%, transparent 65%)' }} />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <h3 className="font-display font-bold text-white" style={{ fontSize: 20, lineHeight: 1.2, marginBottom: 4 }}>
          {band.name}
        </h3>
        <p className="font-body" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
          {band.tagline}
        </p>
        {/* Description — slides up on hover */}
        <p
          className="font-body overflow-hidden"
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.55,
            marginTop: hovered ? 8 : 0,
            maxHeight: hovered ? 80 : 0,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'max-height 0.35s ease, opacity 0.28s ease, transform 0.28s ease, margin-top 0.28s ease',
          }}
        >
          {band.description}
        </p>
      </div>
    </motion.a>
  )
}

// ─── Props ────────────────────────────────────────────────────────────

interface Props {
  band: Band
  related: Band[]
  categoryLabel: string
  mailtoHref: string
  whatsappHref: string
  fbEmbedSrc: string
  avgRating: number | null
  infoItems: { label: string; value: string }[]
}

// ─── Main ─────────────────────────────────────────────────────────────

export default function BandPageClient({
  band, related, categoryLabel,
  mailtoHref, whatsappHref, fbEmbedSrc, avgRating, infoItems,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  const relatedRef = useRef<HTMLElement>(null)
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' })
  const relatedInView = useInView(relatedRef, { once: true, margin: '-60px' })

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const openLightbox = useCallback((i: number) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const galleryImages = band.images.filter(Boolean)

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={galleryImages}
            startIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        height: 560,
        backgroundColor: 'var(--color-dark)',
        overflow: 'hidden',
        marginTop: 56,
      }}>
        {band.images[0] && (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.07 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          >
            <Image
              src={band.images[0]}
              alt={band.name}
              fill
              priority
              style={{ objectFit: 'cover', opacity: 0.4 }}
              sizes="100vw"
            />
          </motion.div>
        )}

        {/* Gradients */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,25,23,0.95) 0%, rgba(28,25,23,0.3) 60%, transparent 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,25,23,0.5) 0%, transparent 50%)', zIndex: 1 }} />

        {/* Content */}
        <div style={{ position: 'absolute', bottom: 48, left: 40, right: 200, zIndex: 2 }}>
          <motion.span
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-orange)',
              color: '#fff',
              fontSize: 11,
              fontWeight: 600,
              padding: '4px 16px',
              borderRadius: 30,
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.06em',
              marginBottom: 16,
            }}
          >
            {categoryLabel}
          </motion.span>

          {avgRating && (
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}
            >
              <Stars rating={avgRating} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                {band.reviews?.length} Bewertungen
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(38px, 5.5vw, 64px)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.05,
              marginBottom: 12,
            }}
          >
            {band.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              color: 'var(--color-orange)',
              fontStyle: 'italic',
            }}
          >
            {band.tagline}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ position: 'absolute', bottom: 48, right: 40, zIndex: 2 }}
        >
          <motion.a
            href="#anfrage"
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(234,88,12,0.5)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-orange)',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: 30,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(234,88,12,0.35)',
            }}
          >
            Jetzt anfragen
          </motion.a>
        </motion.div>
      </section>

      {/* ── Info bar ─────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#161412' }}>
        <div className="max-w-7xl mx-auto" style={{ overflowX: 'auto', overflowY: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 40px', minWidth: 'max-content' }}>
            {infoItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.07 }}
                style={{
                  padding: '18px 0',
                  marginRight: i < infoItems.length - 1 ? 40 : 0,
                  paddingRight: i < infoItems.length - 1 ? 40 : 0,
                  borderRight: i < infoItems.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  flexShrink: 0,
                }}
              >
                <p style={{ fontSize: 9, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: 'var(--font-body)', marginBottom: 4 }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 14, color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content grid ─────────────────────────────────────── */}
      <div ref={contentRef} style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto" style={{ padding: '60px 40px' }}>
          <div className="lg:grid" style={{ gap: 56, gridTemplateColumns: '1fr 360px' }}>

            {/* ── Left column ── */}
            <div>

              {/* Photo grid */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: '240px 150px',
                  gap: 10,
                  marginBottom: 52,
                }}
              >
                {/* Main image */}
                <button
                  onClick={() => openLightbox(0)}
                  className="group"
                  style={{ gridRow: '1 / 3', borderRadius: 12, overflow: 'hidden', backgroundColor: '#E8E0D4', position: 'relative', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  {band.images[0] && (
                    <Image src={band.images[0]} alt={band.name} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="30vw" />
                  )}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.25)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </div>
                </button>

                {/* Second image */}
                <button
                  onClick={() => openLightbox(Math.min(1, galleryImages.length - 1))}
                  className="group"
                  style={{ borderRadius: 12, overflow: 'hidden', backgroundColor: '#DDD6CC', position: 'relative', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  {band.images[1] && (
                    <Image src={band.images[1]} alt={`${band.name} 2`} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="15vw" />
                  )}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.25)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </div>
                </button>

                {/* Gallery button */}
                <button
                  onClick={() => openLightbox(0)}
                  className="group"
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  <span
                    className="transition-transform duration-200 group-hover:scale-110 inline-block"
                    style={{ color: 'var(--color-orange)', fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, letterSpacing: '0.06em' }}>
                    + Galerie
                  </span>
                </button>
              </motion.div>

              {/* Über die Band */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.08 }}
                style={{ marginBottom: 44 }}
              >
                <EyebrowLabel>Über die Band</EyebrowLabel>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: 'var(--color-muted)',
                  lineHeight: 1.75,
                }}>
                  {band.description.split('\n\n')[0]}
                </p>
              </motion.div>

              {/* Repertoire */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.16 }}
                style={{ marginBottom: 52 }}
              >
                <EyebrowLabel>Repertoire</EyebrowLabel>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {band.repertoire.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={contentInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.18 + i * 0.04 }}
                      whileHover={{ scale: 1.06, backgroundColor: 'var(--color-orange-light)', borderColor: 'rgba(234,88,12,0.4)', color: 'var(--color-orange-text)' }}
                      style={{
                        backgroundColor: '#fff',
                        border: '1px solid #E5DDD5',
                        padding: '6px 16px',
                        borderRadius: 30,
                        fontSize: 12,
                        fontFamily: 'var(--font-body)',
                        color: '#4A3F35',
                        fontWeight: 500,
                        cursor: 'default',
                        display: 'inline-block',
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Reviews */}
              {band.reviews && band.reviews.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={contentInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.26 }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
                    <EyebrowLabel>Bewertungen</EyebrowLabel>
                    {avgRating && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                        <Stars rating={avgRating} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-muted)' }}>
                          Ø {avgRating}.0 · {band.reviews.length} Bewertungen
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
                    {band.reviews.map((review, i) => (
                      <ReviewCard key={i} review={review} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* ── Right sidebar ── */}
            <motion.div
              className="mt-12 lg:mt-0"
              initial={{ opacity: 0, x: 28 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >

              {/* Videos */}
              {band.videos.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                  <EyebrowLabel>Videos</EyebrowLabel>
                  <div style={{ marginBottom: 8 }}>
                    <VideoPlaceholder title={band.videos[0]?.title ?? ''} large />
                  </div>
                  {band.videos.length > 1 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <VideoPlaceholder title={band.videos[1]?.title ?? ''} />
                      {band.videos[2] && <VideoPlaceholder title={band.videos[2].title} />}
                    </div>
                  )}
                </div>
              )}

              {/* Anfrage-Box */}
              <div id="anfrage" style={{
                backgroundColor: 'var(--color-dark)',
                borderRadius: 16,
                padding: '28px 26px',
                marginBottom: 20,
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff', fontWeight: 700, marginBottom: 4 }}>
                  {band.name} anfragen
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-orange)', marginBottom: 22 }}>
                  Direktkontakt – kein Mittelsmann, kein Aufpreis.
                </p>

                {/* Phone */}
                <a
                  href="tel:+4960787595868"
                  className="group"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 20 }}
                >
                  <div
                    className="transition-all duration-200 group-hover:scale-110"
                    style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'rgba(234,88,12,0.15)', border: '1px solid rgba(234,88,12,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.06 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                  </div>
                  <span
                    className="transition-colors duration-200 group-hover:text-orange-400"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff', fontWeight: 700, letterSpacing: '0.02em' }}>
                    06078 – 759 568
                  </span>
                </a>

                {/* Email CTA */}
                <motion.a
                  href={mailtoHref}
                  whileHover={{ scale: 1.02, boxShadow: '0 6px 26px rgba(234,88,12,0.48)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'block',
                    backgroundColor: 'var(--color-orange)',
                    color: '#fff',
                    borderRadius: 10,
                    padding: '13px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 10,
                    boxShadow: '0 4px 16px rgba(234,88,12,0.3)',
                  }}
                >
                  Per E-Mail anfragen
                </motion.a>

                {/* WhatsApp */}
                <motion.a
                  href={whatsappHref}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(234,88,12,0.65)', backgroundColor: 'rgba(234,88,12,0.06)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'block',
                    border: '1px solid rgba(234,88,12,0.35)',
                    color: 'var(--color-orange)',
                    borderRadius: 10,
                    padding: '13px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  WhatsApp
                </motion.a>
              </div>

              {/* Facebook Embed */}
              <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid #E5DDD5',
                backgroundColor: '#fff',
              }}>
                <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid #E8E0D4', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: '#1C1917' }}>
                    Vivid Music Productions
                  </span>
                </div>
                <iframe
                  src={fbEmbedSrc}
                  width="340"
                  height="460"
                  style={{ border: 'none', overflow: 'hidden', display: 'block', width: '100%' }}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Related Bands ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section ref={relatedRef} style={{ backgroundColor: 'var(--color-dark)', padding: '60px 40px' }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={relatedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 32 }}
            >
              <p style={{ fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 10 }}>
                Weitere Bands
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 36px)', color: '#fff', fontWeight: 700, lineHeight: 1.1 }}>
                Weitere Bands aus dieser Kategorie
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((b, i) => (
                <RelatedBandCard key={b.slug} band={b} index={i} inView={relatedInView} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
