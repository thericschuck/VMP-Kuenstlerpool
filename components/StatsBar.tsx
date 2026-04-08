'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 20,  suffix: '+', label: 'Jahre Erfahrung' },
  { value: 10,  suffix: '',  label: 'Profi-Bands' },
  { value: 200, suffix: '+', label: 'Events pro Jahr' },
  { value: 3,   suffix: '',  label: 'Kategorien' },
]

function CountUp({ target, suffix, delay }: { target: number; suffix: string; delay: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    const timeout = setTimeout(() => {
      const duration = 1600
      const start = performance.now()
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        // Ease out expo — feels snappy then slows at the end
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        setCount(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(timeout)
  }, [inView, target, delay])

  return (
    <span
      ref={ref}
      className="font-display font-bold tabular-nums"
      style={{ color: 'var(--color-orange)', fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1 }}
    >
      {count}{suffix}
    </span>
  )
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="w-full"
      style={{ backgroundColor: 'var(--color-dark)' }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-0">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
            className="flex flex-col items-center text-center px-6 py-4"
            style={{
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
          >
            <CountUp target={stat.value} suffix={stat.suffix} delay={i * 120} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="font-body mt-3 tracking-widest uppercase"
              style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}
            >
              {stat.label}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
