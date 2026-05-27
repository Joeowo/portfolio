<script setup lang="ts">
type Status = 'success' | 'warning' | 'error' | 'info'

interface Props {
  status?: Status
  dot?: boolean
}

withDefaults(defineProps<Props>(), {
  status: 'info',
  dot: false
})

const statusLabels: Record<Status, string> = {
  success: 'SUCCESS',
  warning: 'WARNING',
  error: 'ERROR',
  info: 'INFO'
}
</script>

<template>
  <span :class="['n-badge', `n-badge--${status}`, { 'n-badge--dot': dot }]">
    <span v-if="dot" class="n-badge__dot"></span>
    <slot>{{ statusLabels[status] }}</slot>
  </span>
</template>

<style scoped>
.n-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-element-xs);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  font-weight: var(--font-weight-regular);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  padding: var(--spacing-element-xs) var(--spacing-element-sm);
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
}

.n-badge--dot {
  padding-left: var(--spacing-2);
}

.n-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
}

/* Status variants */
.n-badge--success {
  color: var(--color-success-text);
  background-color: var(--color-success-bg);
  border-color: var(--color-success-border);
}

.n-badge--success .n-badge__dot {
  background-color: var(--color-success-text);
}

.n-badge--warning {
  color: var(--color-warning-text);
  background-color: var(--color-warning-bg);
  border-color: var(--color-warning-border);
}

.n-badge--warning .n-badge__dot {
  background-color: var(--color-warning-text);
}

.n-badge--error {
  color: var(--color-error-text);
  background-color: var(--color-error-bg);
  border-color: var(--color-error-border);
}

.n-badge--error .n-badge__dot {
  background-color: var(--color-error-text);
}

.n-badge--info {
  color: var(--color-info-text);
  background-color: var(--color-info-bg);
  border-color: var(--color-info-border);
}

.n-badge--info .n-badge__dot {
  background-color: var(--color-info-text);
}
</style>
