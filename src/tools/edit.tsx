import type { ToolRenderer } from './types'

function shortPath(path: string, max = 45): string {
  if (path.length <= max) return path
  const parts = path.split('/')
  return '…/' + parts.slice(-2).join('/')
}

export const editRenderer: ToolRenderer = {
  icon: '✎',
  label: 'Edit',

  renderCall(args) {
    return (
      <span className="text-[12.5px] font-mono truncate" style={{ color: 'var(--color-text-dim)' }}>
        {shortPath(args.path || args.file_path || 'file')}
      </span>
    )
  },

  renderResult(result) {
    const oldText = result?.oldText || result?.old_string || ''
    const newText = result?.newText || result?.new_string || ''
    return (
      <div
        className="mt-1.5 overflow-hidden font-mono text-[11.5px]"
        style={{
          borderRadius: '12px',
          border: '0.5px solid var(--color-border)',
          background: 'var(--color-surface)',
        }}
      >
        {oldText && (
          <div
            className="px-3 py-2"
            style={{
              background: 'rgba(220,38,38,0.05)',
              borderBottom: '0.5px solid rgba(220,38,38,0.12)',
            }}
          >
            <span style={{ color: '#DC2626', opacity: 0.7 }}>{'− '}</span>
            <span style={{ color: '#DC2626', opacity: 0.55 }}>{oldText.slice(0, 80)}</span>
          </div>
        )}
        {newText && (
          <div
            className="px-3 py-2"
            style={{ background: 'rgba(22,163,74,0.05)' }}
          >
            <span style={{ color: '#16A34A', opacity: 0.75 }}>{'+ '}</span>
            <span style={{ color: '#16A34A', opacity: 0.6 }}>{newText.slice(0, 80)}</span>
          </div>
        )}
        {!oldText && !newText && (
          <div className="px-3 py-2" style={{ color: 'var(--color-text-dim)' }}>
            File updated
          </div>
        )}
      </div>
    )
  },
}
