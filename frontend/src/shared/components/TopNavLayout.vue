<script setup lang="ts">
import { ref } from 'vue'

interface NavItem {
  id: string
  label: string
  disabled?: boolean
}

interface Props {
  navItems?: NavItem[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  navItems: () => [],
  title: 'Portfolio'
})

const emit = defineEmits<{
  (e: 'nav-select', id: string): void
}>()

const activeNavId = ref<string>(props.navItems[0]?.id || '')

const selectNav = (id: string) => {
  if (activeNavId.value === id) return
  activeNavId.value = id
  emit('nav-select', id)
}
</script>

<template>
  <div class="topnav-layout">
    <header class="topnav-layout__header">
      <div class="topnav-layout__header-left">
        <h1 class="topnav-layout__title">{{ title }}</h1>
      </div>

      <nav v-if="navItems.length > 0" class="topnav-layout__nav">
        <button
          v-for="item in navItems"
          :key="item.id"
          :class="[
            'topnav-layout__nav-item',
            {
              'topnav-layout__nav-item--active': activeNavId === item.id,
              'topnav-layout__nav-item--disabled': item.disabled
            }
          ]"
          :disabled="item.disabled"
          @click="selectNav(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>

      <div v-if="$slots.actions" class="topnav-layout__header-right">
        <slot name="actions" />
      </div>
    </header>

    <main class="topnav-layout__main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.topnav-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-primary);
}

.topnav-layout__header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  display: flex;
  align-items: center;
  gap: var(--spacing-component-lg);
  padding: 0 var(--spacing-screen-md);
  height: 64px;
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-subtle);
}

.topnav-layout__header-left {
  display: flex;
  align-items: center;
}

.topnav-layout__title {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-primary);
}

.topnav-layout__nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-element-xs);
  flex: 1;
}

.topnav-layout__nav-item {
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  font-weight: var(--font-weight-regular);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-fast);
  white-space: nowrap;
}

.topnav-layout__nav-item:hover:not(.topnav-layout__nav-item--disabled) {
  color: var(--color-text-primary);
  background-color: var(--color-bg-secondary);
}

.topnav-layout__nav-item--active {
  color: var(--color-text-primary);
  background-color: var(--color-bg-secondary);
}

.topnav-layout__nav-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.topnav-layout__header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-element-sm);
  margin-left: auto;
}

.topnav-layout__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-component-md);
}

@media (max-width: 768px) {
  .topnav-layout__header {
    height: auto;
    flex-wrap: wrap;
    padding: var(--spacing-component-md);
  }

  .topnav-layout__nav {
    order: 3;
    width: 100%;
    overflow-x: auto;
    padding-bottom: var(--spacing-element-xs);
  }

  .topnav-layout__header-right {
    margin-left: auto;
  }
}
</style>
