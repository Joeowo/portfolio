<script setup lang="ts">
interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  border?: boolean
  dotPattern?: boolean
  dotPatternOpacity?: number
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'md',
  border: true,
  dotPattern: false,
  dotPatternOpacity: 0.5,
  hoverable: false
})
</script>

<template>
  <div
    :class="[
      'n-card',
      `n-card--padding-${padding}`,
      {
        'n-card--border': border,
        'n-card--dot-pattern': dotPattern,
        'n-card--hoverable': hoverable
      }
    ]"
    :style="{
      '--dot-pattern-opacity': dotPattern ? dotPatternOpacity : 0
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.n-card {
  background-color: var(--color-bg-elevated);
  transition: var(--transition-fast);
}

.n-card--border {
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
}

.n-card--hoverable:hover {
  border-color: var(--color-border-strong);
}

/* Dot Pattern Background */
.n-card--dot-pattern {
  position: relative;
}

.n-card--dot-pattern::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    var(--color-dot-pattern) 1px,
    transparent 1px
  );
  background-size: 16px 16px;
  opacity: var(--dot-pattern-opacity, 0.5);
  pointer-events: none;
  border-radius: inherit;
}

/* Padding variants */
.n-card--padding-none > * {
  margin: 0;
}

.n-card--padding-sm {
  padding: var(--spacing-component-sm);
}

.n-card--padding-md {
  padding: var(--spacing-component-md);
}

.n-card--padding-lg {
  padding: var(--spacing-component-lg);
}

/* Ensure content sits above dot pattern */
.n-card--dot-pattern > * {
  position: relative;
  z-index: 1;
}
</style>
