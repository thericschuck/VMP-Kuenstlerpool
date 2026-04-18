'use client'

import { useState, useEffect } from 'react'

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) setVisible(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-500 pointer-events-none"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Two staggered chevrons for a "scroll down" pulse */}
      <svg
        className="animate-bounce"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ animationDelay: '0ms' }}
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="var(--color-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="animate-bounce -mt-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ animationDelay: '150ms', opacity: 0.45 }}
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="var(--color-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
