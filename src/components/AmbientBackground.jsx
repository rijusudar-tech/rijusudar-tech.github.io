const CLOUDS = [
  { top: '-8%', left: '56%', size: 640, color: '#e9e3f7', dur: 90, delay: 0 },
  { top: '20%', left: '-14%', size: 560, color: '#f7e8da', dur: 110, delay: -35 },
  { top: '52%', left: '68%', size: 600, color: '#f2e4ea', dur: 100, delay: -60 },
  { top: '74%', left: '4%', size: 640, color: '#e2f0e6', dur: 120, delay: -45 },
  { top: '36%', left: '32%', size: 470, color: '#e6ebf5', dur: 95, delay: -20 },
]

const BIRDS = [
  { top: '11%', left: '20%', dur: 10, delay: 0, scale: 1 },
  { top: '17%', left: '66%', dur: 12, delay: -4, scale: 0.8 },
  { top: '7%', left: '80%', dur: 14, delay: -8, scale: 1.15 },
  { top: '27%', left: '45%', dur: 11, delay: -2, scale: 0.7 },
]

function Bird({ scale }) {
  return (
    <svg viewBox="0 0 24 10" width={19 * scale} height={8 * scale} fill="none" aria-hidden="true">
      <path
        d="M1 7 Q6 1 12 6 Q18 1 23 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function AmbientBackground() {
  return (
    <div className="ambient-layer" aria-hidden="true">
      {CLOUDS.map((c, i) => (
        <span
          key={i}
          className="cloud"
          style={{
            top: c.top,
            left: c.left,
            width: c.size,
            height: Math.round(c.size * 0.62),
            background: c.color,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
      {BIRDS.map((b, i) => (
        <span
          key={`bird-${i}`}
          className="bird"
          style={{ top: b.top, left: b.left, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
        >
          <Bird scale={b.scale} />
        </span>
      ))}
    </div>
  )
}
