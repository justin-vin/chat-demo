import type { ToolRenderer } from './types'

export const execRenderer: ToolRenderer = {
  icon: '⌘',
  label: 'Terminal',

  renderCall(args) {
    const cmd = args.command || ''
    const display = cmd.length > 52 ? cmd.slice(0, 49) + '…' : cmd
    return (
      <span className="text-[12.5px] font-mono truncate" style={{ color: 'var(--color-text-dim)' }}>
        {display}
      </span>
    )
  },

  renderResult(result) {
    const output = typeof result === 'string' ? result : JSON.stringify(result, null, 2)
    const lines = output.split('\n').slice(0, 14)
    return (
      <div
        className="mt-1.5 overflow-hidden"
        style={{ background: '#141210', borderRadius: '14px' }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5">
          <div className="w-[9px] h-[9px] rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-[9px] h-[9px] rounded-full" style={{ background: '#FEBC2E' }} />
          <div className="w-[9px] h-[9px] rounded-full" style={{ background: '#28C840' }} />
          <span
            className="text-[10px] ml-auto"
            style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-mono)' }}
          >
            bash
          </span>
        </div>
        <pre
          className="text-[11.5px] leading-relaxed whitespace-pre-wrap break-all pb-3 px-3"
          style={{ color: '#9E9891', fontFamily: 'var(--font-mono)' }}
        >
          <span style={{ color: '#5A9B5A', opacity: 0.9 }}>{'$ '}</span>
          {lines[0] || ''}
          {lines.length > 1 ? '\n' + lines.slice(1).join('\n') : ''}
        </pre>
      </div>
    )
  },
}
