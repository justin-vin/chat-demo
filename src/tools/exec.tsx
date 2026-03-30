import type { ToolRenderer } from './types'

export const execRenderer: ToolRenderer = {
  icon: '$',
  label: 'Terminal',

  renderCall(args) {
    const cmd = args.command || ''
    const display = cmd.length > 60 ? cmd.slice(0, 57) + '…' : cmd
    return (
      <span className="text-text-secondary text-[13px] font-mono truncate">
        {display}
      </span>
    )
  },

  renderResult(result) {
    const output = typeof result === 'string' ? result : JSON.stringify(result, null, 2)
    const lines = output.split('\n').slice(0, 15)
    return (
      <div className="bg-bg rounded-lg mt-1 border border-border overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border">
          <div className="w-2 h-2 rounded-full bg-error/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-success/60" />
        </div>
        <pre className="text-[12px] font-mono text-success/80 leading-relaxed p-3 whitespace-pre-wrap break-all">
          {lines.join('\n')}
        </pre>
      </div>
    )
  },
}
