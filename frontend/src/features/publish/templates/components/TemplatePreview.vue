<script setup lang="ts">
import { computed, watch } from 'vue'
import type { Template } from '../types/Template'

interface Props {
  open: boolean
  template: Template | null
}

interface Emits {
  (e: 'close'): void
  (e: 'select'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClose = () => {
  emit('close')
}

const handleSelect = () => {
  emit('select')
  emit('close')
}

// Close on Escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    handleClose()
  }
}

watch(
  () => props.open,
  isOpen => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeydown)
    } else {
      document.removeEventListener('keydown', handleKeydown)
    }
  }
)

const layoutTypeLabels: Record<string, string> = {
  single: 'Single Column',
  grid: 'Grid Layout',
  two_column: 'Two Column',
  masonry: 'Masonry Layout'
}

const layoutTypeLabel = computed(() => {
  return props.template ? layoutTypeLabels[props.template.layoutType] : ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="preview">
      <div v-if="open && template" class="template-preview" @click.self="handleClose">
        <div class="template-preview__content">
          <!-- Close Button -->
          <button class="template-preview__close" @click="handleClose">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <!-- Preview Image -->
          <div class="template-preview__image">
            <img :src="template.previewUrl" :alt="template.name" />
          </div>

          <!-- Info Section -->
          <div class="template-preview__info">
            <h2 class="template-preview__name">{{ template.name }}</h2>
            <p v-if="template.description" class="template-preview__description">
              {{ template.description }}
            </p>
            <div class="template-preview__meta">
              <span class="label">{{ template.type }}</span>
              <span class="label">/</span>
              <span class="label">{{ layoutTypeLabel }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="template-preview__actions">
            <button class="btn btn--secondary" @click="handleClose">BACK</button>
            <button class="btn btn--primary" @click="handleSelect">SELECT TEMPLATE</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.template-preview {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.8);
}

.template-preview__content {
  position: relative;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: scale-up 250ms ease-out;
}

/* Close Button */
.template-preview__close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-text-primary);
  transition: all 150ms ease-out;
}

.template-preview__close:hover {
  background: var(--color-bg-secondary);
  border-color: var(--color-border-hover);
}

.template-preview__close svg {
  width: 20px;
  height: 20px;
}

/* Preview Image */
.template-preview__image {
  width: 100%;
  background: var(--color-bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.template-preview__image img {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
}

/* Info Section */
.template-preview__info {
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.template-preview__name {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-xl);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}

.template-preview__description {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.template-preview__meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.template-preview__meta .label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}

/* Actions */
.template-preview__actions {
  padding: 16px 32px 24px;
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}

.btn {
  padding: 12px 24px;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 150ms ease-out;
}

.btn--secondary {
  background: transparent;
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  color: var(--color-text-primary);
}

.btn--secondary:hover {
  background: var(--color-bg-secondary);
  border-color: var(--color-border-hover);
}

.btn--primary {
  background: var(--color-text-display);
  border: 1px solid var(--color-text-display);
  border-radius: 999px;
  color: var(--color-bg-primary);
}

.btn--primary:hover {
  opacity: 0.8;
}

/* Transitions */
.preview-enter-active {
  animation: fade-in 200ms ease-out;
}

.preview-leave-active {
  animation: fade-in 200ms ease-out reverse;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-up {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .template-preview {
    padding: 16px;
  }

  .template-preview__content {
    max-height: 95vh;
  }

  .template-preview__image img {
    max-height: 300px;
  }

  .template-preview__info {
    padding: 16px 20px;
  }

  .template-preview__actions {
    flex-direction: column-reverse;
    padding: 16px 20px;
  }

  .btn {
    width: 100%;
  }
}
</style>
