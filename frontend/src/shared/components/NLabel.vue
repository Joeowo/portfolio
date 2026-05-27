<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'disabled'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'secondary'
})
</script>

<template>
  <span :class="['n-label', `n-label--${size}`, `n-label--${color}`]">
    <slot />
  </span>
</template>

<style scoped>
.n-label {
  display: inline-block;
  font-family: var(--font-family-mono);
  font-weight: var(--font-weight-regular);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  white-space: nowrap;
}

/* Sizes */
.n-label--sm {
  font-size: var(--font-size-label-sm);
}

.n-label--md {
  font-size: var(--font-size-label-md);
}

.n-label--lg {
  font-size: var(--font-size-label-lg);
}

/* Colors */
.n-label--primary {
  color: var(--color-text-primary);
}

.n-label--secondary {
  color: var(--color-text-secondary);
}

.n-label--disabled {
  color: var(--color-text-disabled);
}
</style>
