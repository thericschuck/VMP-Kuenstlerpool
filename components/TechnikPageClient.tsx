'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

// ─── Helpers ──────────────────────────────────────────────────────────

function useSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return { ref, inView }
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{
      fontSize: 10,
      color: 'var(--color-orange)',
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
      marginBottom: 14,
    }}>
      {children}
    </p>
  )
}

function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(28px, 4vw, 46px)',
      fontWeight: 700,
      color: light ? '#fff' : 'var(--color-dark)',
      lineHeight: 1.1,
      marginBottom: 20,
    }}>
      {children}
    </h2>
  )
}

function BodyText({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: light ? 'rgba(255,255,255,0.6)' : 'var(--color-muted)',
      lineHeight: 1.8,
      maxWidth: 520,
    }}>
      {children}
    </p>
  )
}

function CtaLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: 4 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--color-orange)',
        textDecoration: 'none',
        marginTop: 28,
      }}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </motion.a>
  )
}

// ─── Video placeholder ────────────────────────────────────────────────

function VideoBox({ large = false, dark = true }: { large?: boolean; dark?: boolean }) {
  return (
    <div style={{
      aspectRatio: '16/9',
      borderRadius: large ? 16 : 12,
      background: dark ? '#111010' : '#E8E0D4',
      position: 'relative',
      overflow: 'hidden',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: large ? 52 : 40,
        height: large ? 52 : 40,
        borderRadius: '50%',
        background: 'var(--color-orange)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 0 12px rgba(234,88,12,0.12)',
      }}>
        <svg viewBox="0 0 24 24" fill="white" width={large ? 18 : 14} height={large ? 18 : 14}>
          <polygon points="6,4 20,12 6,20"/>
        </svg>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────

export default function TechnikPageClient() {

  const s1 = useSection()
  const s2 = useSection()
  const s3 = useSection()
  const cta = useSection()

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  })

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: 56,
        background: 'var(--color-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/technik-1.avif"
            alt=""
            fill
            style={{ objectFit: 'cover', opacity: 0.2 }}
            sizes="100vw"
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(28,25,23,0.5) 0%, var(--color-dark) 100%)' }} />
        </div>

        <div className="max-w-7xl mx-auto" style={{ padding: '60px 40px 64px', position: 'relative', zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 14 }}
          >
            Vivid Music Productions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(46px, 7vw, 88px)',
              color: '#fff',
              lineHeight: 1,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Technik &<br />Tonstudio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}
          >
            Vollservice aus einer Hand – seit 20 Jahren.
          </motion.p>
        </div>
      </section>

      {/* ── Section 1: Veranstaltungsservice ─────────────────────── */}
      <section style={{ background: 'var(--color-bg)', padding: '80px 0', position: 'relative' }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `repeating-linear-gradient(-52deg, rgba(28,25,23,0.028) 0px, rgba(28,25,23,0.028) 1px, transparent 1px, transparent 22px), repeating-linear-gradient(38deg, rgba(28,25,23,0.016) 0px, rgba(28,25,23,0.016) 1px, transparent 1px, transparent 44px)`,
        }} />
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.045,
          mixBlendMode: 'multiply' as const,
        }} />
        <div ref={s1.ref} className="max-w-7xl mx-auto" style={{ padding: '0 40px', position: 'relative' }}>
          <div className="lg:grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={s1.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Main image */}
              <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', aspectRatio: '4/3', marginBottom: 10 }}>
                <Image
                  src="/images/technik-1.avif"
                  alt="PA-Anlage und Bühnentechnik"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="50vw"
                />
              </div>
              {/* 3 smaller images */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {['/images/technik-2.avif', '/images/veranstaltungsservice.avif', '/images/hero-event.avif'].map((src, i) => (
                  <div key={i} style={{ borderRadius: 10, overflow: 'hidden', position: 'relative', aspectRatio: '1/1' }}>
                    <Image src={src} alt="" fill style={{ objectFit: 'cover' }} sizes="17vw" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={s1.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: 40 }}
              className="lg:mt-0"
            >
              <Eyebrow>Veranstaltungsservice</Eyebrow>
              <SectionHeading>Bühne, Licht &amp; Beschallung aus einer Hand</SectionHeading>
              <BodyText>
                Sie möchten eine Band buchen und haben noch keine Bühne, Licht und keine Beschallung für Ihre Gäste? Wir verstehen uns als Volldienstleister in allen Bereichen rund um Ihre Veranstaltung. Wir bieten attraktive Komplettpakete mit Band, Beschallung, Licht und Bühne – realisiert von erfahrenen Veranstaltungsmeistern und -technikern.
              </BodyText>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
                {[
                  'Professionelle PA-Anlage & Line-Array-Systeme',
                  'Lichtdesign & Moving-Heads',
                  'Modulare Bühnensysteme bis 12 × 8 m',
                  'Eigene Techniker & Veranstaltungsmeister',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-orange)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-muted)' }}>{item}</span>
                  </div>
                ))}
              </div>

              <CtaLink href="/#kontakt">Jetzt anfragen</CtaLink>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Musikproduktion ────────────────────────────── */}
      <section id="musikproduktion" style={{ background: '#F0EBE3', padding: '80px 0' }}>
        <div ref={s2.ref} className="max-w-7xl mx-auto" style={{ padding: '0 40px' }}>
          <div className="lg:grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            {/* Text – left */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={s2.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Eyebrow>Musikproduktion</Eyebrow>
              <SectionHeading>Werbejingles, Demos &amp; Auftragsproduktionen</SectionHeading>
              <BodyText>
                Seit 20 Jahren produzieren wir Songs für Verlage, Werbeagenturen und andere Künstler. Musik für TV-Werbejingles wie Cliff Duschgel, Focus Kontaktlinsen u.v.m. Fordern Sie Demos an oder vereinbaren Sie einen Termin.
              </BodyText>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 40, marginTop: 36 }}>
                {[
                  { value: '20+', label: 'Jahre Erfahrung' },
                  { value: '100+', label: 'Produktionen' },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--color-orange)', lineHeight: 1, marginBottom: 4 }}>{value}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-muted)', letterSpacing: '0.04em' }}>{label}</p>
                  </div>
                ))}
              </div>

              <CtaLink href="/#kontakt">Demo anfragen</CtaLink>
            </motion.div>

            {/* Video – right */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={s2.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: 40 }}
              className="lg:mt-0"
            >
              <VideoBox large dark />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Songwriting (dark) ─────────────────────────── */}
      <section id="songwriting" style={{ background: 'var(--color-dark)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient light */}
        <div aria-hidden style={{
          position: 'absolute', top: '30%', left: '10%',
          width: 600, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(234,88,12,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div ref={s3.ref} className="max-w-7xl mx-auto" style={{ padding: '0 40px' }}>
          <div className="lg:grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

            {/* Text – left */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={s3.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Eyebrow light>Songwriting &amp; Arrangements</Eyebrow>
              <SectionHeading light>Songs für Verlage, Künstler &amp; Werbung</SectionHeading>
              <BodyText light>
                Bobby Stöcker schreibt regelmäßig Songs von Pop &amp; Rock über Dance bis R&amp;B – auch für andere Künstler. Auf Wunsch auch mit Arrangement und Produktion.
              </BodyText>

              {/* Gold achievement card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={s3.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  marginTop: 32,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(234,88,12,0.25)',
                  borderRadius: 14,
                  padding: '20px 22px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 16 }}>🏆</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--color-orange)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Gold-Status
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff', fontWeight: 700, marginBottom: 6 }}>
                  Melanie Thornton – Ready To Fly
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 4 }}>
                  150.000 verkaufte Alben · Platz 3 der deutschen Album-Charts
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                  + Top 10 DJ-Charts mit Ayla Presents Yell
                </p>
              </motion.div>

              <CtaLink href="/#kontakt" light>Termin vereinbaren</CtaLink>
            </motion.div>

            {/* Images – right */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={s3.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 40 }}
              className="lg:mt-0"
            >
              {/* Melanie Thornton image */}
              <div style={{ borderRadius: 14, overflow: 'hidden', position: 'relative', aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.07)' }}>
                <Image
                  src="/images/melanie-thornton.avif"
                  alt="Melanie Thornton"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="45vw"
                />
              </div>
              {/* Second video box */}
              <VideoBox dark />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-dark)', padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div ref={cta.ref} className="max-w-3xl mx-auto" style={{ textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={cta.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase' as const, letterSpacing: '0.2em', fontWeight: 600, marginBottom: 16 }}
          >
            Vollservice aus einer Hand
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={cta.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', color: '#fff', fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}
          >
            Interesse an einem Komplettpaket?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={cta.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.16 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 36, lineHeight: 1.7 }}
          >
            Wir erstellen Ihnen ein unverbindliches Angebot — Band + Technik aus einer Hand.
          </motion.p>
          <motion.a
            href="/#kontakt"
            initial={{ opacity: 0, y: 10 }}
            animate={cta.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.24 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'var(--color-orange)',
              color: '#fff',
              padding: '14px 36px',
              borderRadius: 30,
              fontSize: 15,
              fontWeight: 700,
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
            }}
          >
            Jetzt anfragen
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.a>
        </div>
      </section>
    </>
  )
}
