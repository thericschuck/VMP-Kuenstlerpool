'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'

export default function AdminLoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const sb = createClient()
    const { data, error: authErr } = await sb.auth.signInWithPassword({ email, password })

    if (authErr || !data.user) {
      setError('E-Mail oder Passwort falsch.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f0e0d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Image
            src="/images/logo_light_transparent.png"
            alt="Vivid Music Productions"
            width={160} height={56}
            style={{ height: 44, width: 'auto' }}
          />
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 10, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            Admin Bereich
          </p>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: '#141210',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14,
          padding: '32px 28px',
        }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)', color: '#fff', marginBottom: 24 }}>
            Anmelden
          </h1>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                E-Mail
              </label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: '#1c1917', color: '#fff',
                  fontSize: 14, outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Passwort
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: '#1c1917', color: '#fff',
                  fontSize: 14, outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {error && (
              <p style={{ fontSize: 13, color: '#ef4444', marginBottom: 16 }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '11px 0', borderRadius: 8,
                backgroundColor: '#ea580c', border: 'none',
                color: '#fff', fontSize: 14, fontWeight: 600,
                cursor: loading ? 'default' : 'pointer',
                opacity: loading ? 0.75 : 1,
                transition: 'opacity 0.15s',
              }}
            >
              {loading ? 'Wird angemeldet…' : 'Anmelden'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
