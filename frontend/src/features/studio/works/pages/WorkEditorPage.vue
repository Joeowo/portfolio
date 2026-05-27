<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="work-editor-page">
    <div class="work-editor-page__header">
      <div class="label">WORK EDITOR</div>
      <h1 class="work-editor-page__title">Edit Work #{{ route.params.id }}</h1>
    </div>
    <div class="work-editor-page__placeholder">
      <p>Work editor coming soon...</p>
    </div>
  </div>
</template>

<style scoped>
.work-editor-page {
  min-height: 100vh;
  padding: var(--spacing-screen-lg);
}

.work-editor-page__header {
  margin-bottom: var(--spacing-component-lg);
}

.label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-element-sm);
}

.work-editor-page__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-lg);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}

.work-editor-page__placeholder {
  padding: var(--spacing-16);
  background: var(--color-bg-secondary);
  border: 1px dashed var(--color-border-default);
  border-radius: var(--radius-sm);
  text-align: center;
  color: var(--color-text-secondary);
}
</style>
