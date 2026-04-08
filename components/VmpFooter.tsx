'use client'

const NAV_LINKS = [
  { label: 'Bands', href: '#bands' },
  { label: 'Kategorien', href: '#kategorien' },
  { label: 'Events', href: '#events' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function VmpFooter() {
  return (
    <footer
      className="w-full"
      style={{ backgroundColor: 'var(--color-dark)' }}
    >
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-10">
          {/* Brand */}
          <div>
            <p
              className="font-display font-bold text-white mb-2"
              style={{ fontSize: 28 }}
            >
              vivid.
            </p>
            <p
              className="font-body"
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}
            >
              Music Productions · Frankfurt am Main
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap gap-4 md:gap-6 md:justify-center">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-body transition-colors hover:text-white"
                style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2 md:items-end">
            <a
              href="tel:+4969000000"
              className="font-body font-semibold transition-opacity hover:opacity-80"
              style={{ fontSize: 14, color: 'var(--color-orange)' }}
            >
              +49 69 000 000
            </a>
            <a
              href="mailto:info@v-m-p.de"
              className="font-body font-semibold transition-opacity hover:opacity-80"
              style={{ fontSize: 14, color: 'var(--color-orange)' }}
            >
              info@v-m-p.de
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p
            className="font-body"
            style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}
          >
            © {new Date().getFullYear()} Vivid Music Productions. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            {['Impressum', 'Datenschutz'].map((l) => (
              <a
                key={l}
                href={`/${l.toLowerCase()}`}
                className="font-body transition-colors hover:text-white"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
