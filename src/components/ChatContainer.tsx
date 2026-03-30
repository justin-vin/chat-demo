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

  // Auto-scroll to bottom
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
      // Use pre-scripted scenario
      engine.addUserMessage(text)
      await engine.playResponse(demoScenario[idx].response)
      scenarioIndexRef.current++
    } else {
      // Loop back or generic response
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
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-bg/80 backdrop-blur-xl">
        <div className="max-w-[700px] mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center">
            <span className="text-accent text-sm">✦</span>
          </div>
          <div>
            <h1 className="text-[15px] font-semibold text-text">Chat Demo</h1>
            <p className="text-[12px] text-text-dim">Simulated AI assistant experience</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="text-[12px] text-text-dim">Online</span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-[700px] mx-auto px-4 py-6">
          {state.messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <span className="text-accent text-2xl">✦</span>
              </div>
              <h2 className="text-[18px] font-semibold text-text mb-1">Chat Demo</h2>
              <p className="text-[14px] text-text-dim max-w-[400px] leading-relaxed">
                A simulated chat experience with thinking traces, tool calls, and streaming text.
                Try sending a message.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {demoScenario.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s.user)}
                    className="px-3 py-1.5 rounded-xl bg-surface border border-border text-[13px] text-text-secondary hover:bg-surface-hover hover:border-border-bright transition-all duration-200 cursor-pointer"
                  >
                    {s.user.length > 40 ? s.user.slice(0, 37) + '…' : s.user}
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
            ? 'Try asking about the project…'
            : state.isProcessing
              ? 'Thinking…'
              : 'Send a message…'
        }
      />
    </div>
  )
}
