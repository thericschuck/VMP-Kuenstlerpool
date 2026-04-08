'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const LOGOS = ['AUDI', 'DAIMLER', 'DEUTSCHE BANK']
const SIDEBAR_W = '26%'

// Organic heights in px — short/medium/tall mix, never uniform
const BAR_HEIGHTS = [
  10, 20, 32, 16, 40, 24, 12, 36, 22, 44, 28, 14, 38, 20, 48,
  26, 12, 42, 18, 36, 24, 10, 34, 22, 44, 16, 38, 28, 14, 32,
]

// Sine-wave stagger: delay = sin(i / bars * π) creates a flowing left→peak→right pattern
const sineDelay = (i: number, total: number) =>
  Math.sin((i / total) * Math.PI) * 0.4

// Per-bar duration — pseudo-random but seeded by index
const barDuration = (i: number) => 3.5 + ((i * 7) % 13) / 6

// Opacity: center bars more opaque, edges fade
const barOpacity = (i: number, total: number) => {
  const center = (total - 1) / 2
  const dist = Math.abs(i - center) / center
  return 0.75 - dist * 0.45
}

function Waveform() {
  const reduced = useReducedMotion()
  const total = BAR_HEIGHTS.length

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ height: 48, gap: 2 }}
    >
      {BAR_HEIGHTS.map((h, i) => (
        <motion.div
          key={i}
          animate={reduced ? {} : {
            scaleY: [1, 0.25, 0.75, 0.15, 0.6, 1],
          }}
          transition={reduced ? {} : {
            duration: barDuration(i),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: sineDelay(i, total),
            repeatDelay: 0,
          }}
          style={{
            width: 3,
            height: h,
            borderRadius: 999,
            backgroundColor: '#E8653A',
            opacity: barOpacity(i, total),
            transformOrigin: 'center',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  )
}

export default function TrustedBy() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="w-full flex"
    >
      {/* White left portion */}
      <div className="flex-1 bg-white py-7 px-8 flex items-center gap-8">
        <span
          className="font-body font-semibold uppercase tracking-widest flex-shrink-0"
          style={{ fontSize: 10, color: 'var(--color-subtle)', letterSpacing: '0.15em' }}
        >
          Gebucht von
        </span>
        <div className="h-6 w-px flex-shrink-0" style={{ backgroundColor: 'var(--color-border)' }} />
        <div className="flex items-center gap-10 flex-wrap">
          {LOGOS.map((name) => (
            <span
              key={name}
              className="font-body font-bold uppercase tracking-widest"
              style={{ fontSize: 13, color: '#C4BDB6', letterSpacing: '0.12em' }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Dark right strip */}
      <div
        className="hidden lg:flex flex-shrink-0 flex-col justify-center gap-4"
        style={{
          width: SIDEBAR_W,
          backgroundColor: 'var(--color-dark)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          padding: '18px 20px',
        }}
      >
        <Waveform />

        <a
          href="#bands"
          className="font-body font-semibold transition-all text-center w-full block"
          style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', letterSpacing: '0.04em' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-orange)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
        >
          Mal reinhören →
        </a>
      </div>
    </motion.section>
  )
}
