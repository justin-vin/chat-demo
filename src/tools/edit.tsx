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
      <span className="text-text-dim text-[13px] font-mono truncate">
        {shortPath(args.path || args.file_path || 'file')}
      </span>
    )
  },

  renderResult(result) {
    const oldText = result?.oldText || result?.old_string || ''
    const newText = result?.newText || result?.new_string || ''
    return (
      <div className="bg-surface rounded-xl mt-1.5 border border-border overflow-hidden font-mono text-[12px]">
        {oldText && (
          <div className="px-3 py-2 bg-[#FEF2F2] border-b border-border">
            <span className="text-[#B91C1C] opacity-60">− </span>
            <span className="text-[#B91C1C] opacity-50">{oldText.slice(0, 80)}</span>
          </div>
        )}
        {newText && (
          <div className="px-3 py-2 bg-[#F0FDF4]">
            <span className="text-[#166534] opacity-60">+ </span>
            <span className="text-[#166534] opacity-50">{newText.slice(0, 80)}</span>
          </div>
        )}
        {!oldText && !newText && (
          <div className="px-3 py-2 text-text-dim">File updated</div>
        )}
      </div>
    )
  },
}
