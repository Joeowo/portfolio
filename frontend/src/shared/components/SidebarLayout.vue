<script setup lang="ts">
import { ref, computed } from 'vue'

interface MenuItem {
  id: string
  label: string
  icon?: string
  disabled?: boolean
}

interface Props {
  menuItems?: MenuItem[]
  collapsed?: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  menuItems: () => [],
  collapsed: false,
  title: 'Admin'
})

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void
  (e: 'menu-select', id: string): void
}>()

const activeMenuId = ref<string>(props.menuItems[0]?.id || '')
const isCollapsed = ref(props.collapsed)

const sidebarWidth = computed(() => (isCollapsed.value ? '64px' : '200px'))

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit('update:collapsed', isCollapsed.value)
}

const selectMenu = (id: string) => {
  if (activeMenuId.value === id) return
  activeMenuId.value = id
  emit('menu-select', id)
}
</script>

<template>
  <div class="sidebar-layout">
    <aside class="sidebar-layout__sidebar" :style="{ '--sidebar-width': sidebarWidth }">
      <div class="sidebar-layout__sidebar-header">
        <span v-if="!isCollapsed" class="sidebar-layout__title">
          {{ title }}
        </span>
        <button
          class="sidebar-layout__toggle"
          :class="{ 'sidebar-layout__toggle--collapsed': isCollapsed }"
          @click="toggleCollapse"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M5 3L10 8L5 13"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <nav class="sidebar-layout__nav">
        <button
          v-for="item in menuItems"
          :key="item.id"
          :class="[
            'sidebar-layout__menu-item',
            {
              'sidebar-layout__menu-item--active': activeMenuId === item.id,
              'sidebar-layout__menu-item--disabled': item.disabled
            }
          ]"
          :title="isCollapsed ? item.label : ''"
          :disabled="item.disabled"
          @click="selectMenu(item.id)"
        >
          <span v-if="item.icon" class="sidebar-layout__menu-icon">
            {{ item.icon }}
          </span>
          <span v-if="!isCollapsed" class="sidebar-layout__menu-label">
            {{ item.label }}
          </span>
        </button>
      </nav>
    </aside>

    <main class="sidebar-layout__main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.sidebar-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-bg-primary);
}

.sidebar-layout__sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  width: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-secondary);
  border-right: 1px solid var(--color-border-default);
  transition: width var(--duration-normal) var(--ease-out);
  flex-shrink: 0;
  z-index: var(--z-sticky);
}

.sidebar-layout__sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-component-md);
  border-bottom: 1px solid var(--color-border-subtle);
  min-height: 56px;
}

.sidebar-layout__title {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
}

.sidebar-layout__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: none;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
}

.sidebar-layout__toggle:hover {
  border-color: var(--color-border-strong);
  color: var(--color-text-primary);
}

.sidebar-layout__toggle--collapsed {
  transform: rotate(180deg);
}

.sidebar-layout__nav {
  flex: 1;
  padding: var(--spacing-component-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-element-xs);
}

.sidebar-layout__menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-element-sm);
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  color: var(--color-text-secondary);
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-fast);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-layout__menu-item:hover:not(.sidebar-layout__menu-item--disabled) {
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

.sidebar-layout__menu-item--active {
  background-color: var(--color-bg-elevated);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
}

.sidebar-layout__menu-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sidebar-layout__menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sidebar-layout__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
</style>
