import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

import './styles/reset.css'
import './styles/main.css'
import './styles/transitions.css'

// MSW (Mock Service Worker) - only in development
async function initMSW(): Promise<boolean> {
  // Check if we're in development mode
  const isDev = import.meta.env.DEV
  if (!isDev) return false

  console.log('[App] Initializing MSW...')
  try {
    const mswModule = await import('../mock/browser')
    console.log('[MSW] module loaded:', Object.keys(mswModule))
    const { worker } = mswModule
    console.log('[MSW] worker:', !!worker)

    await worker.start({
      onUnhandledRequest: 'warn',
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    })
    console.log('[MSW] Mocking enabled')
    console.log('[MSW] Worker started successfully')
    return true
  } catch (error) {
    console.error('[MSW] Failed to start:', error)
    return false
  }
}

async function setupApp() {
  // Initialize MSW first
  await initMSW()

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
}

setupApp().catch(console.error)
