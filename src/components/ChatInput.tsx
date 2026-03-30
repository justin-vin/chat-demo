import { useState, useRef, useEffect } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled: boolean
  placeholder?: string
}

export function ChatInput({ onSend, disabled, placeholder = 'Send a message…' }: ChatInputProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus()
    }
  }, [disabled])

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="border-t border-border bg-bg/80 backdrop-blur-xl">
      <div className="max-w-[700px] mx-auto px-4 py-3">
        <div className="flex items-end gap-2 bg-surface border border-border rounded-2xl px-4 py-2 focus-within:border-accent/30 transition-colors duration-200">
          <textarea
            ref={inputRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent text-[15px] text-text placeholder-text-dim resize-none outline-none leading-relaxed max-h-[120px] py-1"
            style={{ minHeight: '24px' }}
          />
          <button
            onClick={handleSubmit}
            disabled={!value.trim() || disabled}
            className={`
              flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center
              transition-all duration-200
              ${value.trim() && !disabled
                ? 'bg-accent text-bg cursor-pointer hover:bg-accent/90'
                : 'bg-surface-bright text-text-dim cursor-not-allowed'
              }
            `}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
