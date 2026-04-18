import Image from 'next/image'

interface BandCardProps {
  name: string
  genre: string
  description: string
  href: string
  image?: string
}

export default function BandCard({ name, genre, description, href, image }: BandCardProps) {
  return (
    <article
      className="band-card rounded-xl overflow-hidden bg-white"
      style={{ border: '1px solid var(--color-cream-dark)', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Photo */}
      <div
        style={{ aspectRatio: '16 / 9', background: 'var(--color-cream-dark)', position: 'relative', overflow: 'hidden' }}
        role="img"
        aria-label={`Foto ${name}`}
      >
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 340px"
          />
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
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
          style={{ color: 'var(--color-gold)', marginTop: 'auto' }}
        >
          Mehr erfahren
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}
