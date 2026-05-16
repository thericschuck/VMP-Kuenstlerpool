'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      let hash: string | null = null

      if (href.startsWith('#')) {
        // Pure in-page hash link (#section)
        hash = href.slice(1)
      } else if (href.startsWith('/')) {
        // Cross-page link — only intercept if it targets the current page
        try {
          const url = new URL(href, window.location.origin)
          if (url.pathname === pathname && url.hash) {
            hash = url.hash.slice(1)
          }
        } catch {
          // ignore malformed hrefs
        }
      }

      if (hash) {
        const el = document.getElementById(hash)
        if (el) {
          e.preventDefault()
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          history.pushState(null, '', `#${hash}`)
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  return <>{children}</>
}
