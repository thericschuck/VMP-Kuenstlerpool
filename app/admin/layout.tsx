import { createServerSupabaseClient } from '@/lib/supabase-server'
import { AdminShell } from './_components/AdminShell'

export const metadata = { title: 'Admin — VMP' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Login page renders without the sidebar shell.
  // Middleware handles all redirects — no redirect here to avoid loops.
  if (!user) {
    return <>{children}</>
  }

  return (
    <AdminShell email={user.email ?? ''}>
      {children}
    </AdminShell>
  )
}
