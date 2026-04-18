'use client'

import { useState } from 'react'

export default function BandDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)

  const paragraphs = text.split('\n\n').filter(Boolean)
  const preview    = paragraphs.slice(0, 1).join('\n\n')
  const hasMore    = paragraphs.length > 1

  return (
    <div>
      <p
        style={{
          fontFamily:  'var(--font-body)',
          fontSize:    '15px',
          color:       'var(--color-brown)',
          lineHeight:  1.8,
          whiteSpace:  'pre-line',
        }}
      >
        {expanded ? text : preview}
      </p>
      {hasMore && (
        <button
          onClick={() => setExpanded((p) => !p)}
          style={{
            marginTop:  '14px',
            background: 'none',
            border:     'none',
            padding:    0,
            cursor:     'pointer',
            color:      'var(--color-gold)',
            fontSize:   '14px',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
          }}
        >
          {expanded ? 'Weniger anzeigen ↑' : 'Mehr lesen →'}
        </button>
      )}
    </div>
  )
}
