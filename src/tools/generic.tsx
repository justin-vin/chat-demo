import type { ToolRenderer } from './types'

export const genericRenderer: ToolRenderer = {
  icon: '⚙️',
  label: 'Tool',

  renderCall(args) {
    const summary = Object.entries(args).slice(0, 2)
      .map(([k, v]) => `${k}: ${String(v).slice(0, 30)}`)
      .join(', ')
    return (
      <span className="text-text-secondary text-[13px] truncate">
        {summary || '…'}
      </span>
    )
  },

  renderResult(result) {
    const content = typeof result === 'string' ? result : JSON.stringify(result, null, 2)
    return (
      <div className="bg-bg rounded-lg p-3 mt-1 border border-border">
        <pre className="text-[12px] font-mono text-text-secondary leading-relaxed whitespace-pre-wrap break-all">
          {content.slice(0, 500)}
        </pre>
      </div>
    )
  },
}
