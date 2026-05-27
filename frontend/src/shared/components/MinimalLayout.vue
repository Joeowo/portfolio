<script setup lang="ts">
interface Props {
  maxWidth?: string
}

withDefaults(defineProps<Props>(), {
  maxWidth: '480px'
})
</script>

<template>
  <div class="minimal-layout">
    <div class="minimal-layout__container">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.minimal-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-screen-md);
  background-color: var(--color-bg-primary);
}

.minimal-layout__container {
  width: 100%;
  max-width: v-bind(maxWidth);
}

@media (max-width: 640px) {
  .minimal-layout {
    padding: var(--spacing-component-md);
    align-items: flex-start;
  }

  .minimal-layout__container {
    margin-top: var(--spacing-screen-md);
  }
}
</style>
