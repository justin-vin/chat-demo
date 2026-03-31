import type { ToolRenderer } from './types'

export const execRenderer: ToolRenderer = {
  icon: '⌘',
  label: 'Terminal',

  renderCall(args) {
    const cmd = args.command || ''
    const display = cmd.length > 55 ? cmd.slice(0, 52) + '…' : cmd
    return (
      <span className="text-text-dim text-[13px] font-mono truncate">
        {display}
      </span>
    )
  },

  renderResult(result) {
    const output = typeof result === 'string' ? result : JSON.stringify(result, null, 2)
    const lines = output.split('\n').slice(0, 15)
    return (
      <div className="bg-[#1a1a1a] rounded-xl mt-1.5 overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2">
          <div className="w-[9px] h-[9px] rounded-full bg-[#ff5f57]" />
          <div className="w-[9px] h-[9px] rounded-full bg-[#febc2e]" />
          <div className="w-[9px] h-[9px] rounded-full bg-[#28c840]" />
        </div>
        <pre className="text-[12px] font-mono text-[#a8a29e] leading-relaxed px-3 pb-3 whitespace-pre-wrap break-all">
          {lines.join('\n')}
        </pre>
      </div>
    )
  },
}
