'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

type Platform = 'Google' | 'Facebook' | 'Direkt'

type Review = {
  id: string
  name: string
  rating: number
  text: string
  date: string
  platform: Platform
  created_at: string
}

const PLATFORMS: Platform[] = ['Google', 'Facebook', 'Direkt']

const EMPTY = { name: '', rating: 5, text: '', date: '', platform: 'Google' as Platform }

// ── Star selector ─────────────────────────────────────────────

function Stars({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '2px 1px',
            fontSize: 22,
            color: n <= (hover || value) ? '#ea580c' : 'rgba(255,255,255,0.15)',
            transition: 'color 0.12s',
          }}
        >
          ★
        </button>
      ))}
    </div>
  )
}

// ── Review row ────────────────────────────────────────────────

function ReviewRow({ review, onDelete, deleting }: {
  review: Review
  onDelete: (id: string) => void
  deleting: boolean
}) {
  return (
    <div style={{
      padding: '16px 18px',
      borderRadius: 8,
      backgroundColor: '#1a1816',
      border: '1px solid rgba(255,255,255,0.06)',
      marginBottom: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Stars + platform */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ color: '#ea580c', fontSize: 14, letterSpacing: 1 }}>
              {'★'.repeat(review.rating)}
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>
                {'★'.repeat(5 - review.rating)}
              </span>
            </div>
            <span style={{
              fontSize: 10, fontFamily: 'var(--font-body)', fontWeight: 600,
              color: 'rgba(255,255,255,0.4)',
              padding: '1px 7px', borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.06)',
              letterSpacing: '0.06em',
            }}>
              {review.platform}
            </span>
          </div>
          {/* Text */}
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-body)', lineHeight: 1.6, marginBottom: 8 }}>
            "{review.text}"
          </p>
          {/* Author + date */}
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', fontFamily: 'var(--font-body)' }}>
            — {review.name} · {review.date}
          </p>
        </div>
        {/* Delete */}
        <button
          onClick={() => onDelete(review.id)}
          disabled={deleting}
          style={{
            flexShrink: 0,
            padding: '5px 12px', borderRadius: 5,
            border: '1px solid rgba(239,68,68,0.3)',
            background: 'none', color: '#ef4444',
            fontSize: 12, fontFamily: 'var(--font-body)', cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          {deleting ? '…' : 'Löschen'}
        </button>
      </div>
    </div>
  )
}

// ── Input helper ──────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', borderRadius: 7,
  border: '1px solid rgba(255,255,255,0.1)',
  backgroundColor: '#1a1816', color: '#fff',
  fontSize: 13, fontFamily: 'var(--font-body)',
  outline: 'none', boxSizing: 'border-box',
}

// ── Main component ────────────────────────────────────────────

export function ReviewManager({ bandSlug }: { bandSlug: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [form, setForm]       = useState(EMPTY)
  const [saving, setSaving]   = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [error, setError]     = useState('')

  const fetchReviews = useCallback(async () => {
    const sb = createClient()
    const { data } = await sb
      .from('reviews')
      .select('*')
      .eq('band_slug', bandSlug)
      .order('created_at', { ascending: false })
    setReviews(data ?? [])
  }, [bandSlug])

  useEffect(() => { fetchReviews() }, [fetchReviews])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.text.trim() || !form.date.trim()) {
      setError('Bitte alle Pflichtfelder ausfüllen.')
      return
    }
    setError('')
    setSaving(true)
    const sb = createClient()
    const { error: err } = await sb.from('reviews').insert({ ...form, band_slug: bandSlug })
    if (err) { setError(err.message); setSaving(false); return }
    setForm(EMPTY)
    await fetchReviews()
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    setDeleteId(id)
    const sb = createClient()
    await sb.from('reviews').delete().eq('id', id)
    setReviews(prev => prev.filter(r => r.id !== id))
    setDeleteId(null)
  }

  return (
    <div style={{ marginTop: 48 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)', color: '#fff', marginBottom: 20 }}>
        Bewertungen
      </h2>

      {/* Add form */}
      <div style={{
        padding: '22px 22px 18px',
        borderRadius: 10,
        backgroundColor: '#161412',
        border: '1px solid rgba(255,255,255,0.07)',
        marginBottom: 28,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', fontFamily: 'var(--font-body)', marginBottom: 18 }}>
          Neue Bewertung hinzufügen
        </h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <Field label="Name *">
              <input
                style={inputStyle}
                value={form.name}
                placeholder="z. B. Klaus M."
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </Field>
            <Field label="Datum *">
              <input
                style={inputStyle}
                value={form.date}
                placeholder="z. B. März 2024"
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </Field>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <Field label="Bewertung *">
              <Stars value={form.rating} onChange={n => setForm(f => ({ ...f, rating: n }))} />
            </Field>
            <Field label="Plattform *">
              <select
                style={{ ...inputStyle, cursor: 'pointer' }}
                value={form.platform}
                onChange={e => setForm(f => ({ ...f, platform: e.target.value as Platform }))}
              >
                {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Bewertungstext *">
            <textarea
              style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }}
              value={form.text}
              placeholder="Bewertungstext…"
              onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
            />
          </Field>

          {error && (
            <p style={{ fontSize: 12, color: '#ef4444', fontFamily: 'var(--font-body)', marginBottom: 10 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '9px 22px', borderRadius: 7,
              backgroundColor: '#ea580c', border: 'none',
              color: '#fff', fontSize: 13, fontFamily: 'var(--font-body)',
              fontWeight: 600, cursor: saving ? 'default' : 'pointer',
              opacity: saving ? 0.7 : 1,
              transition: 'opacity 0.15s',
            }}
          >
            {saving ? 'Wird gespeichert…' : 'Bewertung hinzufügen'}
          </button>
        </form>
      </div>

      {/* Review list */}
      {reviews.length === 0 ? (
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>
          Noch keine Bewertungen für diese Band.
        </p>
      ) : (
        <div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', fontFamily: 'var(--font-body)', marginBottom: 12 }}>
            {reviews.length} Bewertung{reviews.length !== 1 ? 'en' : ''}
          </p>
          {reviews.map(r => (
            <ReviewRow
              key={r.id}
              review={r}
              onDelete={handleDelete}
              deleting={deleteId === r.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}
