<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: number
  opacity?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  opacity: 0.5,
  color: '' // Empty means use CSS variable
})

const dotColor = computed(() => {
  return props.color || 'var(--color-dot-pattern)'
})
</script>

<template>
  <div
    class="n-dot-pattern"
    :style="{
      '--dot-size': `${size}px`,
      '--dot-opacity': opacity,
      '--dot-color': dotColor
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.n-dot-pattern {
  position: relative;
  background-image: radial-gradient(
    var(--dot-color) 1px,
    transparent 1px
  );
  background-size: var(--dot-size, 16px) var(--dot-size, 16px);
  opacity: var(--dot-opacity, 0.5);
}

.n-dot-pattern > * {
  position: relative;
  z-index: 1;
}
</style>
