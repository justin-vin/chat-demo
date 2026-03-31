import { useState, useEffect, useRef } from 'react'

interface ThinkingPillProps {
  isActive: boolean
  durationMs: number
  onToggleTrace: () => void
  traceOpen: boolean
}

export function ThinkingPill({ isActive, durationMs, onToggleTrace, traceOpen }: ThinkingPillProps) {
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(Date.now())

  useEffect(() => {
    if (!isActive) {
      setElapsed(Math.round(durationMs / 1000))
      return
    }
    startRef.current = Date.now()
    const tick = () => setElapsed(Math.round((Date.now() - startRef.current) / 1000))
    tick()
    const id = setInterval(tick, 100)
    return () => clearInterval(id)
  }, [isActive, durationMs])

  return (
    <button
      onClick={onToggleTrace}
      className="inline-flex items-center gap-1.5 rounded-full transition-all duration-300 cursor-pointer group"
      style={{
        padding: '5px 10px 5px 8px',
        background: isActive
          ? 'rgba(28,25,23,0.065)'
          : traceOpen
            ? 'rgba(28,25,23,0.045)'
            : 'rgba(28,25,23,0.03)',
        border: '0.5px solid',
        borderColor: isActive ? 'rgba(28,25,23,0.1)' : 'rgba(28,25,23,0.06)',
      }}
    >
      {/* Sparkle icon — animated while thinking */}
      <span
        className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 transition-opacity"
        style={{
          opacity: isActive ? 1 : 0.38,
          animation: isActive ? 'pulse-dot 1.4s ease-in-out infinite' : 'none',
        }}
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 0.75L7.35 4.65L11.25 6L7.35 7.35L6 11.25L4.65 7.35L0.75 6L4.65 4.65L6 0.75Z"
            fill="#A8A29E"
          />
        </svg>
      </span>

      <span
        className="text-[12px] font-mono tabular-nums transition-colors"
        style={{ color: isActive ? 'var(--color-text-secondary)' : 'var(--color-text-dim)' }}
      >
        {isActive ? 'Thinking…' : `Thought for ${elapsed}s`}
      </span>

      <svg
        className={`w-3 h-3 flex-shrink-0 transition-transform duration-300 ${traceOpen ? 'rotate-180' : ''}`}
        style={{ color: 'rgba(168,162,158,0.55)', marginLeft: '1px' }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}
