/**
 * Decorative vinyl record with VMP label.
 * Rotation via CSS scroll-driven animation (.vinyl-spin in globals.css).
 * Server Component.
 */

const CX = 210
const CY = 210

const GROOVE_RADII   = Array.from({ length: 32 }, (_, i) => 30 + i * 5) // 30→185
const HIGHLIGHT_RADII = [55, 85, 125, 162, 188]

export default function VinylRecord() {
  return (
    <div aria-hidden="true">
      <svg
        viewBox="0 0 420 420"
        className="vinyl-spin w-full h-full"
        style={{ filter: 'drop-shadow(0 24px 64px rgba(0,0,0,0.38))' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="vr-sheen" cx="32%" cy="28%" r="52%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="55%"  stopColor="#ffffff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="vr-label" cx="38%" cy="33%" r="65%">
            <stop offset="0%"   stopColor="#fdf9f3" />
            <stop offset="100%" stopColor="#e8dfc8" />
          </radialGradient>
        </defs>

        {/* Metallic rim */}
        <circle cx={CX} cy={CY} r={202} fill="#2a2018" />

        {/* Main disc */}
        <circle cx={CX} cy={CY} r={200} fill="#1a1410" />

        {/* Groove rings */}
        {GROOVE_RADII.map((r) => (
          <circle key={r} cx={CX} cy={CY} r={r}
            fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.7" />
        ))}

        {/* Gold highlight rings */}
        {HIGHLIGHT_RADII.map((r) => (
          <circle key={`h${r}`} cx={CX} cy={CY} r={r}
            fill="none" stroke="rgba(184,160,112,0.14)" strokeWidth="1.5" />
        ))}

        {/* Sheen */}
        <circle cx={CX} cy={CY} r={200} fill="url(#vr-sheen)" />

        {/* Center label – abstract, no branding */}
        <circle cx={CX} cy={CY} r={72} fill="url(#vr-label)" />

        {/* Gold rings on label */}
        <circle cx={CX} cy={CY} r={70} fill="none" stroke="#8b6914" strokeWidth="1" />
        <circle cx={CX} cy={CY} r={65} fill="none"
          stroke="#8b6914" strokeWidth="0.5" strokeDasharray="3 2" />

        {/* VMP heading */}
        <text
          x={CX} y={CY - 6}
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          letterSpacing="5"
          fill="#8b6914"
          fontFamily="Georgia, serif"
        >
          VMP
        </text>

        {/* Gold separator line */}
        <line
          x1={CX - 40} y1={CY + 4}
          x2={CX + 40} y2={CY + 4}
          stroke="#8b6914" strokeWidth="0.7" opacity="0.6"
        />

        {/* Vivid Music Productions */}
        <text
          x={CX} y={CY + 16}
          textAnchor="middle"
          fontSize="5.5"
          letterSpacing="1.8"
          fill="#8b6914"
          opacity="0.75"
          fontFamily="Georgia, serif"
        >
          VIVID MUSIC PRODUCTIONS
        </text>

        {/* Center hole */}
        <circle cx={CX} cy={CY} r={8} fill="#1a1410" />
        <circle cx={CX} cy={CY} r={3} fill="#2a2018" />
      </svg>
    </div>
  )
}
