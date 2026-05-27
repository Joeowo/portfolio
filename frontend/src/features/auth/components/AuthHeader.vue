<script setup lang="ts">
interface Props {
  label: string
  title: string
  showLogo?: boolean
}

withDefaults(defineProps<Props>(), {
  showLogo: false
})
</script>

<template>
  <div class="auth-header">
    <div class="auth-header__top">
      <span class="auth-header__label">{{ label }}</span>
      <span v-if="showLogo" class="auth-header__logo">●</span>
    </div>
    <h1 class="auth-header__title">{{ title }}</h1>
  </div>
</template>

<style scoped>
.auth-header {
  margin-bottom: var(--spacing-component-lg);
}

.auth-header__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-element-sm);
}

.auth-header__label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  font-weight: var(--font-weight-regular);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
}

.auth-header__logo {
  width: 24px;
  height: 24px;
  font-size: 16px;
  color: var(--color-text-secondary);
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-header__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-2xl);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
  margin: 0;
}

@media (max-width: 640px) {
  .auth-header__title {
    font-size: var(--font-size-display-xl);
  }
}
</style>
