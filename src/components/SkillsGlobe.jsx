import { useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { content } from '../data/content'

const GOLDEN = Math.PI * (3 - Math.sqrt(5))
const BASE_SPEED = 0.0032

export default function SkillsGlobe() {
  const items = useMemo(() => [...content.skillsRow1, ...content.skillsRow2], [])
  const wrapRef = useRef(null)
  const nodeRefs = useRef([])
  const reduce = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const N = items.length
    const points = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const t = GOLDEN * i
      return { x: Math.cos(t) * r, y, z: Math.sin(t) * r }
    })

    let rotY = 0.6
    let rotX = -0.28
    let velY = BASE_SPEED
    let velX = 0
    let dragging = false
    let lastX = 0
    let lastY = 0
    let raf

    const render = () => {
      const rect = wrap.getBoundingClientRect()
      const R = Math.min(rect.width, rect.height) / 2 - 52
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      points.forEach((p, i) => {
        const el = nodeRefs.current[i]
        if (!el) return
        const x1 = p.x * cosY + p.z * sinY
        const z1 = -p.x * sinY + p.z * cosY
        const y1 = p.y * cosX - z1 * sinX
        const z2 = p.y * sinX + z1 * cosX
        const depth = (z2 + 1) / 2
        const scale = 0.62 + depth * 0.58
        el.style.transform = `translate(-50%, -50%) translate(${x1 * R}px, ${y1 * R}px) scale(${scale})`
        el.style.opacity = (0.34 + depth * 0.66).toFixed(2)
        el.style.zIndex = String(100 + Math.round(z2 * 100))
      })
    }

    const tick = () => {
      if (!dragging) {
        rotY += velY
        rotX += velX
        velY += (BASE_SPEED - velY) * 0.02
        velX *= 0.95
        rotX += (-0.28 - rotX) * 0.008
      }
      render()
      raf = requestAnimationFrame(tick)
    }

    const down = (e) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      wrap.classList.add('grabbing')
    }
    const move = (e) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      rotY += dx * 0.005
      rotX = Math.max(-1.2, Math.min(1.2, rotX + dy * 0.004))
      velY = dx * 0.0007
      velX = dy * 0.0004
      render()
    }
    const up = () => {
      dragging = false
      wrap.classList.remove('grabbing')
    }

    wrap.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)

    if (reduce) {
      render()
    } else {
      raf = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [items, reduce])

  return (
    <div className="skills-panel">
      <div className="globe-wrap" ref={wrapRef} aria-label="Draggable globe of technologies — drag to rotate">
        <svg className="globe-wire" viewBox="0 0 400 400" aria-hidden="true">
          <circle cx="200" cy="200" r="168" />
          <ellipse cx="200" cy="200" rx="168" ry="64" />
          <ellipse cx="200" cy="200" rx="168" ry="126" />
          <ellipse cx="200" cy="200" rx="64" ry="168" />
          <ellipse cx="200" cy="200" rx="126" ry="168" />
          <ellipse cx="200" cy="200" rx="168" ry="126" transform="rotate(45 200 200)" />
          <ellipse cx="200" cy="200" rx="168" ry="126" transform="rotate(-45 200 200)" />
        </svg>
        {items.map((item, i) => (
          <div
            className="globe-item"
            key={item.name}
            ref={(el) => {
              nodeRefs.current[i] = el
            }}
          >
            <i className={item.icon} aria-hidden="true" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="drag-pill">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" />
        </svg>
        Drag to explore skills universe
      </div>
    </div>
  )
}
