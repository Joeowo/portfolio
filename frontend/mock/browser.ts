import { setupWorker, http } from 'msw/browser'

// Mock handlers will be added here
const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', () => {
    return new Response(
      JSON.stringify({
        code: 200,
        msg: 'success',
        data: {
          accessToken: 'mock-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: 7200
        }
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  }),

  http.get('/api/auth/me', () => {
    return new Response(
      JSON.stringify({
        code: 200,
        msg: 'success',
        data: {
          id: 1,
          username: 'demo',
          nickname: 'Demo User',
          role: 'USER',
          createdAt: '2024-01-01T00:00:00Z'
        }
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  })
]

// Setup MSW worker
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
  })
}
