import type { Metadata } from 'next'
import BandCard        from '@/components/BandCard'
import BandDescription from '@/components/BandDescription'
import SiteFooter      from '@/components/SiteFooter'

// ── Types ─────────────────────────────────────────────────────────

export interface Band {
  slug:          string
  name:          string
  category:      'easy-listening' | 'partyband' | 'tribute'
  categoryLabel: string
  categoryAnchor: string
  tagline:       string
  description:   string
  besetzung:     string
  spielzeit:     string
  geeignetFuer:  string[]
  repertoire:    string[]
  images:        string[]
  videos:        { url: string; title: string }[]
  news:          { date: string; headline: string }[]
}

// ── Static demo data (later replaced by Supabase) ─────────────────

const GROOVE_CONTROL: Band = {
  slug:          'groove-control',
  name:          'Groove Control',
  category:      'partyband',
  categoryLabel: 'Partyband',
  categoryAnchor: 'partybands',
  tagline:       'Soul, Pop & Rock für unvergessliche Nächte',
  description:   `Groove Control ist die Allround-Partyband aus der Rhein-Main-Region für Unternehmens-Events, Stadtfeste und Hochzeiten. Mit einem Repertoire, das von Classic Soul und Motown bis hin zu modernem Pop und Rock reicht, sorgen die sechs Profimusiker für eine Tanzfläche, die sich bis zum letzten Song kein einziges Mal leert.

Die Band besteht aus einem schlagkräftigen Rhythmus-Team, zwei Bläsern, einer charismatischen Frontfrau und einem Frontmann – eine Besetzung, die für den warmen, vollen Sound von Groove Control verantwortlich ist, der bereits Tausende von Gästen auf Firmenfeiern, Stadtfesten und privaten Feiern begeistert hat.

Groove Control ist bundesweit buchbar und bringt auf Wunsch das komplette Bühnentechnik-Equipment mit.`,
  besetzung:    '6-teilig (Vocals, Git, Bass, Keys, Drums, Bläser)',
  spielzeit:    '2 × 60 Min. + Option',
  geeignetFuer: ['Hochzeiten', 'Firmenfeiern', 'Stadtfeste', 'Galas'],
  repertoire:   ['Soul', 'Motown', 'Funk', 'Pop', 'Classic Rock', 'R&B', 'Disco', 'Aktuelle Hits'],
  images:       [],
  videos: [
    { url: '', title: 'Groove Control Live – Firmenfeier 2023' },
    { url: '', title: 'Stadtfest Frankfurt – Highlight-Reel' },
    { url: '', title: 'Hochzeit Wiesbaden – First Dance' },
  ],
  news: [
    { date: '15. Feb 2025', headline: 'Groove Control spielt auf dem Wiesbadener Stadtfest 2025' },
    { date: '03. Jan 2025', headline: 'Neues Programm: Jetzt auch mit Akustik-Set buchbar' },
    { date: '10. Nov 2024', headline: 'Ausverkaufte Firmenfeier-Saison – Termine 2025 jetzt buchen' },
  ],
}

const BANDS: Record<string, Band> = {
  'groove-control': GROOVE_CONTROL,
}

const RELATED_BANDS: Record<string, { name: string; genre: string; description: string; href: string }[]> = {
  partyband: [
    { name: 'Spirit of Soul', genre: 'Black Music',         description: 'Authentischer Soul, R&B und Funk – eine Bühnenshow, die niemanden auf dem Stuhl lässt.', href: '/spirit-of-soul' },
    { name: 'Time Warp',      genre: '5 Jahrzehnte Hits',   description: 'Von den 60ern bis heute – eine musikalische Zeitreise durch die Geschichte der Popmusik.',   href: '/time-warp'      },
    { name: 'BOBbastic',      genre: 'Power Rock Trio',     description: 'Drei Musiker, maximale Energie – klassischer Rock in konzentriertester Form.',                href: '/bobbastic'      },
  ],
  'easy-listening': [
    { name: 'Bobby & Friends', genre: 'Jazz · Acoustic Pop',    description: 'Elegante Loungemusik mit Jazz-Einflüssen – ideal für Empfänge, Firmenevents und private Feiern.', href: '/bobby-and-friends' },
    { name: 'Marsch Mellows',  genre: 'Walkact · Empfangsmusik', description: 'Mobiler Walkact für Empfänge und Events – überraschend, charmant und ganz ohne Bühne.',            href: '/marsch-mellows'   },
  ],
  tribute: [
    { name: 'Bryan Adams Tribute',   genre: 'Rock Tribute', description: "Summer of '69, Heaven – die größten Hits des kanadischen Superstars live und authentisch.", href: '/bryan-adams-tribute'   },
    { name: 'Whitesnake Tribute',    genre: 'Rock Tribute', description: 'Here I Go Again – die Hitparade der britischen Hardrock-Legende kompromisslos vorgetragen.',  href: '/whitesnake-tribute'   },
    { name: 'Thin Lizzy Tribute',    genre: 'Rock Tribute', description: 'The Boys Are Back In Town – Klassiker der Dubliner Rocklegenden live und laut.',               href: '/thin-lizzy-tribute'   },
  ],
}

// ── Helpers ───────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize:      '9px',
      color:         'var(--color-gold)',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      fontWeight:    600,
      marginBottom:  '14px',
      fontFamily:    'var(--font-body)',
    }}>
      {children}
    </p>
  )
}

function VideoPlaceholder({ title, large = false }: { title: string; large?: boolean }) {
  return (
    <div style={{
      aspectRatio:  '16/9',
      background:   '#1a1410',
      borderRadius: large ? '10px' : '8px',
      position:     'relative',
      overflow:     'hidden',
      cursor:       'pointer',
    }}>
      {/* Play button */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width:          large ? '52px' : '38px',
          height:         large ? '52px' : '38px',
          borderRadius:   '50%',
          background:     'rgba(139,105,20,0.85)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}>
          <svg viewBox="0 0 24 24" fill="white"
            width={large ? 20 : 14} height={large ? 20 : 14}
            aria-hidden="true"
          >
            <polygon points="6,4 20,12 6,20" />
          </svg>
        </div>
      </div>
      {/* Title */}
      <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
        <span style={{ color: '#c8b88a', fontSize: large ? '12px' : '10px', fontFamily: 'var(--font-body)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {title}
        </span>
      </div>
    </div>
  )
}

// ── Metadata ─────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const band = BANDS[slug] ?? GROOVE_CONTROL
  return {
    title:       `${band.name} – Vivid Music Productions`,
    description: band.tagline,
  }
}

// ── Page ──────────────────────────────────────────────────────────

export default async function BandPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const band     = BANDS[slug] ?? GROOVE_CONTROL
  const related  = RELATED_BANDS[band.category] ?? []

  const mailtoHref = `mailto:info@vividmusicproductions.de?subject=Bandanfrage%3A%20${encodeURIComponent(band.name)}&body=Band%3A%20${encodeURIComponent(band.name)}%0AVeranstaltung%3A%20%0ADatum%3A%20%0AOrt%3A%20`
  const whatsappHref = `https://wa.me/4960787595868?text=${encodeURIComponent(`Hallo, ich interessiere mich für ${band.name}.`)}`

  const infoItems = [
    { label: 'Besetzung',    value: band.besetzung },
    { label: 'Spielzeit',    value: band.spielzeit },
    { label: 'Geeignet für', value: band.geeignetFuer.join(' · ') },
    { label: 'Region',       value: 'Rhein-Main, bundesweit' },
  ]

  return (
    <>
      {/* ── Band Hero ──────────────────────────────────────────── */}
      <section
        style={{
          position:   'relative',
          height:     '420px',
          background: 'linear-gradient(135deg, #2a1f14, #1a1410)',
          overflow:   'hidden',
        }}
        aria-label={`${band.name} Hero`}
      >
        {/* Dark overlay */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(26,20,16,0.85) 0%, transparent 60%)',
          zIndex:     1,
        }} aria-hidden="true" />

        {/* Back link */}
        <div style={{ position: 'absolute', top: '76px', left: '24px', zIndex: 10 }}>
          <a
            href={`/#${band.categoryAnchor}`}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '6px',
              color:          '#c8b88a',
              fontSize:       '13px',
              textDecoration: 'none',
              fontFamily:     'var(--font-body)',
              opacity:        0.9,
            }}
          >
            ← Zurück zu {band.categoryLabel}
          </a>
        </div>

        {/* Bottom-left: category + name + tagline */}
        <div style={{
          position: 'absolute',
          bottom:   '32px',
          left:     '32px',
          right:    '180px',
          zIndex:   2,
        }}>
          <span style={{
            display:      'inline-block',
            background:   '#8b6914',
            color:        '#ffffff',
            fontSize:     '11px',
            fontWeight:   600,
            padding:      '4px 14px',
            borderRadius: '30px',
            fontFamily:   'var(--font-body)',
            letterSpacing:'0.06em',
            marginBottom: '12px',
          }}>
            {band.categoryLabel}
          </span>
          <h1 style={{
            fontFamily:  'var(--font-display)',
            fontSize:    'clamp(32px, 5vw, 44px)',
            fontWeight:  700,
            color:       '#ffffff',
            lineHeight:  1.1,
            marginBottom:'8px',
          }}>
            {band.name}
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '16px',
            color:      '#c8b88a',
            fontStyle:  'italic',
          }}>
            {band.tagline}
          </p>
        </div>

        {/* Bottom-right: CTA */}
        <div style={{ position: 'absolute', bottom: '32px', right: '32px', zIndex: 2 }}>
          <a
            href="#anfrage"
            style={{
              display:      'inline-block',
              background:   '#8b6914',
              color:        '#ffffff',
              padding:      '12px 28px',
              borderRadius: '30px',
              fontSize:     '14px',
              fontWeight:   500,
              fontFamily:   'var(--font-body)',
              textDecoration: 'none',
            }}
          >
            Jetzt anfragen
          </a>
        </div>
      </section>

      {/* ── Info Bar ───────────────────────────────────────────── */}
      <div
        style={{ background: '#1a1410', padding: '0' }}
        aria-label="Band-Informationen"
      >
        <div
          className="max-w-7xl mx-auto"
          style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
        >
          <div style={{
            display:        'flex',
            alignItems:     'center',
            gap:            '0',
            padding:        '0 32px',
            minWidth:       'max-content',
          }}>
            {infoItems.map((item, i) => (
              <div
                key={item.label}
                style={{
                  padding:     '18px 32px 18px 0',
                  marginRight: i < infoItems.length - 1 ? '32px' : 'auto',
                  borderRight: i < infoItems.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  paddingRight:i < infoItems.length - 1 ? '32px' : '0',
                  flexShrink:  0,
                }}
              >
                <p style={{ fontSize: '9px', color: '#8b6914', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>
                  {item.label}
                </p>
                <p style={{ fontSize: '14px', color: '#ffffff', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content Grid ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto" style={{ padding: '60px 32px' }}>
        {/* lg: two-column grid; mobile: single column, sidebar below content */}
        <div className="lg:grid" style={{ gap: '50px', gridTemplateColumns: '1fr 360px' }}>

          {/* ── Left column ── */}
          <div>

            {/* A) Photo grid */}
            <div style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows:    '220px 140px',
              gap:                 '10px',
              marginBottom:        '48px',
            }}>
              {/* Large portrait */}
              <div style={{
                gridRow:      '1 / 3',
                borderRadius: '10px',
                overflow:     'hidden',
                background:   'var(--color-cream-dark)',
              }} aria-label="Band-Foto 1" />
              {/* Second photo */}
              <div style={{
                borderRadius: '10px',
                overflow:     'hidden',
                background:   'var(--color-cream-dark)',
              }} aria-label="Band-Foto 2" />
              {/* +X Fotos */}
              <div
                role="button"
                tabIndex={0}
                aria-label="Alle Fotos anzeigen"
                style={{
                  borderRadius:   '10px',
                  overflow:       'hidden',
                  background:     '#1a1410',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  cursor:         'pointer',
                }}
              >
                <span style={{ color: '#ffffff', fontSize: '16px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  +12 Fotos
                </span>
              </div>
            </div>

            {/* B) Über die Band */}
            <div style={{ marginBottom: '40px' }}>
              <SectionLabel>Über die Band</SectionLabel>
              <BandDescription text={band.description} />
            </div>

            {/* C) Repertoire */}
            <div>
              <SectionLabel>Repertoire</SectionLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {band.repertoire.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background:   '#f0ece4',
                      border:       '1px solid #e8dfc8',
                      padding:      '5px 14px',
                      borderRadius: '20px',
                      fontSize:     '12px',
                      fontFamily:   'var(--font-body)',
                      color:        'var(--color-brown)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right Sidebar ── */}
          <div style={{ marginTop: '0' }} className="mt-12 lg:mt-0">

            {/* A) Videos */}
            <div style={{ marginBottom: '32px' }}>
              <SectionLabel>Videos</SectionLabel>
              <div style={{ marginBottom: '8px' }}>
                <VideoPlaceholder title={band.videos[0]?.title ?? ''} large />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <VideoPlaceholder title={band.videos[1]?.title ?? ''} />
                <VideoPlaceholder title={band.videos[2]?.title ?? ''} />
              </div>
            </div>

            {/* B) Anfrage-Box */}
            <div
              id="anfrage"
              style={{
                background:   '#1a1410',
                borderRadius: '14px',
                padding:      '28px',
                marginBottom: '20px',
              }}
            >
              <h2 style={{
                fontFamily:   'var(--font-display)',
                fontSize:     '18px',
                color:        '#ffffff',
                fontWeight:   700,
                marginBottom: '6px',
              }}>
                Band anfragen
              </h2>
              <p style={{
                fontFamily:   'var(--font-body)',
                fontSize:     '12px',
                color:        '#8b6914',
                marginBottom: '20px',
              }}>
                Direktkontakt – kein Mittelmann, kein Aufpreis.
              </p>
              <a
                href="tel:+4960787595868"
                style={{
                  display:        'block',
                  fontFamily:     'var(--font-display)',
                  fontSize:       '22px',
                  color:          '#c8b88a',
                  fontWeight:     700,
                  marginBottom:   '24px',
                  textDecoration: 'none',
                }}
              >
                📞 06078 – 759568
              </a>
              <a
                href={mailtoHref}
                style={{
                  display:        'block',
                  background:     '#8b6914',
                  color:          '#ffffff',
                  borderRadius:   '8px',
                  padding:        '12px',
                  textAlign:      'center',
                  textDecoration: 'none',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '14px',
                  fontWeight:     500,
                  marginBottom:   '10px',
                }}
              >
                Per E-Mail anfragen
              </a>
              <a
                href={whatsappHref}
                style={{
                  display:        'block',
                  border:         '1px solid #8b6914',
                  color:          '#c8b88a',
                  borderRadius:   '8px',
                  padding:        '12px',
                  textAlign:      'center',
                  textDecoration: 'none',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '14px',
                }}
              >
                WhatsApp
              </a>
            </div>

            {/* C) Aktuelles */}
            <div style={{
              background:   '#ffffff',
              border:       '1px solid #e8dfc8',
              borderRadius: '10px',
              padding:      '18px',
            }}>
              <SectionLabel>Aktuelles</SectionLabel>
              <div>
                {band.news.map((item, i) => (
                  <div key={i}>
                    {i > 0 && (
                      <div style={{ height: '1px', background: '#e8dfc8', margin: '12px 0' }} />
                    )}
                    <p style={{ fontSize: '9px', color: '#8b6914', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', marginBottom: '4px' }}>
                      {item.date}
                    </p>
                    <p style={{ fontSize: '12px', color: '#1a1410', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                      {item.headline}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Weitere Bands ──────────────────────────────────────── */}
      {related.length > 0 && (
        <section
          style={{ background: '#f0ece4', padding: '50px 32px' }}
          aria-labelledby="heading-related"
        >
          <div className="max-w-7xl mx-auto">
            <h2
              id="heading-related"
              style={{
                fontFamily:   'var(--font-display)',
                fontSize:     'clamp(20px, 3vw, 26px)',
                color:        'var(--color-ink)',
                marginBottom: '32px',
              }}
            >
              Weitere Bands aus dieser Kategorie
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((b) => (
                <BandCard key={b.name} {...b} />
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  )
}
