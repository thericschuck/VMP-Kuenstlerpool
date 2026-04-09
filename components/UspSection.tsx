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

const SOCIALS = [
  {
    platform: 'Instagram',
    handle: '@vmp.frankfurt',
    description: 'Backstage-Momente, Live-Impressionen und Stories direkt vom Event.',
    href: 'https://instagram.com',
    hoverColor: 'rgba(225,48,108,0.18)',
    hoverBorder: 'rgba(225,48,108,0.45)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    cta: 'Jetzt folgen',
  },
  {
    platform: 'Facebook',
    handle: 'Vivid Music Productions',
    description: 'Events, Neuigkeiten und direkte Anfragen über unsere Facebook-Seite.',
    href: 'https://facebook.com',
    hoverColor: 'rgba(24,119,242,0.15)',
    hoverBorder: 'rgba(24,119,242,0.4)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    cta: 'Seite besuchen',
  },
  {
    platform: 'YouTube',
    handle: 'VMP Frankfurt',
    description: 'Komplette Showmitschnitte und Probeaufnahmen aller unserer Bands.',
    href: 'https://youtube.com',
    hoverColor: 'rgba(255,0,0,0.12)',
    hoverBorder: 'rgba(255,0,0,0.38)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
    cta: 'Videos ansehen',
  },
]

export default function UspSection() {
  const ref       = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const inView       = useInView(ref,       { once: true, margin: '-80px' })
  const socialInView = useInView(socialRef, { once: true, margin: '-60px' })

  return (
    <section
      id="ueber-uns"
      className="w-full py-14 md:py-24 px-4 md:px-6"
      style={{ backgroundColor: 'var(--color-dark)' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── USP Features ── */}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-orange)' }}
              >
                <span className="text-white">{feat.icon}</span>
              </div>
              <h3 className="font-body font-bold text-white" style={{ fontSize: 17 }}>
                {feat.title}
              </h3>
              <p className="font-body" style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                {feat.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Social Media ── */}
        <div
          id="social"
          ref={socialRef}
          className="mt-20 pt-16"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={socialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <p
                className="font-body font-semibold uppercase tracking-widest mb-2"
                style={{ fontSize: 10, color: 'var(--color-orange)', letterSpacing: '0.18em' }}
              >
                Social Media
              </p>
              <h2
                className="font-display font-bold text-white"
                style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', lineHeight: 1.15 }}
              >
                Bleiben Sie auf dem Laufenden.
              </h2>
            </div>
            <p className="font-body" style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', maxWidth: 320, lineHeight: 1.6 }}>
              Folgen Sie uns für Live-Einblicke, neue Bands und aktuelle Buchungstermine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={socialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group flex flex-col gap-5 p-7 rounded-2xl"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s ease, border-color 0.3s ease, transform 0.25s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = s.hoverColor
                  e.currentTarget.style.borderColor = s.hoverBorder
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.3)`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Icon + platform */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.75)' }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <p className="font-body font-bold text-white" style={{ fontSize: 15 }}>
                      {s.platform}
                    </p>
                    <p className="font-body" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                      {s.handle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="font-body flex-1" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                  {s.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 font-body font-semibold" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}>
                  <span className="group-hover:text-white transition-colors">{s.cta}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition: 'transform 0.2s' }}
                    className="group-hover:translate-x-1">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
