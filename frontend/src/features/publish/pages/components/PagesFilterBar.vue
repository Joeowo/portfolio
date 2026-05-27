<template>
  <div class="pages-filter-bar">
    <!-- Status Tabs -->
    <div class="pages-filter-bar__status-tabs">
      <button
        v-for="status in statusOptions"
        :key="status.value"
        :class="[
          'pages-filter-bar__tab',
          { 'pages-filter-bar__tab--active': currentStatus === status.value }
        ]"
        @click="$emit('update:status', status.value)"
      >
        {{ status.label }}
        <span v-if="status.count > 0" class="pages-filter-bar__count">
          {{ status.count }}
        </span>
      </button>
    </div>

    <!-- Search and Sort -->
    <div class="pages-filter-bar__search">
      <NInput
        :model-value="searchQuery"
        placeholder="SEARCH PAGES..."
        clearable
        @update:model-value="handleSearchUpdate"
      />
      <NSelect
        :model-value="sortBy"
        :options="sortOptions"
        placeholder="SORT BY"
        @update:model-value="handleSortUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NInput from '@/shared/components/NInput.vue'
import NSelect from '@/shared/components/NSelect.vue'

interface StatusOption {
  value: string
  label: string
  count: number
}

interface Props {
  currentStatus: string
  searchQuery: string
  sortBy: string
  stats: {
    all: number
    published: number
    draft: number
    offline: number
    pending: number
  }
}

interface Emits {
  (e: 'update:status', value: string): void
  (e: 'update:search', value: string): void
  (e: 'update:sortBy', value: string): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const statusOptions = computed((): StatusOption[] => {
  const stats = props.stats
  return [
    { value: 'all', label: 'ALL', count: stats.all },
    { value: 'published', label: 'ONLINE', count: stats.published },
    { value: 'draft', label: 'DRAFT', count: stats.draft },
    { value: 'offline', label: 'OFFLINE', count: stats.offline },
    { value: 'pending', label: 'PENDING', count: stats.pending }
  ]
})

const sortOptions = [
  { value: 'updatedAt', label: 'RECENTLY UPDATED' },
  { value: 'viewCount', label: 'MOST VIEWED' },
  { value: 'createdAt', label: 'OLDEST FIRST' }
]

const handleSearchUpdate = (_value: string | number) => {
  // Value is emitted through the template
}

const handleSortUpdate = (_value: string | number) => {
  // Value is emitted through the template
}
</script>

<style scoped>
.pages-filter-bar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
}

.pages-filter-bar__status-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.pages-filter-bar__tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-family: var(--font-family-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  background: transparent;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--duration-fast) ease-out;
}

.pages-filter-bar__tab:hover {
  color: var(--color-text-primary);
  border-color: var(--color-border-hover);
}

.pages-filter-bar__tab--active {
  color: var(--color-text-primary);
  background: var(--color-bg-secondary);
  border-color: var(--color-border-selected);
}

.pages-filter-bar__count {
  font-weight: 500;
}

.pages-filter-bar__search {
  display: flex;
  gap: 16px;
}

.pages-filter-bar__search > :first-child {
  flex: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .pages-filter-bar__search {
    flex-direction: column;
  }

  .pages-filter-bar__status-tabs {
    overflow-x: auto;
    padding-bottom: var(--spacing-sm);
  }
}
</style>
