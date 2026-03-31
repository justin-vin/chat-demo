import { ChatContainer } from './components/ChatContainer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#E8E4DF] flex items-center justify-center p-8 md:p-16">
      <div className="w-full max-w-[1100px]">
        {/* Neumorphic device frame */}
        <div
          className="rounded-[28px] overflow-hidden"
          style={{
            background: '#F2EFEB',
            boxShadow: '12px 12px 30px rgba(0,0,0,0.1), -8px -8px 24px rgba(255,255,255,0.7), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}
        >
          {/* Top bar */}
          <div className="px-5 py-3.5 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#febc2e]" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div
                className="rounded-lg px-5 py-1.5 text-[11px] text-[#9a9590] font-mono tracking-wider"
                style={{
                  background: '#EAE7E2',
                  boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.06), inset -1px -1px 2px rgba(255,255,255,0.5)',
                }}
              >
                chat-demo.justin.vin
              </div>
            </div>
            <div className="w-[58px]" />
          </div>

          {/* Chat area — landscape ratio */}
          <div className="bg-bg" style={{ height: 'min(580px, 65vh)' }}>
            <ChatContainer />
          </div>
        </div>

        {/* Caption */}
        <div className="text-center mt-8">
          <p className="text-[12px] text-[#a8a29e] tracking-[0.08em] uppercase font-medium">
            AI Chat Experience — Thinking · Tools · Streaming
          </p>
        </div>
      </div>
    </div>
  )
}
