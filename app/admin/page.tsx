import { createServerSupabaseClient } from '@/lib/supabase-server'
import { PageHeader } from './_components/AdminShell'
import { StatCards, QuickLinks } from './_components/DashboardCards'

type Stat = { table: string; label: string; count: number; href: string; color: string }

async function getStats(): Promise<Stat[]> {
  const tables = [
    { table: 'hero_images',    label: 'Hero-Bilder',    href: '/admin/hero',    color: '#8B1A1A' },
    { table: 'gallery_images', label: 'Galerie-Bilder', href: '/admin/galerie', color: '#8B1A1A' },
    { table: 'band_images',    label: 'Band-Bilder',    href: '/admin/bands',   color: '#8B1A1A' },
    { table: 'event_images',   label: 'Event-Bilder',   href: '/admin/events',  color: '#8B1A1A' },
    { table: 'page_images',    label: 'Seiten-Bilder',  href: '/admin/seiten',  color: '#8B1A1A' },
    { table: 'reviews',        label: 'Bewertungen',    href: '/admin/bands',   color: '#8B1A1A' },
  ]

  try {
    const sb = await createServerSupabaseClient()
    const counts = await Promise.all(
      tables.map(t => sb.from(t.table).select('id', { count: 'exact', head: true }))
    )
    return tables.map((t, i) => ({ ...t, count: counts[i].count ?? 0 }))
  } catch {
    return tables.map(t => ({ ...t, count: 0 }))
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Übersicht aller verwalteten Inhalte"
      />

      <StatCards stats={stats} />

      <div style={{ borderTop: '1px solid #E8D8C8', paddingTop: 32 }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: '#888888', fontFamily: 'var(--font-body)', marginBottom: 16, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Schnellzugriff
        </h2>
        <QuickLinks />
      </div>
    </div>
  )
}
