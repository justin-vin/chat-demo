import type { ToolRenderer } from './types'

export const imageGenerateRenderer: ToolRenderer = {
  icon: '🎨',
  label: 'Generate Image',

  renderCall(args) {
    const prompt = args.prompt || ''
    const display = prompt.length > 50 ? prompt.slice(0, 47) + '…' : prompt
    return (
      <span className="text-text-secondary text-[13px] truncate">
        "{display}"
      </span>
    )
  },

  renderResult(result) {
    const url = typeof result === 'string' ? result : result?.url
    return (
      <div className="mt-1 rounded-xl overflow-hidden border border-border bg-surface">
        {url ? (
          <img src={url} alt="Generated" className="w-full max-w-[320px] rounded-xl" />
        ) : (
          <div className="w-full max-w-[320px] aspect-square bg-surface-bright flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-2">🎨</div>
              <div className="text-[12px] text-text-dim">Image generated</div>
            </div>
          </div>
        )}
      </div>
    )
  },
}
