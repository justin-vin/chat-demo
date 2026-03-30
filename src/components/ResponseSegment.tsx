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

  return (
    <div className="space-y-1">
      {/* Thinking pill — inline before text */}
      {hasThinking && (
        <div className="flex items-start gap-2">
          <ThinkingPill
            isActive={isActive && !hasText && !hasTools}
            durationMs={segment.thinkingDurationMs}
            thinkingSteps={segment.thinking}
            onToggleTrace={() => setTraceOpen(!traceOpen)}
            traceOpen={traceOpen}
          />
        </div>
      )}

      {/* Tool calls */}
      {hasTools && (
        <div className="space-y-0.5">
          {segment.toolCalls.map(tc => (
            <ToolCallBlock key={tc.id} toolCall={tc} />
          ))}
        </div>
      )}

      {/* Response text */}
      {hasText && (
        <div className="text-[15px] text-text leading-relaxed">
          <StreamingText
            text={segment.text}
            isStreaming={isStreaming}
          />
        </div>
      )}
    </div>
  )
}
