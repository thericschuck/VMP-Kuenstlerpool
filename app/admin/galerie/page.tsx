import { ImageManager } from '../_components/ImageManager'
import { PageHeader } from '../_components/AdminShell'
import { ContextBanner } from '../_components/ContextBanner'

export const metadata = { title: 'Haupt-Galerie — Admin' }

export default function GalerieAdminPage() {
  return (
    <div>
      <PageHeader
        title="Haupt-Galerie"
        subtitle="Header-Bild und Galerie-Grid der /galerie-Seite."
      />

      {/* ── Header-Bild ────────────────────────────────────── */}
      <ContextBanner
        location="Galerie → Großes Header-Bild"
        url="/galerie"
        dimensions="mind. 1920 × 800 px (Querformat, breit)"
        note="Erscheint als großes Featured-Bild ganz oben auf der Galerie-Seite — auch auf allen anderen Unterseiten als Seitenheader. Nur 1 Bild möglich."
        preview="gallery-header"
      />

      <ImageManager
        table="gallery_images"
        folder="gallery/header"
        filter={{ column: 'image_type', value: 'header' }}
        insertExtra={{ image_type: 'header' }}
        maxImages={1}
        title="Header-Bild"
        description="Das große Featured-Bild oben auf der Galerie-Seite."
      />

      <div style={{ borderTop: '1px solid #E8D8C8', margin: '8px 0 40px' }} />

      {/* ── Galerie-Grid ───────────────────────────────────── */}
      <ContextBanner
        location="Galerie → Grid-Bilder"
        url="/galerie"
        dimensions="mind. 1200 × 800 px (Querformat empfohlen)"
        note="Erscheinen im Foto-Grid unterhalb des Header-Bilds. Reihenfolge per Drag & Drop anpassen. Hochkant-Fotos funktionieren ebenfalls."
        preview="gallery"
      />

      <ImageManager
        table="gallery_images"
        folder="gallery/grid"
        filter={{ column: 'image_type', value: 'grid' }}
        insertExtra={{ image_type: 'grid' }}
        title="Galerie-Grid"
        description="Alle Fotos im Grid-Layout der Galerie-Seite. Reihenfolge per Drag & Drop."
      />
    </div>
  )
}
