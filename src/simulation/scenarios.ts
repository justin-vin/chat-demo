import type { ToolCall } from '../types/message'

export interface SimulatedStep {
  thinking: { text: string; delayMs: number }[]
  thinkingDurationMs: number
  toolCalls: (Omit<ToolCall, 'status' | 'startedAt' | 'completedAt'> & { executionMs: number })[]
  text: string
}

export interface SimulatedResponse {
  steps: SimulatedStep[]
}

export interface ScenarioMessage {
  user: string
  response: SimulatedResponse
}

export const demoScenario: ScenarioMessage[] = [
  {
    user: "What's in this project? Give me an overview.",
    response: {
      steps: [
        {
          thinking: [
            { text: "The user wants to understand the project structure. Let me check the files…", delayMs: 800 },
            { text: "I should read the main config and source files to give a good overview.", delayMs: 1200 },
          ],
          thinkingDurationMs: 3000,
          toolCalls: [
            {
              id: 'tc-1',
              toolName: 'read',
              args: { path: 'package.json' },
              result: `{
  "name": "chat-demo",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}`,
              executionMs: 400,
            },
            {
              id: 'tc-2',
              toolName: 'exec',
              args: { command: 'find src -type f -name "*.tsx" | head -12' },
              result: `src/App.tsx
src/main.tsx
src/components/ChatContainer.tsx
src/components/MessageBubble.tsx
src/components/ThinkingPill.tsx
src/components/StreamingText.tsx
src/components/ToolCallBlock.tsx
src/components/ChatInput.tsx
src/tools/registry.ts
src/simulation/engine.ts`,
              executionMs: 600,
            },
          ],
          text: "This is a **React + Vite** chat demo with a modular architecture. Here's the breakdown:\n\n• **Components** — ChatContainer, MessageBubble, ThinkingPill, StreamingText, and ToolCallBlock handle the UI\n• **Tool system** — Registry-based renderers in `src/tools/` for extensible tool call display\n• **Simulation** — Pre-scripted scenarios in `src/simulation/` drive the demo\n\nThe project uses Tailwind for styling with a dark theme. Pretty clean setup — want me to dig into any specific part?",
        },
      ],
    },
  },
  {
    user: "Search for best practices in React chat UIs",
    response: {
      steps: [
        {
          thinking: [
            { text: "Let me search for modern React chat UI patterns and best practices.", delayMs: 600 },
            { text: "I should look for virtualization, streaming, and accessibility patterns.", delayMs: 1000 },
          ],
          thinkingDurationMs: 2000,
          toolCalls: [
            {
              id: 'tc-3',
              toolName: 'web_search',
              args: { query: 'React chat UI best practices 2025 streaming' },
              result: [
                {
                  title: 'Building Real-time Chat UIs with React — Vercel Blog',
                  url: 'https://vercel.com/blog/react-chat-ui',
                  snippet: 'Best practices for building streaming chat interfaces including virtualized lists, optimistic updates, and accessible message rendering.',
                },
                {
                  title: 'The AI SDK Chat Pattern — ai.sdk.vercel.dev',
                  url: 'https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot',
                  snippet: 'useChat hook provides real-time streaming, tool call handling, and message management out of the box.',
                },
                {
                  title: 'Accessible Chat Components — A11y Guidelines',
                  url: 'https://www.a11y-chat.dev/guidelines',
                  snippet: 'ARIA live regions, keyboard navigation, and screen reader support for real-time chat applications.',
                },
              ],
              executionMs: 1200,
            },
          ],
          text: "Here are the key patterns from the research:\n\n1. **Virtualized scrolling** — Use `react-window` or similar for long message lists. Don't render 1000 DOM nodes.\n2. **Optimistic updates** — Show user messages immediately, don't wait for server confirmation.\n3. **Streaming chunks** — Render text as it arrives, not all at once. The AI SDK's `useChat` handles this well.\n4. **ARIA live regions** — Announce new messages to screen readers with `aria-live=\"polite\"`.\n5. **Scroll anchoring** — Auto-scroll to bottom for new messages, but respect manual scroll position.\n\nThe Vercel AI SDK's chat pattern is basically the gold standard for this right now.",
        },
      ],
    },
  },
  {
    user: "Generate a logo concept and update the config",
    response: {
      steps: [
        {
          thinking: [
            { text: "They want a logo and config update. I'll generate the image first, then edit the config.", delayMs: 500 },
          ],
          thinkingDurationMs: 1500,
          toolCalls: [
            {
              id: 'tc-4',
              toolName: 'image_generate',
              args: { prompt: 'Minimal geometric chat bubble logo, neon green accent on dark background, modern tech aesthetic' },
              result: { url: '' },
              executionMs: 2000,
            },
            {
              id: 'tc-5',
              toolName: 'memory_search',
              args: { query: 'project branding logo preferences' },
              result: [
                { path: 'MEMORY.md', line: 42, text: 'Dark mode only for all projects. Accent: #c8ff00' },
                { path: 'memory/2026-03-28.md', line: 15, text: 'Logo should be minimal, geometric. No gradients.' },
              ],
              executionMs: 300,
            },
            {
              id: 'tc-6',
              toolName: 'edit',
              args: { path: 'src/config.ts', old_string: "logo: '/default.svg'", new_string: "logo: '/logo-chat.svg'" },
              result: { oldText: "logo: '/default.svg'", newText: "logo: '/logo-chat.svg'" },
              executionMs: 200,
            },
          ],
          text: "Done! I generated a minimal geometric chat bubble logo with the `#c8ff00` accent — matches your brand guidelines from memory. Updated the config to reference the new logo file.\n\nThe logo uses clean lines and negative space to form the chat bubble shape. Want me to iterate on the design or adjust the colors?",
        },
      ],
    },
  },
]
