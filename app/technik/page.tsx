import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import VmpFooter from '@/components/VmpFooter'
import TechnikPageClient from '@/components/TechnikPageClient'

export const metadata: Metadata = {
  title: 'Technik & Tonstudio – Vivid Music Productions',
  description: 'Vollservice aus einer Hand: PA-Technik, Bühne, Licht, Musikproduktion und Songwriting seit 20 Jahren.',
}

export default function TechnikPage() {
  return (
    <>
      <Navbar />
      <TechnikPageClient />
      <VmpFooter />
    </>
  )
}
