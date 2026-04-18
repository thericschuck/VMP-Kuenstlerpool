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


const BANDS_OF_WEEK = [
  {
    name: 'Groove Control',
    genre: 'Soul · Funk · Pop',
    category: 'Partyband',
    image: '/images/groove-control.avif',
    description: 'Groove Control begeistert seit über 15 Jahren Tanzflächen im Rhein-Main-Gebiet. Mit einem Repertoire aus Soul, Funk und Pop-Hits reißen sie jedes Publikum mit.',
    href: '/groove-control',
  },
  {
    name: 'Spirit of Soul',
    genre: 'Black Music · R&B',
    category: 'Partyband',
    image: '/images/spirit-of-soul.avif',
    description: 'Spirit of Soul verbindet klassischen Soul mit modernem R&B. Die fünfköpfige Band bringt authentisches Feeling auf jede Bühne – von der Gala bis zum Stadtfest.',
    href: '/spirit-of-soul',
  },
  {
    name: 'The Kiss Tribute Band',
    genre: 'Hard Rock · Tribute',
    category: 'Tribute Band',
    image: '/images/KissTribute.avif',
    description: 'Originalgetreue Bühnenshow, Kostüme und Sound – The Kiss Tribute Band liefert das volle KISS-Erlebnis. Spektakulär, laut und unvergesslich.',
    href: '/kiss-tribute',
  },
  {
    name: 'Time Warp',
    genre: '5 Jahrzehnte Hits',
    category: 'Partyband',
    image: '/images/time-warp.avif',
    description: 'Von den 60ern bis heute: Time Warp spielt die größten Hits aus fünf Jahrzehnten. Eine Band für jede Generation – garantierte Tanzfläche.',
    href: '/time-warp',
  },
  {
    name: 'Bobby & Friends',
    genre: 'Jazz · Acoustic Pop',
    category: 'Easy Listening',
    image: '/images/bobby-and-friends.avif',
    description: 'Elegante Hintergrundmusik für gehobene Anlässe. Bobby & Friends schaffen die perfekte Atmosphäre bei Empfängen, Dinner-Events und Wohnzimmerkonzerten.',
    href: '/bobby-and-friends',
  },
  {
    name: 'CoverSnake',
    genre: 'Whitesnake Tribute · Rock',
    category: 'Tribute Band',
    image: '/images/coversnake.avif',
    description: 'CoverSnake spielt Whitesnake so, wie es sein soll: druckvoll, leidenschaftlich und authentisch. Rock der alten Schule für Fans der ersten Stunde.',
    href: '/coversnake',
  },
  {
    name: 'BOBbastic',
    genre: 'Party · Pop · Dance',
    category: 'Partyband',
    image: '/images/bobbastic.avif',
    description: 'BOBbastic bringt Party in jeden Raum. Mit treibenden Beats und mitreißenden Vocals sorgt die Band dafür, dass keine Tanzfläche leer bleibt.',
    href: '/bobbastic',
  },
  {
    name: 'Marsch Mellows',
    genre: 'Acoustic · Lounge',
    category: 'Easy Listening',
    image: '/images/marsch-mellows.avif',
    description: 'Sanfte Klänge, warme Stimmen – Marsch Mellows sind die ideale Wahl für entspannte Atmosphäre. Perfekt für Empfänge und exklusive Veranstaltungen.',
    href: '/marsch-mellows',
  },
  {
    name: 'Sir Williams',
    genre: 'Pop · Robbie Williams Tribute',
    category: 'Tribute Band',
    image: '/images/sir-williams.avif',
    description: 'Sir Williams verkörpert Robbie Williams auf höchstem Niveau – von „Angels" bis „Rock DJ". Charismatisch, stimmstark und bühnenerfahren.',
    href: '/sir-williams',
  },
  {
    name: 'The Adams Family',
    genre: 'Rock · Classic Hits',
    category: 'Tribute Band',
    image: '/images/adams-family.avif',
    description: 'The Adams Family spielt die Klassiker des Rock mit Leidenschaft und Präzision. Eine erfahrene Liveband, die jede Bühne zum Beben bringt.',
    href: '/adams-family',
  },
]

function getBandOfWeek() {
  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
  return BANDS_OF_WEEK[weekNumber % BANDS_OF_WEEK.length]
}

export default function BandFinderSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="w-full flex" ref={ref} style={{ minHeight: 'auto' }}>

      {/* ── Left 2/3 — main content, white ──────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center py-14 md:py-24 px-5 md:px-10 bg-white">
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
              style={{ fontSize: 'clamp(22px, 4vw, 44px)', lineHeight: 1.2 }}
            >
              Die richtige Musik &amp; Band<br />für Ihren Event finden
            </h2>
            <div className="flex justify-center mt-5">
              <div style={{ width: 48, height: 3, backgroundColor: 'var(--color-orange)', borderRadius: 2 }} />
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 px-0 md:px-8 lg:px-16">
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

      {/* ── Right 1/3 — Band der Woche ── */}
      <motion.aside
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="hidden lg:flex items-center justify-center p-8"
        style={{
          width: '28%',
          flexShrink: 0,
          backgroundColor: '#f5f0e8',
          borderLeft: '1px solid var(--color-border)',
        }}
      >
        {(() => {
          const band = getBandOfWeek()
          return (
            <div className="w-full rounded-2xl overflow-hidden"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)',
                boxShadow: '0 4px 24px rgba(28,25,23,0.10)',
                height: 480,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image */}
              <div className="relative w-full overflow-hidden" style={{ height: 240, flexShrink: 0 }}>
                <Image
                  src={band.image}
                  alt={band.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="28vw"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }} />
                {/* Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#f0c040" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <span className="font-body font-bold uppercase" style={{ fontSize: 8, color: '#ffffff', letterSpacing: '0.14em' }}>
                    Band der Woche
                  </span>
                </div>
                {/* Category */}
                <div className="absolute bottom-3 left-3">
                  <span className="font-body font-semibold px-2 py-0.5 rounded-full"
                    style={{ fontSize: 9, color: '#ffffff', backgroundColor: 'rgba(107,20,20,0.75)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {band.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-5 py-5 flex flex-col flex-1">
                <h3 className="font-display font-bold mb-0.5" style={{ fontSize: 20, color: 'var(--color-dark)', lineHeight: 1.15 }}>
                  {band.name}
                </h3>
                <p className="font-body mb-3" style={{ fontSize: 10, color: 'var(--color-orange)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {band.genre}
                </p>
                <p className="font-body mb-4 flex-1" style={{ fontSize: 12, color: 'var(--color-muted)', lineHeight: 1.65 }}>
                  {band.description}
                </p>
                <a
                  href={band.href}
                  className="flex items-center justify-center w-full rounded-full font-body font-bold text-white"
                  style={{
                    backgroundColor: 'var(--color-bg-dark)',
                    fontSize: 12,
                    padding: '10px 16px',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                >
                  Zum Bandprofil →
                </a>
              </div>
            </div>
          )
        })()}
      </motion.aside>

    </section>
  )
}
