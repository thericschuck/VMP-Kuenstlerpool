'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TRUST_ITEMS = [
  'Antwort innerhalb 24h',
  'Direktkontakt zu den Künstlern',
  'Kostenlose Erstberatung',
]

export default function KontaktCta() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="kontakt"
      className="w-full py-16 md:py-28 px-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display font-bold text-dark mb-5"
          style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.2 }}
        >
          Ihr nächstes Event.{' '}
          <span
            className="italic"
            style={{ color: 'var(--color-orange)' }}
          >
            Unvergesslich.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-body text-muted mb-10"
          style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 480 }}
        >
          Erzählen Sie uns von Ihrem Event — wir finden die passende Band und kümmern uns um alles Weitere.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mb-10"
        >
          <a
            href="mailto:info@v-m-p.de"
            className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 rounded-full font-body font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--color-orange)',
              fontSize: 15,
              boxShadow: '0 4px 24px rgba(234,88,12,0.3)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
          >
            Jetzt anfragen
          </a>
          <a
            href="tel:+4969000000"
            className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 rounded-full font-body font-semibold transition-all hover:-translate-y-0.5"
            style={{
              border: '1.5px solid var(--color-border)',
              color: 'var(--color-dark)',
              fontSize: 15,
              transition: 'opacity 0.2s, transform 0.2s',
            }}
          >
            +49 69 000 000
          </a>
        </motion.div>

        {/* Trust checkmarks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {TRUST_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-orange-light)' }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="var(--color-orange)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="2 6 5 9 10 3" />
                </svg>
              </div>
              <span
                className="font-body"
                style={{ fontSize: 13, color: 'var(--color-muted)' }}
              >
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
