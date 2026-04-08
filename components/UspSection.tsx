'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Kein Mittelsmann',
    text: 'Sie sprechen direkt mit den Künstlern. Keine Agenturgebühren, kein Aufpreis — was Sie zahlen, kommt zu 100% der Show zugute.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: '20 Jahre Erfahrung',
    text: 'Bobby Stöcker ist seit 2004 in der Live-Musikbranche. Hunderte Events, unzählige zufriedene Kunden — das ist kein Versprechen, das ist Geschichte.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Vollservice',
    text: 'Bühne, Licht und Technik aus einer Hand. Wir koordinieren alles — Sie müssen sich um nichts kümmern außer Ihrem Event.',
  },
]

export default function UspSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="ueber-uns"
      className="w-full py-24 px-6"
      style={{ backgroundColor: 'var(--color-dark)' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display font-bold text-white mb-14 text-center"
          style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
        >
          Warum direkt bei uns buchen?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-orange)' }}
              >
                <span className="text-white">{feat.icon}</span>
              </div>
              <h3
                className="font-body font-bold text-white"
                style={{ fontSize: 17 }}
              >
                {feat.title}
              </h3>
              <p
                className="font-body"
                style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}
              >
                {feat.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
