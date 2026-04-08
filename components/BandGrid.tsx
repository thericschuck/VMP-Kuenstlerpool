'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const BANDS = [
  {
    name: 'Groove Control',
    genre: 'Soul · Pop · Rock',
    description: 'Die Allround-Partyband für Unternehmens-Events, Stadtfeste und Hochzeiten.',
    href: '/groove-control',
    bgColor: '#292524',
  },
  {
    name: 'Spirit of Soul',
    genre: 'Black Music',
    description: 'Authentischer Soul, R&B und Funk – eine Bühnenshow, die niemanden auf dem Stuhl lässt.',
    href: '/spirit-of-soul',
    bgColor: '#1C1917',
  },
  {
    name: 'Time Warp',
    genre: '5 Jahrzehnte Hits',
    description: 'Von den 60ern bis heute – eine musikalische Zeitreise durch die Geschichte der Popmusik.',
    href: '/time-warp',
    bgColor: '#3C3836',
  },
  {
    name: 'BOBbastic',
    genre: 'Power Rock Trio',
    description: 'Drei Musiker, maximale Energie – klassischer Rock in konzentriertester Form.',
    href: '/bobbastic',
    bgColor: '#262220',
  },
  {
    name: 'The Kiss Tribute Band',
    genre: 'Rock Tribute',
    description: 'Deutschlands erfolgreichste Kiss-Tribute-Show – mit originalgetreuem Make-up, Kostümen und feuriger Pyroshow.',
    href: '/kiss-tribute',
    bgColor: '#1A1817',
  },
  {
    name: 'CoverSnake',
    genre: 'Rock Tribute',
    description: 'A Tribute to Whitesnake – Decades of the Snake. Sechs Profimusiker, authentischer Hard Rock der 80er.',
    href: '/coversnake',
    bgColor: '#302C2A',
  },
  {
    name: 'The Adams Family',
    genre: 'Bryan Adams Tribute',
    description: "A Tribute to Bryan Adams – Summer of '69, Run to You und mehr, inklusive Unplugged-Set.",
    href: '/adams-family',
    bgColor: '#231F1D',
  },
  {
    name: 'Sir Williams',
    genre: 'Pop Tribute',
    description: 'Die ultimative Robbie Williams Tribute Show – Hits aus 30 Jahren, authentisch und mitreißend.',
    href: '/sir-williams',
    bgColor: '#2A2523',
  },
  {
    name: 'Bobby & Friends',
    genre: 'Jazz · Acoustic Pop',
    description: 'Elegante Loungemusik mit Jazz-Einflüssen – ideal für Empfänge, Firmenevents und private Feiern.',
    href: '/bobby-and-friends',
    bgColor: '#1E1B19',
  },
  {
    name: 'Marsch Mellows',
    genre: 'Walkact',
    description: 'Mobiler Walkact für Empfänge und Events – überraschend, charmant und ganz ohne Bühne.',
    href: '/marsch-mellows',
    bgColor: '#332E2B',
  },
]

export default function BandGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="bands" className="w-full py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display font-bold text-dark mb-14"
          style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
        >
          Unsere Bands
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BANDS.map((band, i) => (
            <motion.div
              key={band.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="band-card rounded-2xl overflow-hidden bg-white flex flex-col"
              style={{ border: '1px solid var(--color-border)' }}
            >
              {/* Image */}
              <div
                className="relative w-full"
                style={{ height: 240, backgroundColor: band.bgColor, flexShrink: 0 }}
              >
                {/* Genre pill on image */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span
                    className="font-body font-semibold px-3 py-1 rounded-full text-white"
                    style={{
                      fontSize: 11,
                      backgroundColor: 'rgba(28,25,23,0.7)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    {band.genre}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3
                  className="font-display font-bold text-dark mb-1"
                  style={{ fontSize: 18, lineHeight: 1.3 }}
                >
                  {band.name}
                </h3>
                <p
                  className="font-body text-muted mb-4 flex-1"
                  style={{ fontSize: 13, lineHeight: 1.6 }}
                >
                  {band.description}
                </p>
                <a
                  href={band.href}
                  className="font-body font-semibold transition-opacity hover:opacity-70 flex items-center gap-1"
                  style={{ fontSize: 13, color: 'var(--color-orange)' }}
                >
                  Mehr erfahren →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
