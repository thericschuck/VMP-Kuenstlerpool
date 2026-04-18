'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

// ─── Ambient glow helper ─────────────────────────────────────────

function Glow({
  x, y, color = 'rgba(234,88,12,0.07)', size = 700,
}: {
  x: string; y: string; color?: string; size?: number
}) {
  return (
    <div
      aria-hidden
      className="absolute pointer-events-none select-none"
      style={{
        left: x, top: y,
        width: size, height: size * 0.75,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 68%)`,
        borderRadius: '50%',
        zIndex: 0,
      }}
    />
  )
}

// ─── Data ────────────────────────────────────────────────────────

const PARTY_BANDS = [
  {
    name: 'Groove Control',
    genre: 'Soul · Pop · Rock',
    tag: 'Headliner',
    description: 'Die Allround-Partyband für Unternehmens-Events, Stadtfeste und Hochzeiten. Immer ausgebucht.',
    href: '/groove-control',
    image: '/images/groove-control.avif',
    bg: '#1A1714',
    featured: true,
  },
  {
    name: 'Spirit of Soul',
    genre: 'Black Music · R&B · Funk',
    tag: 'Bühnenshow',
    description: 'Authentischer Soul und Funk – eine Show, die niemanden auf dem Stuhl lässt.',
    href: '/spirit-of-soul',
    image: '/images/spirit-of-soul.avif',
    bg: '#1C1917',
    featured: true,
  },
  {
    name: 'Time Warp',
    genre: '5 Jahrzehnte Hits',
    tag: 'Crowd Favourite',
    description: 'Von den 60ern bis heute – musikalische Zeitreise durch fünf Jahrzehnte.',
    href: '/time-warp',
    image: '/images/time-warp.avif',
    bg: '#242120',
    featured: false,
  },
  {
    name: 'BOBbastic',
    genre: 'Power Rock Trio',
    tag: 'Energie Pur',
    description: 'Drei Musiker, maximale Energie – klassischer Rock in konzentriertester Form.',
    href: '/bobbastic',
    image: '/images/bobbastic.avif',
    bg: '#1E1B19',
    featured: false,
  },
]

const TRIBUTE_BANDS = [
  {
    name: 'The Kiss Tribute Band',
    genre: 'Rock Tribute',
    tag: 'Pyroshow',
    description: "Deutschlands erfolgreichste Kiss-Tribute-Show – originalgetreues Make-up, Kostüme und feurige Pyroshow.",
    href: '/kiss-tribute',
    image: '/images/KissTribute.avif',
    bg: '#0F0D0C',
  },
  {
    name: 'CoverSnake',
    genre: 'Whitesnake Tribute',
    tag: '6 Profimusiker',
    description: 'Decades of the Snake – authentischer Hard Rock der 80er auf höchstem Niveau.',
    href: '/coversnake',
    image: '/images/coversnake.avif',
    bg: '#1A1614',
  },
  {
    name: 'The Adams Family',
    genre: 'Bryan Adams Tribute',
    tag: 'inkl. Unplugged',
    description: "Summer of '69, Run to You und mehr – inklusive stimmungsvollem Unplugged-Set.",
    href: '/adams-family',
    image: '/images/adams-family.avif',
    bg: '#181614',
  },
  {
    name: 'Sir Williams',
    genre: 'Robbie Williams Tribute',
    tag: '30 Jahre Hits',
    description: 'Die ultimative Robbie Williams Show – charismatisch, mitreißend, authentisch.',
    href: '/sir-williams',
    image: '/images/sir-williams.avif',
    bg: '#201D1B',
  },
]

const EASY_BANDS = [
  {
    name: 'Bobby & Friends',
    genre: 'Jazz · Acoustic Pop',
    tag: 'Dinner Lounge',
    description: 'Elegante Loungemusik mit Jazz-Einflüssen – ideal für Empfänge und private Feiern.',
    href: '/bobby-and-friends',
    image: '/images/bobby-and-friends.avif',
    bg: '#1C1814',
  },
  {
    name: 'Marsch Mellows',
    genre: 'Walkact · Empfangsmusik',
    tag: 'Mobiler Walkact',
    description: 'Überraschend, charmant und ganz ohne Bühne – der besondere Empfangs-Act.',
    href: '/marsch-mellows',
    image: '/images/marsch-mellows.avif',
    bg: '#201C18',
  },
]

// ─── Compact overlay card ─────────────────────────────────────────

function BandCard({
  band, index, inView, height = 280,
}: {
  band: Omit<typeof PARTY_BANDS[0], 'featured'>
  index: number
  inView: boolean
  height?: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={band.href}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -4, boxShadow: '0 18px 48px rgba(0,0,0,0.5)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-xl block"
      style={{
        height,
        textDecoration: 'none',
        border: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: band.bg,
        flexShrink: 0,
      }}
    >
      <Image
        src={band.image}
        alt={band.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
      />
      {/* Gradient */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />
      {/* Orange hover tint */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(234,88,12,0.3) 0%, transparent 65%)' }} />

      {/* Tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className="font-body font-semibold px-2.5 py-1 rounded-full"
          style={{ fontSize: 10, backgroundColor: 'var(--color-orange)', color: '#fff' }}>
          {band.tag}
        </span>
      </div>

      {/* Name + genre + description */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <h3 className="font-display font-bold text-white" style={{ fontSize: 18, lineHeight: 1.2, marginBottom: 3 }}>
          {band.name}
        </h3>
        <p className="font-body" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
          {band.genre}
        </p>
        {/* Description — fades + slides up on hover */}
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

// ─── Section header ───────────────────────────────────────────────

function SectionHeader({
  eyebrow, title, subtitle, inView, light = false,
}: {
  eyebrow: string; title: string; subtitle: string; inView: boolean; light?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <p
        className="font-body font-semibold uppercase tracking-widest mb-3"
        style={{ fontSize: 11, color: 'var(--color-orange)', letterSpacing: '0.18em' }}
      >
        {eyebrow}
      </p>
      <h2
        className="font-display font-bold mb-3"
        style={{
          fontSize: 'clamp(26px, 4vw, 40px)',
          lineHeight: 1.15,
          color: light ? '#fff' : 'var(--color-dark)',
        }}
      >
        {title}
      </h2>
      <p className="font-body" style={{ fontSize: 15, color: light ? 'rgba(255,255,255,0.5)' : 'var(--color-muted)', maxWidth: 480 }}>
        {subtitle}
      </p>
    </motion.div>
  )
}

// ─── Ticker strip ────────────────────────────────────────────────

const TICKER_BANDS = [
  { name: 'Groove Control',        href: '/groove-control' },
  { name: 'Spirit of Soul',        href: '/spirit-of-soul' },
  { name: 'Time Warp',             href: '/time-warp' },
  { name: 'BOBbastic',             href: '/bobbastic' },
  { name: 'The Kiss Tribute Band', href: '/kiss-tribute' },
  { name: 'CoverSnake',            href: '/coversnake' },
  { name: 'The Adams Family',      href: '/adams-family' },
  { name: 'Sir Williams',          href: '/sir-williams' },
  { name: 'Bobby & Friends',       href: '/bobby-and-friends' },
  { name: 'Marsch Mellows',        href: '/marsch-mellows' },
]

function TickerStrip() {
  // Interleave dots between bands, then double for seamless loop
  const items = TICKER_BANDS.flatMap((b, i) => [
    b,
    ...(i < TICKER_BANDS.length - 1 ? [null] : [null]),
  ])
  const doubled = [...items, ...items]

  return (
    <div
      className="w-full overflow-hidden py-4"
      style={{ backgroundColor: 'var(--color-orange)', borderTop: '1px solid rgba(0,0,0,0.1)' }}
    >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex items-center gap-6 whitespace-nowrap"
        style={{ width: 'max-content' }}
      >
        {doubled.map((item, i) =>
          item === null ? (
            <span key={i} className="font-display font-bold select-none"
              style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>·</span>
          ) : (
            <a
              key={i}
              href={item.href}
              className="font-display font-bold transition-opacity hover:opacity-70"
              style={{ fontSize: 15, color: '#fff', letterSpacing: '0.04em', textDecoration: 'none' }}
            >
              {item.name}
            </a>
          )
        )}
      </motion.div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────

export default function BandShowcase() {
  const introRef   = useRef<HTMLDivElement>(null)
  const partyRef   = useRef<HTMLDivElement>(null)
  const tributeRef = useRef<HTMLDivElement>(null)
  const easyRef    = useRef<HTMLDivElement>(null)

  const introInView   = useInView(introRef,   { once: true, margin: '-60px' })
  const partyInView   = useInView(partyRef,   { once: true, margin: '-60px' })
  const tributeInView = useInView(tributeRef, { once: true, margin: '-60px' })
  const easyInView    = useInView(easyRef,    { once: true, margin: '-60px' })

  return (
    <div id="bands">

      {/* ── Intro strip ──────────────────────────────────── */}
      <section
        ref={introRef}
        className="relative overflow-hidden w-full py-20 px-6 md:px-10"
        style={{ backgroundColor: 'var(--color-dark)' }}
      >
        <Glow x="12%" y="50%" color="rgba(234,88,12,0.09)" size={700} />
        <Glow x="88%" y="30%" color="rgba(234,130,12,0.05)" size={500} />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <p
              className="font-body font-semibold uppercase tracking-widest mb-3"
              style={{ fontSize: 11, color: 'var(--color-orange)', letterSpacing: '0.18em' }}
            >
              Das komplette Line-up
            </p>
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.1 }}
            >
              10 Bands.<br />
              <span style={{ color: 'var(--color-orange)' }}>Eine Adresse.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-4 md:items-end"
          >
            {[
              { num: '4', label: 'Partybands' },
              { num: '4', label: 'Tribute Bands' },
              { num: '2', label: 'Easy Listening' },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-3 md:flex-row-reverse">
                <span className="font-display font-bold" style={{ fontSize: 32, color: 'var(--color-orange)', lineHeight: 1 }}>
                  {s.num}
                </span>
                <span className="font-body" style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ticker */}
      <TickerStrip />

      {/* ── 1. Partybands ────────────────────────────────── */}
      <section
        ref={partyRef}
        id="partybands"
        className="relative overflow-hidden w-full py-20 px-4 md:px-10"
        style={{ backgroundColor: '#111010' }}
      >
        <Glow x="80%" y="25%" color="rgba(234,88,12,0.07)" size={800} />
        <Glow x="5%"  y="75%" color="rgba(234,120,12,0.04)" size={500} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Kategorie 01"
            title="Partybands"
            subtitle="Das Zugpferd des Line-ups. Vier vielseitige Bands für jede Größenordnung — von der Firmenfeier bis zum Stadtfest."
            inView={partyInView}
            light
          />
          {/* Row 1: two featured wide + tall */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {PARTY_BANDS.filter(b => b.featured).map((band, i) => (
              <BandCard key={band.name} band={band} index={i} inView={partyInView} height={340} />
            ))}
          </div>
          {/* Row 2: two compact */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PARTY_BANDS.filter(b => !b.featured).map((band, i) => (
              <BandCard key={band.name} band={band} index={i + 2} inView={partyInView} height={220} />
            ))}
            {/* Filler CTA tile */}
            <div className="hidden md:flex col-span-2 items-center justify-center rounded-xl"
              style={{ height: 220, border: '1px dashed rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <a href="#kontakt" className="font-body font-semibold transition-colors hover:text-white"
                style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>
                Partyband anfragen →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Tribute Bands ─────────────────────────────── */}
      <section
        ref={tributeRef}
        id="tribute"
        className="relative overflow-hidden w-full py-20 px-4 md:px-10"
        style={{ backgroundColor: '#0D0C0B' }}
      >
        <Glow x="50%" y="10%" color="rgba(234,88,12,0.06)" size={900} />
        <Glow x="15%" y="80%" color="rgba(180,60,0,0.04)"  size={400} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Kategorie 02"
            title="Tribute Bands"
            subtitle="Vier Tribute-Acts mit Wiedererkennungswert. Die Kiss-Show mit Pyrotechnik ist ein Alleinstellungsmerkmal in Deutschland."
            inView={tributeInView}
            light
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TRIBUTE_BANDS.map((band, i) => (
              <BandCard key={band.name} band={band} index={i} inView={tributeInView} height={300} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Easy Listening ────────────────────────────── */}
      <section
        ref={easyRef}
        id="easy-listening"
        className="w-full py-20 px-4 md:px-10"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Kategorie 03"
            title="Easy Listening"
            subtitle="Das Nischenangebot für gehobene Empfänge, Dinner-Events und Wohnzimmerkonzerte — wer es sucht, weiß warum."
            inView={easyInView}
            light={false}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {EASY_BANDS.map((band, i) => (
              <BandCard key={band.name} band={band} index={i} inView={easyInView} height={300} />
            ))}
            {/* Spacer CTA */}
            <div className="hidden md:flex col-span-2 items-center justify-center rounded-xl"
              style={{ height: 300, border: '1.5px dashed var(--color-border)', backgroundColor: 'rgba(28,25,23,0.03)' }}>
              <a href="#kontakt" className="font-body font-semibold transition-colors"
                style={{ fontSize: 14, color: 'var(--color-subtle)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-dark)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-subtle)')}>
                Easy Listening anfragen →
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
