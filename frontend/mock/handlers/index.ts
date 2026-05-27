// Export all handlers
export { authHandlers } from './auth'
export { assetsHandlers } from './assets'
export { worksHandlers } from './works'
export { templatesHandlers } from './templates'
export { pagesHandlers } from './pages'
export { adminHandlers } from './admin'

// Combined handlers array
import { authHandlers } from './auth'
import { assetsHandlers } from './assets'
import { worksHandlers } from './works'
import { templatesHandlers } from './templates'
import { pagesHandlers } from './pages'
import { adminHandlers } from './admin'

export const handlers = [
  ...authHandlers,
  ...assetsHandlers,
  ...worksHandlers,
  ...templatesHandlers,
  ...pagesHandlers,
  ...adminHandlers
]
