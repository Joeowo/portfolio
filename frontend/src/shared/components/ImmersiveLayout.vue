<script setup lang="ts">
interface Props {
  title?: string
}

defineProps<Props>()
</script>

<template>
  <div class="immersive-layout">
    <header v-if="title || $slots.header" class="immersive-layout__header">
      <slot name="header">
        <h1 class="immersive-layout__title">{{ title }}</h1>
      </slot>
    </header>

    <main class="immersive-layout__main">
      <slot />
    </main>

    <footer v-if="$slots.footer" class="immersive-layout__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.immersive-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-primary);
}

.immersive-layout__header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  display: flex;
  align-items: center;
  gap: var(--spacing-component-md);
  padding: var(--spacing-component-md) var(--spacing-screen-md);
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-subtle);
}

.immersive-layout__title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.immersive-layout__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-component-md);
}

.immersive-layout__footer {
  display: flex;
  align-items: center;
  gap: var(--spacing-component-md);
  padding: var(--spacing-component-md) var(--spacing-screen-md);
  border-top: 1px solid var(--color-border-subtle);
  background-color: var(--color-bg-secondary);
}
</style>
