import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import BandShowcase from '@/components/BandShowcase'
import BandsCta from '@/components/BandsCta'
import VmpFooter from '@/components/VmpFooter'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { storageUrl } from '@/lib/db-images'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Bands – Vivid Music Productions',
  description: '10 Profi-Bands für Firmenevents, Hochzeiten und Festivals – direkt buchbar über Vivid Music Productions im Rhein-Main-Gebiet.',
}

export default async function BandsPage() {
  const sb = await createServerSupabaseClient()
  const { data } = await sb
    .from('band_images')
    .select('band_slug, path')
    .eq('role', 'showcase')
    .order('sort_order', { ascending: true })

  const bandImages: Record<string, string> = {}
  data?.forEach((img: { band_slug: string; path: string }) => {
    if (!bandImages[img.band_slug]) {
      bandImages[img.band_slug] = storageUrl(img.path)
    }
  })

  return (
    <main>
      <Navbar />
      <BandShowcase bandImages={Object.keys(bandImages).length ? bandImages : undefined} />
      <BandsCta />
      <VmpFooter />
    </main>
  )
}
