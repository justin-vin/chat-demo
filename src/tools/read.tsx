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
      <span className="text-[12.5px] font-mono truncate" style={{ color: 'var(--color-text-dim)' }}>
        {shortPath(args.path || args.file_path || 'file')}
      </span>
    )
  },

  renderResult(result) {
    const content = typeof result === 'string' ? result : JSON.stringify(result, null, 2)
    const allLines = content.split('\n')
    const lines = allLines.slice(0, 20)
    return (
      <div
        className="mt-1.5 overflow-hidden"
        style={{
          borderRadius: '12px',
          border: '0.5px solid var(--color-border)',
          background: '#FDFCFB',
        }}
      >
        <pre
          className="text-[11.5px] leading-relaxed whitespace-pre-wrap break-all p-3"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}
        >
          {lines.join('\n')}
          {allLines.length > 20 && (
            <span style={{ color: 'var(--color-text-dim)' }}>
              {'\n'}… {allLines.length - 20} more lines
            </span>
          )}
        </pre>
      </div>
    )
  },
}
