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
      <div className="flex justify-end mb-5 animate-[fade-in_0.3s_ease-out]">
        <div className="max-w-[85%] bg-accent/10 border border-accent/20 rounded-2xl rounded-br-md px-4 py-2.5">
          <p className="text-[15px] text-text leading-relaxed">{message.content}</p>
        </div>
      </div>
    )
  }

  // Assistant message
  return (
    <div className="flex justify-start mb-5 animate-[fade-in_0.3s_ease-out]">
      <div className="max-w-[85%] space-y-2">
        {/* Avatar + name */}
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-[11px]">✦</span>
          </div>
          <span className="text-[13px] text-text-secondary font-medium">Assistant</span>
        </div>

        {/* Segments */}
        <div className="space-y-3 pl-8">
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
    </div>
  )
}
