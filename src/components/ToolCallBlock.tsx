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
  const isError = toolCall.status === 'error'

  return (
    <div className="my-1.5 animate-[fade-in_0.3s_ease-out]">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`
          w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left
          transition-all duration-200 cursor-pointer border
          ${isRunning
            ? 'bg-accent/5 border-accent/15'
            : isError
              ? 'bg-error/5 border-error/15'
              : 'bg-surface/80 border-border hover:bg-surface-hover hover:border-border-bright'
          }
        `}
      >
        <span className="text-[14px] flex-shrink-0">{renderer.icon}</span>
        <span className={`text-[13px] font-medium flex-shrink-0 ${isRunning ? 'text-accent/80' : 'text-text-secondary'}`}>
          {renderer.label}
        </span>
        <span className="flex-1 min-w-0 truncate">
          {renderer.renderCall(toolCall.args)}
        </span>
        {isRunning && (
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-[pulse-glow_1s_ease-in-out_infinite] flex-shrink-0" />
        )}
        {toolCall.status === 'done' && (
          <svg className={`w-3.5 h-3.5 text-text-dim flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {expanded && toolCall.result !== undefined && (
        <div className="ml-6 animate-[fade-in_0.2s_ease-out]">
          {renderer.renderResult(toolCall.result)}
        </div>
      )}
    </div>
  )
}
