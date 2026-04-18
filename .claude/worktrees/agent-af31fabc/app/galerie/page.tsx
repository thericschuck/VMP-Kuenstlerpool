import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import VmpFooter from '@/components/VmpFooter'
import GalleryPageClient from '@/components/GalleryPageClient'

export const metadata: Metadata = {
  title: 'Galerie – Vivid Music Productions',
  description: 'Eindrücke von unvergesslichen Live-Events, Bands und dem Tonstudio von Vivid Music Productions.',
}

export default function GaleriePage() {
  return (
    <>
      <Navbar />
      <GalleryPageClient />
      <VmpFooter />
    </>
  )
}
