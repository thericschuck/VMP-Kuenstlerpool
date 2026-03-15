import ScrollIndicator      from '@/components/ScrollIndicator'
import BandCard             from '@/components/BandCard'
import ContactForm          from '@/components/ContactForm'
import VinylRecord          from '@/components/VinylRecord'
import FloatingNotes        from '@/components/FloatingNotes'
import RevealCards          from '@/components/RevealCards'
import CountUp              from '@/components/CountUp'

// ── Static data ───────────────────────────────────────────────────

const REFERENCE_CLIENTS = [
  'Audi', 'Daimler', 'Deutsche Bank', 'Porsche', 'VW', 'Bridgestone',
] as const

const EASY_LISTENING_BANDS = [
  {
    name: 'Bobby & Friends',
    genre: 'Jazz · Acoustic Pop',
    description: 'Elegante Loungemusik mit Jazz-Einflüssen – ideal für Empfänge, Firmenevents und private Feiern.',
    href: '/bobby-and-friends',
  },
  {
    name: 'Marsch Mellows',
    genre: 'Walkact · Empfangsmusik',
    description: 'Mobiler Walkact für Empfänge und Events – überraschend, charmant und ganz ohne Bühne.',
    href: '/marsch-mellows',
  },
] as const

const PARTY_BANDS = [
  {
    name: 'Groove Control',
    genre: 'Soul · Pop · Rock',
    description: 'Die Allround-Partyband für Unternehmens-Events, Stadtfeste und Hochzeiten.',
    href: '/groove-control',
  },
  {
    name: 'Spirit of Soul',
    genre: 'Black Music',
    description: 'Authentischer Soul, R&B und Funk – eine Bühnenshow, die niemanden auf dem Stuhl lässt.',
    href: '/spirit-of-soul',
  },
  {
    name: 'Time Warp',
    genre: '5 Jahrzehnte Hits',
    description: 'Von den 60ern bis heute – eine musikalische Zeitreise durch die Geschichte der Popmusik.',
    href: '/time-warp',
  },
  {
    name: 'BOBbastic',
    genre: 'Power Rock Trio',
    description: 'Drei Musiker, maximale Energie – klassischer Rock in konzentriertester Form.',
    href: '/bobbastic',
  },
] as const

const TRIBUTE_BANDS = [
  {
    name: 'Bryan Adams Tribute',
    genre: 'Rock Tribute',
    description: "Summer of '69, Heaven – die größten Hits des kanadischen Superstars live und authentisch.",
    href: '/bryan-adams-tribute',
  },
  {
    name: 'Whitesnake Tribute',
    genre: 'Rock Tribute',
    description: 'Here I Go Again – die Hitparade der britischen Hardrock-Legende kompromisslos vorgetragen.',
    href: '/whitesnake-tribute',
  },
  {
    name: 'Thin Lizzy Tribute',
    genre: 'Rock Tribute',
    description: 'The Boys Are Back In Town – Klassiker der Dubliner Rocklegenden live und laut.',
    href: '/thin-lizzy-tribute',
  },
  {
    name: 'Robbie Williams Tribute',
    genre: 'Pop Tribute',
    description: 'Angels, Feel, Let Me Entertain You – Robbies größte Hits mit echtem Showfaktor.',
    href: '/robbie-williams-tribute',
  },
] as const

const GALLERY_PHOTOS = [
  { ratio: '4 / 3' },
  { ratio: '1 / 1' },
  { ratio: '16 / 9' },
  { ratio: '1 / 1' },
  { ratio: '4 / 3' },
  { ratio: '16 / 9' },
] as const

const NEWS_ITEMS = [
  {
    date: '15. Februar 2025',
    title: 'VMP auf der Musikmesse Frankfurt',
    excerpt:
      'Am Stand C12 in Halle 5 können alle Bands live erlebt und erste Termine für 2025 gesichert werden.',
    href: '#',
  },
  {
    date: '03. Januar 2025',
    title: 'Bobby & Friends: Neues Set für 2025',
    excerpt:
      'Die Akustik-Combo präsentiert ein frisch überarbeitetes Programm – von Jazz bis Acoustic Pop.',
    href: '#',
  },
  {
    date: '10. Dezember 2024',
    title: 'Rückblick: 200+ Events in 2024',
    excerpt:
      'Ein außergewöhnliches Jahr liegt hinter uns. Herzlichen Dank an alle Veranstalter und Gäste.',
    href: '#',
  },
] as const

const STUDIO_FEATURES = [
  {
    icon: '🎛',
    title: 'Veranstaltungsservice',
    text: 'Bühne, Licht, Beschallung aus einer Hand – wir kümmern uns um die komplette Veranstaltungstechnik.',
  },
  {
    icon: '🎵',
    title: 'Musikproduktion',
    text: 'Werbejingles, Demos, Auftragsproduktionen – professionell produziert im eigenen Studio.',
  },
  {
    icon: '✍️',
    title: 'Songwriting',
    text: 'Maßgeschneiderte Songs für Verlage, Werbeagenturen und Künstler.',
  },
] as const

// ── Shared sub-components ─────────────────────────────────────────

function SectionHeading({
  id,
  title,
  intro,
}: {
  id: string
  title: string
  intro?: string
}) {
  return (
    <header className="mb-10 lg:mb-14">
      <h2
        id={id}
        className="text-3xl lg:text-4xl font-bold mb-3"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
      >
        {title}
      </h2>
      {intro && (
        <p className="text-base lg:text-lg max-w-2xl" style={{ color: 'var(--color-brown)' }}>
          {intro}
        </p>
      )}
    </header>
  )
}

// ── Page ──────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main style={{ overflowX: 'hidden' }}>

      {/* ═══════════════════════════════════════════════════════════
          Hero
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center"
        aria-labelledby="hero-heading"
        style={{
          overflow:   'visible',
          background: 'radial-gradient(ellipse 55% 70% at 88% 75%, rgba(184,148,60,0.18) 0%, rgba(184,148,60,0.08) 30%, rgba(247,243,237,0) 65%)',
        }}
      >

        {/* ── Vinyl Record – overflows into Easy Listening ── */}
        <div className="vinyl-hero" aria-hidden="true">
          <VinylRecord />
        </div>

        {/* ── Text content ── */}
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-28" style={{ zIndex: 1 }}>
          <div className="max-w-xl lg:max-w-2xl">

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold leading-tight mb-5"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              Livemusik auf höchstem Niveau
            </h1>

            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--color-brown)' }}>
              Buchen Sie Ihre Wunschband direkt –{' '}
              ohne Umwege, ohne Aufpreis.
            </p>

            <div className="flex flex-col items-start gap-3 mb-8">
              <a
                href="#kontakt"
                className="inline-block px-8 py-3.5 rounded-full text-white font-medium text-base transition-all duration-200 hover:brightness-110 hover:shadow-lg active:scale-95"
                style={{ background: 'var(--color-gold)' }}
              >
                Jetzt anfragen
              </a>
              <p className="text-sm" style={{ color: 'var(--color-brown)' }}>
                ✓ Direktkontakt · Seit{' '}
                <CountUp target={20} />{' '}
                Jahren · <CountUp target={10} /> Bands
              </p>
            </div>

            <div>
              <p
                className="text-xs font-medium uppercase tracking-wider mb-3"
                style={{ color: 'var(--color-brown)' }}
              >
                Bereits gebucht von:
              </p>
              <div className="flex flex-wrap gap-2" aria-label="Referenzkunden">
                {REFERENCE_CLIENTS.map((name) => (
                  <span
                    key={name}
                    className="text-sm px-3.5 py-1 rounded-full font-medium border"
                    style={{
                      borderColor: 'var(--color-gold-light)',
                      color:       'var(--color-gold)',
                      background:  'var(--color-cream)',
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Easy Listening — white bg
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="easy-listening"
        className="relative pb-[60px] lg:pb-[100px]"
        style={{
          background:  '#ffffff',
          zIndex:      5,
          paddingTop:  '200px',
        }}
        aria-labelledby="heading-easy-listening"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading
            id="heading-easy-listening"
            title="Easy Listening"
            intro="Intime Konzerte für besondere Anlässe – vom Wohnzimmer bis zur Gala."
          />
          <RevealCards className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {EASY_LISTENING_BANDS.map((band) => (
              <BandCard key={band.name} {...band} />
            ))}
          </RevealCards>
        </div>
      </section>

      {/* ── Floating music notes – between EL and Partybands ── */}
      <FloatingNotes />

      {/* ═══════════════════════════════════════════════════════════
          Partybands — cream bg
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="partybands"
        className="py-[60px] lg:py-[100px]"
        style={{ background: 'var(--color-cream)' }}
        aria-labelledby="heading-partybands"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading
            id="heading-partybands"
            title="Partybands"
            intro="Von Soul bis Power Rock – Partybands für jeden Anlass und jede Bühne."
          />
          <RevealCards className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {PARTY_BANDS.map((band) => (
              <BandCard key={band.name} {...band} />
            ))}
          </RevealCards>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Tribute Bands — white bg
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="tribute-bands"
        className="bg-white py-[60px] lg:py-[100px]"
        aria-labelledby="heading-tribute"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading
            id="heading-tribute"
            title="Tribute Bands"
            intro="Die Lieblingsband als Live-Erlebnis – authentisch, mitreißend und mit Leidenschaft."
          />
          <RevealCards className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {TRIBUTE_BANDS.map((band) => (
              <BandCard key={band.name} {...band} />
            ))}
          </RevealCards>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Galerie — cream bg
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="galerie"
        className="py-[60px] lg:py-[100px]"
        style={{ background: 'var(--color-cream)' }}
        aria-labelledby="heading-galerie"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading id="heading-galerie" title="Eindrücke" />

          {/* Masonry photo grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {GALLERY_PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-4 rounded-xl overflow-hidden"
                style={{
                  aspectRatio: photo.ratio,
                  background: 'var(--color-cream-dark)',
                }}
                role="img"
                aria-label={`Galeriefoto ${i + 1} – folgt in Kürze`}
              />
            ))}
          </div>

          {/* Video placeholders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="relative rounded-xl overflow-hidden"
                style={{ aspectRatio: '16 / 9', background: 'var(--color-ink)' }}
                role="img"
                aria-label={`Videoclip ${n} – folgt in Kürze`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-white/20"
                    style={{
                      border: '2px solid rgba(255,255,255,0.6)',
                      background: 'rgba(255,255,255,0.08)',
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      width="24"
                      height="24"
                      style={{ marginLeft: '3px' }}
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          News — white bg
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="news"
        className="bg-white py-[60px] lg:py-[100px]"
        aria-labelledby="heading-news"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading id="heading-news" title="Aktuelles" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {NEWS_ITEMS.map((item) => (
              <article
                key={item.title}
                className="rounded-xl p-6 shadow-sm bg-white"
                style={{ border: '1px solid var(--color-cream-dark)' }}
              >
                <time
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: 'var(--color-brown)' }}
                  dateTime={item.date}
                >
                  {item.date}
                </time>
                <h3
                  className="font-bold text-lg mt-2 mb-2 leading-snug"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-ink)',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--color-brown)' }}
                >
                  {item.excerpt}
                </p>
                <a
                  href={item.href}
                  className="text-sm font-medium hover:underline"
                  style={{ color: 'var(--color-gold)' }}
                >
                  Weiterlesen →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Technik & Tonstudio — cream bg
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="studio"
        className="py-[60px] lg:py-[100px]"
        style={{ background: 'var(--color-cream)' }}
        aria-labelledby="heading-studio"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading id="heading-studio" title="Technik & Tonstudio" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {STUDIO_FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="rounded-xl p-8 text-center bg-white shadow-sm"
                style={{ border: '1px solid var(--color-cream-dark)' }}
              >
                <div className="text-4xl mb-4" aria-hidden="true">
                  {feat.icon}
                </div>
                <h3
                  className="font-bold text-xl mb-3"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-ink)',
                  }}
                >
                  {feat.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-brown)' }}
                >
                  {feat.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Kontakt — white bg
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="kontakt"
        className="bg-white py-[60px] lg:py-[100px]"
        aria-labelledby="heading-kontakt"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading
            id="heading-kontakt"
            title="Kontakt"
            intro="Sprechen Sie uns direkt an – ohne Vermittler, ohne Aufpreis."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: contact info */}
            <div>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-brown)' }}>
                <strong style={{ color: 'var(--color-ink)' }}>Vivid Music Productions</strong>
                <br />Bobby Stoker – Ihr persönlicher Ansprechpartner
                <br />für Bandanfragen, Verfügbarkeiten und Angebote.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                <a
                  href="tel:+4969123456789"
                  className="inline-flex items-center gap-3 text-base font-medium transition-colors duration-200"
                  style={{ color: 'var(--color-ink)' }}
                >
                  <span className="text-xl" aria-hidden="true">📞</span>
                  +49 (0) 69 123 456 789
                </a>

                <a
                  href="mailto:info@vividmusicproductions.de?subject=Bandanfrage%20VMP"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium text-sm transition-all duration-200 hover:brightness-110 hover:shadow-md"
                  style={{ background: 'var(--color-gold)', width: 'fit-content' }}
                >
                  <span aria-hidden="true">✉</span>
                  E-Mail schreiben
                </a>
              </div>

              <div
                className="pt-6 border-t"
                style={{ borderColor: 'var(--color-cream-dark)' }}
              >
                <ul className="flex flex-col gap-2">
                  {[
                    'Direktkontakt – keine Agenturgebühren',
                    'Antwort in der Regel innerhalb von 24 Stunden',
                    '20 Jahre Erfahrung im Veranstaltungsbereich',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: 'var(--color-brown)' }}
                    >
                      <span
                        className="mt-0.5 flex-shrink-0 font-bold"
                        style={{ color: 'var(--color-gold)' }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: form */}
            <ContactForm />

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Footer
      ═══════════════════════════════════════════════════════════ */}
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

    </main>
  )
}
