'use client'

import { useState } from 'react'
import { ImageManager } from '../_components/ImageManager'
import { PageHeader } from '../_components/AdminShell'
import { ContextBanner } from '../_components/ContextBanner'

type SectionDef = {
  key: string
  label: string
  dimensions: string
  note: string
  maxImages?: number
  preview: 'band-hero' | 'pages' | 'gallery'
}

const PAGES: Array<{
  id: string
  label: string
  url: string
  sections: SectionDef[]
}> = [
  {
    id: 'ueber-uns',
    label: 'Über uns',
    url: '/ueber-uns',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Hintergrund',
        dimensions: '1920 × 1080 px (16:9)',
        note: 'Wird als halbtransparenter Hintergrund (ca. 18% Deckkraft) hinter dem Seitentitel angezeigt. Stimmungsvolles Bühnenfoto oder Porträt empfohlen.',
        maxImages: 1,
        preview: 'band-hero',
      },
      {
        key: 'intro',
        label: 'Intro-Bild',
        dimensions: '1200 × 900 px (4:3)',
        note: 'Großes Bild im oberen Bereich der Seite, neben dem Einleitungstext über die Agentur.',
        maxImages: 1,
        preview: 'pages',
      },
      {
        key: 'team',
        label: 'Team-Portraits',
        dimensions: '600 × 800 px (3:4, Hochformat)',
        note: 'Portraits aller Teammitglieder (Bobby Stöcker, Peter Volk, …). Hochformat empfohlen. Reihenfolge per Drag & Drop.',
        preview: 'gallery',
      },
    ],
  },
  {
    id: 'technik',
    label: 'Technik & Tonstudio',
    url: '/technik',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Hintergrund',
        dimensions: '1920 × 1080 px (16:9)',
        note: 'Wird als halbtransparenter Hintergrund (ca. 20% Deckkraft) hinter dem Seitentitel angezeigt.',
        maxImages: 1,
        preview: 'band-hero',
      },
      {
        key: 'main',
        label: 'Hauptbild — Bühne & Beschallung',
        dimensions: '1200 × 900 px (4:3)',
        note: 'Großes Hauptbild der Bühnen/Beschallungssektion. Erscheint prominent links neben den Thumbnails.',
        maxImages: 1,
        preview: 'pages',
      },
      {
        key: 'thumbnails',
        label: 'Thumbnails — Technik',
        dimensions: '600 × 600 px (1:1, quadratisch)',
        note: 'Drei quadratische Thumbnails neben dem Hauptbild der Techniksektion. Genau 3 Bilder.',
        maxImages: 3,
        preview: 'gallery',
      },
      {
        key: 'songwriting',
        label: 'Songwriting-Bild',
        dimensions: '1200 × 675 px (16:9)',
        note: 'Breitbild-Foto für die Musikproduktion/Songwriting-Sektion. Querformat erforderlich.',
        maxImages: 1,
        preview: 'pages',
      },
    ],
  },
]

export default function SeitenAdminPage() {
  const [activePage, setActivePage] = useState('ueber-uns')

  const page = PAGES.find(p => p.id === activePage)!

  return (
    <div>
      <PageHeader
        title="Seiten-Bilder"
        subtitle="Bilder für die Über-uns- und Technik-Seiten."
      />

      {/* Page tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 36, borderBottom: '1px solid #E8D8C8', paddingBottom: 0 }}>
        {PAGES.map(p => (
          <button
            key={p.id}
            onClick={() => setActivePage(p.id)}
            style={{
              padding: '10px 20px',
              background: 'none', border: 'none',
              cursor: 'pointer',
              fontSize: 14, fontFamily: 'var(--font-body)', fontWeight: activePage === p.id ? 600 : 400,
              color: activePage === p.id ? '#1A1A1A' : '#888888',
              borderBottom: `2px solid ${activePage === p.id ? '#8B1A1A' : 'transparent'}`,
              marginBottom: -1,
              transition: 'all 0.15s',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* All sections for the active page */}
      {page.sections.map((section, idx) => (
        <div key={`${activePage}-${section.key}`}>
          <ContextBanner
            location={`${page.label} → ${section.label}`}
            url={page.url}
            dimensions={section.dimensions}
            note={section.note}
            preview={section.preview}
          />

          <ImageManager
            key={`${activePage}-${section.key}`}
            table="page_images"
            folder={`${activePage}/${section.key}`}
            filter={{ column: 'section', value: section.key }}
            insertExtra={{ page: activePage, section: section.key }}
            maxImages={section.maxImages}
            title={section.label}
          />

          {idx < page.sections.length - 1 && (
            <div style={{ borderTop: '1px solid #E8D8C8', margin: '8px 0 40px' }} />
          )}
        </div>
      ))}
    </div>
  )
}
