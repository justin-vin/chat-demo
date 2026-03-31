import type { ToolRenderer } from './types'

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url.slice(0, 28)
  }
}

export const webSearchRenderer: ToolRenderer = {
  icon: '◎',
  label: 'Search',

  renderCall(args) {
    return (
      <span className="text-[12.5px] truncate" style={{ color: 'var(--color-text-dim)' }}>
        {args.query || 'searching…'}
      </span>
    )
  },

  renderResult(result) {
    const results = Array.isArray(result) ? result : [result]
    return (
      <div className="mt-1.5 space-y-1.5">
        {results.slice(0, 3).map((r: any, i: number) => (
          <div
            key={i}
            className="rounded-[14px] p-3"
            style={{
              background: 'var(--color-surface)',
              border: '0.5px solid var(--color-border)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <div className="flex items-start gap-2">
              {/* Favicon initial */}
              <div
                className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'var(--color-surface-raised)' }}
              >
                <span className="text-[9px] font-semibold" style={{ color: 'var(--color-text-dim)' }}>
                  {getDomain(r.url || '').charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <div
                  className="text-[13px] font-medium truncate leading-snug"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {r.title}
                </div>
                <div
                  className="text-[10.5px] truncate mt-0.5"
                  style={{ color: 'var(--color-text-dim)' }}
                >
                  {getDomain(r.url || '')}
                </div>
              </div>
            </div>
            {r.snippet && (
              <p
                className="text-[12px] leading-relaxed mt-2 line-clamp-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {r.snippet}
              </p>
            )}
          </div>
        ))}
      </div>
    )
  },
}
