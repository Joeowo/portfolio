import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@features/auth/stores/authStore'

const routes: RouteRecordRaw[] = [
  // Auth Routes
  {
    path: '/login',
    name: 'Login',
    component: () => import('@features/auth/pages/LoginPage.vue'),
    meta: { layout: 'minimal' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@features/auth/pages/RegisterPage.vue'),
    meta: { layout: 'minimal' }
  },

  // Studio Routes
  {
    path: '/studio/assets',
    name: 'Assets',
    component: () => import('@features/studio/assets/pages/AssetsPage.vue'),
    meta: { layout: 'immersive', requiresAuth: true }
  },
  {
    path: '/studio/works',
    name: 'WorksList',
    component: () => import('@features/studio/works/pages/WorksListPage.vue'),
    meta: { layout: 'immersive', requiresAuth: true }
  },
  {
    path: '/studio/works/:id',
    name: 'WorkEditor',
    component: () => import('@features/studio/works/pages/WorkEditorPage.vue'),
    meta: { layout: 'immersive', requiresAuth: true }
  },

  // Publish Routes
  {
    path: '/publish/templates',
    name: 'Templates',
    component: () => import('@features/publish/templates/pages/TemplatesPage.vue'),
    meta: { layout: 'topnav', requiresAuth: true }
  },
  {
    path: '/publish/pages',
    name: 'Pages',
    component: () => import('@features/publish/pages/pages/PagesPage.vue'),
    meta: { layout: 'topnav', requiresAuth: true }
  },

  // Admin Routes
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('@features/admin/pages/DashboardPage.vue'),
    meta: { layout: 'sidebar', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/review',
    name: 'PagesReview',
    component: () => import('@features/admin/pages/PagesReviewPage.vue'),
    meta: { layout: 'sidebar', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/templates',
    name: 'TemplatesManage',
    component: () => import('@features/admin/pages/TemplatesManagePage.vue'),
    meta: { layout: 'sidebar', requiresAuth: true, requiresAdmin: true }
  },

  // Default Route
  {
    path: '/',
    redirect: '/studio/assets'
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/shared/components/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

// Navigation Guards
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  // Restore user from localStorage if not already loaded
  if (!authStore.user && authStore.token) {
    try {
      await authStore.getMe()
    } catch {
      // Token invalid, clear auth
      authStore.clearAuth()
    }
  }

  const isAuthenticated = authStore.isAuthenticated
  const isAdmin = authStore.isAdmin

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  // Check if route requires admin role
  if (to.meta.requiresAdmin && !isAdmin) {
    next('/studio/assets')
    return
  }

  // Redirect authenticated users away from login/register pages
  if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    const redirect = (to.query.redirect as string) || '/studio/assets'
    next(redirect)
    return
  }

  next()
})

export default router
