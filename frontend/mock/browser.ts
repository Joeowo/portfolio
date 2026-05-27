import { setupWorker } from 'msw/browser'
import { authHandlers } from './handlers/auth'
import { assetsHandlers } from './handlers/assets'
import { worksHandlers } from './handlers/works'
import { templatesHandlers } from './handlers/templates'
import { pagesHandlers } from './handlers/pages'
import { adminHandlers } from './handlers/admin'

// Combine all handlers
const allHandlers = [
  ...authHandlers,
  ...assetsHandlers,
  ...worksHandlers,
  ...templatesHandlers,
  ...pagesHandlers,
  ...adminHandlers
]

// Debug: Check handlers
console.log('[MSW] Importing handlers...')
console.log('[MSW] Total handlers:', allHandlers.length)

// Log each handler for debugging
allHandlers.forEach((h, index) => {
  console.log(`[MSW] Handler ${index}:`, {
    method: h.info?.method,
    path: h.info?.path
  })
})

// Setup MSW worker with all handlers
export const worker = setupWorker(...allHandlers)

console.log('[MSW] Worker created successfully')
