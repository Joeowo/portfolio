<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import NButton from '@/shared/components/NButton.vue'
import type { AssetType } from '../types/Asset'

interface Props {
  currentFolderName: string
  assetCount: number
  filters: {
    type?: AssetType | ''
    keyword?: string
  }
}

interface Emits {
  (e: 'update:keyword', value: string): void
  (e: 'update:type', value: AssetType | ''): void
  (e: 'upload'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const keyword = ref(props.filters.keyword)
const showFilterMenu = ref(false)
const viewMode = ref<'grid' | 'list'>('grid')

const handleKeywordChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  keyword.value = target.value
  emit('update:keyword', target.value)
}

const handleFilterType = (type: AssetType | '') => {
  emit('update:type', type)
  showFilterMenu.value = false
}

const handleUpload = () => {
  emit('upload')
}

const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}

const closeFilterMenu = () => {
  showFilterMenu.value = false
}

const typeOptions: Array<{ value: AssetType | ''; label: string; icon: string }> = [
  { value: '', label: '全部', icon: 'ph:squares-four' },
  { value: 'image', label: '图片', icon: 'ph:image' },
  { value: 'video', label: '视频', icon: 'ph:video-camera' },
  { value: 'text', label: '文本', icon: 'ph:text-aa' }
]
</script>

<template>
  <div class="filter-bar">
    <div class="filter-bar__left">
      <div class="filter-bar__title-group">
        <h1 class="filter-bar__title">{{ currentFolderName }}</h1>
        <span class="filter-bar__count">{{ assetCount }}</span>
      </div>
    </div>

    <div class="filter-bar__right">
      <!-- Search Input -->
      <div class="filter-bar__search">
        <Icon icon="ph:magnifying-glass" class="filter-bar__search-icon" />
        <input
          v-model="keyword"
          type="search"
          placeholder="搜索素材..."
          class="filter-bar__search-input"
          @input="handleKeywordChange"
        />
      </div>

      <!-- Filter Button -->
      <div class="filter-bar__filter">
        <button
          class="filter-bar__button"
          :class="{ 'filter-bar__button--active': filters.type !== '' }"
          @click="showFilterMenu = !showFilterMenu"
        >
          <Icon icon="ph:funnel" class="filter-bar__button-icon" />
          筛选
        </button>

        <!-- Filter Dropdown -->
        <div v-if="showFilterMenu" class="filter-bar__dropdown" v-click-outside="closeFilterMenu">
          <div class="filter-bar__dropdown-label">类型</div>
          <button
            v-for="option in typeOptions"
            :key="option.value"
            class="filter-bar__dropdown-item"
            :class="{ 'filter-bar__dropdown-item--active': filters.type === option.value }"
            @click="handleFilterType(option.value)"
          >
            <Icon :icon="option.icon" class="filter-bar__dropdown-icon" />
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- View Toggle -->
      <button class="filter-bar__button" @click="toggleViewMode">
        <Icon :icon="viewMode === 'grid' ? 'ph:squares-four' : 'ph:list-dashes'" class="filter-bar__button-icon" />
      </button>

      <!-- Upload Button -->
      <NButton type="primary" @click="handleUpload">
        <Icon icon="ph:plus" class="filter-bar__upload-icon" />
        上传素材
      </NButton>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 var(--spacing-element-md);
  border-bottom: 1px solid var(--color-border-subtle);
  background: var(--color-bg-primary);
}

.filter-bar__left {
  display: flex;
  align-items: center;
}

.filter-bar__title-group {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-element-sm);
}

.filter-bar__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-lg);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}

.filter-bar__count {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.filter-bar__right {
  display: flex;
  align-items: center;
  gap: var(--spacing-element-sm);
}

.filter-bar__search {
  position: relative;
  width: 320px;
  height: 40px;
}

.filter-bar__search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-text-disabled);
  pointer-events: none;
}

.filter-bar__search-input {
  width: 100%;
  height: 100%;
  padding: 0 12px 0 40px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
  transition: border-color var(--duration-fast) var(--ease-out-cubic);
}

.filter-bar__search-input::placeholder {
  color: var(--color-text-disabled);
}

.filter-bar__search-input:focus {
  outline: none;
  border-color: var(--color-text-display);
  background: var(--color-bg-primary);
}

.filter-bar__filter {
  position: relative;
}

.filter-bar__button {
  height: 40px;
  padding: 0 var(--spacing-element-md);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all var(--duration-fast) var(--ease-out-cubic);
}

.filter-bar__button:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-tertiary);
}

.filter-bar__button--active {
  border-color: var(--color-text-display);
  background: var(--color-bg-tertiary);
  color: var(--color-text-display);
}

.filter-bar__button-icon {
  width: 16px;
  height: 16px;
}

.filter-bar__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 160px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: var(--spacing-element-sm);
}

.filter-bar__dropdown-label {
  padding: 4px 8px;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.filter-bar__dropdown-item {
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  text-align: left;
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 2px;
  transition: background var(--duration-fast) var(--ease-out-cubic);
}

.filter-bar__dropdown-item:hover {
  background: var(--color-bg-secondary);
}

.filter-bar__dropdown-item--active {
  background: var(--color-bg-tertiary);
  color: var(--color-text-display);
}

.filter-bar__dropdown-icon {
  width: 16px;
  height: 16px;
  color: var(--color-text-secondary);
}

.filter-bar__upload-icon {
  width: 16px;
  height: 16px;
}
</style>
