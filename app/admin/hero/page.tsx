import { ImageManager } from '../_components/ImageManager'
import { PageHeader } from '../_components/AdminShell'

export const metadata = { title: 'Hero-Galerie — Admin' }

export default function HeroAdminPage() {
  return (
    <div>
      <PageHeader
        title="Hero-Galerie"
        subtitle="Bilder für den automatischen Slider auf der Startseite. Die Reihenfolge bestimmt die Abspielreihenfolge."
      />
      <ImageManager
        table="hero_images"
        folder="hero"
        hasLabel
        title="Slider-Bilder"
        description="Empfohlene Größe: 1920 × 1080 px (16:9). Wird automatisch komprimiert."
      />
    </div>
  )
}
