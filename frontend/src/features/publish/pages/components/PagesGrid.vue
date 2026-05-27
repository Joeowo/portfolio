<template>
  <div class="pages-grid">
    <!-- Loading State -->
    <div v-if="loading" class="pages-grid__loading">
      <span class="pages-grid__loading-text">[LOADING...]</span>
    </div>

    <!-- Empty State -->
    <div v-else-if="pages.length === 0" class="pages-grid__empty">
      <div class="pages-grid__empty-number">{{ emptyCount }}</div>
      <div class="pages-grid__empty-label">{{ emptyLabel }}</div>
      <p class="pages-grid__empty-message">{{ emptyMessage }}</p>
      <NButton v-if="showCreateButton" type="secondary" @click="$emit('create')">
        [+ CREATE FIRST PAGE]
      </NButton>
    </div>

    <!-- Grid -->
    <div v-else class="pages-grid__container">
      <PageCard
        v-for="page in pages"
        :key="page.id"
        :page="page"
        @preview="handlePreview"
        @edit="handleEdit"
        @click="handleClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageCard from './PageCard.vue'
import NButton from '@/shared/components/NButton.vue'
import type { PublishedPage } from '../types'

interface Props {
  pages: PublishedPage[]
  loading?: boolean
  emptyCount?: number
  emptyLabel?: string
  emptyMessage?: string
  showCreateButton?: boolean
}

interface Emits {
  (e: 'preview', id: number): void
  (e: 'edit', id: number): void
  (e: 'click', page: PublishedPage): void
  (e: 'create'): void
}

withDefaults(defineProps<Props>(), {
  loading: false,
  emptyCount: 0,
  emptyLabel: 'PAGES',
  emptyMessage: 'No pages found',
  showCreateButton: false
})

const emit = defineEmits<Emits>()

const handlePreview = (id: number) => emit('preview', id)
const handleEdit = (id: number) => emit('edit', id)
const handleClick = (page: PublishedPage) => emit('click', page)
</script>

<style scoped>
.pages-grid {
  width: 100%;
}

.pages-grid__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.pages-grid__loading-text {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  letter-spacing: 0.1em;
}

.pages-grid__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: var(--spacing-4xl);
  text-align: center;
}

.pages-grid__empty-number {
  font-family: var(--font-family-display);
  font-size: 72px;
  font-weight: 400;
  color: var(--color-text-display);
  line-height: 1;
  margin-bottom: var(--spacing-md);
}

.pages-grid__empty-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-md);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.pages-grid__empty-message {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-2xl);
}

.pages-grid__container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
}

/* Responsive */
@media (max-width: 768px) {
  .pages-grid__container {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .pages-grid__empty-number {
    font-size: 48px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .pages-grid__container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
