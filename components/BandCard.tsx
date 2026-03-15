interface BandCardProps {
  name: string
  genre: string
  description: string
  href: string
}

export default function BandCard({ name, genre, description, href }: BandCardProps) {
  return (
    <article
      className="band-card rounded-xl overflow-hidden bg-white"
      style={{ border: '1px solid var(--color-cream-dark)' }}
    >
      {/* Photo placeholder – replace with next/image */}
      <div
        style={{ aspectRatio: '16 / 9', background: 'var(--color-cream-dark)' }}
        role="img"
        aria-label={`Foto ${name} – folgt in Kürze`}
      />

      {/* Card body */}
      <div style={{ padding: '20px' }}>
        {/* Genre pill */}
        <span
          className="inline-block rounded-full mb-3"
          style={{
            background: 'var(--color-cream-dark)',
            color: 'var(--color-brown)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.02em',
            padding: '3px 10px',
          }}
        >
          {genre}
        </span>

        <h3
          className="font-bold leading-snug mb-2"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            color: 'var(--color-ink)',
          }}
        >
          {name}
        </h3>

        <p
          className="leading-relaxed mb-4"
          style={{ fontSize: '14px', color: 'var(--color-brown)' }}
        >
          {description}
        </p>

        <a
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          style={{ color: 'var(--color-gold)' }}
        >
          Mehr erfahren
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}
