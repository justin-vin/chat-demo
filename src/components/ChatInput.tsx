import { useState, useRef, useEffect } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled: boolean
  placeholder?: string
}

export function ChatInput({ onSend, disabled, placeholder = 'Message…' }: ChatInputProps) {
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
    <div className="px-4 pb-2">
      <div className="flex items-end gap-2 bg-surface border border-border rounded-2xl px-4 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] focus-within:border-border-bright focus-within:shadow-[0_1px_6px_rgba(0,0,0,0.06)] transition-all duration-300">
        <textarea
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent text-[15px] text-accent placeholder-text-dim resize-none outline-none leading-relaxed max-h-[120px] py-0.5"
          style={{ minHeight: '24px' }}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || disabled}
          className={`
            flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
            transition-all duration-300
            ${value.trim() && !disabled
              ? 'bg-accent text-white cursor-pointer hover:opacity-80'
              : 'text-text-dim cursor-not-allowed opacity-30'
            }
          `}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
