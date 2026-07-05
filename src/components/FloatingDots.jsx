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
  'rgba(124, 107, 184, 0.55)',
  'rgba(124, 107, 184, 0.35)',
  'rgba(232, 103, 74, 0.4)',
  'rgba(44, 74, 110, 0.35)',
  'rgba(154, 132, 224, 0.5)',
]

export default function FloatingDots({ count = 160 }) {
  const dots = useMemo(() => {
    const rand = mulberry32(2026)
    return Array.from({ length: count }, (_, i) => {
      const size = 1.5 + rand() * 2.8
      return {
        id: i,
        left: rand() * 100,
        top: rand() * 100,
        size,
        color: COLORS[Math.floor(rand() * COLORS.length)],
        duration: 6 + rand() * 10,
        delay: -rand() * 16,
        drift: 8 + rand() * 18,
        sway: rand() > 0.5 ? 1 : -1,
      }
    })
  }, [count])

  return (
    <div className="dots-layer" aria-hidden="true">
      {dots.map((d) => (
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
            '--sway': `${d.sway * (d.drift / 3)}px`,
          }}
        />
      ))}
    </div>
  )
}
