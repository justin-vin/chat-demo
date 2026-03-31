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
    <div className="my-1 animate-[fade-in_0.3s_ease-out]">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`
          w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left
          transition-all duration-300 cursor-pointer
          ${isRunning
            ? 'bg-accent/[0.04]'
            : 'hover:bg-accent/[0.03]'
          }
        `}
      >
        <span className="text-[13px] flex-shrink-0 opacity-60">{renderer.icon}</span>
        <span className={`text-[13px] font-medium flex-shrink-0 ${isRunning ? 'text-text-secondary' : 'text-text-dim'}`}>
          {renderer.label}
        </span>
        <span className="flex-1 min-w-0 truncate">
          {renderer.renderCall(toolCall.args)}
        </span>
        {isRunning && (
          <span className="w-1.5 h-1.5 rounded-full bg-text-dim animate-[pulse-glow_1s_ease-in-out_infinite] flex-shrink-0" />
        )}
        {toolCall.status === 'done' && (
          <svg className={`w-3 h-3 text-text-dim/50 flex-shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {expanded && toolCall.result !== undefined && (
        <div className="ml-7 mr-2 animate-[fade-in_0.2s_ease-out]">
          {renderer.renderResult(toolCall.result)}
        </div>
      )}
    </div>
  )
}
