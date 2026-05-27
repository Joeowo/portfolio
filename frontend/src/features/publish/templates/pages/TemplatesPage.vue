<script setup lang="ts">
</script>

<template>
  <div class="templates-page">
    <div class="templates-page__header">
      <div class="label">TEMPLATES</div>
      <h1 class="templates-page__title">Choose Template</h1>
    </div>
    <div class="templates-page__placeholder">
      <p>Templates module coming soon...</p>
    </div>
  </div>
</template>

<style scoped>
.templates-page {
  min-height: 100vh;
  padding: var(--spacing-screen-lg);
}

.templates-page__header {
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

.templates-page__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-xl);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}

.templates-page__placeholder {
  padding: var(--spacing-16);
  background: var(--color-bg-secondary);
  border: 1px dashed var(--color-border-default);
  border-radius: var(--radius-sm);
  text-align: center;
  color: var(--color-text-secondary);
}
</style>
