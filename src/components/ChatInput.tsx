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
    /* Neumorphic inset design — all shadows go INWARD so nothing clips outside container */
    <div
      className="flex items-end gap-3 px-4 py-3 rounded-[22px]"
      style={{
        background: 'linear-gradient(145deg, #F3EFE9, #EDE8E2)',
        boxShadow: `
          inset 2px 2px 5px rgba(0,0,0,0.08),
          inset -1.5px -1.5px 4px rgba(255,255,255,0.9),
          0 1px 2px rgba(0,0,0,0.04)
        `,
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
        style={{
          height: '22px',
          minHeight: '22px',
          maxHeight: '100px',
          color: 'var(--color-accent)',
        }}
        className="flex-1 bg-transparent text-[15px] placeholder:text-[#B5AFA9] resize-none outline-none leading-snug"
      />
      <button
        onClick={handleSubmit}
        disabled={!hasText || disabled}
        className="flex-shrink-0 w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
        style={{
          background: hasText && !disabled
            ? 'linear-gradient(145deg, #2E2B28, #1C1917)'
            : 'transparent',
          boxShadow: hasText && !disabled
            ? '0 2px 8px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.1)'
            : 'none',
          color: hasText && !disabled ? '#fff' : '#C0BAB2',
          transform: hasText && !disabled ? 'scale(1)' : 'scale(0.9)',
        }}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
        </svg>
      </button>
    </div>
  )
}
