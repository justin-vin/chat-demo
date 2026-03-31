import type { ToolRenderer } from './types'

export const imageGenerateRenderer: ToolRenderer = {
  icon: '✦',
  label: 'Generate',

  renderCall(args) {
    const prompt = args.prompt || ''
    const display = prompt.length > 45 ? prompt.slice(0, 42) + '…' : prompt
    return (
      <span
        className="text-[12.5px] truncate italic"
        style={{ color: 'var(--color-text-dim)' }}
      >
        {display}
      </span>
    )
  },

  renderResult(result) {
    const url = typeof result === 'string' ? result : result?.url
    return (
      <div
        className="mt-1.5 overflow-hidden"
        style={{ borderRadius: '16px', border: '0.5px solid var(--color-border)' }}
      >
        {url ? (
          <img src={url} alt="Generated" className="w-full max-w-[280px]" />
        ) : (
          <div
            className="w-full max-w-[280px] flex flex-col items-center justify-center gap-3"
            style={{
              aspectRatio: '4/3',
              background: 'linear-gradient(145deg, #F5F2EE, #EDEAE5)',
              minHeight: '140px',
            }}
          >
            <div
              className="w-10 h-10 rounded-[12px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #EFECE8, #E8E4DE)',
                boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -2px -2px 7px rgba(255,255,255,0.8)',
              }}
            >
              <span className="text-lg" style={{ opacity: 0.4 }}>✦</span>
            </div>
            <span className="text-[12px]" style={{ color: 'var(--color-text-dim)' }}>
              Image generated
            </span>
          </div>
        )}
      </div>
    )
  },
}
