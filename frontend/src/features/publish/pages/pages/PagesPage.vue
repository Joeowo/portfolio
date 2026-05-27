<template>
  <div class="pages-page">
    <!-- Header -->
    <div class="pages-page__header">
      <div class="pages-page__title-section">
        <span class="label">{{ pageStats.all }}</span>
        <h1 class="pages-page__title">PUBLISHED PAGES</h1>
      </div>
      <NButton type="primary" @click="handleCreateNew"> [+ NEW PAGE] </NButton>
    </div>

    <!-- Filter Bar -->
    <PagesFilterBar
      :current-status="pagesStore.statusFilter"
      :search-query="pagesStore.searchQuery"
      :sort-by="String(pagesStore.sortBy)"
      :stats="pageStats"
      @update:status="pagesStore.statusFilter = $event"
      @update:search="pagesStore.searchQuery = $event"
      @update:sort-by="val => (pagesStore.sortBy = val as 'updatedAt' | 'viewCount' | 'createdAt')"
    />

    <!-- Pages Grid -->
    <PagesGrid
      :pages="pagesStore.filteredPages"
      :loading="pagesStore.loading"
      :empty-count="filteredCount"
      :empty-label="emptyLabel"
      :empty-message="emptyMessage"
      :show-create-button="pagesStore.pages.length === 0"
      @preview="handlePreview"
      @edit="handleEdit"
      @click="handlePageClick"
      @create="handleCreateNew"
    />

    <!-- Preview Modal -->
    <PagePreview
      v-if="previewPage"
      :page="previewPage"
      :open="isPreviewOpen"
      @close="closePreview"
      @edit="handleEditFromPreview"
      @visit="handleVisit"
      @back="closePreview"
    />

    <!-- SEO Editor -->
    <SeoEditor
      v-if="editingPage"
      :page="editingPage"
      :open="isSeoEditorOpen"
      @close="closeSeoEditor"
      @save="handleSaveSeo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { usePagesStore } from '../stores/pagesStore'
import { PagesFilterBar, PagesGrid, PagePreview, SeoEditor } from '../components'
import NButton from '@/shared/components/NButton.vue'
import type { PublishedPage } from '../types'

const router = useRouter()
const authStore = useAuthStore()
const pagesStore = usePagesStore()

// Preview
const isPreviewOpen = ref(false)
const previewPage = ref<PublishedPage | null>(null)

// SEO Editor
const isSeoEditorOpen = ref(false)
const editingPage = ref<PublishedPage | null>(null)

// Computed
const pageStats = computed(() => pagesStore.pageStats)

const filteredCount = computed(() => {
  return pagesStore.filteredPages.length
})

const emptyLabel = computed(() => {
  if (pagesStore.statusFilter !== 'all') {
    return pagesStore.statusFilter.toUpperCase()
  }
  return 'PAGES'
})

const emptyMessage = computed(() => {
  if (pagesStore.statusFilter !== 'all') {
    return `No ${pagesStore.statusFilter.toLowerCase()} pages found`
  }
  if (pagesStore.searchQuery) {
    return `No pages matching "${pagesStore.searchQuery}"`
  }
  return 'Create your first published page'
})

// Actions
onMounted(async () => {
  if (authStore.user && authStore.user.id) {
    try {
      await pagesStore.fetchPages(Number(authStore.user.id))
    } catch (error) {
      console.error('Failed to fetch pages:', error)
    }
  }
})

const handlePreview = (id: number) => {
  const page = pagesStore.pages.find(p => p.id === id)
  if (page) {
    previewPage.value = page
    isPreviewOpen.value = true
  }
}

const closePreview = () => {
  isPreviewOpen.value = false
  previewPage.value = null
}

const handleEdit = (id: number) => {
  const page = pagesStore.pages.find(p => p.id === id)
  if (page) {
    editingPage.value = page
    isSeoEditorOpen.value = true
  }
}

const handleEditFromPreview = () => {
  if (previewPage.value) {
    closePreview()
    handleEdit(previewPage.value.id)
  }
}

const closeSeoEditor = () => {
  isSeoEditorOpen.value = false
  editingPage.value = null
}

const handleSaveSeo = async (data: {
  seoTitle?: string
  seoDescription?: string
  customSlug?: string
}) => {
  if (editingPage.value) {
    try {
      await pagesStore.updatePage(editingPage.value.id, data)
      closeSeoEditor()
    } catch (error) {
      console.error('Failed to save SEO:', error)
    }
  }
}

const handlePageClick = (page: PublishedPage) => {
  // Open preview on card click
  handlePreview(page.id)
}

const handleVisit = () => {
  if (previewPage.value?.publishedUrl) {
    window.open(previewPage.value.publishedUrl, '_blank')
  }
}

const handleCreateNew = () => {
  // Navigate to templates page to create a new page
  router.push('/publish/templates')
}
</script>

<style scoped>
.pages-page {
  min-height: 100vh;
  padding: var(--spacing-screen-lg);
}

.pages-page__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 48px;
}

.pages-page__title-section {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xl);
}

.label {
  font-family: var(--font-family-display);
  font-size: 56px;
  font-weight: 400;
  color: var(--color-text-display);
  line-height: 1;
}

.pages-page__title {
  font-family: var(--font-family-primary);
  font-size: 28px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.2;
}

/* Responsive */
@media (max-width: 768px) {
  .pages-page {
    padding: var(--spacing-screen-md);
  }

  .pages-page__header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-lg);
  }

  .pages-page__title-section {
    gap: var(--spacing-md);
  }

  .label {
    font-size: 42px;
  }

  .pages-page__title {
    font-size: 22px;
  }
}
</style>
