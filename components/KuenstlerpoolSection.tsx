'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CATEGORIES = [
  {
    icon: '🎹',
    title: 'Easy Listening',
    bandCount: 2,
    genres: ['Akustik', 'Jazz', 'Dinner Lounge'],
    topColor: 'var(--color-orange)',
    href: '#easy-listening',
  },
  {
    icon: '🎸',
    title: 'Partybands',
    bandCount: 4,
    genres: ['Soul', 'Rock', 'Funk'],
    topColor: 'var(--color-dark)',
    href: '#partybands',
  },
  {
    icon: '🤘',
    title: 'Tribute Bands',
    bandCount: 4,
    genres: ['Kiss', 'Whitesnake', 'Bryan Adams'],
    topColor: 'var(--color-orange-light)',
    href: '#tribute',
  },
]

export default function KuenstlerpoolSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="kategorien"
      ref={ref}
      className="w-full py-24 px-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p
            className="font-body font-semibold uppercase tracking-widest mb-3"
            style={{ fontSize: 11, color: 'var(--color-orange)', letterSpacing: '0.18em' }}
          >
            UNSER KÜNSTLERPOOL
          </p>
          <h2
            className="font-display font-bold text-dark mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.2 }}
          >
            10 Bands. 3 Kategorien.
          </h2>
          <p className="font-body text-muted" style={{ fontSize: 16 }}>
            Direkt buchbar — ohne Mittelsmann, ohne Aufpreis
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-2xl bg-white overflow-hidden flex flex-col"
              style={{
                border: '1px solid var(--color-border)',
                borderTop: `3px solid ${cat.topColor}`,
              }}
            >
              <div className="p-7 flex flex-col flex-1">
                {/* Icon + Badge */}
                <div className="flex items-start justify-between mb-5">
                  <span style={{ fontSize: 28 }}>{cat.icon}</span>
                  <span
                    className="font-body font-semibold px-3 py-1 rounded-full"
                    style={{
                      fontSize: 11,
                      backgroundColor: 'var(--color-orange-light)',
                      color: 'var(--color-orange-text)',
                    }}
                  >
                    {cat.bandCount} BANDS
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold text-dark mb-4"
                  style={{ fontSize: 22 }}
                >
                  {cat.title}
                </h3>

                {/* Genre Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {cat.genres.map((g) => (
                    <span
                      key={g}
                      className="font-body px-3 py-1 rounded-full"
                      style={{
                        fontSize: 12,
                        backgroundColor: 'var(--color-bg)',
                        color: 'var(--color-muted)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={cat.href}
                  className="mt-auto font-body font-semibold transition-opacity hover:opacity-70 flex items-center gap-1"
                  style={{ fontSize: 14, color: 'var(--color-orange)' }}
                >
                  Mehr entdecken
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
