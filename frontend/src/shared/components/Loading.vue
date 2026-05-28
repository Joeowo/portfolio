<script setup lang="ts">
/**
 * Loading - 全局加载指示器
 * 遵循 Nothing Design System
 */
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'var(--color-text-display)'
})

const spinnerSize = computed(() => {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32
  }
  return `${sizes[props.size]}px`
})
</script>

<template>
  <div class="loading" :class="`loading--${size}`">
    <svg
      class="loading__spinner"
      :width="spinnerSize"
      :height="spinnerSize"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="31.416"
        stroke-dashoffset="31.416"
        class="loading__circle"
      />
    </svg>
  </div>
</template>

<style scoped>
.loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: v-bind(color);
}

.loading__spinner {
  display: block;
}

.loading__circle {
  animation: loadingSpin 1s linear infinite;
}

@keyframes loadingSpin {
  0% {
    stroke-dashoffset: 31.416;
    transform: rotate(0deg);
  }
  50% {
    stroke-dashoffset: 15.708;
  }
  100% {
    stroke-dashoffset: 31.416;
    transform: rotate(360deg);
  }
}

/* Size variants */
.loading--sm .loading__spinner {
  width: 16px;
  height: 16px;
}

.loading--md .loading__spinner {
  width: 24px;
  height: 24px;
}

.loading--lg .loading__spinner {
  width: 32px;
  height: 32px;
}
</style>
