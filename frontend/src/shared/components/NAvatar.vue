<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const avatarSizes = {
  sm: '32px',
  md: '40px',
  lg: '48px',
  xl: '64px'
}

const fontSizes = {
  sm: '12px',
  md: '14px',
  lg: '16px',
  xl: '20px'
}

const initials = computed(() => {
  if (!props.name) return ''
  const parts = props.name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0].slice(0, 2).toUpperCase()
})
</script>

<template>
  <div
    :class="['n-avatar', `n-avatar--${size}`]"
    :style="{
      '--avatar-size': avatarSizes[size],
      '--font-size': fontSizes[size]
    }"
  >
    <img v-if="src" :src="src" :alt="alt || name" class="n-avatar__image" />
    <span v-else-if="initials" class="n-avatar__initials">
      {{ initials }}
    </span>
    <slot v-else name="fallback" />
  </div>
</template>

<style scoped>
.n-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--avatar-size);
  height: var(--avatar-size);
  border-radius: var(--radius-full);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  overflow: hidden;
  flex-shrink: 0;
}

.n-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.n-avatar__initials {
  font-family: var(--font-family-mono);
  font-size: var(--font-size);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  text-transform: uppercase;
}
</style>
