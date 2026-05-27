<template>
  <div
    :class="['page-card', `page-card--${page.status}`, { 'page-card--hover': isHovered }]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="handleClick"
  >
    <!-- Thumbnail -->
    <div class="page-card__thumbnail">
      <img
        v-if="page.previewUrl"
        :src="page.previewUrl"
        :alt="page.title"
        class="page-card__thumbnail-img"
      />
      <div v-else class="page-card__thumbnail-placeholder">[NO PREVIEW]</div>

      <!-- Actions -->
      <div v-show="isHovered" class="page-card__actions">
        <button class="page-card__action-btn" title="Preview" @click.stop="onPreview?.(page.id)">
          <span class="icon-eye">👁</span>
        </button>
        <button class="page-card__action-btn" title="Edit" @click.stop="onEdit?.(page.id)">
          <span class="icon-edit">✎</span>
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="page-card__info">
      <h3 class="page-card__title" :title="page.title">
        {{ page.title }}
      </h3>
      <div class="page-card__meta">
        <span :class="['page-card__status', `page-card__status--${page.status}`]">
          {{ getStatusLabel(page.status) }}
        </span>
        <span class="page-card__views">
          · <span class="page-card__views-value">{{ formatNumber(page.viewCount) }}</span> VIEWS
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PublishedPage, PageStatus } from '../types'
import { usePagesStore } from '../stores/pagesStore'

interface Props {
  page: PublishedPage
}

interface Emits {
  (e: 'preview', id: number): void
  (e: 'edit', id: number): void
  (e: 'click', page: PublishedPage): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const pagesStore = usePagesStore()
const isHovered = ref(false)

const onPreview = (id: number) => emit('preview', id)
const onEdit = (id: number) => emit('edit', id)

const handleClick = () => {
  emit('click', props.page)
}

const getStatusLabel = (status: PageStatus): string => {
  return pagesStore.getStatusLabel(status)
}

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
</script>

<style scoped>
.page-card {
  width: 320px;
  height: 280px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-primary);
  cursor: pointer;
  transition:
    border-color var(--duration-fast) ease-out,
    border-width var(--duration-fast) ease-out;
  position: relative;
  overflow: hidden;
}

.page-card--hover {
  border-width: 2px;
  border-color: var(--color-border-hover);
}

.page-card--draft {
  border-style: dashed;
}

.page-card--draft.page-card--hover {
  border-style: solid;
}

.page-card__thumbnail {
  height: 180px;
  background: var(--color-bg-tertiary);
  position: relative;
  overflow: hidden;
}

.page-card__thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page-card__thumbnail-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-text-disabled);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.page-card__actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
}

.page-card__action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text-primary);
  transition: all var(--duration-fast) ease-out;
}

.page-card__action-btn:hover {
  background: var(--color-bg-secondary);
  border-color: var(--color-border-hover);
}

.page-card__info {
  height: 100px;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--spacing-sm);
}

.page-card__title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-lg);
  font-weight: 500;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.page-card__meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.page-card__status {
  font-family: var(--font-family-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  border-radius: var(--radius-xs);
}

.page-card__status--published,
.page-card__status--online {
  color: var(--color-success-text);
  background: var(--color-success-bg);
}

.page-card__status--draft {
  color: var(--color-text-secondary);
  background: var(--color-bg-tertiary);
}

.page-card__status--offline {
  color: var(--color-warning-text);
  background: var(--color-warning-bg);
}

.page-card__status--pending {
  color: var(--color-warning-text);
  background: var(--color-warning-bg);
}

.page-card__views {
  margin-left: auto;
  font-family: var(--font-family-mono);
  font-size: 10px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.page-card__views-value {
  font-weight: 500;
  color: var(--color-text-display);
}
</style>
