export default function SiteFooter() {
  return (
    <footer style={{ background: 'var(--color-ink)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
          © 2025 Vivid Music Productions
        </p>
        <nav className="flex gap-6" aria-label="Rechtliches">
          {['Impressum', 'Datenschutz'].map((label) => (
            <a
              key={label}
              href={`/${label.toLowerCase()}`}
              className="text-sm transition-colors duration-200 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
