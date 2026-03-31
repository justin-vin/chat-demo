import type { ChatMessage } from '../types/message'
import { ResponseSegmentView } from './ResponseSegment'

interface MessageBubbleProps {
  message: ChatMessage
  isLatest: boolean
  activeSegmentIndex: number
  streamingSegmentIndex: number
}

export function MessageBubble({ message, isLatest, activeSegmentIndex, streamingSegmentIndex }: MessageBubbleProps) {
  if (message.role === 'user') {
    return (
      <div
        className="flex justify-end mb-5"
        style={{ animation: 'fade-in 0.25s ease-out both' }}
      >
        <div
          className="max-w-[78%] px-4 py-2.5 rounded-[20px] rounded-br-[5px]"
          style={{
            background: 'linear-gradient(160deg, #2A2724, #1C1917)',
            boxShadow: '0 2px 14px rgba(0,0,0,0.16)',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          <p className="text-[15px] leading-[1.5]">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex justify-start mb-5"
      style={{ animation: 'fade-in 0.25s ease-out both' }}
    >
      <div className="max-w-[90%] space-y-1.5">
        {message.segments.map((seg, i) => (
          <ResponseSegmentView
            key={i}
            segment={seg}
            isActive={isLatest && i === activeSegmentIndex}
            isStreaming={isLatest && i === streamingSegmentIndex}
          />
        ))}
      </div>
    </div>
  )
}
