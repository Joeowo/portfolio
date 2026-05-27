import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Setup MSW worker with all handlers
export const worker = setupWorker(...handlers)

// Log all handlers for debugging
console.log('[MSW] Worker created with', handlers.length, 'handlers')
handlers.forEach(h => {
  console.log(`[MSW] ${h.info.method.toUpperCase()} ${h.info.path}`)
})
