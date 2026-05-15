import { createServerSupabaseClient } from '@/lib/supabase-server'
import { AdminShell } from './_components/AdminShell'

export const metadata = { title: 'Admin — VMP' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let email = ''

  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return <>{children}</>
    }

    email = user.email ?? ''
  } catch {
    // Supabase unreachable — middleware handles auth redirect, render children as-is
    return <>{children}</>
  }

  return (
    <AdminShell email={email}>
      {children}
    </AdminShell>
  )
}
