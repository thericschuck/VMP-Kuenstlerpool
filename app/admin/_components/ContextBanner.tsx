'use client'

import type { ReactNode } from 'react'

type PreviewType = 'hero' | 'gallery' | 'events' | 'pages' | 'band' | 'band-showcase' | 'band-hero' | 'band-gallery' | 'gallery-header'

const PREVIEWS: Record<PreviewType, ReactNode> = {
  hero: (
    <div style={{ display: 'flex', gap: 4, alignItems: 'stretch', height: 56 }}>
      {/* Slider mockup */}
      <div style={{ flex: 3, borderRadius: 4, backgroundColor: '#6B1414', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '60%', height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, marginBottom: 4 }} />
        <div style={{ position: 'absolute', bottom: 6, display: 'flex', gap: 3 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ width: i === 1 ? 12 : 5, height: 3, borderRadius: 2, backgroundColor: i === 1 ? '#fff' : 'rgba(255,255,255,0.35)' }} />
          ))}
        </div>
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', position: 'absolute', top: 6, left: 8 }}>SLIDER</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ flex: 1, borderRadius: 4, backgroundColor: '#F8E8D0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 8, color: '#888' }}>TEXT</span>
        </div>
        <div style={{ flex: 1, borderRadius: 4, backgroundColor: '#E8D8C8' }} />
      </div>
    </div>
  ),
  gallery: (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 3, height: 56 }}>
      <div style={{ gridRow: '1 / 3', borderRadius: 4, backgroundColor: '#6B1414', opacity: 0.7 }} />
      <div style={{ borderRadius: 4, backgroundColor: '#8B1A1A', opacity: 0.5 }} />
      <div style={{ borderRadius: 4, backgroundColor: '#A52020', opacity: 0.4 }} />
      <div style={{ borderRadius: 4, backgroundColor: '#D4C4B0' }} />
      <div style={{ borderRadius: 4, backgroundColor: '#E8D8C8' }} />
    </div>
  ),
  events: (
    <div style={{ display: 'flex', gap: 4, height: 56 }}>
      {['Firmen', 'Stadtfeste', 'Hochzeiten', 'Empfänge'].map((label, i) => (
        <div key={i} style={{
          flex: 1, borderRadius: 4,
          backgroundColor: i === 0 ? '#6B1414' : '#F8E8D0',
          border: i === 0 ? 'none' : '1px solid #E8D8C8',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          paddingBottom: 5, overflow: 'hidden', position: 'relative',
        }}>
          {i === 0 && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5))' }} />}
          <span style={{ fontSize: 7, color: i === 0 ? '#fff' : '#888', position: 'relative', textAlign: 'center', lineHeight: 1.2 }}>{label}</span>
        </div>
      ))}
    </div>
  ),
  pages: (
    <div style={{ display: 'flex', gap: 4, height: 56 }}>
      <div style={{ flex: 1, borderRadius: 4, backgroundColor: '#F8E8D0', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6px 8px', gap: 4 }}>
        <div style={{ height: 4, backgroundColor: '#D4C4B0', borderRadius: 2, width: '70%' }} />
        <div style={{ height: 3, backgroundColor: '#E8D8C8', borderRadius: 2, width: '90%' }} />
        <div style={{ height: 3, backgroundColor: '#E8D8C8', borderRadius: 2, width: '80%' }} />
      </div>
      <div style={{ flex: 1, borderRadius: 4, backgroundColor: '#6B1414', opacity: 0.7 }} />
    </div>
  ),
  band: (
    <div style={{ display: 'flex', gap: 4, height: 56 }}>
      <div style={{ flex: 2, borderRadius: 4, backgroundColor: '#6B1414', opacity: 0.8, position: 'relative' }}>
        <span style={{ position: 'absolute', top: 6, left: 8, fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>HAUPTBILD</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[0.7, 0.5, 0.35].map((op, i) => (
          <div key={i} style={{ flex: 1, borderRadius: 3, backgroundColor: '#8B1A1A', opacity: op }} />
        ))}
      </div>
    </div>
  ),
  'band-showcase': (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3, height: 56 }}>
      {[1, 0.65, 0.45].map((op, i) => (
        <div key={i} style={{ borderRadius: 3, backgroundColor: '#6B1414', opacity: op, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: 4, left: 4, right: 4, height: 8, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 2 }} />
        </div>
      ))}
    </div>
  ),
  'band-hero': (
    <div style={{ height: 56, borderRadius: 4, backgroundColor: '#6B1414', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.65))' }} />
      <span style={{ position: 'absolute', top: 5, left: 8, fontSize: 8, color: 'rgba(255,255,255,0.45)' }}>HERO HINTERGRUND</span>
      <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
        <div style={{ height: 5, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 2, width: '55%', marginBottom: 3 }} />
        <div style={{ height: 3, backgroundColor: 'rgba(255,255,255,0.35)', borderRadius: 2, width: '75%' }} />
      </div>
    </div>
  ),
  'band-gallery': (
    <div style={{ height: 56, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 3 }}>
        <div style={{ borderRadius: 3, backgroundColor: '#6B1414', opacity: 0.85 }} />
        <div style={{ borderRadius: 3, backgroundColor: '#8B1A1A', opacity: 0.6 }} />
      </div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3 }}>
        {[0.5, 0.35, 0.25].map((op, i) => (
          <div key={i} style={{ borderRadius: 3, backgroundColor: '#A52020', opacity: op }} />
        ))}
      </div>
    </div>
  ),
  'gallery-header': (
    <div style={{ height: 56, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <div style={{ flex: 2, borderRadius: 4, backgroundColor: '#6B1414', opacity: 0.85, position: 'relative' }}>
        <span style={{ position: 'absolute', top: 5, left: 8, fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>HEADER</span>
      </div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 3 }}>
        {[0.6, 0.45, 0.3, 0.2].map((op, i) => (
          <div key={i} style={{ borderRadius: 2, backgroundColor: '#8B1A1A', opacity: op }} />
        ))}
      </div>
    </div>
  ),
}

interface ContextBannerProps {
  location: string
  url: string
  dimensions: string
  note: string
  preview: PreviewType
}

export function ContextBanner({ location, url, dimensions, note, preview }: ContextBannerProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 20,
      alignItems: 'center',
      backgroundColor: '#FDF9F2',
      border: '1px solid #E8D8C8',
      borderLeft: '3px solid #8B1A1A',
      borderRadius: '0 8px 8px 0',
      padding: '16px 20px',
      marginBottom: 28,
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#8B1A1A', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
            Erscheint auf der Website
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', fontFamily: 'var(--font-body)' }}>
            {location}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11, color: '#8B1A1A', fontFamily: 'var(--font-body)',
              textDecoration: 'none', padding: '2px 8px',
              backgroundColor: '#F5E0E0', borderRadius: 4,
            }}
          >
            {url} ↗
          </a>
          <span style={{
            fontSize: 11, color: '#555555', fontFamily: 'var(--font-body)',
            padding: '2px 8px', backgroundColor: '#fff',
            border: '1px solid #E8D8C8', borderRadius: 4,
          }}>
            {dimensions}
          </span>
        </div>
        <p style={{ fontSize: 12, color: '#555555', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
          {note}
        </p>
      </div>

      {/* Visual preview */}
      <div style={{ width: 140, flexShrink: 0 }}>
        <p style={{ fontSize: 9, color: '#888888', fontFamily: 'var(--font-body)', marginBottom: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Layout-Vorschau
        </p>
        <div style={{ border: '1px solid #E8D8C8', borderRadius: 6, overflow: 'hidden', padding: 6, backgroundColor: '#fff' }}>
          {PREVIEWS[preview]}
        </div>
      </div>
    </div>
  )
}
