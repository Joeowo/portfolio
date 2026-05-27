<script setup lang="ts">
</script>

<template>
  <div class="assets-page">
    <div class="assets-page__header">
      <div class="label">ASSETS</div>
      <h1 class="assets-page__title">Asset Library</h1>
    </div>
    <div class="assets-page__placeholder">
      <p>Assets module coming soon...</p>
    </div>
  </div>
</template>

<style scoped>
.assets-page {
  min-height: 100vh;
  padding: var(--spacing-screen-lg);
}

.assets-page__header {
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

.assets-page__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-xl);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}

.assets-page__placeholder {
  padding: var(--spacing-16);
  background: var(--color-bg-secondary);
  border: 1px dashed var(--color-border-default);
  border-radius: var(--radius-sm);
  text-align: center;
  color: var(--color-text-secondary);
}
</style>
