'use client'
import { useEffect } from 'react'

export default function ScrollEffects() {
  useEffect(() => {
    // ── Scroll Reveal ──────────────────────────────────────────────
    // Set initial hidden state via JS → no flash on SSR, gracefully
    // degrades if JS is disabled (elements stay visible).
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>('.scroll-reveal')
    )
    revealEls.forEach((el) => {
      const delay = el.dataset.srDelay ?? '0'
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      el.style.transition = [
        `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        `transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      ].join(', ')
    })

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          revealObs.unobserve(el)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    revealEls.forEach((el) => revealObs.observe(el))

    // ── Multi-layer Parallax ───────────────────────────────────────
    const photoCol  = document.getElementById('hero-photo-col')
    const decoBlue  = document.getElementById('hero-deco-blue')
    const decoRed   = document.getElementById('hero-deco-red')
    const stripe    = document.getElementById('hero-deco-stripe')

    if (photoCol) photoCol.style.willChange = 'transform'

    const onScroll = () => {
      const y = window.scrollY
      if (photoCol) photoCol.style.transform = `translateY(${y * 0.14}px)`
      if (decoBlue)  decoBlue.style.transform  = `translateY(${y * 0.06}px)`
      if (decoRed)   decoRed.style.transform   = `translateY(${y * -0.05}px)`
      if (stripe)    stripe.style.transform    = `scaleY(${1 + y * 0.0003})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // ── Stats counter ──────────────────────────────────────────────
    const countEls = Array.from(
      document.querySelectorAll<HTMLElement>('[data-count]')
    )
    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el     = entry.target as HTMLElement
          const target = parseInt(el.dataset.count ?? '0', 10)
          const plus   = el.dataset.countPlus === 'true'
          const start  = performance.now()
          const dur    = 1100

          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1)
            const eased = 1 - Math.pow(1 - p, 3) // ease-out cubic
            el.textContent = Math.floor(eased * target) + (plus ? '+' : '')
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          countObs.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )
    countEls.forEach((el) => countObs.observe(el))

    // ── Subtle mouse-tilt on cards ─────────────────────────────────
    const tiltCards = Array.from(
      document.querySelectorAll<HTMLElement>('.tilt-card')
    )
    tiltCards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 8
        const y = ((e.clientY - r.top)  / r.height - 0.5) * -8
        card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) scale(1.015)`
      }
      const onLeave = () => {
        card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)'
      }
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      revealObs.disconnect()
      countObs.disconnect()
    }
  }, [])

  return null
}
