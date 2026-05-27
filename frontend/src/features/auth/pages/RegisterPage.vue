<script setup lang="ts">
import { RouterLink } from 'vue-router'
import NButton from '@/shared/components/NButton.vue'
</script>

<template>
  <div class="register-page">
    <div class="register-page__content">
      <div class="register-page__header">
        <div class="register-page__label">REGISTER</div>
        <h1 class="register-page__title">Create Account</h1>
      </div>
      <form class="register-page__form" @submit.prevent>
        <p class="register-page__placeholder">Registration form coming soon...</p>
        <NButton type="primary" block>Create Account</NButton>
        <RouterLink to="/login" class="register-page__link">
          Already have an account? Sign in
        </RouterLink>
      </form>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-screen-lg);
}

.register-page__content {
  width: 100%;
  max-width: 480px;
}

.register-page__header {
  margin-bottom: var(--spacing-component-lg);
}

.register-page__label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-element-sm);
}

.register-page__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-xl);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}

.register-page__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-md);
}

.register-page__placeholder {
  padding: var(--spacing-element-lg);
  background: var(--color-bg-secondary);
  border: 1px dashed var(--color-border-default);
  border-radius: var(--radius-sm);
  text-align: center;
  color: var(--color-text-secondary);
}

.register-page__link {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  text-align: center;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.register-page__link:hover {
  color: var(--color-text-primary);
}
</style>
