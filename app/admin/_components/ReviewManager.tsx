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
            color: n <= (hover || value) ? '#8B1A1A' : '#D4C4B0',
            transition: 'color 0.12s',
          }}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function ReviewRow({ review, onDelete, deleting }: {
  review: Review
  onDelete: (id: string) => void
  deleting: boolean
}) {
  return (
    <div style={{
      padding: '16px 18px',
      borderRadius: 8,
      backgroundColor: '#fff',
      border: '1px solid #E8D8C8',
      marginBottom: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ fontSize: 14, letterSpacing: 1 }}>
              <span style={{ color: '#8B1A1A' }}>{'★'.repeat(review.rating)}</span>
              <span style={{ color: '#D4C4B0' }}>{'★'.repeat(5 - review.rating)}</span>
            </div>
            <span style={{
              fontSize: 10, fontFamily: 'var(--font-body)', fontWeight: 700,
              color: '#8B1A1A',
              padding: '1px 7px', borderRadius: 4,
              backgroundColor: '#F5E0E0',
              letterSpacing: '0.06em',
            }}>
              {review.platform}
            </span>
          </div>
          <p style={{ fontSize: 13, color: '#1A1A1A', fontFamily: 'var(--font-body)', lineHeight: 1.6, marginBottom: 8 }}>
            „{review.text}"
          </p>
          <p style={{ fontSize: 12, color: '#888888', fontFamily: 'var(--font-body)' }}>
            — {review.name} · {review.date}
          </p>
        </div>
        <button
          onClick={() => onDelete(review.id)}
          disabled={deleting}
          style={{
            flexShrink: 0,
            padding: '5px 12px', borderRadius: 5,
            border: '1px solid #FECACA',
            background: 'none', color: '#B91C1C',
            fontSize: 12, fontFamily: 'var(--font-body)', cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FEE2E2' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          {deleting ? '…' : 'Löschen'}
        </button>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 11, color: '#555555', fontFamily: 'var(--font-body)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', borderRadius: 7,
  border: '1.5px solid #E8D8C8',
  backgroundColor: '#fff', color: '#1A1A1A',
  fontSize: 13, fontFamily: 'var(--font-body)',
  outline: 'none', boxSizing: 'border-box',
}

export function ReviewManager({ bandSlug }: { bandSlug: string }) {
  const [reviews, setReviews]     = useState<Review[]>([])
  const [form, setForm]           = useState(EMPTY)
  const [saving, setSaving]       = useState(false)
  const [deleteId, setDeleteId]   = useState<string | null>(null)
  const [error, setError]         = useState('')

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
    <div style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid #E8D8C8' }}>
      <h2 style={{ fontSize: 24, fontFamily: 'var(--font-display)', color: '#1A1A1A', marginBottom: 20, letterSpacing: '0.02em' }}>
        Bewertungen
      </h2>

      {/* Add form */}
      <div style={{
        padding: '22px 22px 18px',
        borderRadius: 10,
        backgroundColor: '#FDF9F2',
        border: '1px solid #E8D8C8',
        marginBottom: 28,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', fontFamily: 'var(--font-body)', marginBottom: 18 }}>
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
            <p style={{ fontSize: 12, color: '#B91C1C', fontFamily: 'var(--font-body)', marginBottom: 10, padding: '8px 12px', backgroundColor: '#FEE2E2', borderRadius: 6 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '9px 22px', borderRadius: 7,
              backgroundColor: saving ? '#A52020' : '#8B1A1A', border: 'none',
              color: '#fff', fontSize: 13, fontFamily: 'var(--font-body)',
              fontWeight: 600, cursor: saving ? 'default' : 'pointer',
              opacity: saving ? 0.8 : 1,
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={e => { if (!saving) e.currentTarget.style.backgroundColor = '#A52020' }}
            onMouseLeave={e => { if (!saving) e.currentTarget.style.backgroundColor = '#8B1A1A' }}
          >
            {saving ? 'Wird gespeichert…' : 'Bewertung hinzufügen'}
          </button>
        </form>
      </div>

      {/* Review list */}
      {reviews.length === 0 ? (
        <p style={{ fontSize: 13, color: '#888888', fontFamily: 'var(--font-body)' }}>
          Noch keine Bewertungen für diese Band.
        </p>
      ) : (
        <div>
          <p style={{ fontSize: 11, color: '#888888', fontFamily: 'var(--font-body)', marginBottom: 12 }}>
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
