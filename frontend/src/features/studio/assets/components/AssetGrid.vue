<script setup lang="ts">
import AssetCard from './AssetCard.vue'
import type { Asset } from '../types/Asset'

interface Props {
  assets: Asset[]
  loading?: boolean
  selectable?: boolean
  selectedIds?: number[]
  layout?: 'grid' | 'list'
}

interface Emits {
  (e: 'select', id: number): void
  (e: 'deselect', id: number): void
  (e: 'click', asset: Asset): void
  (e: 'delete', id: number): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  selectable: true,
  selectedIds: () => [],
  layout: 'grid'
})

const emit = defineEmits<Emits>()

const isSelected = (id: number) => props.selectedIds.includes(id)

const handleCardClick = (asset: Asset) => {
  emit('click', asset)
}

const handleCardSelect = (id: number) => {
  if (isSelected(id)) {
    emit('deselect', id)
  } else {
    emit('select', id)
  }
}

const handleCardDelete = (id: number) => {
  emit('delete', id)
}
</script>

<template>
  <div class="assets-grid" :class="`assets-grid--${layout}`">
    <template v-if="!loading && assets.length > 0">
      <AssetCard
        v-for="asset in assets"
        :key="asset.id"
        :asset="asset"
        :selected="isSelected(asset.id)"
        :selectable="selectable"
        @click="handleCardClick"
        @select="handleCardSelect"
        @delete="handleCardDelete"
      />
    </template>

    <!-- Loading State -->
    <div v-if="loading" class="assets-grid__loading">
      <div class="loading-text">[LOADING...]</div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && assets.length === 0" class="assets-grid__empty">
      <div class="empty-number">0</div>
      <div class="empty-label">ASSETS</div>
      <p class="empty-hint">拖拽文件到此处 或 点击上传按钮</p>
    </div>
  </div>
</template>

<style scoped>
.assets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-component-sm);
  padding: var(--spacing-screen-md);
}

.assets-grid--list {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.assets-grid__loading,
.assets-grid__empty {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-component-xl);
  min-height: 400px;
}

.loading-text {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.empty-number {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-3xl);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
  margin-bottom: var(--spacing-element-sm);
}

.empty-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--spacing-component-md);
}

.empty-hint {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-md);
  color: var(--color-text-secondary);
}
</style>
