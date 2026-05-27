<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TemplateFilters, TemplateCategory } from '../types/Template'

interface CategoryTab {
  label: string
  value: 'all' | TemplateCategory
}

const categories: CategoryTab[] = [
  { label: 'ALL', value: 'all' },
  { label: 'SYSTEM', value: 'system' },
  { label: 'CUSTOM', value: 'custom' }
]

interface Props {
  modelValue: TemplateFilters
}

interface Emits {
  (e: 'update:modelValue', value: TemplateFilters): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const category = ref<'all' | TemplateCategory>('all')
const searchQuery = ref('')

const updateFilters = () => {
  const filters: TemplateFilters = {}

  if (category.value !== 'all') {
    filters.type = category.value
  }

  if (searchQuery.value) {
    filters.search = searchQuery.value
  }

  emit('update:modelValue', filters)
}

watch(category, updateFilters)

const handleCategoryChange = (value: 'all' | TemplateCategory) => {
  category.value = value
}

const handleSearch = (query: string) => {
  searchQuery.value = query
  updateFilters()
}
</script>

<template>
  <div class="template-filter-bar">
    <!-- Category Tabs -->
    <div class="template-filter-bar__tabs">
      <button
        v-for="cat in categories"
        :key="cat.value"
        :class="[
          'template-filter-bar__tab',
          { 'template-filter-bar__tab--active': category === cat.value }
        ]"
        @click="handleCategoryChange(cat.value)"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- Search Input -->
    <div class="template-filter-bar__search">
      <input
        :value="searchQuery"
        type="text"
        class="template-filter-bar__search-input"
        placeholder="SEARCH TEMPLATES..."
        @input="handleSearch(($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<style scoped>
.template-filter-bar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 48px;
}

.template-filter-bar__tabs {
  display: flex;
  gap: 8px;
}

.template-filter-bar__tab {
  padding: 8px 16px;
  font-family: var(--font-family-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  background: transparent;
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  cursor: pointer;
  transition: all 150ms ease-out;
}

.template-filter-bar__tab:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-secondary);
}

.template-filter-bar__tab--active {
  color: var(--color-text-primary);
  background: var(--color-bg-secondary);
  border-color: var(--color-border-selected);
}

.template-filter-bar__search {
  display: flex;
  gap: 16px;
}

.template-filter-bar__search-input {
  flex: 1;
  padding: 12px 16px;
  font-family: var(--font-family-primary);
  font-size: 14px;
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  transition: all 150ms ease-out;
}

.template-filter-bar__search-input:focus {
  outline: none;
  border-color: var(--color-border-hover);
}

.template-filter-bar__search-input::placeholder {
  font-family: var(--font-family-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-disabled);
}

@media (max-width: 768px) {
  .template-filter-bar__tabs {
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .template-filter-bar__search {
    flex-direction: column;
  }
}
</style>
