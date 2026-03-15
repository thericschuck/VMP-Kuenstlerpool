/**
 * Browser (Client-Component) Supabase client.
 * Import this in 'use client' files.
 *
 * For Server Components / Route Handlers, use lib/supabase-server.ts instead.
 */
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
