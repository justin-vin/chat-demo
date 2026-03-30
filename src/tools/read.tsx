import type { ToolRenderer } from './types'

function shortPath(path: string, max = 45): string {
  if (path.length <= max) return path
  const parts = path.split('/')
  return '…/' + parts.slice(-2).join('/')
}

export const readRenderer: ToolRenderer = {
  icon: '📄',
  label: 'Read',

  renderCall(args) {
    return (
      <span className="text-text-secondary text-[13px] font-mono truncate">
        {shortPath(args.path || args.file_path || 'file')}
      </span>
    )
  },

  renderResult(result) {
    const content = typeof result === 'string' ? result : JSON.stringify(result, null, 2)
    const lines = content.split('\n').slice(0, 20)
    return (
      <div className="bg-bg rounded-lg p-3 mt-1 border border-border overflow-hidden">
        <pre className="text-[12px] font-mono text-text-secondary leading-relaxed whitespace-pre-wrap break-all">
          {lines.join('\n')}
          {content.split('\n').length > 20 && (
            <span className="text-text-dim">{'\n'}… {content.split('\n').length - 20} more lines</span>
          )}
        </pre>
      </div>
    )
  },
}
