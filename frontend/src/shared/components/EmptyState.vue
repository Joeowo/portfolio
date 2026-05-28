<script setup lang="ts">
/**
 * EmptyState - 空状态占位组件
 * 遵循 Nothing Design System
 */
import { computed } from 'vue'

interface Props {
  icon?: string
  title?: string
  description?: string
  actionLabel?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'EMPTY',
  title: '暂无数据',
  description: '还没有任何内容',
  actionLabel: undefined,
  size: 'md'
})

// Use function type syntax for emits
const emit = defineEmits<{
  action: []
}>()

const sizeClass = computed(() => {
  return `empty-state--${props.size}`
})

const hasAction = computed(() => !!props.actionLabel)
</script>

<template>
  <div :class="['empty-state', sizeClass]">
    <!-- Icon / Label -->
    <div class="empty-state__icon">
      <span class="empty-state__label">{{ icon }}</span>
    </div>

    <!-- Title -->
    <h3 v-if="title" class="empty-state__title">{{ title }}</h3>

    <!-- Description -->
    <p v-if="description" class="empty-state__description">{{ description }}</p>

    <!-- Action Button -->
    <button v-if="hasAction" class="empty-state__action" type="button" @click="emit('action')">
      <span class="empty-state__action-label">{{ actionLabel }}</span>
    </button>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-screen-lg);
  text-align: center;
}

/* Icon */
.empty-state__icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-component-lg);
}

.empty-state__label {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-2xl);
  color: var(--color-text-disabled);
  letter-spacing: 0.05em;
}

/* Decorative dot pattern */
.empty-state__icon::after {
  content: '';
  position: absolute;
  inset: -50%;
  background-image: radial-gradient(circle, var(--color-border-subtle) 1px, transparent 1px);
  background-size: 8px 8px;
  opacity: 0.3;
  z-index: -1;
}

/* Title */
.empty-state__title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-2) 0;
}

/* Description */
.empty-state__description {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  color: var(--color-text-secondary);
  margin: 0 0 var(--spacing-component-md) 0;
  max-width: 320px;
}

/* Action Button */
.empty-state__action {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-element-sm) var(--spacing-element-lg);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-full);
  background: var(--color-bg-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
}

.empty-state__action:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-tertiary);
}

.empty-state__action:active {
  transform: scale(0.98);
}

.empty-state__action-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

/* Size variants */
.empty-state--sm {
  padding: var(--spacing-component-md);
}

.empty-state--sm .empty-state__label {
  font-size: var(--font-size-h3);
}

.empty-state--sm .empty-state__title {
  font-size: var(--font-size-body-lg);
}

.empty-state--sm .empty-state__description {
  font-size: var(--font-size-body-sm);
  max-width: 240px;
}

.empty-state--lg {
  padding: var(--spacing-screen-xl);
}

.empty-state--lg .empty-state__label {
  font-size: var(--font-size-display-3xl);
}

.empty-state--lg .empty-state__title {
  font-size: var(--font-size-h3);
}

.empty-state--lg .empty-state__description {
  font-size: var(--font-size-body-lg);
  max-width: 400px;
}
</style>
