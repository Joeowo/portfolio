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
const setupMocks = () =>
  import.meta.env.DEV
    ? import('../mock/browser').then(() => {
        /* MSW initialized in browser.ts */
      })
    : Promise.resolve()

const app = createApp(App)
const pinia = createPinia()

// Register Element Plus icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus, { zIndex: 3000 })

// Initialize mocks before mounting
setupMocks().then(() => {
  app.mount('#app')
})
