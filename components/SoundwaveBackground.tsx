/**
 * Pulsating concentric soundwave rings behind the hero text.
 * Radiates from a focal point left of center.
 * Pure CSS animation – Server Component.
 */

const CX = 28   // focal point: 28% from left
const CY = 50   // focal point: 50% from top

const RINGS = [
  { r: 140,  opacity: 0.13, duration: '2.8s', delay: '0s'    },
  { r: 230,  opacity: 0.10, duration: '3.2s', delay: '0.35s' },
  { r: 320,  opacity: 0.075,duration: '3.6s', delay: '0.7s'  },
  { r: 420,  opacity: 0.055,duration: '4.0s', delay: '1.05s' },
  { r: 520,  opacity: 0.035,duration: '4.4s', delay: '1.4s'  },
  { r: 640,  opacity: 0.022,duration: '4.8s', delay: '1.75s' },
  { r: 760,  opacity: 0.012,duration: '5.2s', delay: '2.1s'  },
] as const

export default function SoundwaveBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      {RINGS.map(({ r, opacity, duration, delay }, i) => (
        <div
          key={i}
          className="soundwave-circle absolute rounded-full"
          style={{
            width:  r * 2,
            height: r * 2,
            left:   `calc(${CX}% - ${r}px)`,
            top:    `calc(${CY}% - ${r}px)`,
            border: `1px solid rgba(139, 105, 20, ${opacity * 10})`,
            opacity,
            background: i === 0
              ? `radial-gradient(circle, rgba(139,105,20,0.04) 0%, transparent 70%)`
              : 'transparent',
            animation:  `soundwavePulse ${duration} ${delay} ease-in-out infinite`,
            willChange: 'transform',
            transform:  'translateZ(0)',
          }}
        />
      ))}
    </div>
  )
}
