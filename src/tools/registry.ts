import type { ToolRenderer } from './types'
import { readRenderer } from './read'
import { execRenderer } from './exec'
import { webSearchRenderer } from './web-search'
import { imageGenerateRenderer } from './image-generate'
import { editRenderer } from './edit'
import { memorySearchRenderer } from './memory-search'
import { genericRenderer } from './generic'

const registry = new Map<string, ToolRenderer>()

// Register built-in tools
registry.set('read', readRenderer)
registry.set('exec', execRenderer)
registry.set('web_search', webSearchRenderer)
registry.set('image_generate', imageGenerateRenderer)
registry.set('edit', editRenderer)
registry.set('memory_search', memorySearchRenderer)

/** Get renderer for a tool, falling back to generic */
export function getToolRenderer(toolName: string): ToolRenderer {
  return registry.get(toolName) || { ...genericRenderer, label: toolName }
}

/** Register a new tool renderer */
export function registerTool(name: string, renderer: ToolRenderer) {
  registry.set(name, renderer)
}

export { registry as toolRegistry }
