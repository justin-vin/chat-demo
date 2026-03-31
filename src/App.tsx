import { ChatContainer } from './components/ChatContainer'

export default function App() {
  return (
    <div
      className="min-h-screen overflow-y-auto flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 35% 25%, #E2DDD6 0%, #CEC8C0 55%, #C4BDB5 100%)',
        padding: '2.5rem 1.5rem',
      }}
    >
      <div className="flex flex-col items-center">
        {/* Phone outer shell */}
        <div
          className="relative"
          style={{
            width: '393px',
            padding: '14px',
            borderRadius: '54px',
            background: 'linear-gradient(160deg, #EDEAE5 0%, #DEDAD4 45%, #D0CCC6 100%)',
            boxShadow: `
              22px 22px 60px rgba(0,0,0,0.16),
              -14px -14px 40px rgba(255,255,255,0.72),
              0 0 0 0.5px rgba(0,0,0,0.07),
              inset 0 1.5px 1px rgba(255,255,255,0.5),
              inset 0 -1px 1px rgba(0,0,0,0.05)
            `,
          }}
        >
          {/* Mute switch (top-left) */}
          <div
            className="absolute"
            style={{
              left: '-4px',
              top: '82px',
              width: '4px',
              height: '26px',
              borderRadius: '3px 0 0 3px',
              background: 'linear-gradient(to right, #BFBAB3, #D2CCC6)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          />
          {/* Volume up */}
          <div
            className="absolute"
            style={{
              left: '-4px',
              top: '128px',
              width: '4px',
              height: '58px',
              borderRadius: '3px 0 0 3px',
              background: 'linear-gradient(to right, #BFBAB3, #D2CCC6)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          />
          {/* Volume down */}
          <div
            className="absolute"
            style={{
              left: '-4px',
              top: '200px',
              width: '4px',
              height: '58px',
              borderRadius: '3px 0 0 3px',
              background: 'linear-gradient(to right, #BFBAB3, #D2CCC6)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          />
          {/* Power button (right) */}
          <div
            className="absolute"
            style={{
              right: '-4px',
              top: '152px',
              width: '4px',
              height: '76px',
              borderRadius: '0 3px 3px 0',
              background: 'linear-gradient(to left, #BFBAB3, #D2CCC6)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          />

          {/* Screen */}
          <div
            className="relative bg-bg overflow-hidden"
            style={{
              borderRadius: '40px',
              height: '780px',
            }}
          >
            {/* Subtle top gloss reflection */}
            <div
              className="absolute top-0 left-0 right-0 z-30 pointer-events-none"
              style={{
                height: '160px',
                borderRadius: '40px 40px 0 0',
                background: 'linear-gradient(165deg, rgba(255,255,255,0.055) 0%, transparent 55%)',
              }}
            />

            {/* Dynamic Island */}
            <div
              className="absolute top-0 left-0 right-0 z-20 flex justify-center"
              style={{ paddingTop: '11px' }}
            >
              <div
                style={{
                  width: '126px',
                  height: '36px',
                  background: '#000',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '14px',
                  gap: '6px',
                }}
              >
                {/* Speaker slit */}
                <div
                  style={{
                    width: '40px',
                    height: '4px',
                    borderRadius: '2px',
                    background: '#1a1a1a',
                    marginRight: 'auto',
                    marginLeft: '14px',
                  }}
                />
                {/* Camera dot */}
                <div
                  style={{
                    width: '11px',
                    height: '11px',
                    borderRadius: '50%',
                    background: '#111',
                    border: '1.5px solid #252525',
                    boxShadow: 'inset 0 0 0 2.5px #0a0a0a',
                  }}
                />
              </div>
            </div>

            {/* Home indicator */}
            <div
              className="absolute bottom-0 left-0 right-0 z-20 flex justify-center"
              style={{ paddingBottom: '8px' }}
            >
              <div
                style={{
                  width: '134px',
                  height: '5px',
                  borderRadius: '3px',
                  background: 'rgba(0,0,0,0.175)',
                }}
              />
            </div>

            {/* Chat fills the screen */}
            <ChatContainer />
          </div>
        </div>

        {/* Caption */}
        <div className="mt-9 text-center">
          <p
            className="text-[11px] font-medium tracking-[0.15em] uppercase"
            style={{ color: '#9E9890' }}
          >
            Thinking · Tools · Streaming
          </p>
        </div>
      </div>
    </div>
  )
}
