import type { ToolRenderer } from './types'

export const webSearchRenderer: ToolRenderer = {
  icon: '🔍',
  label: 'Search',

  renderCall(args) {
    return (
      <span className="text-text-secondary text-[13px] truncate">
        "{args.query || 'searching…'}"
      </span>
    )
  },

  renderResult(result) {
    const results = Array.isArray(result) ? result : [result]
    return (
      <div className="mt-1 space-y-1.5">
        {results.slice(0, 3).map((r: any, i: number) => (
          <div key={i} className="bg-bg rounded-lg p-2.5 border border-border">
            <div className="text-[13px] text-accent font-medium truncate">{r.title}</div>
            <div className="text-[11px] text-text-dim truncate mt-0.5">{r.url}</div>
            {r.snippet && (
              <div className="text-[12px] text-text-secondary mt-1 line-clamp-2">{r.snippet}</div>
            )}
          </div>
        ))}
      </div>
    )
  },
}
