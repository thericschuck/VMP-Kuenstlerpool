'use client'

import { useState } from 'react'
import { ImageManager } from '../_components/ImageManager'
import { PageHeader } from '../_components/AdminShell'

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
        subtitle="Hintergrund- und Kategoriebilder für die verschiedenen Veranstaltungsarten."
      />

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 32, borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 0 }}>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            style={{
              padding: '10px 18px',
              background: 'none', border: 'none',
              cursor: 'pointer',
              fontSize: 13, fontFamily: 'var(--font-body)', fontWeight: active === c.id ? 600 : 400,
              color: active === c.id ? '#fff' : 'rgba(255,255,255,0.38)',
              borderBottom: `2px solid ${active === c.id ? '#ea580c' : 'transparent'}`,
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
