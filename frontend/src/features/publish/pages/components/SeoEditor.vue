<template>
  <Transition name="drawer">
    <div v-if="open" class="seo-editor">
      <div class="seo-editor__header">
        <h2 class="seo-editor__title">SEO SETTINGS</h2>
        <button class="seo-editor__close" @click="handleClose">✕</button>
      </div>

      <div class="seo-editor__body">
        <!-- Page Title -->
        <div class="seo-editor__field">
          <div class="seo-editor__label">
            <span>PAGE TITLE</span>
            <span :class="['seo-editor__char-count', charCountClass(titleLength, 60)]">
              {{ titleLength }} / 60
            </span>
          </div>
          <input
            v-model="formData.seoTitle"
            type="text"
            class="seo-editor__input"
            placeholder="Enter SEO title..."
            maxlength="60"
          />
        </div>

        <!-- Description -->
        <div class="seo-editor__field">
          <div class="seo-editor__label">
            <span>DESCRIPTION</span>
            <span :class="['seo-editor__char-count', charCountClass(descriptionLength, 160)]">
              {{ descriptionLength }} / 160
            </span>
          </div>
          <textarea
            v-model="formData.seoDescription"
            class="seo-editor__input seo-editor__textarea"
            placeholder="Enter meta description..."
            maxlength="160"
            rows="3"
          />
        </div>

        <!-- Custom Slug -->
        <div class="seo-editor__field">
          <div class="seo-editor__label">
            <span>CUSTOM SLUG</span>
          </div>
          <div class="seo-editor__slug-wrapper">
            <span class="seo-editor__slug-prefix">portfolio.design/p/</span>
            <input
              v-model="formData.customSlug"
              type="text"
              class="seo-editor__input seo-editor__slug-input"
              placeholder="my-custom-url"
            />
          </div>
        </div>

        <!-- Google Preview -->
        <div class="seo-editor__preview">
          <div class="seo-editor__preview-label">预览搜索结果：</div>
          <div class="seo-editor__google-preview">
            <div class="seo-editor__preview-title">
              {{ displayTitle }}
            </div>
            <div class="seo-editor__preview-url">
              {{ displayUrl }}
            </div>
            <div class="seo-editor__preview-desc">
              {{ displayDescription }}
            </div>
          </div>
        </div>
      </div>

      <div class="seo-editor__footer">
        <NButton type="secondary" @click="handleClose"> [CANCEL] </NButton>
        <NButton type="primary" @click="handleSave"> [SAVE CHANGES] </NButton>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { PublishedPage } from '../types'
import NButton from '@/shared/components/NButton.vue'

interface Props {
  page: PublishedPage
  open: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'save', data: { seoTitle?: string; seoDescription?: string; customSlug?: string }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formData = ref({
  seoTitle: props.page.seoTitle || '',
  seoDescription: props.page.seoDescription || '',
  customSlug: props.page.customSlug || ''
})

// Reset form when page changes
watch(
  () => props.page,
  newPage => {
    formData.value = {
      seoTitle: newPage.seoTitle || '',
      seoDescription: newPage.seoDescription || '',
      customSlug: newPage.customSlug || ''
    }
  },
  { immediate: true }
)

const titleLength = computed(() => formData.value.seoTitle.length)
const descriptionLength = computed(() => formData.value.seoDescription.length)

const charCountClass = (current: number, max: number) => {
  const ratio = current / max
  if (ratio > 0.9) return 'error'
  if (ratio > 0.75) return 'warning'
  return ''
}

const displayTitle = computed(() => {
  return formData.value.seoTitle || props.page.title || 'Your Page Title'
})

const displayDescription = computed(() => {
  return (
    formData.value.seoDescription ||
    props.page.description ||
    'Your page description will appear here...'
  )
})

const displayUrl = computed(() => {
  const slug = formData.value.customSlug || props.page.customSlug || `page-${props.page.id}`
  return `portfolio.design/p/${slug}`
})

const handleClose = () => emit('close')

const handleSave = () => {
  emit('save', {
    seoTitle: formData.value.seoTitle || undefined,
    seoDescription: formData.value.seoDescription || undefined,
    customSlug: formData.value.customSlug || undefined
  })
}
</script>

<style scoped>
.seo-editor {
  position: fixed;
  top: 0;
  right: 0;
  width: 480px;
  height: 100%;
  background: var(--color-bg-primary);
  border-left: 1px solid var(--color-border-default);
  z-index: var(--z-drawer);
  display: flex;
  flex-direction: column;
}

.seo-editor__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border-subtle);
}

.seo-editor__title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-xl);
  font-weight: 500;
  color: var(--color-text-display);
  margin: 0;
}

.seo-editor__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  color: var(--color-text-secondary);
  transition: all var(--duration-fast) ease-out;
}

.seo-editor__close:hover {
  color: var(--color-text-primary);
  border-color: var(--color-border-hover);
}

.seo-editor__body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.seo-editor__field {
  margin-bottom: 24px;
}

.seo-editor__label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  font-family: var(--font-family-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}

.seo-editor__char-count {
  font-size: 9px;
  color: var(--color-text-disabled);
}

.seo-editor__char-count.warning {
  color: var(--color-warning-text);
}

.seo-editor__char-count.error {
  color: var(--color-error-text);
}

.seo-editor__input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  transition: border-color var(--duration-fast) ease-out;
  box-sizing: border-box;
}

.seo-editor__input:focus {
  outline: none;
  border-color: var(--color-text-display);
}

.seo-editor__input::placeholder {
  color: var(--color-text-disabled);
}

.seo-editor__textarea {
  min-height: 80px;
  resize: vertical;
}

.seo-editor__slug-wrapper {
  position: relative;
}

.seo-editor__slug-prefix {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-text-disabled);
  pointer-events: none;
}

.seo-editor__slug-input {
  padding-left: 140px;
}

.seo-editor__preview {
  margin-top: 32px;
  padding: var(--spacing-lg);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
}

.seo-editor__preview-label {
  font-family: var(--font-family-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.seo-editor__google-preview {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.seo-editor__preview-title {
  font-family: var(--font-family-primary);
  font-size: 14px;
  color: #1a0dab;
  cursor: pointer;
  text-decoration: none;
}

.seo-editor__preview-title:hover {
  text-decoration: underline;
}

.seo-editor__preview-url {
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: #006621;
}

.seo-editor__preview-desc {
  font-family: var(--font-family-primary);
  font-size: 12px;
  color: #545454;
  line-height: 1.4;
}

.seo-editor__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  padding: 20px 24px;
  border-top: 1px solid var(--color-border-subtle);
}

/* Drawer Animation */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform var(--duration-normal) ease-out;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

/* Responsive */
@media (max-width: 768px) {
  .seo-editor {
    width: 100%;
  }
}
</style>
