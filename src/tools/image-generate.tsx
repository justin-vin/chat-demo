import type { ToolRenderer } from './types'

export const imageGenerateRenderer: ToolRenderer = {
  icon: '✦',
  label: 'Generate',

  renderCall(args) {
    const prompt = args.prompt || ''
    const display = prompt.length > 45 ? prompt.slice(0, 42) + '…' : prompt
    return (
      <span className="text-text-dim text-[13px] truncate italic">
        {display}
      </span>
    )
  },

  renderResult(result) {
    const url = typeof result === 'string' ? result : result?.url
    return (
      <div className="mt-1.5 rounded-2xl overflow-hidden border border-border">
        {url ? (
          <img src={url} alt="Generated" className="w-full max-w-[280px] rounded-2xl" />
        ) : (
          <div className="w-full max-w-[280px] aspect-square bg-surface-bright flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2 opacity-30">✦</div>
              <div className="text-[12px] text-text-dim">Image generated</div>
            </div>
          </div>
        )}
      </div>
    )
  },
}
