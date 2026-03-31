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
    el.style.height = '24px'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }, [value])

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = '24px'
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div
      className="flex items-end gap-3 rounded-2xl px-4 py-3"
      style={{
        background: '#F2EFEB',
        boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 4px rgba(255,255,255,0.6)',
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
        className="flex-1 bg-transparent text-[15px] text-accent placeholder:text-text-dim resize-none outline-none leading-relaxed"
        style={{ height: '24px', minHeight: '24px', maxHeight: '120px' }}
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim() || disabled}
        className={`
          flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center
          transition-all duration-200 active:scale-95
          ${value.trim() && !disabled
            ? 'bg-accent text-white cursor-pointer'
            : 'text-text-dim cursor-not-allowed opacity-20'
          }
        `}
        style={value.trim() && !disabled ? {
          boxShadow: '2px 2px 6px rgba(0,0,0,0.15), -1px -1px 3px rgba(255,255,255,0.3)',
        } : {}}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
        </svg>
      </button>
    </div>
  )
}
