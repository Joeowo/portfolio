<script setup lang="ts">
interface Props {
  type?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  block?: boolean
}

interface Emits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  block: false
})

const emit = defineEmits<Emits>()

const handleClick = (e: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', e)
  }
}
</script>

<template>
  <button
    :class="[
      'n-button',
      `n-button--${type}`,
      `n-button--${size}`,
      {
        'n-button--loading': loading,
        'n-button--disabled': disabled,
        'n-button--block': block
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="n-button__spinner"></span>
    <span class="n-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.n-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-element-xs);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  font-weight: var(--font-weight-medium);
  border: 1px solid transparent;
  cursor: pointer;
  transition: var(--transition-fast);
  white-space: nowrap;
}

.n-button--sm {
  height: var(--height-button-sm);
  padding: 0 var(--spacing-4);
  font-size: var(--font-size-body-sm);
}

.n-button--md {
  height: var(--height-button-md);
  padding: 0 var(--spacing-6);
}

.n-button--lg {
  height: var(--height-button-lg);
  padding: 0 var(--spacing-8);
  font-size: var(--font-size-body-lg);
}

.n-button--block {
  width: 100%;
}

/* Primary - Pill style */
.n-button--primary {
  background-color: var(--color-text-display);
  color: var(--color-text-inverse);
  border-radius: var(--radius-xl);
}

.n-button--primary:hover:not(.n-button--disabled) {
  background-color: var(--color-text-primary);
}

/* Focus styles */
.n-button:focus {
  outline: none;
}

.n-button:focus-visible {
  outline: 2px solid var(--color-border-strong);
  outline-offset: 2px;
}

/* Secondary - Technical style */
.n-button--secondary {
  background-color: transparent;
  color: var(--color-text-primary);
  border-color: var(--color-border-default);
  border-radius: var(--radius-sm);
}

.n-button--secondary:hover:not(.n-button--disabled) {
  border-color: var(--color-border-strong);
}

/* Disabled state */
.n-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading spinner */
.n-button__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: var(--radius-full);
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.n-button--loading .n-button__content {
  opacity: 0.8;
}
</style>
