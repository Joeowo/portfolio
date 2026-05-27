<script setup lang="ts">
/**
 * WorksListPage - 作品列表页面
 * Phase 5: 作品编辑器模块 - Task 5.14
 */
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWorksStore } from '../stores/worksStore'
import WorksList from '../components/WorksList.vue'
import NButton from '@/shared/components/NButton.vue'
import type { Work } from '../types'

const router = useRouter()
const worksStore = useWorksStore()

// 筛选条件
const currentFilter = ref<'all' | 'draft' | 'published'>('all')

// 初始化
onMounted(async () => {
  await worksStore.fetchWorks()
})

// 筛选作品
const filteredWorks = computed(() => {
  return worksStore.filteredWorks
})

// 切换筛选
const setFilter = (filter: 'all' | 'draft' | 'published') => {
  currentFilter.value = filter
  worksStore.setFilterStatus(filter === 'all' ? 'all' : filter)
}

// 筛选计数
const filterCounts = computed(() => {
  const works = worksStore.works
  return {
    all: works.length,
    draft: works.filter(w => w.status === 'draft').length,
    published: works.filter(w => w.status === 'published').length
  }
})

// 选择作品
const handleSelectWork = (work: Work) => {
  router.push(`/studio/works/${work.id}`)
}

// 编辑作品
const handleEditWork = (work: Work) => {
  router.push(`/studio/works/${work.id}`)
}

// 删除作品
const handleDeleteWork = async (id: number) => {
  if (confirm('确定要删除这个作品吗？')) {
    await worksStore.deleteWork(id)
  }
}

// 复制作品
const handleDuplicateWork = async (id: number) => {
  await worksStore.duplicateWork(id)
}

// 发布作品
const handlePublishWork = async (id: number) => {
  await worksStore.publishWork(id)
}

// 取消发布
const handleUnpublishWork = async (id: number) => {
  await worksStore.unpublishWork(id)
}

// 创建新作品
const handleCreateWork = async () => {
  const work = await worksStore.createWork({
    title: '未命名的作品',
    visibility: 0
  })
  router.push(`/studio/works/${work.id}`)
}

// 搜索
const searchKeyword = ref('')
const handleSearch = () => {
  worksStore.setSearchKeyword(searchKeyword.value)
}
</script>

<template>
  <div class="works-list-page">
    <!-- 头部 -->
    <header class="works-header">
      <div class="works-header__left">
        <h1 class="works-header__title">02</h1>
        <h2 class="works-header__subtitle">WORKS</h2>
      </div>
      <div class="works-header__right">
        <NButton type="primary" @click="handleCreateWork"> [+ 新建作品] </NButton>
      </div>
    </header>

    <!-- 分隔线 -->
    <div class="works-divider" />

    <!-- 筛选标签 -->
    <div class="works-filter">
      <button
        :class="['filter-tab', { 'filter-tab--active': currentFilter === 'all' }]"
        @click="setFilter('all')"
      >
        全部 ({{ filterCounts.all }})
      </button>
      <button
        :class="['filter-tab', { 'filter-tab--active': currentFilter === 'draft' }]"
        @click="setFilter('draft')"
      >
        草稿 ({{ filterCounts.draft }})
      </button>
      <button
        :class="['filter-tab', { 'filter-tab--active': currentFilter === 'published' }]"
        @click="setFilter('published')"
      >
        已发布 ({{ filterCounts.published }})
      </button>
    </div>

    <!-- 搜索框 -->
    <div class="works-search">
      <input
        v-model="searchKeyword"
        type="search"
        placeholder="搜索作品..."
        class="search-input"
        @input="handleSearch"
      />
    </div>

    <!-- 作品列表 -->
    <main class="works-main">
      <WorksList
        :works="filteredWorks"
        :loading="worksStore.loading"
        @select="handleSelectWork"
        @edit="handleEditWork"
        @delete="handleDeleteWork"
        @duplicate="handleDuplicateWork"
        @publish="handlePublishWork"
        @unpublish="handleUnpublishWork"
      >
        <template #empty-action>
          <NButton type="primary" @click="handleCreateWork"> [+ 新建作品] </NButton>
        </template>
      </WorksList>
    </main>
  </div>
</template>

<style scoped>
.works-list-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 头部 */
.works-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-element-lg) var(--spacing-screen-md);
}

.works-header__left {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-component-md);
}

.works-header__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-2xl);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
  margin: 0;
}

.works-header__subtitle {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin: 0;
}

/* 分隔线 */
.works-divider {
  height: 1px;
  background: var(--color-border-subtle);
  margin: 0 var(--spacing-screen-md);
}

/* 筛选标签 */
.works-filter {
  display: flex;
  gap: var(--spacing-element-sm);
  padding: var(--spacing-element-md) var(--spacing-screen-md);
}

.filter-tab {
  padding: var(--spacing-1) var(--spacing-element-md);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background: transparent;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  transition: var(--transition-fast);
}

.filter-tab:hover {
  color: var(--color-text-primary);
}

.filter-tab--active {
  border-color: var(--color-border-default);
  color: var(--color-text-display);
}

/* 搜索 */
.works-search {
  padding: 0 var(--spacing-screen-md) var(--spacing-element-md);
}

.search-input {
  width: 100%;
  max-width: 400px;
  height: var(--height-input-md);
  padding: 0 var(--spacing-element-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-text-display);
  background: var(--color-bg-primary);
}

/* 主内容区 */
.works-main {
  flex: 1;
  overflow-y: auto;
}
</style>
