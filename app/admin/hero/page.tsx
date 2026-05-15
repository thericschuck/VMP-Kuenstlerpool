import { ImageManager } from '../_components/ImageManager'
import { PageHeader } from '../_components/AdminShell'
import { ContextBanner } from '../_components/ContextBanner'

export const metadata = { title: 'Hero-Galerie — Admin' }

export default function HeroAdminPage() {
  return (
    <div>
      <PageHeader
        title="Hero-Galerie"
        subtitle="Bilder für den automatischen Bildslider auf der Startseite."
      />
      <ContextBanner
        location="Startseite → Hero-Slider"
        url="/"
        dimensions="1920 × 1080 px (16:9)"
        note="Bild 1 erscheint zuerst. Der Slider wechselt automatisch alle 9 Sekunden. Hochkant-Bilder werden oben/unten abgeschnitten."
        preview="hero"
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
