import type { ToolRenderer } from './types'

export const memorySearchRenderer: ToolRenderer = {
  icon: '🧠',
  label: 'Memory',

  renderCall(args) {
    return (
      <span className="text-text-secondary text-[13px] truncate">
        "{args.query || 'searching memory…'}"
      </span>
    )
  },

  renderResult(result) {
    const results = Array.isArray(result) ? result : [result]
    return (
      <div className="mt-1 space-y-1">
        {results.slice(0, 3).map((r: any, i: number) => (
          <div key={i} className="bg-bg rounded-lg p-2.5 border border-border">
            <div className="text-[11px] text-text-dim font-mono mb-1">
              {r.path || 'MEMORY.md'}:{r.line || '?'}
            </div>
            <div className="text-[12px] text-text-secondary">{r.text || r.snippet || String(r)}</div>
          </div>
        ))}
      </div>
    )
  },
}
