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
          thinking: [{ text: `Processing: "${text}"`, delayMs: 800 }],
          thinkingDurationMs: 1500,
          toolCalls: [],
          text: "That's all the pre-scripted scenarios! Refresh to restart. ✨",
        }],
      })
    }
  }, [state.isProcessing])

  return (
    <div className="h-full flex flex-col" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <div
        className="flex-shrink-0 pt-[58px] pb-3 px-5"
        style={{ borderBottom: '0.5px solid rgba(28,25,23,0.07)' }}
      >
        <div className="flex items-center">
          {/* Back */}
          <button className="w-9 h-9 flex items-center justify-center -ml-1.5 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#007AFF" strokeWidth={2.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Center group */}
          <div className="flex-1 flex flex-col items-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-0.5"
              style={{
                background: 'linear-gradient(145deg, #2E2B28, #18181B)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.22)',
              }}
            >
              <svg className="w-[18px] h-[18px]" fill="rgba(255,255,255,0.85)" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <div className="text-[15px] font-semibold tracking-[-0.015em]" style={{ color: 'var(--color-accent)' }}>
              Claude
            </div>
            <div className="flex items-center gap-1 mt-px">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#34C759', animation: 'pulse-dot 2.5s ease-in-out infinite' }}
              />
              <span className="text-[11px]" style={{ color: 'var(--color-text-dim)' }}>Online</span>
            </div>
          </div>

          {/* Video */}
          <button className="w-9 h-9 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#007AFF" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain"
      >
        <div className="px-4 py-4 pb-2">
          {state.messages.length === 0 && (
            <EmptyState onSend={handleSend} />
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

      {/* Input area — gradient fade, no external shadows to clip */}
      <div
        className="flex-shrink-0 px-4 pb-8 pt-2"
        style={{
          background: 'linear-gradient(to top, var(--color-bg) 80%, transparent)',
        }}
      >
        <ChatInput
          onSend={handleSend}
          disabled={state.isProcessing}
          placeholder={
            state.isProcessing ? 'Claude is thinking…' : 'Message…'
          }
        />
      </div>
    </div>
  )
}

function EmptyState({ onSend }: { onSend: (text: string) => void }) {
  return (
    <div
      className="flex flex-col items-center pt-14 pb-4"
      style={{ animation: 'fade-in 0.5s ease-out both' }}
    >
      {/* Icon */}
      <div
        className="w-[60px] h-[60px] rounded-[18px] flex items-center justify-center mb-5"
        style={{
          background: 'linear-gradient(145deg, #F5F2EE, #EDEAE5)',
          boxShadow: '6px 6px 16px rgba(0,0,0,0.07), -4px -4px 12px rgba(255,255,255,0.88)',
        }}
      >
        <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
          <path
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
            stroke="#B0A89E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2
        className="text-[18px] font-semibold tracking-[-0.025em] mb-1.5"
        style={{ color: 'var(--color-accent)' }}
      >
        What can I help with?
      </h2>
      <p
        className="text-[13px] leading-relaxed text-center px-6 mb-7"
        style={{ color: 'var(--color-text-dim)' }}
      >
        Try a demo to see thinking, tools,<br />and streaming in action.
      </p>

      {/* Suggestion chips */}
      <div className="flex flex-col gap-2 w-full">
        {demoScenario.map((s, i) => (
          <button
            key={i}
            onClick={() => onSend(s.user)}
            className="px-4 py-3 rounded-[18px] text-[13.5px] text-left transition-all duration-200 active:scale-[0.97]"
            style={{
              color: 'var(--color-text-secondary)',
              background: 'linear-gradient(145deg, #F5F2EE, #EDEAE4)',
              boxShadow: '3px 3px 9px rgba(0,0,0,0.055), -2px -2px 7px rgba(255,255,255,0.78)',
              animation: `slide-up 0.4s ease-out ${i * 70 + 200}ms both`,
            }}
          >
            <span className="mr-2 opacity-40">↗</span>
            {s.user}
          </button>
        ))}
      </div>
    </div>
  )
}
