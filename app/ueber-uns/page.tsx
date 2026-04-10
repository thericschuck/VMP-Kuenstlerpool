import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import VmpFooter from '@/components/VmpFooter'
import UeberUnsPageClient from '@/components/UeberUnsPageClient'

export const metadata: Metadata = {
  title: 'Über uns – Vivid Music Productions',
  description: 'Das Team hinter Vivid Music Productions. 20 Jahre Erfahrung, direkte Kommunikation und Vollservice aus einer Hand.',
}

export default function UeberUnsPage() {
  return (
    <>
      <Navbar />
      <UeberUnsPageClient />
      <VmpFooter />
    </>
  )
}
