import { useMemo } from 'react'

function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const COLORS = [
  'rgba(154, 132, 224, 0.55)',
  'rgba(124, 107, 184, 0.5)',
  'rgba(232, 103, 74, 0.42)',
  'rgba(236, 72, 153, 0.38)',
  'rgba(133, 183, 235, 0.55)',
  'rgba(93, 202, 165, 0.5)',
  'rgba(244, 191, 79, 0.5)',
  'rgba(113, 113, 122, 0.4)',
  'rgba(175, 169, 236, 0.6)',
  'rgba(240, 153, 123, 0.45)',
]

export default function FloatingDots({ count = 240, sparkles = 18 }) {
  const items = useMemo(() => {
    const rand = mulberry32(2026)
    const dots = Array.from({ length: count }, (_, i) => {
      const big = rand() < 0.12
      return {
        id: `d${i}`,
        kind: 'dot',
        left: rand() * 100,
        top: rand() * 100,
        size: big ? 3 + rand() * 1.5 : 1 + rand() * 2,
        color: COLORS[Math.floor(rand() * COLORS.length)],
        duration: 7 + rand() * 11,
        delay: -rand() * 18,
        drift: 5 + rand() * 11,
        sway: (rand() > 0.5 ? 1 : -1) * (2 + rand() * 5),
      }
    })
    const stars = Array.from({ length: sparkles }, (_, i) => ({
      id: `s${i}`,
      kind: 'sparkle',
      left: rand() * 100,
      top: rand() * 100,
      size: 6 + rand() * 4,
      duration: 3 + rand() * 3.5,
      delay: -rand() * 6,
    }))
    return [...dots, ...stars]
  }, [count, sparkles])

  return (
    <div className="dots-layer" aria-hidden="true">
      {items.map((d) =>
        d.kind === 'dot' ? (
          <span
            key={d.id}
            className="fdot"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              background: d.color,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
              '--drift': `${-d.drift}px`,
              '--sway': `${d.sway}px`,
            }}
          />
        ) : (
          <span
            key={d.id}
            className="fsparkle"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
            }}
          />
        )
      )}
    </div>
  )
}
