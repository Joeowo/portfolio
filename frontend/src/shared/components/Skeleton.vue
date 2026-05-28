<script setup lang="ts">
/**
 * Skeleton - 骨架屏加载占位符
 * 遵循 Nothing Design System
 */
import { computed } from 'vue'

interface Props {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  count?: number
  animation?: true | false
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  width: '100%',
  height: 'auto',
  count: 1,
  animation: true
})

const skeletonStyle = computed(() => {
  const style: Record<string, string> = {}

  if (typeof props.width === 'number') {
    style.width = `${props.width}px`
  } else if (props.width !== '100%') {
    style.width = props.width
  }

  if (typeof props.height === 'number') {
    style.height = `${props.height}px`
  } else if (props.height !== 'auto') {
    style.height = props.height
  }

  return style
})

const variantClass = computed(() => {
  return `skeleton--${props.variant}`
})

const animationClass = computed(() => {
  return props.animation ? 'skeleton--animated' : ''
})
</script>

<template>
  <div class="skeleton-container">
    <div
      v-for="i in count"
      :key="i"
      :class="['skeleton', variantClass, animationClass]"
      :style="skeletonStyle"
    />
  </div>
</template>

<style scoped>
.skeleton-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.skeleton {
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
}

.skeleton--animated {
  animation: skeletonShimmer 1.5s ease-in-out infinite;
  background: linear-gradient(
    90deg,
    var(--color-bg-tertiary) 0%,
    var(--color-bg-secondary) 20%,
    var(--color-bg-tertiary) 40%,
    var(--color-bg-tertiary) 100%
  );
  background-size: 200% 100%;
}

@keyframes skeletonShimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Variant styles */
.skeleton--text {
  height: 1em;
  border-radius: 2px;
}

.skeleton--circular {
  border-radius: var(--radius-full);
}

.skeleton--rectangular {
  border-radius: var(--radius-sm);
}

.skeleton--rounded {
  border-radius: var(--radius-md);
}
</style>
