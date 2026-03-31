import { useState, useRef, useEffect } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled: boolean
  placeholder?: string
}

export function ChatInput({ onSend, disabled, placeholder = 'Message…' }: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [disabled])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = '22px'
    const next = Math.min(el.scrollHeight, 100)
    el.style.height = next + 'px'
  }, [value])

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = '22px'
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const hasText = value.trim().length > 0

  return (
    <div className="relative flex items-end gap-2 bg-white rounded-2xl px-4 py-3"
      style={{
        boxShadow: '0 1px 6px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
      }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        style={{ height: '22px', minHeight: '22px', maxHeight: '100px' }}
        className="flex-1 bg-transparent text-[15px] text-accent placeholder:text-text-dim resize-none outline-none leading-snug"
      />
      <button
        onClick={handleSubmit}
        disabled={!hasText || disabled}
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
        style={{
          background: hasText && !disabled ? '#1a1a1a' : '#E8E5E0',
          color: hasText && !disabled ? '#fff' : '#a8a29e',
        }}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
        </svg>
      </button>
    </div>
  )
}
