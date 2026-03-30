import { useState, useEffect, useRef } from 'react'

interface StreamingTextProps {
  text: string
  isStreaming: boolean
  speed?: number // ms per character
}

export function StreamingText({ text, isStreaming, speed = 12 }: StreamingTextProps) {
  const [displayed, setDisplayed] = useState(isStreaming ? '' : text)
  const cursorRef = useRef(isStreaming ? 0 : text.length)
  const prevTextRef = useRef(text)

  useEffect(() => {
    if (!isStreaming) {
      setDisplayed(text)
      cursorRef.current = text.length
      return
    }

    // If text grew, stream the new part
    const interval = setInterval(() => {
      if (cursorRef.current >= text.length) {
        clearInterval(interval)
        return
      }
      // Reveal 1-3 chars at a time for natural feel
      const chunk = Math.floor(Math.random() * 3) + 1
      cursorRef.current = Math.min(cursorRef.current + chunk, text.length)
      setDisplayed(text.slice(0, cursorRef.current))
    }, speed)

    return () => clearInterval(interval)
  }, [text, isStreaming, speed])

  // Update if text changes while not streaming
  useEffect(() => {
    if (!isStreaming && text !== prevTextRef.current) {
      setDisplayed(text)
      cursorRef.current = text.length
    }
    prevTextRef.current = text
  }, [text, isStreaming])

  return (
    <span className="whitespace-pre-wrap leading-relaxed">
      {displayed}
      {isStreaming && cursorRef.current < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-accent/80 ml-[1px] align-middle animate-[blink_1s_step-end_infinite]" />
      )}
    </span>
  )
}
