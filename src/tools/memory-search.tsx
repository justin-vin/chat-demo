import type { ToolRenderer } from './types'

export const memorySearchRenderer: ToolRenderer = {
  icon: '◉',
  label: 'Memory',

  renderCall(args) {
    return (
      <span className="text-text-dim text-[13px] truncate">
        {args.query || 'searching…'}
      </span>
    )
  },

  renderResult(result) {
    const results = Array.isArray(result) ? result : [result]
    return (
      <div className="mt-1.5 space-y-1">
        {results.slice(0, 3).map((r: any, i: number) => (
          <div key={i} className="bg-surface rounded-xl p-3 border border-border">
            <div className="text-[11px] text-text-dim font-mono mb-1">
              {r.path || 'MEMORY.md'}:{r.line || '?'}
            </div>
            <div className="text-[12px] text-text-secondary leading-relaxed">{r.text || r.snippet || String(r)}</div>
          </div>
        ))}
      </div>
    )
  },
}
