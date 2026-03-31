import { ChatContainer } from './components/ChatContainer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#E8E4DF] flex items-center justify-center p-8">
      <div className="flex flex-col items-center">
        {/* Phone frame — iPhone 15 proportions */}
        <div
          className="relative rounded-[44px] p-[12px]"
          style={{
            width: '400px',
            background: '#E0DCD7',
            boxShadow: '16px 16px 40px rgba(0,0,0,0.12), -10px -10px 30px rgba(255,255,255,0.7)',
          }}
        >
          {/* Screen */}
          <div
            className="rounded-[32px] overflow-hidden bg-bg relative"
            style={{ height: '780px' }}
          >
            {/* Notch / Dynamic Island */}
            <div className="absolute top-0 left-0 right-0 z-10 flex justify-center pt-2.5">
              <div className="w-[100px] h-[28px] bg-black rounded-full" />
            </div>

            {/* Chat fills the screen */}
            <ChatContainer />
          </div>
        </div>

        {/* Caption */}
        <div className="text-center mt-8">
          <p className="text-[11px] text-[#a8a29e] tracking-[0.12em] uppercase font-medium">
            AI Chat — Thinking · Tools · Streaming
          </p>
        </div>
      </div>
    </div>
  )
}
