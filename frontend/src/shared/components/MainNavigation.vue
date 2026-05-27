<script setup lang="ts">
/**
 * MainNavigation - 全局导航菜单
 * 遵循 Nothing Design System
 */
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/authStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// 是否显示导航
const showNav = computed(() => {
  // 登录页面不显示导航
  return route.name !== 'Login' && route.name !== 'Register'
})

// 当前用户
const user = computed(() => authStore.user)

// 导航项
const navItems = computed(() => {
  const items = [
    { path: '/studio/assets', label: 'ASSETS', icon: '01' },
    { path: '/studio/works', label: 'WORKS', icon: '02' },
    { path: '/publish/templates', label: 'TEMPLATES', icon: '03' },
    { path: '/publish/pages', label: 'PAGES', icon: '04' }
  ]

  // 管理员可以看到管理后台
  if (authStore.isAdmin) {
    items.push({ path: '/admin', label: 'ADMIN', icon: '05' })
  }

  return items
})

// 当前激活的导航项
const activePath = computed(() => route.path)

// 导航到指定路径
const navigate = (path: string) => {
  router.push(path)
}

// 登出
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

// 显示用户菜单
const showUserMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

// 用户名首字母
const userInitial = computed(() => {
  return (
    user.value?.nickname?.charAt(0).toUpperCase() ||
    user.value?.username?.charAt(0).toUpperCase() ||
    'U'
  )
})
</script>

<template>
  <Transition name="nav">
    <nav v-if="showNav" class="main-navigation">
      <!-- Logo -->
      <div class="main-navigation__logo">
        <span class="logo-text">PORTFOLIO</span>
      </div>

      <!-- 导航链接 -->
      <div class="main-navigation__links">
        <button
          v-for="item in navItems"
          :key="item.path"
          :class="['nav-link', { 'nav-link--active': activePath.startsWith(item.path) }]"
          @click="navigate(item.path)"
        >
          <span class="nav-link__icon">{{ item.icon }}</span>
          <span class="nav-link__label">{{ item.label }}</span>
        </button>
      </div>

      <!-- 用户菜单 -->
      <div class="main-navigation__user">
        <button class="user-menu-button" @click="toggleUserMenu">
          <span class="user-avatar">{{ userInitial }}</span>
        </button>

        <Transition name="dropdown">
          <div v-if="showUserMenu" class="user-dropdown">
            <div class="user-dropdown__info">
              <span class="user-dropdown__name">{{ user?.nickname || user?.username }}</span>
              <span class="user-dropdown__role">{{
                user?.role === 'ADMIN' ? '管理员' : '创作者'
              }}</span>
            </div>
            <div class="user-dropdown__divider"></div>
            <button class="user-dropdown__item" @click="handleLogout">[退出登录]</button>
          </div>
        </Transition>
      </div>
    </nav>
  </Transition>
</template>

<style scoped>
.main-navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-screen-md);
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-subtle);
  z-index: var(--z-sticky);
}

/* Logo */
.main-navigation__logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-family: var(--font-family-display);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
  letter-spacing: 0.05em;
}

/* 导航链接 */
.main-navigation__links {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-1) var(--spacing-element-md);
  border: none;
  background: transparent;
  cursor: pointer;
  transition: var(--transition-fast);
}

.nav-link:hover {
  background: var(--color-bg-tertiary);
}

.nav-link--active {
  background: var(--color-bg-tertiary);
}

.nav-link__icon {
  font-family: var(--font-family-display);
  font-size: var(--font-size-h4);
  color: var(--color-text-disabled);
}

.nav-link--active .nav-link__icon {
  color: var(--color-text-display);
}

.nav-link__label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.nav-link--active .nav-link__label {
  color: var(--color-text-display);
}

/* 用户菜单 */
.main-navigation__user {
  position: relative;
}

.user-menu-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-full);
  background: var(--color-bg-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
}

.user-menu-button:hover {
  border-color: var(--color-border-strong);
}

.user-avatar {
  font-family: var(--font-family-display);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
}

/* 下拉菜单 */
.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--spacing-2);
  min-width: 200px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-elevated);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.user-dropdown__info {
  padding: var(--spacing-element-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.user-dropdown__name {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.user-dropdown__role {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.user-dropdown__divider {
  height: 1px;
  background: var(--color-border-subtle);
}

.user-dropdown__item {
  width: 100%;
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  border: none;
  background: transparent;
  text-align: left;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  transition: var(--transition-fast);
}

.user-dropdown__item:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-error-text);
}

/* 动画 */
.nav-enter-active,
.nav-leave-active {
  transition: opacity var(--duration-fast) var(--ease-out);
}

.nav-enter-from,
.nav-leave-to {
  opacity: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
