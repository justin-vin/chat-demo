import { useState, useEffect, useRef } from 'react'

interface ThinkingPillProps {
  isActive: boolean
  durationMs: number
  thinkingSteps: { text: string; timestamp: number }[]
  onToggleTrace: () => void
  traceOpen: boolean
}

export function ThinkingPill({ isActive, durationMs, thinkingSteps, onToggleTrace, traceOpen }: ThinkingPillProps) {
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
    <div className="inline-flex flex-col items-start">
      <button
        onClick={onToggleTrace}
        className={`
          inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px]
          font-mono transition-all duration-300 cursor-pointer
          ${isActive
            ? 'bg-accent/[0.06] text-text-secondary'
            : 'bg-transparent text-text-dim hover:bg-accent/[0.04] hover:text-text-secondary'
          }
        `}
      >
        {isActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-text-dim animate-[pulse-glow_1.5s_ease-in-out_infinite]" />
        )}
        <span className="tabular-nums">{elapsed}s</span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${traceOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {traceOpen && thinkingSteps.length > 0 && (
        <div className="mt-2 ml-1 pl-3 border-l border-border space-y-2 animate-[fade-in_0.2s_ease-out]">
          {thinkingSteps.map((step, i) => (
            <p key={i} className="text-[13px] text-text-dim leading-relaxed italic">
              {step.text}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
