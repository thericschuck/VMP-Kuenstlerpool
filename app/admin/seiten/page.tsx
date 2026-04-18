'use client'

import { useState } from 'react'
import { ImageManager } from '../_components/ImageManager'
import { PageHeader } from '../_components/AdminShell'

const SECTIONS = [
  {
    id:      'ueber-uns',
    label:   'Über uns',
    sections: [
      { key: 'team',    label: 'Team-Fotos',              desc: 'Portraits und Fotos des Teams (Bobby Stöcker, Peter Volk, …).' },
      { key: 'general', label: 'Allgemeine Seitenbilder', desc: 'Weitere Bilder für die Über-uns-Seite.' },
    ],
  },
  {
    id:      'technik',
    label:   'Technik & Tonstudio',
    sections: [
      { key: 'buehne',      label: 'Bühne & Beschallung', desc: 'Bilder für die Bühnen- und Beschallungssektion.' },
      { key: 'tonstudio',   label: 'Tonstudio',           desc: 'Bilder des Tonstudios / Musikproduktion.' },
      { key: 'songwriting', label: 'Songwriting',         desc: 'Bilder für die Songwriting-Sektion.' },
    ],
  },
]

export default function SeitenAdminPage() {
  const [activePage, setActivePage]       = useState('ueber-uns')
  const [activeSection, setActiveSection] = useState('team')

  const page    = SECTIONS.find(p => p.id === activePage)!
  const section = page.sections.find(s => s.key === activeSection) ?? page.sections[0]

  // Switch page and reset section
  const switchPage = (id: string) => {
    setActivePage(id)
    setActiveSection(SECTIONS.find(p => p.id === id)!.sections[0].key)
  }

  return (
    <div>
      <PageHeader
        title="Seiten-Bilder"
        subtitle="Bilder für die Über-uns- und Technik-Seiten."
      />

      {/* Page tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 0 }}>
        {SECTIONS.map(p => (
          <button
            key={p.id}
            onClick={() => switchPage(p.id)}
            style={{
              padding: '10px 18px',
              background: 'none', border: 'none',
              cursor: 'pointer',
              fontSize: 14, fontFamily: 'var(--font-body)', fontWeight: activePage === p.id ? 600 : 400,
              color: activePage === p.id ? '#fff' : 'rgba(255,255,255,0.38)',
              borderBottom: `2px solid ${activePage === p.id ? '#ea580c' : 'transparent'}`,
              marginBottom: -1,
              transition: 'all 0.15s',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Section sub-tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 32, flexWrap: 'wrap' }}>
        {page.sections.map(s => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            style={{
              padding: '6px 14px', borderRadius: 6,
              background: activeSection === s.key ? 'rgba(234,88,12,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeSection === s.key ? 'rgba(234,88,12,0.4)' : 'rgba(255,255,255,0.07)'}`,
              cursor: 'pointer',
              fontSize: 12, fontFamily: 'var(--font-body)', fontWeight: activeSection === s.key ? 600 : 400,
              color: activeSection === s.key ? '#fff' : 'rgba(255,255,255,0.45)',
              transition: 'all 0.15s',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <ImageManager
        key={`${activePage}-${activeSection}`}
        table="page_images"
        folder={`${activePage}/${activeSection}`}
        filter={{ column: 'page', value: activePage }}
        insertExtra={{ page: activePage, section: activeSection }}
        title={section.label}
        description={section.desc}
      />
    </div>
  )
}
