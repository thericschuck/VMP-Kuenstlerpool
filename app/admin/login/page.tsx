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
      backgroundColor: '#FAF6EE',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 40,
        }}>
          <Image
            src="/images/logo_dark_transparent.png"
            alt="Vivid Music Productions"
            width={180} height={64}
            style={{ height: 52, width: 'auto' }}
          />
          <p style={{
            fontSize: 11,
            color: '#888888',
            marginTop: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
          }}>
            Admin Bereich
          </p>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: '#FAF6EE',
          border: '1px solid #D4C4B0',
          borderRadius: 16,
          padding: '36px 32px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
        }}>
          <h1 style={{
            fontSize: 28,
            fontFamily: 'var(--font-display)',
            color: '#1A1A1A',
            marginBottom: 8,
            letterSpacing: '0.04em',
          }}>
            Anmelden
          </h1>
          <p style={{ fontSize: 13, color: '#888888', marginBottom: 28 }}>
            Melde dich mit deinen Zugangsdaten an.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{
                display: 'block',
                fontSize: 11,
                color: '#555555',
                marginBottom: 6,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                E-Mail
              </label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 8,
                  border: '1.5px solid #E8D8C8',
                  backgroundColor: '#fff',
                  color: '#1A1A1A',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'var(--font-body)',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = '#8B1A1A')}
                onBlur={e  => (e.target.style.borderColor = '#E8D8C8')}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block',
                fontSize: 11,
                color: '#555555',
                marginBottom: 6,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                Passwort
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 8,
                  border: '1.5px solid #E8D8C8',
                  backgroundColor: '#fff',
                  color: '#1A1A1A',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'var(--font-body)',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = '#8B1A1A')}
                onBlur={e  => (e.target.style.borderColor = '#E8D8C8')}
              />
            </div>

            {error && (
              <p style={{
                fontSize: 13,
                color: '#B91C1C',
                backgroundColor: '#FEE2E2',
                border: '1px solid #FECACA',
                borderRadius: 6,
                padding: '9px 12px',
                marginBottom: 18,
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px 0',
                borderRadius: 8,
                backgroundColor: loading ? '#A52020' : '#8B1A1A',
                border: 'none',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? 'default' : 'pointer',
                opacity: loading ? 0.8 : 1,
                transition: 'background-color 0.15s, opacity 0.15s',
                letterSpacing: '0.03em',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => { if (!loading) (e.currentTarget.style.backgroundColor = '#A52020') }}
              onMouseLeave={e => { if (!loading) (e.currentTarget.style.backgroundColor = '#8B1A1A') }}
            >
              {loading ? 'Wird angemeldet…' : 'Anmelden'}
            </button>
          </form>
        </div>

        {/* Footer hint */}
        <p style={{
          textAlign: 'center',
          fontSize: 11,
          color: '#BBBBBB',
          marginTop: 24,
          letterSpacing: '0.05em',
        }}>
          Vivid Music Productions · Admin
        </p>
      </div>
    </div>
  )
}
