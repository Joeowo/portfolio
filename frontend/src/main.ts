import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

import './styles/reset.css'
import './styles/main.css'
import './styles/transitions.css'

// MSW (Mock Service Worker) - enabled for demo in production too
async function initMSW(): Promise<boolean> {
  // Check if we're in development mode
  const isDev = import.meta.env.DEV
  if (!isDev) {
    console.log('[MSW] Running in production demo mode with MSW')
    // Don't return - continue to enable MSW for demo
  }

  console.log('[MSW] Initializing MSW in development mode...')

  try {
    // Check if Service Worker is supported
    if (!('serviceWorker' in navigator)) {
      console.error('[MSW] Service Worker not supported in this browser')
      return false
    }

    const mswModule = await import('../mock/browser')
    console.log('[MSW] Module loaded:', Object.keys(mswModule))
    const { worker } = mswModule
    console.log('[MSW] Worker instance:', !!worker)

    // Start the worker with detailed options
    // Use relative path to work with both dev and production (with base path)
    await worker.start({
      onUnhandledRequest: 'warn',
      serviceWorker: {
        url: import.meta.env.BASE_URL + 'mockServiceWorker.js'
      }
    })

    console.log('[MSW] ✅ Worker started successfully')

    // Wait for Service Worker to be fully activated
    await new Promise<void>(resolve => {
      if (navigator.serviceWorker.controller) {
        console.log('[MSW] Service Worker controller already active')
        resolve()
      } else {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('[MSW] Service Worker controller changed (now active)')
          resolve()
        })
        // Timeout after 2 seconds
        setTimeout(() => {
          console.warn('[MSW] Service Worker activation timeout')
          resolve()
        }, 2000)
      }
    })

    // Additional wait for stability
    await new Promise(resolve => setTimeout(resolve, 100))

    console.log('[MSW] Service Worker is active and ready to intercept requests')

    // List handlers for debugging
    const handlers = worker.listHandlers()
    console.log(`[MSW] Registered ${handlers.length} request handlers`)

    return true
  } catch (error) {
    console.error('[MSW] ❌ Failed to start:', error)
    console.error('[MSW] Error details:', error instanceof Error ? error.message : error)
    return false
  }
}

async function setupApp() {
  // Initialize MSW first and wait for it to be ready
  console.log('[App] Starting application setup...')

  const mswReady = await initMSW()

  if (mswReady) {
    // Wait a bit for MSW to be fully ready
    console.log('[App] Waiting for MSW to stabilize...')
    await new Promise(resolve => setTimeout(resolve, 100))
    console.log('[App] MSW should be ready now')
  } else {
    console.warn('[App] MSW not ready, API requests will fail without a backend server')
  }

  const app = createApp(App)
  const pinia = createPinia()

  // Register Element Plus icons
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  app.use(pinia)
  app.use(router)
  app.use(ElementPlus, { zIndex: 3000 })

  app.mount('#app')

  console.log('[App] Application mounted')
}

setupApp().catch(console.error)
