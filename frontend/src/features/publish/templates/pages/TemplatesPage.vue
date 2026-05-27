<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTemplatesStore } from '../stores/templatesStore'
import TemplateGrid from '../components/TemplateGrid.vue'
import TemplatePreview from '../components/TemplatePreview.vue'
import TemplateFilterBar from '../components/TemplateFilterBar.vue'
import type { Template, TemplateFilters } from '../types/Template'

const templatesStore = useTemplatesStore()

const selectedTemplateId = ref<number | null>(null)
const previewTemplate = ref<Template | null>(null)
const previewOpen = ref(false)

const filteredTemplates = computed(() => {
  let templates = templatesStore.templates

  const searchQuery = templatesStore.filters.search || ''
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    templates = templates.filter(
      t =>
        t.name.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        t.layoutType.toLowerCase().includes(query)
    )
  }

  return templates
})

const handleSelectTemplate = (id: number) => {
  selectedTemplateId.value = id
  const template = templatesStore.templates.find(t => t.id === id)
  if (template) {
    console.log('Selected template:', template)
    // TODO: Navigate to next step or save selection
  }
}

const handlePreviewTemplate = (template: Template) => {
  previewTemplate.value = template
  previewOpen.value = true
}

const handlePreviewClose = () => {
  previewOpen.value = false
}

const handlePreviewSelect = () => {
  if (previewTemplate.value) {
    handleSelectTemplate(previewTemplate.value.id)
  }
}

const handleFilterChange = (filters: TemplateFilters) => {
  templatesStore.setFilters(filters)
}

onMounted(() => {
  templatesStore.fetchTemplates()
})
</script>

<template>
  <div class="templates-page">
    <!-- Header -->
    <div class="templates-page__header">
      <div class="label">CHOOSE TEMPLATE</div>
      <h1 class="templates-page__title">Select a Layout for Your Portfolio</h1>
    </div>

    <!-- Filter Bar -->
    <TemplateFilterBar
      :model-value="templatesStore.filters"
      @update:model-value="handleFilterChange"
    />

    <!-- Template Grid -->
    <TemplateGrid
      :templates="filteredTemplates"
      :selected-id="selectedTemplateId"
      :loading="templatesStore.loading"
      @select="handleSelectTemplate"
      @preview="handlePreviewTemplate"
    />

    <!-- Preview Modal -->
    <TemplatePreview
      :open="previewOpen"
      :template="previewTemplate"
      @close="handlePreviewClose"
      @select="handlePreviewSelect"
    />
  </div>
</template>

<style scoped>
.templates-page {
  min-height: 100vh;
  padding: var(--spacing-screen-md);
}

.templates-page__header {
  margin-bottom: var(--spacing-4xl);
}

.templates-page__header .label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-element-sm);
  display: block;
}

.templates-page__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-xl);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}

@media (max-width: 768px) {
  .templates-page {
    padding: var(--spacing-component-md);
  }

  .templates-page__header {
    margin-bottom: var(--spacing-2xl);
  }

  .templates-page__title {
    font-size: var(--font-size-display-lg);
  }
}
</style>
