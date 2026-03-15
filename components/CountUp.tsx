'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  target: number
  duration?: number  // ms, default 1500
  suffix?: string
}

export default function CountUp({ target, duration = 1500, suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(target) // SSR: show final value immediately
  const elRef  = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Respect reduced-motion: keep final value, skip animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Reset to 0 for the animation
    setCount(0)

    const el = elRef.current
    if (!el) return

    let rafId: number

    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const startTime = performance.now()

        const tick = (now: number) => {
          const t = Math.min(1, (now - startTime) / duration)
          setCount(Math.round(easeOutCubic(t) * target))
          if (t < 1) rafId = requestAnimationFrame(tick)
        }

        rafId = requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [target, duration])

  return (
    <span ref={elRef}>
      {count}{suffix}
    </span>
  )
}
