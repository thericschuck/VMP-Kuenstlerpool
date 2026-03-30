import Image from 'next/image'
import ScrollIndicator from '@/components/ScrollIndicator'
import SiteFooter from '@/components/SiteFooter'
import BandCard from '@/components/BandCard'
import ContactForm from '@/components/ContactForm'
import VinylRecord from '@/components/VinylRecord'
import BandScroller from '@/components/BandScroller'
import GalleryGrid from '@/components/GalleryGrid'

// ── Static data ───────────────────────────────────────────────────


const EASY_LISTENING_BANDS = [
  {
    name: 'Bobby & Friends',
    genre: 'Jazz · Acoustic Pop',
    description: 'Elegante Loungemusik mit Jazz-Einflüssen – ideal für Empfänge, Firmenevents und private Feiern.',
    href: '/bobby-and-friends',
    image: '/images/bobby-and-friends.avif',
  },
  {
    name: 'Marsch Mellows',
    genre: 'Walkact · Empfangsmusik',
    description: 'Mobiler Walkact für Empfänge und Events – überraschend, charmant und ganz ohne Bühne.',
    href: '/marsch-mellows',
    image: '/images/marsch-mellows.avif',
  },
]

const PARTY_BANDS = [
  {
    name: 'Groove Control',
    genre: 'Soul · Pop · Rock',
    description: 'Die Allround-Partyband für Unternehmens-Events, Stadtfeste und Hochzeiten.',
    href: '/groove-control',
    image: '/images/groove-control.avif',
  },
  {
    name: 'Spirit of Soul',
    genre: 'Black Music',
    description: 'Authentischer Soul, R&B und Funk – eine Bühnenshow, die niemanden auf dem Stuhl lässt.',
    href: '/spirit-of-soul',
    image: '/images/spirit-of-soul.avif',
  },
  {
    name: 'Time Warp',
    genre: '5 Jahrzehnte Hits',
    description: 'Von den 60ern bis heute – eine musikalische Zeitreise durch die Geschichte der Popmusik.',
    href: '/time-warp',
    image: '/images/time-warp.avif',
  },
  {
    name: 'BOBbastic',
    genre: 'Power Rock Trio',
    description: 'Drei Musiker, maximale Energie – klassischer Rock in konzentriertester Form.',
    href: '/bobbastic',
    image: '/images/bobbastic.avif',
  },
]

const TRIBUTE_BANDS = [
  {
    name: 'The Kiss Tribute Band',
    genre: 'Rock Tribute',
    description: "Deutschlands erfolgreichste Kiss-Tribute-Show – mit originalgetreuem Make-up, Kostümen und feuriger Pyroshow.",
    href: '/kiss-tribute',
    image: '/images/KissTribute.avif',
  },
  {
    name: 'CoverSnake',
    genre: 'Rock Tribute',
    description: 'A Tribute to Whitesnake – Decades of the Snake. Six Profimusiker, authentischer Hard Rock der 80er.',
    href: '/coversnake',
    image: '/images/coversnake.avif',
  },
  {
    name: 'The Adams Family',
    genre: 'Rock Tribute',
    description: "A Tribute to Bryan Adams – Summer of '69, Run to You und mehr, inklusive Unplugged-Set.",
    href: '/adams-family',
    image: '/images/adams-family.avif',
  },
  {
    name: 'Sir Williams',
    genre: 'Pop Tribute',
    description: 'Angels, Feel, Let Me Entertain You – über zwei Stunden Robbie Williams Tribute Show.',
    href: '/sir-williams',
    image: '/images/sir-williams.avif',
  },
]


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
        aria-labelledby="hero-heading"
        style={{
          position: 'relative',
          overflow: 'visible',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: [
            'radial-gradient(ellipse 55% 70% at 88% 75%, rgba(184,148,60,0.18) 0%, rgba(184,148,60,0.08) 30%, rgba(247,243,237,0) 65%)',
            'var(--color-cream)',
          ].join(', '),
        }}
      >
        {/* ── Vinyl Record – overflows into Easy Listening ── */}
        <div className="vinyl-hero" aria-hidden="true">
          <VinylRecord />
        </div>

        {/* ══ Block 1: Branding Header ══════════════════════════════ */}
        <div
          style={{
            textAlign: 'center',
            paddingTop: '72px',
            paddingBottom: '36px',
            borderBottom: '1px solid var(--color-cream-dark)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
            marginBottom: '10px',
          }}>
            Vivid Music Productions
          </p>
          <h1
            id="hero-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 700,
              color: 'var(--color-ink)',
              marginBottom: '10px',
            }}
          >
            VMP – Künstlerpool
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--color-brown)',
            fontStyle: 'italic',
          }}>
            Seit 20 Jahren Livemusik auf höchstem Niveau
          </p>
        </div>

        {/* ══ Block 2: Direktkontakt – zweispaltig ═════════════════ */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            zIndex: 12, /* above vinyl (z-index:10) so photos aren't covered */
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

              {/* Left column – 40% */}
              <div className="w-full lg:w-[40%] flex-shrink-0">
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(24px, 3.5vw, 36px)',
                    fontWeight: 700,
                    color: 'var(--color-ink)',
                    lineHeight: 1.25,
                    marginBottom: '16px',
                  }}
                >
                  Ihr Künstler<br />Direktkontakt
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'var(--color-brown)',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                  maxWidth: '420px',
                }}>
                  Top Livemusik aus Frankfurt am Main für Ihren Event,
                  Ihre Firmenfeier, Ihre Hochzeit oder Ihr Stadtfest.
                  Im VMP-Künstlerpool organisieren sich Profimusiker in Eigenregie.
                </p>

                {/* Phone */}
                <a
                  href="tel:+4960787595868"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    color: 'var(--color-gold)',
                    marginBottom: '28px',
                    textDecoration: 'none',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                  </svg>
                  +49 6078 759568
                </a>

                {/* CTA */}
                <a
                  href="#kontakt"
                  className="inline-block transition-all duration-200 hover:brightness-110 hover:shadow-lg active:scale-95"
                  style={{
                    padding: '12px 32px',
                    borderRadius: '999px',
                    background: 'var(--color-gold)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  Jetzt anfragen
                </a>
              </div>

              {/* Right column – event photo + Bobby portrait overlay */}
              <div className="w-full lg:w-[55%]">
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    height: 'clamp(240px, 28vw, 400px)',
                    boxShadow: '0 12px 48px rgba(26,20,16,0.15)',
                  }}
                >
                  {/* Main event/atmosphere photo */}
                  <Image
                    src="/images/hero-event.avif"
                    alt="VMP Live Event"
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 1024px) 92vw, 55vw"
                  />

                  {/* Left-edge gradient for portrait badge readability */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, rgba(26,20,16,0.55) 0%, transparent 52%)' }}
                    aria-hidden="true"
                  />

                  {/* Bobby portrait + name badge */}
                  <div className="absolute bottom-5 left-5 flex items-end gap-3">
                    <div style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid rgba(184,148,60,0.9)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                      flexShrink: 0,
                      position: 'relative',
                    }}>
                      <Image
                        src="/images/bobby-profile.avif"
                        alt="Bobby Stöcker"
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="72px"
                      />
                    </div>
                    <div>
                      <p style={{
                        color: '#ffffff',
                        fontFamily: 'var(--font-display)',
                        fontSize: '13px',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        textShadow: '0 1px 6px rgba(0,0,0,0.7)',
                      }}>
                        Bobby Stöcker
                      </p>
                      <p style={{
                        color: '#c8b88a',
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        textShadow: '0 1px 6px rgba(0,0,0,0.7)',
                      }}>
                        Gründer & Musikalischer Leiter
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ══ Block 3: Gradient-Übergang + Scroll-Indicator ════════ */}
        <div style={{
          height: '80px',
          background: 'linear-gradient(to bottom, var(--color-cream) 0%, #ffffff 100%)',
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
        }}>
          <ScrollIndicator />
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════
          Eventarten — Die richtige Band für Ihren Event
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="eventarten"
        style={{ background: '#ffffff', paddingTop: '100px', paddingBottom: 0 }}
        aria-labelledby="heading-eventarten"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Heading + gold divider */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              id="heading-eventarten"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                color: 'var(--color-ink)',
                marginBottom: '20px',
                lineHeight: 1.25,
              }}
            >
              Die richtige Musik &amp; Band<br className="hidden sm:block" /> für Ihren Event finden
            </h2>
            <div style={{ width: '60px', height: '2px', background: 'var(--color-gold)', margin: '0 auto' }} />
          </div>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">

            {/* Card 1 – Hochzeiten */}
            <div className="group">
              <div style={{ aspectRatio: '4/3', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
                <Image
                  src="/images/hochzeit.avif"
                  alt="Hochzeitsband"
                  fill
                  className="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 90vw, 30vw"
                />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '10px' }}>
                Hochzeitsbands
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-brown)', lineHeight: 1.7, marginBottom: '16px' }}>
                Von der romantischen Trauung bis zur ausgelassenen Tanzfläche –
                wir finden die perfekte Band für Ihren großen Tag.
              </p>
              <a
                href="#easy-listening"
                className="event-card-link"
                style={{ color: 'var(--color-gold)', fontSize: '13px', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                Bands entdecken <span className="event-card-arrow">→</span>
              </a>
            </div>

            {/* Card 2 – Firmenevents & Galas */}
            <div className="group">
              <div style={{ aspectRatio: '4/3', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
                <Image
                  src="/images/firmenevents.avif"
                  alt="Firmenevents & Galas"
                  fill
                  className="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 90vw, 30vw"
                />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '10px' }}>
                Firmenevents &amp; Galas
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-brown)', lineHeight: 1.7, marginBottom: '16px' }}>
                Bereits gebucht von Audi, Daimler und der Deutschen Bank –
                Entertainment auf höchstem Niveau für exklusive Anlässe.
              </p>
              <a
                href="#partybands"
                className="event-card-link"
                style={{ color: 'var(--color-gold)', fontSize: '13px', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                Bands entdecken <span className="event-card-arrow">→</span>
              </a>
            </div>

            {/* Card 3 – Stadtfeste & Festivals */}
            <div className="group">
              <div style={{ aspectRatio: '4/3', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
                <Image
                  src="/images/stadtfeste.avif"
                  alt="Stadtfeste & Festivals"
                  fill
                  className="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 90vw, 30vw"
                />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '10px' }}>
                Stadtfeste &amp; Festivals
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-brown)', lineHeight: 1.7, marginBottom: '16px' }}>
                Tribute-Acts und Partybands für große Open-Air-Events –
                europaweit gebucht, mit professioneller Bühnentechnik.
              </p>
              <a
                href="#tribute-bands"
                className="event-card-link"
                style={{ color: 'var(--color-gold)', fontSize: '13px', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                Bands entdecken <span className="event-card-arrow">→</span>
              </a>
            </div>

          </div>

          {/* Auch gebucht für – tag chips */}
          <div style={{ marginTop: '48px', paddingBottom: '60px' }}>
          <p style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '11px',
            fontWeight:    600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color:         'var(--color-brown)',
            marginBottom:  '14px',
            opacity:       0.7,
          }}>
            Auch gebucht für:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Empfänge', 'Walkacts', 'Wohnzimmerkonzerte', 'Geburtstage', 'Jubiläen', 'Messen & Ausstellungen'].map((tag) => (
              <span
                key={tag}
                style={{
                  display:      'inline-block',
                  padding:      '5px 14px',
                  borderRadius: '999px',
                  fontSize:     '13px',
                  fontFamily:   'var(--font-body)',
                  color:        'var(--color-gold)',
                  background:   'var(--color-cream)',
                  border:       '1px solid var(--color-cream-dark)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          </div>

        </div>

        {/* Gradient transition → cream for Easy Listening */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #ffffff 0%, #f7f3ed 100%)' }} />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Easy Listening — white bg
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="easy-listening"
        className="relative pb-[60px] lg:pb-[100px]"
        style={{
          background: '#ffffff',
          zIndex: 5,
          paddingTop: '180px',
        }}
        aria-labelledby="heading-easy-listening"
      >
        {/* Decorative note */}
        <span aria-hidden="true" className="floating-note absolute pointer-events-none select-none hidden md:block"
          style={{ top: '18%', right: '7%', fontSize: '26px', color: 'var(--color-gold)', opacity: 0, animation: 'floatUp 9s 0.5s ease-in-out infinite', willChange: 'transform, opacity' }}>♩</span>

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading
            id="heading-easy-listening"
            title="Easy Listening"
            intro="Intime Konzerte für besondere Anlässe – vom Wohnzimmer bis zur Gala."
          />
          <BandScroller>
            {EASY_LISTENING_BANDS.map((band) => (
              <BandCard key={band.name} {...band} />
            ))}
          </BandScroller>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Partybands — cream bg
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="partybands"
        className="relative py-[60px] lg:py-[100px]"
        style={{ background: 'var(--color-cream)' }}
        aria-labelledby="heading-partybands"
      >
        {/* Decorative notes */}
        <span aria-hidden="true" className="floating-note absolute pointer-events-none select-none hidden md:block"
          style={{ top: '30%', left: '4%', fontSize: '20px', color: 'var(--color-gold)', opacity: 0, animation: 'floatUp 7s 2s ease-in-out infinite', willChange: 'transform, opacity' }}>♪</span>
        <span aria-hidden="true" className="floating-note absolute pointer-events-none select-none hidden md:block"
          style={{ bottom: '20%', right: '5%', fontSize: '30px', color: 'var(--color-gold)', opacity: 0, animation: 'floatUp 10s 0s ease-in-out infinite', willChange: 'transform, opacity' }}>♫</span>

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading
            id="heading-partybands"
            title="Partybands"
            intro="Von Soul bis Power Rock – Partybands für jeden Anlass und jede Bühne."
          />
          <BandScroller>
            {PARTY_BANDS.map((band) => (
              <BandCard key={band.name} {...band} />
            ))}
          </BandScroller>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Tribute Bands — white bg
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="tribute-bands"
        className="relative bg-white py-[60px] lg:py-[100px]"
        aria-labelledby="heading-tribute"
      >
        {/* Decorative note */}
        <span aria-hidden="true" className="floating-note absolute pointer-events-none select-none hidden md:block"
          style={{ top: '40%', right: '6%', fontSize: '22px', color: 'var(--color-gold)', opacity: 0, animation: 'floatUp 8s 3s ease-in-out infinite', willChange: 'transform, opacity' }}>♩</span>

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading
            id="heading-tribute"
            title="Tribute Bands"
            intro="Die Lieblingsband als Live-Erlebnis – authentisch, mitreißend und mit Leidenschaft."
          />
          <BandScroller>
            {TRIBUTE_BANDS.map((band) => (
              <BandCard key={band.name} {...band} />
            ))}
          </BandScroller>
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

          <GalleryGrid />

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
          Technik & Tonstudio
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="studio"
        style={{ background: '#f0ece4', padding: '100px 0' }}
        aria-labelledby="heading-studio"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Section heading */}
          <h2
            id="heading-studio"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,40px)', color: 'var(--color-ink)', marginBottom: '8px' }}
          >
            Technik &amp; Tonstudio
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--color-brown)', fontStyle: 'italic', marginBottom: '60px' }}>
            Vollservice aus einer Hand – seit 20 Jahren.
          </p>

          {/* ── Block 1: Veranstaltungsservice ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[50px] items-center">

            {/* Left: photos */}
            <div>
              <div style={{ aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', marginBottom: '10px', position: 'relative' }}>
                <Image src="/images/veranstaltungsservice.avif" alt="Veranstaltungsservice" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 90vw, 45vw" />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['/images/technik-1.avif', '/images/technik-2.avif'].map((src, i) => (
                  <div key={i} style={{ flex: 1, aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                    <Image src={src} alt={`Event-Foto ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="15vw" />
                  </div>
                ))}
                <div style={{ flex: 1, aspectRatio: '1/1', borderRadius: '8px', background: 'rgba(61,47,26,0.3)' }} aria-label="Weiteres Foto – folgt in Kürze" />
              </div>
            </div>

            {/* Right: text */}
            <div>
              <p style={{ fontSize: '11px', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: '12px' }}>
                Veranstaltungsservice
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.5vw,26px)', color: 'var(--color-ink)', lineHeight: 1.25, marginBottom: '16px' }}>
                Bühne, Licht &amp; Beschallung aus einer Hand
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-brown)', lineHeight: 1.8, marginBottom: '20px' }}>
                Sie möchten eine Band buchen und haben noch keine Bühne, Licht und keine Beschallung für Ihre
                Gäste? Wir verstehen uns als Volldienstleister in allen Bereichen rund um Ihre Veranstaltung.
                Wir bieten attraktive Komplettpakete mit Band, Beschallung, Licht und Bühne – realisiert von
                erfahrenen Veranstaltungsmeistern und -technikern.
              </p>
              <a href="#kontakt" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                Jetzt anfragen →
              </a>
            </div>
          </div>

          {/* ── Block 2: Musikproduktion ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[50px] items-center" style={{ marginTop: '70px' }}>

            {/* Left: text */}
            <div>
              <p style={{ fontSize: '11px', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: '12px' }}>
                Musikproduktion
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.5vw,26px)', color: 'var(--color-ink)', lineHeight: 1.25, marginBottom: '16px' }}>
                Werbejingles, Demos &amp; Auftragsproduktionen
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-brown)', lineHeight: 1.8, marginBottom: '20px' }}>
                Seit 20 Jahren produzieren wir Songs für Verlage, Werbeagenturen und andere Künstler.
                Musik für TV-Werbejingles wie Cliff Duschgel, Focus Kontaktlinsen u.v.m.
                Fordern Sie Demos an oder vereinbaren Sie einen Termin.
              </p>
              <a href="#kontakt" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                Demo anfragen →
              </a>
            </div>

            {/* Right: studio photo placeholder */}
            {/* TODO: Echtes Foto einsetzen: Mischpult/Studio */}
            <div style={{ aspectRatio: '16/9', borderRadius: '12px', background: 'linear-gradient(135deg, #1a1410, #3d2f1a)' }}
              aria-label="Foto Tonstudio – folgt in Kürze" />
          </div>

          {/* ── Block 3: Songwriting – dunkler Block ── */}
          <div
            style={{
              marginTop:    '70px',
              background:   '#1a1410',
              borderRadius: '16px',
              padding:      'clamp(32px,5vw,50px)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[50px]">

              {/* Left: text + highlight box */}
              <div>
                <p style={{ fontSize: '11px', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: '12px' }}>
                  Songwriting &amp; Arrangements
                </p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.5vw,26px)', color: '#ffffff', lineHeight: 1.25, marginBottom: '16px' }}>
                  Songs für Verlage, Künstler &amp; Werbung
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#c8b88a', lineHeight: 1.8, marginBottom: '28px' }}>
                  Bobby Stöcker schreibt regelmäßig Songs von Pop &amp; Rock über Dance bis R&amp;B –
                  auch für andere Künstler.
                </p>

                {/* Gold highlight box */}
                <div style={{
                  background:   'rgba(139,105,20,0.15)',
                  border:       '1px solid #8b6914',
                  borderRadius: '10px',
                  padding:      '20px',
                }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '8px' }}>
                    🏆 Gold-Status
                  </p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: '#ffffff', fontWeight: 600, marginBottom: '6px' }}>
                    Melanie Thornton – Ready To Fly
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#c8b88a', lineHeight: 1.6, marginBottom: '10px' }}>
                    150.000 verkaufte Alben · Platz 3 der deutschen Album-Charts
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(200,184,138,0.7)' }}>
                    + Top 10 DJ-Charts mit Ayla Presents Yell
                  </p>
                </div>
              </div>

              {/* Right: photo placeholders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ aspectRatio: '4/3', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                  <Image src="/images/melanie-thornton.avif" alt="Melanie Thornton – Ready To Fly" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 90vw, 30vw" />
                </div>
                <div style={{ aspectRatio: '16/9', borderRadius: '10px', background: 'rgba(61,47,26,0.5)' }}
                  aria-label="Foto Songwriting – folgt in Kürze" />
              </div>

            </div>
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
                  href="mailto:info@v-m-p.de?subject=Bandanfrage%20VMP"
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

      <SiteFooter />

    </main>
  )
}
