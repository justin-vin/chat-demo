import { useRef, useEffect, useState, useCallback } from 'react'
import { MessageBubble } from './MessageBubble'
import { ChatInput } from './ChatInput'
import { SimulationEngine } from '../simulation/engine'
import { demoScenario } from '../simulation/scenarios'

export function ChatContainer() {
  const [state, setState] = useState({
    messages: [] as any[],
    activeSegmentIndex: -1,
    streamingSegmentIndex: -1,
    isProcessing: false,
  })
  const engineRef = useRef<SimulationEngine | null>(null)
  const scenarioIndexRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    engineRef.current = new SimulationEngine(setState)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [state.messages, state.activeSegmentIndex, state.streamingSegmentIndex])

  const handleSend = useCallback(async (text: string) => {
    if (!engineRef.current || state.isProcessing) return
    const engine = engineRef.current
    const idx = scenarioIndexRef.current

    if (idx < demoScenario.length) {
      engine.addUserMessage(text)
      await engine.playResponse(demoScenario[idx].response)
      scenarioIndexRef.current++
    } else {
      engine.addUserMessage(text)
      await engine.playResponse({
        steps: [{
          thinking: [
            { text: `Processing: "${text}"`, delayMs: 800 },
          ],
          thinkingDurationMs: 1500,
          toolCalls: [],
          text: "That's all the pre-scripted scenarios! In a real app, this would connect to an LLM. Try refreshing to restart the demo. ✨",
        }],
      })
    }
  }, [state.isProcessing])

  return (
    <div className="h-full flex flex-col items-center">
      {/* Centered container */}
      <div className="w-full max-w-[640px] h-full flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 pt-8 pb-4 px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-7v4h4l-5 7z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-[16px] font-semibold tracking-[-0.01em] text-accent">Assistant</h1>
              <p className="text-[12px] text-text-dim tracking-wide">Online</p>
            </div>
          </div>
        </header>

        {/* Divider */}
        <div className="mx-4 border-b border-border" />

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="px-4 py-6">
            {state.messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[55vh] text-center">
                <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-text-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </div>
                <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-accent mb-1.5">Start a conversation</h2>
                <p className="text-[14px] text-text-dim max-w-[360px] leading-relaxed mb-8">
                  See thinking traces, tool calls, and streaming text in action.
                </p>
                <div className="flex flex-col gap-2 w-full max-w-[360px]">
                  {demoScenario.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(s.user)}
                      className="px-4 py-2.5 rounded-xl bg-surface border border-border text-[14px] text-text-secondary text-left hover:bg-surface-hover hover:border-border-bright transition-all duration-200 cursor-pointer"
                    >
                      {s.user}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {state.messages.map((msg, i) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isLatest={i === state.messages.length - 1}
                activeSegmentIndex={i === state.messages.length - 1 ? state.activeSegmentIndex : -1}
                streamingSegmentIndex={i === state.messages.length - 1 ? state.streamingSegmentIndex : -1}
              />
            ))}
          </div>
        </div>

        {/* Input */}
        <ChatInput
          onSend={handleSend}
          disabled={state.isProcessing}
          placeholder={
            state.messages.length === 0
              ? 'Ask anything…'
              : state.isProcessing
                ? 'Thinking…'
                : 'Message…'
          }
        />

        {/* Footer spacer */}
        <div className="h-2" />
      </div>
    </div>
  )
}
