<template>
  <Transition name="preview">
    <div v-if="open" class="page-preview" @click.self="handleClose">
      <div class="page-preview__content">
        <iframe
          v-if="page.publishedUrl"
          :src="page.publishedUrl"
          class="page-preview__iframe"
          title="Page Preview"
        />
        <div v-else class="page-preview__placeholder">
          <div class="page-preview__placeholder-icon">📄</div>
          <div class="page-preview__placeholder-text">[PREVIEW NOT AVAILABLE FOR DRAFT PAGES]</div>
        </div>
      </div>

      <div class="page-preview__footer">
        <div class="page-preview__info">
          <h3 class="page-preview__title">{{ page.title }}</h3>
          <p class="page-preview__url">
            {{
              page.publishedUrl || 'portfolio.design/p/' + (page.customSlug || `page-${page.id}`)
            }}
          </p>
        </div>
        <div class="page-preview__actions">
          <NButton type="secondary" @click="$emit('back')"> [← BACK] </NButton>
          <NButton type="secondary" @click="$emit('edit')"> [EDIT] </NButton>
          <NButton v-if="page.publishedUrl" type="primary" @click="handleVisit">
            [VISIT →]
          </NButton>
          <button class="page-preview__close" @click="handleClose">[CLOSE ✕]</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { PublishedPage } from '../types'
import NButton from '@/shared/components/NButton.vue'

interface Props {
  page: PublishedPage
  open: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'edit'): void
  (e: 'visit'): void
  (e: 'back'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClose = () => emit('close')
const handleVisit = () => {
  emit('visit')
}
</script>

<style scoped>
.page-preview {
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 26, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
}

.page-preview__content {
  width: 90%;
  max-width: 1200px;
  height: 80%;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.page-preview__iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.page-preview__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  background: var(--color-bg-secondary);
}

.page-preview__placeholder-icon {
  font-size: 64px;
  opacity: 0.5;
}

.page-preview__placeholder-text {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.page-preview__footer {
  width: 90%;
  max-width: 1200px;
  margin-top: var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xl);
}

.page-preview__info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.page-preview__title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-lg);
  font-weight: 500;
  color: var(--color-text-display);
  margin: 0;
}

.page-preview__url {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.page-preview__actions {
  display: flex;
  gap: var(--spacing-md);
}

.page-preview__close {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  background: transparent;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--duration-fast) ease-out;
}

.page-preview__close:hover {
  color: var(--color-text-primary);
  border-color: var(--color-border-hover);
}

/* Animations */
.preview-enter-active {
  animation: fade-in 200ms ease-out;
}

.preview-leave-active {
  animation: fade-out 150ms ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-preview__footer {
    flex-direction: column;
    align-items: stretch;
  }

  .page-preview__actions {
    flex-wrap: wrap;
  }

  .page-preview__close {
    width: 100%;
  }
}
</style>
