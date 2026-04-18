import { ImageManager } from '../_components/ImageManager'
import { PageHeader } from '../_components/AdminShell'

export const metadata = { title: 'Haupt-Galerie — Admin' }

export default function GalerieAdminPage() {
  return (
    <div>
      <PageHeader
        title="Haupt-Galerie"
        subtitle="Alle Bilder für die Galerie-Seite (/galerie). Reihenfolge per Drag & Drop anpassen."
      />
      <ImageManager
        table="gallery_images"
        folder="gallery"
        title="Galerie-Bilder"
        description="Querformat empfohlen. Wird automatisch auf max. 1920 px komprimiert."
      />
    </div>
  )
}
