<script setup lang="ts">
import NButton from '@/shared/components/NButton.vue'
</script>

<template>
  <div class="login-page">
    <div class="login-page__content">
      <div class="login-page__header">
        <div class="login-page__label">LOGIN</div>
        <h1 class="login-page__title">Portfolio</h1>
      </div>
      <form class="login-page__form" @submit.prevent>
        <p class="login-page__placeholder">Login form coming soon...</p>
        <NButton type="primary" block>Sign In</NButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-screen-lg);
  background-color: var(--color-bg-primary);
}

.login-page__content {
  width: 100%;
  max-width: 480px;
}

.login-page__header {
  margin-bottom: var(--spacing-component-lg);
}

.login-page__label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  font-weight: var(--font-weight-regular);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-element-sm);
}

.login-page__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-2xl);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}

.login-page__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-md);
}

.login-page__placeholder {
  padding: var(--spacing-element-lg);
  background: var(--color-bg-secondary);
  border: 1px dashed var(--color-border-default);
  border-radius: var(--radius-sm);
  text-align: center;
  color: var(--color-text-secondary);
}
</style>
