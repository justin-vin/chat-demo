import type { ToolRenderer } from './types'

function shortPath(path: string, max = 45): string {
  if (path.length <= max) return path
  const parts = path.split('/')
  return '…/' + parts.slice(-2).join('/')
}

export const editRenderer: ToolRenderer = {
  icon: '✏️',
  label: 'Edit',

  renderCall(args) {
    return (
      <span className="text-text-secondary text-[13px] font-mono truncate">
        {shortPath(args.path || args.file_path || 'file')}
      </span>
    )
  },

  renderResult(result) {
    const oldText = result?.oldText || result?.old_string || ''
    const newText = result?.newText || result?.new_string || ''
    return (
      <div className="bg-bg rounded-lg mt-1 border border-border overflow-hidden font-mono text-[12px]">
        {oldText && (
          <div className="px-3 py-1.5 bg-error/5 border-b border-border">
            <span className="text-error/70">- </span>
            <span className="text-error/50">{oldText.slice(0, 80)}</span>
          </div>
        )}
        {newText && (
          <div className="px-3 py-1.5 bg-success/5">
            <span className="text-success/70">+ </span>
            <span className="text-success/50">{newText.slice(0, 80)}</span>
          </div>
        )}
        {!oldText && !newText && (
          <div className="px-3 py-1.5 text-text-dim">File updated</div>
        )}
      </div>
    )
  },
}
