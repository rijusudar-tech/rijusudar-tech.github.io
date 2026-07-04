import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const T = (type, text) => ({ type, text })

const LINES = [
  [T('cm', '// Welcome to my workspace')],
  [
    T('kw', 'import'),
    T('pn', ' { '),
    T('cmp', 'Developer'),
    T('pn', ' } '),
    T('kw', 'from'),
    T('str', " './trivandrum'"),
    T('pn', ';'),
  ],
  [],
  [T('kw', 'const'), T('cmp', ' Portfolio'), T('pn', ' = '), T('fn', '()'), T('pn', ' => {')],
  [T('pn', '  '), T('kw', 'return'), T('pn', ' (')],
  [T('pn', '    <'), T('cmp', 'Developer')],
  [T('pn', '      '), T('attr', 'name'), T('pn', '='), T('strb', '"Riju Sudar"')],
  [T('pn', '      '), T('attr', 'role'), T('pn', '='), T('str', '"UI Architect & Lead Engineer"')],
  [T('pn', '      '), T('attr', 'experience'), T('pn', '='), T('str', '"14+ years"')],
  [T('pn', '      '), T('attr', 'passion'), T('pn', '='), T('str', '"Interfaces that think"')],
  [T('pn', '    />')],
  [T('pn', '  );')],
  [T('pn', '};')],
]

export default function CodeWindow() {
  const reduce = useReducedMotion()

  const { offsets, total } = useMemo(() => {
    let running = 0
    const offs = LINES.map((line) =>
      line.map((token) => {
        const start = running
        running += token.text.length
        return start
      })
    )
    return { offsets: offs, total: running }
  }, [])

  const [budget, setBudget] = useState(reduce ? total : 0)

  useEffect(() => {
    if (reduce || budget >= total) return
    const timer = setTimeout(() => setBudget((b) => Math.min(total, b + 2)), 24)
    return () => clearTimeout(timer)
  }, [budget, total, reduce])

  const done = budget >= total

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="code-window">
      <div className="cw-bar">
        <span className="cw-dot r" />
        <span className="cw-dot y" />
        <span className="cw-dot g" />
        <span className="cw-tab">
          <span className="cw-tab-dot" /> portfolio.tsx
        </span>
      </div>
      <div className="cw-body" aria-label="Code snippet introducing Riju Sudar">
        <pre>
          {LINES.map((line, li) => (
            <div className="cw-line" key={li}>
              <span className="cw-num">{li + 1}</span>
              <span className="cw-code">
                {line.map((token, ti) => {
                  const start = offsets[li][ti]
                  const visible = Math.max(0, Math.min(token.text.length, budget - start))
                  if (visible === 0) return null
                  return (
                    <span className={`tk-${token.type}`} key={ti}>
                      {token.text.slice(0, visible)}
                    </span>
                  )
                })}
                {!done && budget >= (offsets[li][0] ?? 0) && budget <= (offsets[li + 1]?.[0] ?? total) && (
                  <span className="cw-caret" aria-hidden="true" />
                )}
              </span>
            </div>
          ))}
        </pre>
        <div className={`cw-actions ${done ? 'ready' : ''}`}>
          <button type="button" className="cw-btn run" onClick={() => go('about')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Run Profile
          </button>
          <button type="button" className="cw-btn" onClick={() => go('work')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            View Projects
          </button>
        </div>
      </div>
      <div className="cw-status">
        <span>⌥ main</span>
        <span>UTF-8</span>
        <span>React 19</span>
        <span className="grow" />
        <span>14 yrs uptime</span>
      </div>
    </div>
  )
}
