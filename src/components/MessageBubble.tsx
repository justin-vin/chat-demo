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
      <div className="flex justify-end mb-6 animate-[fade-in_0.3s_ease-out]">
        <div className="max-w-[80%] bg-user-bubble rounded-[20px] rounded-br-[6px] px-4 py-2.5">
          <p className="text-[15px] text-user-text leading-relaxed">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-6 animate-[fade-in_0.3s_ease-out]">
      <div className="max-w-[88%] space-y-2">
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
