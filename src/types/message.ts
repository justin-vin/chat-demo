export type MessageRole = 'user' | 'assistant'

export interface ThinkingStep {
  text: string
  timestamp: number
}

export interface ToolCall {
  id: string
  toolName: string
  args: Record<string, any>
  result?: any
  status: 'calling' | 'done' | 'error'
  startedAt: number
  completedAt?: number
}

export interface ResponseSegment {
  thinking: ThinkingStep[]
  thinkingDurationMs: number
  toolCalls: ToolCall[]
  text: string
}

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string // For user messages
  segments: ResponseSegment[] // For assistant messages
  createdAt: number
}
