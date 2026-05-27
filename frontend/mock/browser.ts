import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Setup MSW worker with all handlers
export const worker = setupWorker(...handlers)

// Log all handlers for debugging
console.log('[MSW] Worker created with', handlers.length, 'handlers')
handlers.forEach(h => {
  const method = typeof h.info.method === 'string' ? h.info.method.toUpperCase() : 'ALL'
  console.log(`[MSW] ${method} ${h.info.path}`)
})
