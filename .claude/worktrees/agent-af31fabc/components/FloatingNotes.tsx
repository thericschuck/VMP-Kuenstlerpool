/**
 * Decorative floating music notes between sections.
 * Pure CSS animation – Server Component.
 */

const NOTES = [
  { char: '♩', size: 24, left: '8%',  delay: '0s',   duration: '8s'  },
  { char: '♪', size: 18, left: '22%', delay: '2s',   duration: '7s'  },
  { char: '♫', size: 28, left: '45%', delay: '1s',   duration: '9s'  },
  { char: '♩', size: 16, left: '65%', delay: '3s',   duration: '6s'  },
  { char: '♪', size: 22, left: '78%', delay: '1.5s', duration: '10s' },
  { char: '♫', size: 20, left: '90%', delay: '0.5s', duration: '8s'  },
] as const

export default function FloatingNotes() {
  return (
    <div
      className="relative overflow-hidden pointer-events-none select-none"
      style={{ height: '160px' }}
      aria-hidden="true"
    >
      {NOTES.map((note, i) => (
        <span
          key={i}
          className="floating-note absolute bottom-0"
          style={{
            left:     note.left,
            fontSize: `${note.size}px`,
            color:    '#8b6914',
            animation: `floatUp ${note.duration} ${note.delay} ease-in-out infinite`,
            willChange: 'transform, opacity',
          }}
        >
          {note.char}
        </span>
      ))}
    </div>
  )
}
