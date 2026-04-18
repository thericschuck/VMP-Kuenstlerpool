'use client'

/**
 * Wraps a band-card grid and applies staggered reveal-on-scroll.
 *
 * Strategy (avoids flash-of-invisible-content):
 *   1. useEffect fires AFTER first browser paint → cards are visible on SSR/hydration.
 *   2. We set opacity/transform via inline styles immediately in the same microtask
 *      before the next paint (requestAnimationFrame trick).
 *   3. IntersectionObserver applies the reveal transition per card.
 *   4. After each card's transition finishes, inline styles are cleared so the
 *      .band-card:hover CSS transition takes over cleanly.
 */

import { useEffect, useRef } from 'react'

interface RevealCardsProps {
  children: React.ReactNode
  className?: string
}

export default function RevealCards({ children, className }: RevealCardsProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>('.band-card')
    )

    // ── Apply hidden state before next paint ──
    requestAnimationFrame(() => {
      cards.forEach((card) => {
        card.style.opacity = '0'
        card.style.transform = 'translateY(32px)'
      })
    })

    // ── IntersectionObserver: reveal + stagger ──
    const timers: ReturnType<typeof setTimeout>[] = []

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const card = entry.target as HTMLElement
          const idx = cards.indexOf(card)
          observer.unobserve(card)

          const t = setTimeout(() => {
            // Apply reveal transition inline
            card.style.transition =
              'opacity 0.5s cubic-bezier(0.25,0.46,0.45,0.94), ' +
              'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)'
            card.style.opacity = '1'
            card.style.transform = 'translateY(0)'

            // Remove inline styles after animation so :hover CSS kicks in
            const cleanup = setTimeout(() => {
              card.style.transition = ''
              card.style.opacity = ''
              card.style.transform = ''
            }, 560)
            timers.push(cleanup)
          }, idx * 80)

          timers.push(t)
        })
      },
      { threshold: 0.15 }
    )

    cards.forEach((card) => observer.observe(card))

    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
