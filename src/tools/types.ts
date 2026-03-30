import type { ReactNode } from 'react'

export interface ToolRenderer {
  icon: string
  label: string
  renderCall(args: Record<string, any>): ReactNode
  renderResult(result: any): ReactNode
}
