import { createServerSupabaseClient } from '@/lib/supabase-server'
import { PageHeader } from './_components/AdminShell'
import { StatCards, QuickLinks } from './_components/DashboardCards'

type Stat = { table: string; label: string; count: number; href: string; color: string }

async function getStats() {
  const sb = await createServerSupabaseClient()
  const tables = [
    { table: 'hero_images',    label: 'Hero-Bilder',   href: '/admin/hero',    color: '#ea580c' },
    { table: 'gallery_images', label: 'Galerie-Bilder', href: '/admin/galerie', color: '#8b5cf6' },
    { table: 'band_images',    label: 'Band-Bilder',   href: '/admin/bands',   color: '#3b82f6' },
    { table: 'event_images',   label: 'Event-Bilder',  href: '/admin/events',  color: '#22c55e' },
    { table: 'page_images',    label: 'Seiten-Bilder', href: '/admin/seiten',  color: '#f59e0b' },
    { table: 'reviews',        label: 'Bewertungen',   href: '/admin/bands',   color: '#ec4899' },
  ]

  const counts = await Promise.all(
    tables.map(t => sb.from(t.table).select('id', { count: 'exact', head: true }))
  )

  return tables.map((t, i) => ({ ...t, count: counts[i].count ?? 0 })) as Stat[]
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

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 32 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Schnellzugriff
        </h2>
        <QuickLinks />
      </div>
    </div>
  )
}
