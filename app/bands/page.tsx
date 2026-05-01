import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import BandShowcase from '@/components/BandShowcase'
import BandsCta from '@/components/BandsCta'
import VmpFooter from '@/components/VmpFooter'

export const metadata: Metadata = {
  title: 'Bands – Vivid Music Productions',
  description: '10 Profi-Bands für Firmenevents, Hochzeiten und Festivals – direkt buchbar über Vivid Music Productions im Rhein-Main-Gebiet.',
}

export default function BandsPage() {
  return (
    <main>
      <Navbar />
      <BandShowcase />
      <BandsCta />
      <VmpFooter />
    </main>
  )
}
