import { useState } from 'react'
import type { ToolCall } from '../types/message'
import { getToolRenderer } from '../tools/registry'

interface ToolCallBlockProps {
  toolCall: ToolCall
}

export function ToolCallBlock({ toolCall }: ToolCallBlockProps) {
  const [expanded, setExpanded] = useState(false)
  const renderer = getToolRenderer(toolCall.toolName)
  const isRunning = toolCall.status === 'calling'

  return (
    <div style={{ animation: 'fade-in 0.25s ease-out both', marginTop: '2px', marginBottom: '2px' }}>
      <button
        onClick={() => !isRunning && setExpanded(!expanded)}
        className="w-full flex items-center gap-2 rounded-xl text-left transition-all duration-200"
        style={{
          padding: '7px 10px',
          background: isRunning
            ? 'rgba(28,25,23,0.045)'
            : expanded
              ? 'rgba(28,25,23,0.03)'
              : 'transparent',
          cursor: isRunning ? 'default' : 'pointer',
        }}
      >
        <span className="text-[13px] flex-shrink-0" style={{ opacity: 0.45 }}>{renderer.icon}</span>
        <span
          className="text-[12.5px] font-medium flex-shrink-0"
          style={{ color: isRunning ? 'var(--color-text-secondary)' : 'var(--color-text-dim)' }}
        >
          {renderer.label}
        </span>
        <span className="flex-1 min-w-0 truncate">
          {renderer.renderCall(toolCall.args)}
        </span>
        {isRunning && (
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              background: 'var(--color-text-dim)',
              animation: 'pulse-dot 1s ease-in-out infinite',
            }}
          />
        )}
        {toolCall.status === 'done' && (
          <svg
            className={`w-3 h-3 flex-shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            style={{ color: 'rgba(168,162,158,0.5)' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {expanded && toolCall.result !== undefined && (
        <div
          className="mr-2"
          style={{
            marginLeft: '28px',
            animation: 'fade-in 0.2s ease-out both',
          }}
        >
          {renderer.renderResult(toolCall.result)}
        </div>
      )}
    </div>
  )
}
