'use client'

import { useState } from 'react'
import { ImageManager } from '../_components/ImageManager'
import { PageHeader } from '../_components/AdminShell'
import { ContextBanner } from '../_components/ContextBanner'

const CATEGORIES = [
  { id: 'firmenevents', label: 'Firmenevents' },
  { id: 'stadtfeste',   label: 'Stadtfeste & Festivals' },
  { id: 'hochzeiten',   label: 'Hochzeiten' },
  { id: 'empfaenge',    label: 'Empfänge & Dinner' },
]

export default function EventsAdminPage() {
  const [active, setActive] = useState('firmenevents')
  const cat = CATEGORIES.find(c => c.id === active)!

  return (
    <div>
      <PageHeader
        title="Event-Bilder"
        subtitle="Hintergrundbilder für die verschiedenen Veranstaltungskategorien."
      />
      <ContextBanner
        location="Startseite & Veranstaltungen → Kategorie-Karten"
        url="/veranstaltungen"
        dimensions="1920 × 1080 px (16:9)"
        note="Bilder werden als Vollbild-Hintergrund hinter den Kategorie-Karten eingesetzt. Motiv sollte mittig und gut erkennbar sein — Ränder werden abgeschnitten."
        preview="events"
      />

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 32, borderBottom: '1px solid #E8D8C8', paddingBottom: 0 }}>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            style={{
              padding: '10px 18px',
              background: 'none', border: 'none',
              cursor: 'pointer',
              fontSize: 13, fontFamily: 'var(--font-body)', fontWeight: active === c.id ? 600 : 400,
              color: active === c.id ? '#1A1A1A' : '#888888',
              borderBottom: `2px solid ${active === c.id ? '#8B1A1A' : 'transparent'}`,
              marginBottom: -1,
              transition: 'all 0.15s',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <ImageManager
        key={active}
        table="event_images"
        folder={`events/${active}`}
        filter={{ column: 'category', value: active }}
        insertExtra={{ category: active }}
        title={cat.label}
        description="Empfohlenes Format: 16:9 Querformat. Bilder werden als Hintergrund eingesetzt."
      />
    </div>
  )
}
