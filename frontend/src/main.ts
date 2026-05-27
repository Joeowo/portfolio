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
async function setupApp() {
  // Check if we're in development mode
  const isDev = import.meta.env.DEV
  console.log('[App] Environment check:', { isDev, MODE: import.meta.env.MODE })

  // Initialize mocks first in development
  if (isDev) {
    console.log('[App] Initializing MSW...')
    try {
      const mswModule = await import('../mock/browser')
      console.log('[App] MSW module loaded:', Object.keys(mswModule))
      const { worker } = mswModule
      console.log('[App] MSW worker:', !!worker)

      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js'
        }
      })
      console.log('[MSW] Mocking enabled')
      console.log('[MSW] Worker started successfully')
    } catch (error) {
      console.error('[MSW] Failed to start:', error)
    }
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
}

setupApp().catch(console.error)
