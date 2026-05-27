<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Props {
  text: string
  linkText: string
  linkTo: string
}

defineProps<Props>()
</script>

<template>
  <div class="auth-footer">
    <span class="auth-footer__text">{{ text }} </span>
    <RouterLink :to="linkTo" class="auth-footer__link">
      {{ linkText }}
    </RouterLink>
  </div>
</template>

<style scoped>
.auth-footer {
  margin-top: var(--spacing-component-lg);
  text-align: center;
}

.auth-footer__text {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
}

.auth-footer__link {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  transition: color var(--duration-fast) var(--ease-out-cubic);
}

.auth-footer__link:hover {
  color: var(--color-text-display);
}

@media (max-width: 640px) {
  .auth-footer {
    margin-top: var(--spacing-component-md);
  }
}
</style>
