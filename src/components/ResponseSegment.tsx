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
    <div className="space-y-2">
      {/* Thinking pill — collapsed by default */}
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
            <div
              className="mt-2 space-y-1"
              style={{
                marginLeft: '6px',
                paddingLeft: '12px',
                borderLeft: '1.5px solid rgba(28,25,23,0.08)',
                animation: 'fade-scale-in 0.2s ease-out both',
              }}
            >
              {segment.thinking.map((step, i) => (
                <p
                  key={`t-${i}`}
                  className="text-[12.5px] leading-[1.6] italic"
                  style={{ color: '#B5AFA9' }}
                >
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
        <div
          className="text-[15px] leading-[1.68] tracking-[-0.008em]"
          style={{ color: 'var(--color-text)' }}
        >
          <StreamingText
            text={segment.text}
            isStreaming={isStreaming}
          />
        </div>
      )}
    </div>
  )
}
