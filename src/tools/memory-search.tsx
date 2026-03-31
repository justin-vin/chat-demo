import type { ToolRenderer } from './types'

export const memorySearchRenderer: ToolRenderer = {
  icon: '◉',
  label: 'Memory',

  renderCall(args) {
    return (
      <span className="text-[12.5px] truncate" style={{ color: 'var(--color-text-dim)' }}>
        {args.query || 'searching…'}
      </span>
    )
  },

  renderResult(result) {
    const results = Array.isArray(result) ? result : [result]
    return (
      <div className="mt-1.5 space-y-1.5">
        {results.slice(0, 3).map((r: any, i: number) => (
          <div
            key={i}
            className="rounded-[12px] p-3"
            style={{
              background: 'var(--color-surface)',
              border: '0.5px solid var(--color-border)',
            }}
          >
            <div
              className="text-[10.5px] font-mono mb-1.5"
              style={{ color: 'var(--color-text-dim)' }}
            >
              {r.path || 'MEMORY.md'}:{r.line || '?'}
            </div>
            <div
              className="text-[12px] leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {r.text || r.snippet || String(r)}
            </div>
          </div>
        ))}
      </div>
    )
  },
}
