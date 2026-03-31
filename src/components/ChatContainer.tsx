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
    <div className="h-full flex flex-col">
      {/* Messages — scrollable area */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-[620px] mx-auto px-6 py-8">
          {state.messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[380px] text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background: '#F2EFEB',
                  boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -3px -3px 8px rgba(255,255,255,0.8)',
                }}
              >
                <svg className="w-6 h-6 text-text-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-accent mb-1">Start a conversation</h2>
              <p className="text-[14px] text-text-dim max-w-[340px] leading-relaxed mb-8">
                Thinking traces, tool calls, and streaming text.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-[480px]">
                {demoScenario.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s.user)}
                    className="px-4 py-2 rounded-xl text-[13px] text-text-secondary text-left transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: '#F2EFEB',
                      boxShadow: '3px 3px 8px rgba(0,0,0,0.05), -2px -2px 6px rgba(255,255,255,0.7)',
                    }}
                  >
                    {s.user.length > 42 ? s.user.slice(0, 39) + '…' : s.user}
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

      {/* Input — fixed at bottom with proper spacing */}
      <div className="flex-shrink-0 max-w-[620px] w-full mx-auto px-6 pb-5 pt-2">
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
      </div>
    </div>
  )
}
