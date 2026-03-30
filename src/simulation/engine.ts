import type { ChatMessage, ResponseSegment, ToolCall } from '../types/message'
import type { SimulatedResponse } from './scenarios'
import { delay } from './timing'

let idCounter = 0
function nextId() {
  return `msg-${++idCounter}`
}

export type UpdateCallback = (messages: ChatMessage[]) => void

interface EngineState {
  messages: ChatMessage[]
  activeSegmentIndex: number
  streamingSegmentIndex: number
  isProcessing: boolean
}

export class SimulationEngine {
  private state: EngineState = {
    messages: [],
    activeSegmentIndex: -1,
    streamingSegmentIndex: -1,
    isProcessing: false,
  }

  private onUpdate: (state: EngineState) => void

  constructor(onUpdate: (state: EngineState) => void) {
    this.onUpdate = onUpdate
  }

  private emit() {
    this.onUpdate({ ...this.state })
  }

  getState() {
    return this.state
  }

  addUserMessage(content: string): ChatMessage {
    const msg: ChatMessage = {
      id: nextId(),
      role: 'user',
      content,
      segments: [],
      createdAt: Date.now(),
    }
    this.state.messages = [...this.state.messages, msg]
    this.emit()
    return msg
  }

  async playResponse(response: SimulatedResponse) {
    this.state.isProcessing = true

    // Create assistant message shell
    const assistantMsg: ChatMessage = {
      id: nextId(),
      role: 'assistant',
      content: '',
      segments: [],
      createdAt: Date.now(),
    }
    this.state.messages = [...this.state.messages, assistantMsg]
    this.emit()

    const msgIndex = this.state.messages.length - 1

    for (let stepIdx = 0; stepIdx < response.steps.length; stepIdx++) {
      const step = response.steps[stepIdx]

      // Build segment progressively
      const segment: ResponseSegment = {
        thinking: [],
        thinkingDurationMs: 0,
        toolCalls: [],
        text: '',
      }

      // Add segment to message
      assistantMsg.segments = [...assistantMsg.segments, segment]
      this.state.activeSegmentIndex = stepIdx
      this.state.streamingSegmentIndex = -1
      this.state.messages = [...this.state.messages]
      this.state.messages[msgIndex] = { ...assistantMsg }
      this.emit()

      // Phase 1: Thinking
      for (const thought of step.thinking) {
        await delay(thought.delayMs)
        segment.thinking = [...segment.thinking, { text: thought.text, timestamp: Date.now() }]
        segment.thinkingDurationMs += thought.delayMs
        assistantMsg.segments = assistantMsg.segments.map((s, i) => i === stepIdx ? { ...segment } : s)
        this.state.messages = [...this.state.messages]
        this.state.messages[msgIndex] = { ...assistantMsg, segments: [...assistantMsg.segments] }
        this.emit()
      }

      // Remaining thinking time
      const remainingThink = step.thinkingDurationMs - step.thinking.reduce((a, t) => a + t.delayMs, 0)
      if (remainingThink > 0) {
        await delay(remainingThink)
      }
      segment.thinkingDurationMs = step.thinkingDurationMs

      // Phase 2: Tool calls
      for (const tc of step.toolCalls) {
        const toolCall: ToolCall = {
          id: tc.id,
          toolName: tc.toolName,
          args: tc.args,
          status: 'calling',
          startedAt: Date.now(),
        }
        segment.toolCalls = [...segment.toolCalls, toolCall]
        assistantMsg.segments = assistantMsg.segments.map((s, i) => i === stepIdx ? { ...segment } : s)
        this.state.messages = [...this.state.messages]
        this.state.messages[msgIndex] = { ...assistantMsg, segments: [...assistantMsg.segments] }
        this.emit()

        await delay(tc.executionMs)

        // Complete tool call
        const completedTc: ToolCall = {
          ...toolCall,
          result: tc.result,
          status: 'done',
          completedAt: Date.now(),
        }
        segment.toolCalls = segment.toolCalls.map(t => t.id === tc.id ? completedTc : t)
        assistantMsg.segments = assistantMsg.segments.map((s, i) => i === stepIdx ? { ...segment } : s)
        this.state.messages = [...this.state.messages]
        this.state.messages[msgIndex] = { ...assistantMsg, segments: [...assistantMsg.segments] }
        this.emit()
      }

      // Phase 3: Stream text
      if (step.text) {
        this.state.streamingSegmentIndex = stepIdx
        segment.text = step.text
        assistantMsg.segments = assistantMsg.segments.map((s, i) => i === stepIdx ? { ...segment } : s)
        this.state.messages = [...this.state.messages]
        this.state.messages[msgIndex] = { ...assistantMsg, segments: [...assistantMsg.segments] }
        this.emit()

        // Wait for streaming to visually complete
        await delay(step.text.length * 14 + 200)
        this.state.streamingSegmentIndex = -1
        this.emit()
      }
    }

    this.state.activeSegmentIndex = -1
    this.state.isProcessing = false
    this.emit()
  }
}
