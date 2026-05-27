<script setup lang="ts"></script>

<template>
  <div class="pages-page">
    <div class="pages-page__header">
      <div class="label">PAGES</div>
      <h1 class="pages-page__title">Published Pages</h1>
    </div>
    <div class="pages-page__placeholder">
      <p>Pages module coming soon...</p>
    </div>
  </div>
</template>

<style scoped>
.pages-page {
  min-height: 100vh;
  padding: var(--spacing-screen-lg);
}

.pages-page__header {
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

.pages-page__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-xl);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}

.pages-page__placeholder {
  padding: var(--spacing-16);
  background: var(--color-bg-secondary);
  border: 1px dashed var(--color-border-default);
  border-radius: var(--radius-sm);
  text-align: center;
  color: var(--color-text-secondary);
}
</style>
