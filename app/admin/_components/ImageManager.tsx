'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { compressToWebP } from '@/lib/image-compress'

const BUCKET = 'vmp-images'

type ImageRecord = {
  id: string
  path: string
  label?: string
  sort_order: number
}

export interface ImageManagerProps {
  table: string
  folder: string
  insertExtra?: Record<string, string>
  filter?: { column: string; value: string }
  extraFilters?: Array<{ column: string; value: string }>
  hasLabel?: boolean
  maxImages?: number
  title: string
  description?: string
}

function getPublicUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`
}

type UploadItem = { name: string; progress: 'compressing' | 'uploading' | 'done' | 'error' }

export function ImageManager({
  table, folder, filter, extraFilters, insertExtra, hasLabel, maxImages, title, description,
}: ImageManagerProps) {
  const [images, setImages]         = useState<ImageRecord[]>([])
  const [loading, setLoading]       = useState(true)
  const [queue, setQueue]           = useState<UploadItem[]>([])
  const [dropActive, setDropActive] = useState(false)
  const [hoveredId, setHoveredId]   = useState<string | null>(null)
  const [deleteId, setDeleteId]     = useState<string | null>(null)
  const [dragIdx, setDragIdx]       = useState<number | null>(null)
  const [overIdx, setOverIdx]       = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const extraFiltersKey = extraFilters?.map(f => `${f.column}:${f.value}`).join(',') ?? ''

  const fetchImages = useCallback(async () => {
    const sb = createClient()
    const columns = hasLabel ? 'id, path, label, sort_order' : 'id, path, sort_order'
    let q = sb
      .from(table)
      .select(columns)
      .order('sort_order', { ascending: true })
    if (filter) q = q.eq(filter.column, filter.value)
    extraFilters?.forEach(f => { q = q.eq(f.column, f.value) })
    const { data } = await q
    setImages((data ?? []) as unknown as ImageRecord[])
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, filter?.column, filter?.value, hasLabel, extraFiltersKey])

  useEffect(() => { fetchImages() }, [fetchImages])

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return
    if (maxImages !== undefined && images.length >= maxImages) return
    const sb = createClient()
    const remaining = maxImages !== undefined ? maxImages - images.length : Infinity
    const fileArr = Array.from(files).filter(f => f.type.startsWith('image/')).slice(0, remaining)
    if (!fileArr.length) return

    setQueue(fileArr.map(f => ({ name: f.name, progress: 'compressing' })))

    for (let i = 0; i < fileArr.length; i++) {
      const file = fileArr[i]
      try {
        setQueue(q => q.map((item, idx) => idx === i ? { ...item, progress: 'compressing' } : item))
        const blob = await compressToWebP(file, 1920, 0.82)

        setQueue(q => q.map((item, idx) => idx === i ? { ...item, progress: 'uploading' } : item))
        const filename    = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.webp`
        const storagePath = `${folder}/${filename}`
        const { error: upErr } = await sb.storage
          .from(BUCKET)
          .upload(storagePath, blob, { contentType: 'image/webp', upsert: false })
        if (upErr) throw upErr

        const row: Record<string, unknown> = {
          path: storagePath,
          sort_order: images.length + i,
          ...insertExtra,
        }
        if (hasLabel) row.label = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
        const { error: dbErr } = await sb.from(table).insert(row)
        if (dbErr) throw dbErr

        setQueue(q => q.map((item, idx) => idx === i ? { ...item, progress: 'done' } : item))
      } catch (err) {
        console.error('Upload error:', err)
        setQueue(q => q.map((item, idx) => idx === i ? { ...item, progress: 'error' } : item))
      }
    }

    await fetchImages()
    setTimeout(() => setQueue([]), 1800)
  }

  const handleDelete = async (img: ImageRecord) => {
    if (!confirm(`Bild wirklich löschen?`)) return
    const sb = createClient()
    setDeleteId(img.id)
    await sb.storage.from(BUCKET).remove([img.path])
    await sb.from(table).delete().eq('id', img.id)
    setImages(prev => prev.filter(i => i.id !== img.id))
    setDeleteId(null)
  }

  const handleDrop = async (dropIndex: number) => {
    if (dragIdx === null || dragIdx === dropIndex) {
      setDragIdx(null); setOverIdx(null); return
    }
    const reordered = [...images]
    const [moved] = reordered.splice(dragIdx, 1)
    reordered.splice(dropIndex, 0, moved)
    setImages(reordered)
    setDragIdx(null); setOverIdx(null)

    const sb = createClient()
    await Promise.all(
      reordered.map((img, idx) =>
        sb.from(table).update({ sort_order: idx }).eq('id', img.id)
      )
    )
  }

  const updateLabel = async (id: string, label: string) => {
    const sb = createClient()
    await sb.from(table).update({ label }).eq('id', id)
    setImages(prev => prev.map(img => img.id === id ? { ...img, label } : img))
  }

  const isUploading = queue.some(q => q.progress === 'compressing' || q.progress === 'uploading')
  const limitReached = maxImages !== undefined && images.length >= maxImages

  return (
    <div style={{ marginBottom: 52 }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-display)', color: '#1A1A1A', marginBottom: 4, letterSpacing: '0.02em' }}>
          {title}
        </h2>
        {description && (
          <p style={{ fontSize: 13, color: '#888888', fontFamily: 'var(--font-body)' }}>
            {description}
          </p>
        )}
      </div>

      {/* Dropzone */}
      <div
        onClick={() => !isUploading && !limitReached && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); if (!limitReached) setDropActive(true) }}
        onDragLeave={() => setDropActive(false)}
        onDrop={e => {
          e.preventDefault()
          setDropActive(false)
          if (!limitReached && e.dataTransfer.files.length) handleFiles(e.dataTransfer.files)
        }}
        style={{
          border: `2px dashed ${limitReached ? '#E8D8C8' : dropActive ? '#8B1A1A' : '#D4C4B0'}`,
          borderRadius: 10,
          padding: '22px 20px',
          textAlign: 'center',
          cursor: isUploading || limitReached ? 'default' : 'pointer',
          backgroundColor: limitReached ? '#F8F4EE' : dropActive ? 'rgba(139,26,26,0.04)' : '#FDF9F2',
          transition: 'border-color 0.2s, background-color 0.2s',
          marginBottom: 20,
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={!maxImages || maxImages > 1}
          style={{ display: 'none' }}
          onChange={e => handleFiles(e.target.files)}
        />

        {isUploading ? (
          <div>
            {queue.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#555555', fontFamily: 'var(--font-body)' }}>
                  {item.name}
                </span>
                <StatusBadge status={item.progress} />
              </div>
            ))}
          </div>
        ) : limitReached ? (
          <>
            <div style={{ fontSize: 18, marginBottom: 6, color: '#8B1A1A', opacity: 0.5 }}>✓</div>
            <p style={{ fontSize: 13, color: '#8B1A1A', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: 3 }}>
              {maxImages === 1 ? 'Bild hochgeladen' : `${maxImages} Bilder hochgeladen`}
            </p>
            <p style={{ fontSize: 11, color: '#888888', fontFamily: 'var(--font-body)' }}>
              Zum Ersetzen bitte zuerst löschen
            </p>
          </>
        ) : (
          <>
            <div style={{ fontSize: 26, marginBottom: 8, color: '#8B1A1A', opacity: 0.7 }}>↑</div>
            <p style={{ fontSize: 14, color: '#1A1A1A', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: 4 }}>
              {maxImages === 1 ? 'Bild ablegen oder klicken' : 'Bilder ablegen oder klicken zum Auswählen'}
            </p>
            <p style={{ fontSize: 12, color: '#888888', fontFamily: 'var(--font-body)' }}>
              JPG · PNG · WebP · AVIF — wird automatisch auf max. 1920 px komprimiert &amp; als WebP gespeichert
              {maxImages && maxImages > 1 ? ` · max. ${maxImages} Bilder` : ''}
            </p>
          </>
        )}
      </div>

      {/* Image grid */}
      {loading ? (
        <p style={{ fontSize: 13, color: '#888888', fontFamily: 'var(--font-body)' }}>
          Wird geladen…
        </p>
      ) : images.length === 0 ? null : (
        <>
          <p style={{ fontSize: 11, color: '#888888', fontFamily: 'var(--font-body)', marginBottom: 12 }}>
            {images.length} Bild{images.length !== 1 ? 'er' : ''} · Zum Umsortieren ziehen
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(152px, 1fr))',
            gap: 10,
          }}>
            {images.map((img, i) => (
              <div
                key={img.id}
                draggable
                onDragStart={() => setDragIdx(i)}
                onDragOver={e => { e.preventDefault(); setOverIdx(i) }}
                onDrop={() => handleDrop(i)}
                onDragEnd={() => { setDragIdx(null); setOverIdx(null) }}
                onMouseEnter={() => setHoveredId(img.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: `2px solid ${overIdx === i && dragIdx !== i ? '#8B1A1A' : '#E8D8C8'}`,
                  opacity: dragIdx === i ? 0.35 : 1,
                  cursor: 'grab',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.15s, opacity 0.15s',
                  userSelect: 'none',
                }}
              >
                {/* Thumbnail */}
                <div style={{ position: 'relative', paddingTop: '75%' }}>
                  <Image
                    src={getPublicUrl(img.path)}
                    alt={img.label || ''}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="200px"
                    draggable={false}
                  />

                  {/* Sort badge */}
                  <div style={{
                    position: 'absolute', top: 5, left: 5,
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    borderRadius: 4, padding: '2px 6px',
                    fontSize: 10, color: 'rgba(255,255,255,0.8)',
                    fontFamily: 'var(--font-body)',
                  }}>
                    {i + 1}
                  </div>

                  {/* Delete overlay */}
                  {hoveredId === img.id && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.45)',
                    }}>
                      <button
                        onClick={e => { e.stopPropagation(); handleDelete(img) }}
                        disabled={deleteId === img.id}
                        style={{
                          padding: '5px 14px', borderRadius: 5,
                          backgroundColor: '#B91C1C', border: 'none',
                          color: '#fff', fontSize: 12, fontFamily: 'var(--font-body)',
                          fontWeight: 600, cursor: 'pointer',
                        }}
                      >
                        {deleteId === img.id ? '…' : 'Löschen'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Label input */}
                {hasLabel && (
                  <input
                    defaultValue={img.label ?? ''}
                    placeholder="Beschriftung…"
                    onBlur={e => updateLabel(img.id, e.target.value)}
                    onClick={e => e.stopPropagation()}
                    style={{
                      display: 'block', width: '100%', padding: '6px 8px',
                      backgroundColor: '#FAF6EE',
                      border: 'none', borderTop: '1px solid #E8D8C8',
                      color: '#555555',
                      fontSize: 11, fontFamily: 'var(--font-body)',
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: UploadItem['progress'] }) {
  const map: Record<UploadItem['progress'], { label: string; color: string }> = {
    compressing: { label: 'Komprimieren…', color: '#8B1A1A' },
    uploading:   { label: 'Hochladen…',   color: '#2563EB' },
    done:        { label: '✓ Fertig',      color: '#16A34A' },
    error:       { label: '✗ Fehler',      color: '#B91C1C' },
  }
  const { label, color } = map[status]
  return (
    <span style={{
      fontSize: 11, fontFamily: 'var(--font-body)', fontWeight: 600,
      color, padding: '2px 8px', borderRadius: 4,
      backgroundColor: `${color}18`,
    }}>
      {label}
    </span>
  )
}
