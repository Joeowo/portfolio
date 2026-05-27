<script setup lang="ts">
import { computed } from 'vue'
import type { Template } from '../types/Template'

interface Props {
  template: Template
  selected?: boolean
}

interface Emits {
  (e: 'select', id: number): void
  (e: 'preview', template: Template): void
}

const props = withDefaults(defineProps<Props>(), {
  selected: false
})

const emit = defineEmits<Emits>()

const layoutTypeLabels: Record<string, string> = {
  single: 'SINGLE',
  grid: 'GRID',
  two_column: 'TWO-COLUMN',
  masonry: 'MASONRY'
}

const layoutTypeLabel = computed(() => {
  return layoutTypeLabels[props.template.layoutType] || props.template.layoutType.toUpperCase()
})

const handleCardClick = () => {
  emit('select', props.template.id)
}

const handlePreviewClick = (e: MouseEvent) => {
  e.stopPropagation()
  emit('preview', props.template)
}
</script>

<template>
  <div
    class="template-card"
    :class="{ 'template-card--selected': selected }"
    @click="handleCardClick"
  >
    <!-- Preview Image Area -->
    <div class="template-card__preview">
      <img
        :src="template.previewUrl"
        :alt="template.name"
        class="template-card__image"
        loading="lazy"
      />
      <button class="template-card__preview-btn" title="预览" @click="handlePreviewClick">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    </div>

    <!-- Info Area -->
    <div class="template-card__info">
      <h3 class="template-card__title">{{ template.name }}</h3>
      <div class="template-card__meta">
        <span class="template-card__type">{{ template.type }}</span>
        <span class="template-card__divider">/</span>
        <span class="template-card__layout">{{ layoutTypeLabel }}</span>
      </div>
      <svg
        v-if="selected"
        class="template-card__check"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.template-card {
  width: 280px;
  height: 320px;
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  background: var(--color-bg-primary);
  cursor: pointer;
  transition:
    border-color 150ms ease-out,
    border-width 150ms ease-out;
  overflow: hidden;
}

.template-card:hover {
  border-width: 2px;
  border-color: var(--color-border-hover);
}

.template-card--selected {
  border-width: 2px;
  border-color: var(--color-border-selected);
  background: var(--color-bg-secondary);
}

/* Preview Image Area */
.template-card__preview {
  position: relative;
  height: 240px;
  background: var(--color-bg-tertiary);
  overflow: hidden;
}

.template-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.template-card__preview-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  opacity: 0;
  transition: opacity 150ms ease-out;
  cursor: pointer;
  color: var(--color-text-primary);
}

.template-card__preview-btn:hover {
  background: var(--color-bg-secondary);
  border-color: var(--color-border-hover);
}

.template-card:hover .template-card__preview-btn {
  opacity: 1;
}

.template-card__preview-btn svg {
  width: 18px;
  height: 18px;
}

/* Info Area */
.template-card__info {
  position: relative;
  height: 80px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

.template-card__title {
  font-family: var(--font-family-primary);
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.template-card__meta {
  font-family: var(--font-family-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
}

.template-card__divider {
  color: var(--color-text-disabled);
}

.template-card__check {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 20px;
  height: 20px;
  color: var(--color-text-display);
  animation: select-check 200ms ease-out;
}

@keyframes select-check {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
