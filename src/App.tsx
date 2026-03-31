import { ChatContainer } from './components/ChatContainer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#F0EDEA] flex items-center justify-center p-6 md:p-12">
      {/* Dribbble-style showcase wrapper */}
      <div className="w-full max-w-[800px]">
        {/* Browser chrome */}
        <div className="bg-[#E8E5E0] rounded-t-2xl px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-[#D6D0C8] rounded-lg px-4 py-1 text-[12px] text-[#8a8480] font-mono tracking-wide">
              chat-demo.justin.vin
            </div>
          </div>
          <div className="w-[54px]" /> {/* Balance the dots */}
        </div>

        {/* App container */}
        <div className="bg-bg rounded-b-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden" style={{ height: '680px' }}>
          <ChatContainer />
        </div>

        {/* Caption */}
        <div className="text-center mt-6">
          <p className="text-[13px] text-[#a8a29e] tracking-wide">
            AI Chat Experience — Thinking Traces · Tool Calls · Streaming
          </p>
        </div>
      </div>
    </div>
  )
}
