import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Setup MSW worker with all handlers
export const worker = setupWorker(...handlers)

// Auto-initialize in development
if (import.meta.env.DEV) {
  worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  }).then(() => {
    console.log('[MSW] Mocking enabled')
    console.log('[MSW] Handlers registered:', handlers.length)
  }).catch((error) => {
    console.error('[MSW] Failed to start:', error)
  })
}
