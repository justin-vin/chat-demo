import { useState } from 'react'
import type { ResponseSegment as Segment } from '../types/message'
import { ThinkingPill } from './ThinkingPill'
import { ToolCallBlock } from './ToolCallBlock'
import { StreamingText } from './StreamingText'

interface ResponseSegmentProps {
  segment: Segment
  isActive: boolean
  isStreaming: boolean
}

export function ResponseSegmentView({ segment, isActive, isStreaming }: ResponseSegmentProps) {
  const [traceOpen, setTraceOpen] = useState(false)
  const hasThinking = segment.thinking.length > 0
  const hasTools = segment.toolCalls.length > 0
  const hasText = segment.text.length > 0
  const hasTrace = hasThinking || hasTools

  return (
    <div className="space-y-1">
      {/* Thinking pill — collapsed by default, expands to show trace + tools */}
      {hasTrace && (
        <div>
          <ThinkingPill
            isActive={isActive && !hasText}
            durationMs={segment.thinkingDurationMs}
            onToggleTrace={() => setTraceOpen(!traceOpen)}
            traceOpen={traceOpen}
          />

          {/* Expanded trace: thinking steps + tool calls */}
          {traceOpen && (
            <div className="mt-2 ml-1 pl-3 border-l border-border space-y-1 animate-[fade-in_0.2s_ease-out]">
              {segment.thinking.map((step, i) => (
                <p key={`t-${i}`} className="text-[13px] text-text-dim leading-relaxed italic">
                  {step.text}
                </p>
              ))}
              {hasTools && segment.toolCalls.map(tc => (
                <ToolCallBlock key={tc.id} toolCall={tc} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Response text */}
      {hasText && (
        <div className="text-[15px] text-text leading-[1.65]">
          <StreamingText
            text={segment.text}
            isStreaming={isStreaming}
          />
        </div>
      )}
    </div>
  )
}
