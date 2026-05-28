<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PageReviewItem, PageStatus } from '../types'

interface Props {
  pages: PageReviewItem[]
  loading?: boolean
}

interface Emits {
  (e: 'approve', id: number): void
  (e: 'reject', id: number): void
  (e: 'offline', id: number): void
  (e: 'preview', page: PageReviewItem): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

const filterStatus = ref<PageStatus | 'all'>('all')

const filteredPages = computed(() => {
  if (filterStatus.value === 'all') return props.pages
  return props.pages.filter(p => p.status === filterStatus.value)
})

const statusLabel = (status: PageStatus) => {
  const labels: Record<PageStatus, string> = {
    draft: '草稿',
    pending: '待审核',
    published: '已上线',
    offline: '已下架'
  }
  return labels[status] || status
}

const statusClass = (status: PageStatus) => {
  return `status-badge--${status}`
}

const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  return date.toLocaleDateString()
}

const handleApprove = (id: number) => {
  emit('approve', id)
}

const handleReject = (id: number) => {
  emit('reject', id)
}

const handleOffline = (id: number) => {
  emit('offline', id)
}

const handlePreview = (page: PageReviewItem) => {
  emit('preview', page)
}

const filterOptions: Array<{ value: PageStatus | 'all'; label: string }> = [
  { value: 'all', label: '全部' },
  { value: 'pending', label: '待审核' },
  { value: 'published', label: '已上线' },
  { value: 'offline', label: '已下架' }
]
</script>

<template>
  <div class="pages-review-list">
    <div class="list-header">
      <div class="label label--mono">PAGES REVIEW</div>
      <div class="filter-actions">
        <button
          v-for="option in filterOptions"
          :key="option.value"
          class="filter-btn"
          :class="{ 'filter-btn--active': filterStatus === option.value }"
          @click="filterStatus = option.value"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div v-for="i in 5" :key="i" class="skeleton-row">
        <div class="skeleton-cell skeleton-cell--id"></div>
        <div class="skeleton-cell skeleton-cell--title"></div>
        <div class="skeleton-cell skeleton-cell--author"></div>
        <div class="skeleton-cell skeleton-cell--time"></div>
        <div class="skeleton-cell skeleton-cell--status"></div>
        <div class="skeleton-cell skeleton-cell--actions"></div>
      </div>
    </div>

    <div v-else-if="filteredPages.length === 0" class="empty-state">
      <p>暂无数据</p>
    </div>

    <div v-else class="table-container">
      <table class="review-table">
        <thead>
          <tr>
            <th class="th th--mono">序号</th>
            <th class="th th--title">网页标题</th>
            <th class="th th--author">作者</th>
            <th class="th th--mono">创建时间</th>
            <th class="th th--mono">状态</th>
            <th class="th th--actions">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="page in filteredPages" :key="page.id" class="table-row">
            <td class="td td--mono">{{ page.id }}</td>
            <td class="td td--title">
              <div class="title-main">{{ page.title }}</div>
              <div class="title-slug">{{ page.customSlug || `page-${page.id}` }}</div>
            </td>
            <td class="td td--author">
              {{ page.user?.nickname || `@${page.user?.username || 'unknown'}` }}
            </td>
            <td class="td td--mono">{{ formatTime(page.createdAt) }}</td>
            <td class="td td--status">
              <span class="status-badge" :class="statusClass(page.status)">
                {{ statusLabel(page.status) }}
              </span>
            </td>
            <td class="td td--actions">
              <div class="action-buttons">
                <button
                  v-if="page.status === 'pending'"
                  class="btn-action btn-action--primary"
                  @click="handleApprove(page.id)"
                >
                  审核通过
                </button>
                <button
                  v-if="page.status === 'pending'"
                  class="btn-action btn-action--secondary"
                  @click="handleReject(page.id)"
                >
                  拒绝
                </button>
                <button
                  v-if="page.status === 'published'"
                  class="btn-action btn-action--secondary"
                  @click="handleOffline(page.id)"
                >
                  下架
                </button>
                <button class="btn-action btn-action--preview" @click="handlePreview(page)">
                  预览
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!loading && filteredPages.length > 0" class="list-footer">
      <span class="footer-text"
        >显示 1-{{ filteredPages.length }} / 共 {{ filteredPages.length }} 条</span
      >
    </div>
  </div>
</template>

<style scoped>
.pages-review-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-lg);
}

/* Header */
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-element-md);
}

.label--mono {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
}

.filter-actions {
  display: flex;
  gap: var(--spacing-element-sm);
  flex-wrap: wrap;
}

.filter-btn {
  font-family: var(--font-family-mono);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 8px 16px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.15s ease-out;
  white-space: nowrap;
}

.filter-btn:hover {
  border-color: var(--color-border-strong);
  color: var(--color-text-primary);
}

.filter-btn--active {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border-strong);
  color: var(--color-text-primary);
}

/* Table */
.table-container {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  overflow-x: auto;
  overflow-y: visible;
}

.review-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

.review-table .th {
  font-family: var(--font-family-mono);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  text-align: left;
  padding: 16px;
  border-bottom: 1px solid var(--color-border-default);
  font-weight: 500;
  white-space: nowrap;
}

.review-table .th--mono {
  width: 60px;
}

.review-table .th--title {
  min-width: 200px;
}

.review-table .th--author {
  width: 120px;
}

.review-table .th--actions {
  width: 280px;
}

.review-table .td {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  padding: 16px;
  border-bottom: 1px solid var(--color-border-default);
  vertical-align: middle;
}

.review-table tr:last-child .td {
  border-bottom: none;
}

.table-row:hover {
  background: var(--color-bg-tertiary);
}

.table-row:hover .td {
  border-bottom-color: transparent;
}

.review-table tr:last-child:hover .td {
  border-bottom: none;
}

/* Cell styles */
.td--mono {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  text-transform: uppercase;
  white-space: nowrap;
}

.td--title {
  min-width: 200px;
}

.title-main {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-slug {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.td--author {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.td--actions {
  width: 280px;
  padding: 12px 16px;
}

/* Action buttons */
.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-action {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  padding: 6px 12px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.15s ease-out;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-action:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border-strong);
}

.btn-action:focus-visible {
  outline: 2px solid var(--color-border-strong);
  outline-offset: 2px;
}

.btn-action:focus {
  outline: none;
}

.btn-action--primary {
  color: var(--color-success);
  border-color: var(--color-success);
}

.btn-action--primary:hover {
  background: rgba(76, 175, 80, 0.1);
}

.btn-action--secondary {
  color: var(--color-text-secondary);
}

.btn-action--preview {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.btn-action--preview:hover {
  background: rgba(215, 25, 33, 0.1);
}

/* Status badge */
.status-badge {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  padding: 4px 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.status-badge::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.status-badge--draft {
  color: var(--color-text-secondary);
  background: rgba(168, 168, 168, 0.1);
}

.status-badge--pending {
  color: var(--color-warning);
  background: rgba(255, 152, 0, 0.1);
}

.status-badge--published {
  color: var(--color-success);
  background: rgba(76, 175, 80, 0.1);
}

.status-badge--offline {
  color: var(--color-text-disabled);
  background: rgba(168, 168, 168, 0.1);
}

/* Footer */
.list-footer {
  padding: var(--spacing-element-md) 0;
  text-align: center;
}

.footer-text {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
}

/* Loading state */
.loading-state {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  padding: var(--spacing-component-md);
}

.skeleton-row {
  display: grid;
  grid-template-columns: 60px 200px 120px 100px 80px 280px;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border-default);
}

.skeleton-row:last-child {
  border-bottom: none;
}

.skeleton-cell {
  height: 20px;
  background: linear-gradient(
    90deg,
    var(--color-bg-tertiary) 25%,
    var(--color-bg-secondary) 50%,
    var(--color-bg-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: var(--radius-xs);
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Empty state */
.empty-state {
  background: var(--color-bg-secondary);
  border: 1px dashed var(--color-border-default);
  border-radius: var(--radius-sm);
  padding: var(--spacing-16);
  text-align: center;
  color: var(--color-text-secondary);
}

.empty-state p {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
}
</style>
