/* ============================================
   Global Type Definitions
   ============================================ */

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly DEV: boolean
  readonly MODE: string
  readonly BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
