'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const CATEGORIES = [
  {
    title: 'Firmenevents & Galas',
    description: 'Bereits gebucht von Audi, Daimler und der Deutschen Bank – Entertainment auf höchstem Niveau für exklusive Anlässe.',
    image: '/images/firmenevents.avif',
  },
  {
    title: 'Stadtfeste & Festivals',
    description: 'Tribute-Acts und Partybands für große Open-Air-Events – europaweit gebucht, mit professioneller Bühnentechnik.',
    image: '/images/stadtfeste.avif',
  },
  {
    title: 'Hochzeitsbands',
    description: 'Von der romantischen Trauung bis zur ausgelassenen Tanzfläche – wir finden die perfekte Band für Ihren großen Tag.',
    image: '/images/hochzeit.avif',
  },
]

const TAGS = [
  { label: 'Empfänge',               href: '#easy-listening' },
  { label: 'Walkacts',               href: '#easy-listening' },
  { label: 'Wohnzimmerkonzerte',     href: '#easy-listening' },
  { label: 'Geburtstage',            href: '#partybands' },
  { label: 'Jubiläen',               href: '#partybands' },
  { label: 'Messen & Ausstellungen', href: '#bands' },
]

const SIDEBAR_BANDS = [
  { label: 'Groove Control',        genre: 'Soul · Pop · Rock',     href: '/groove-control' },
  { label: 'Spirit of Soul',        genre: 'Black Music',           href: '/spirit-of-soul' },
  { label: 'The Kiss Tribute Band', genre: 'Rock Tribute',          href: '/kiss-tribute' },
  { label: 'Bobby & Friends',       genre: 'Jazz · Acoustic Pop',   href: '/bobby-and-friends' },
  { label: 'Time Warp',             genre: '5 Jahrzehnte Hits',     href: '/time-warp' },
  { label: 'CoverSnake',            genre: 'Whitesnake Tribute',    href: '/coversnake' },
]

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
]

export default function BandFinderSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="w-full flex" ref={ref} style={{ minHeight: 600 }}>

      {/* ── Left 2/3 — main content, white ──────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center py-24 px-10 bg-white">
        <div className="w-full">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <h2
              className="font-display font-bold text-dark"
              style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', lineHeight: 1.2 }}
            >
              Die richtige Musik &amp; Band<br />für Ihren Event finden
            </h2>
            <div className="flex justify-center mt-5">
              <div style={{ width: 48, height: 3, backgroundColor: 'var(--color-orange)', borderRadius: 2 }} />
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 px-16">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col group rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 2px 12px rgba(28,25,23,0.06)',
                  transition: 'box-shadow 0.25s, transform 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(28,25,23,0.12)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(28,25,23,0.06)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden" style={{ height: 220 }}>
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 22vw"
                  />
                </div>
                {/* Text */}
                <div className="px-5 py-4 bg-white">
                  <h3 className="font-body font-bold text-dark mb-1.5" style={{ fontSize: 14 }}>
                    {cat.title}
                  </h3>
                  <p className="font-body text-muted" style={{ fontSize: 12, lineHeight: 1.65 }}>
                    {cat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-2"
          >
            <span
              className="font-body font-semibold uppercase tracking-widest mr-1"
              style={{ fontSize: 10, color: 'var(--color-subtle)', letterSpacing: '0.14em' }}
            >
              Auch gebucht für:
            </span>
            {TAGS.map((tag) => (
              <a
                key={tag.label}
                href={tag.href}
                className="font-body px-3.5 py-1.5 rounded-full transition-all"
                style={{
                  fontSize: 12,
                  color: 'var(--color-muted)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-orange)'
                  e.currentTarget.style.color = 'var(--color-orange)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.color = 'var(--color-muted)'
                }}
              >
                {tag.label}
              </a>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── Right 1/3 — dark sidebar, connects to StatsBar above ── */}
      <motion.aside
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="hidden lg:flex flex-col py-14 px-8"
        style={{
          width: '26%',
          flexShrink: 0,
          backgroundColor: 'var(--color-dark)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* ── Trust Stats ─────────────────────────────── */}
        <div className="flex flex-col mb-6">
          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.08)' }} />
          {[
            { value: '20+', label: 'Jahre Erfahrung' },
            { value: '200', label: 'Events allein 2024' },
          ].map((s, i) => (
            <motion.div key={s.label}>
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-baseline gap-3 py-4"
              >
                <span className="font-display font-bold" style={{ fontSize: 32, color: 'var(--color-orange)', lineHeight: 1 }}>
                  {s.value}
                </span>
                <span className="font-body" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
                  {s.label}
                </span>
              </motion.div>
              <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.08)' }} />
            </motion.div>
          ))}
        </div>

        {/* ── Gold Status ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="rounded-xl p-4 mb-6"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span style={{ fontSize: 14 }}>🏆</span>
            <span className="font-body font-bold text-white" style={{ fontSize: 13 }}>Gold-Status</span>
          </div>
          <p className="font-body mb-3" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
            Melanie Thornton – Ready to Fly<br />
            150.000 Alben · #3 DE Charts
          </p>
          <a
            href="#bands"
            className="font-body font-semibold transition-colors"
            style={{ fontSize: 12, color: 'var(--color-orange)', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Mehr lesen →
          </a>
        </motion.div>

        {/* ── Divider ──────────────────────────────────── */}
        <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginBottom: 24 }} />

        {/* ── Kontakt ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-auto"
        >
          <p className="font-body font-bold text-white mb-0.5" style={{ fontSize: 14 }}>Bobby Stöcker</p>
          <p className="font-body mb-3" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            Persönlicher Ansprechpartner
          </p>
          <a
            href="tel:+4960787595868"
            className="font-body font-semibold block mb-1 transition-opacity hover:opacity-75"
            style={{ fontSize: 15, color: 'var(--color-orange)', textDecoration: 'none' }}
          >
            +49 6078 759 568
          </a>
          <p className="font-body flex items-center gap-1.5" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Heute noch anschreiben oder anrufen
          </p>
        </motion.div>

        {/* ── Divider ──────────────────────────────────── */}
        <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.08)', margin: '24px 0' }} />

        {/* ── Social ───────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {SOCIAL.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.85 + i * 0.08 }}
              className="flex items-center gap-3 font-body transition-all"
              style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: 13 }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >
              {s.icon}
              <span>{s.label}</span>
            </motion.a>
          ))}
        </div>

      </motion.aside>

    </section>
  )
}
