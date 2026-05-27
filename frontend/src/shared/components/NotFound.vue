<script setup lang="ts">
import { useRouter } from 'vue-router'
import NButton from '@/shared/components/NButton.vue'

const router = useRouter()
</script>

<template>
  <div class="not-found">
    <div class="not-found__content">
      <div class="not-found__number">404</div>
      <h1 class="not-found__title">PAGE NOT FOUND</h1>
      <p class="not-found__description">The page you're looking for doesn't exist.</p>
      <NButton type="primary" @click="router.push('/studio/assets')">
        Go to Studio
      </NButton>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-screen-lg);
}

.not-found__content {
  text-align: center;
}

.not-found__number {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-3xl);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
  margin-bottom: var(--spacing-component-md);
}

.not-found__title {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  font-weight: var(--font-weight-regular);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-element-sm);
}

.not-found__description {
  font-size: var(--font-size-body-md);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-component-lg);
}
</style>
