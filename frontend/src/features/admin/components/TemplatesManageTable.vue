<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TemplateManageItem, TemplateType } from '../types'

interface Props {
  templates: TemplateManageItem[]
  loading?: boolean
}

interface Emits {
  (e: 'edit', template: TemplateManageItem): void
  (e: 'delete', id: number): void
  (e: 'toggleStatus', id: number, status: boolean): void
  (e: 'preview', template: TemplateManageItem): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

const filterType = ref<TemplateType | 'all'>('all')
const filterStatus = ref<0 | 1 | 'all'>('all')

const filteredTemplates = computed(() => {
  let result = [...props.templates]

  if (filterType.value !== 'all') {
    result = result.filter(t => t.type === filterType.value)
  }

  if (filterStatus.value !== 'all') {
    result = result.filter(t => t.status === filterStatus.value)
  }

  return result
})

const typeLabel = (type: TemplateType) => {
  return type === 'system' ? '系统' : '自定义'
}

const categoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    minimal: '极简',
    gallery: '画廊',
    editorial: '杂志',
    dark: '暗色',
    blog: '博客',
    immersive: '沉浸'
  }
  return labels[category] || category
}

const layoutTypeLabel = (layoutType: string) => {
  const labels: Record<string, string> = {
    single: '单栏',
    grid: '网格',
    two_column: '双栏',
    masonry: '瀑布流'
  }
  return labels[layoutType] || layoutType
}

const handleEdit = (template: TemplateManageItem) => {
  emit('edit', template)
}

const handleDelete = (id: number) => {
  emit('delete', id)
}

const handleToggleStatus = (id: number, currentStatus: 0 | 1) => {
  emit('toggleStatus', id, currentStatus === 0)
}

const handlePreview = (template: TemplateManageItem) => {
  emit('preview', template)
}
</script>

<template>
  <div class="templates-manage-table">
    <div class="table-header">
      <div class="header-left">
        <div class="label label--mono">TEMPLATES</div>
        <button class="btn-create">+ 新建模版</button>
      </div>
      <div class="filter-actions">
        <button
          v-for="type in ['all', 'system', 'custom']"
          :key="type"
          class="filter-btn"
          :class="{ 'filter-btn--active': filterType === type }"
          @click="filterType = type as TemplateType | 'all'"
        >
          {{ type === 'all' ? '全部' : typeLabel(type as TemplateType) }}
        </button>
        <div class="filter-divider"></div>
        <button
          v-for="status in ['all', 1, 0]"
          :key="status"
          class="filter-btn"
          :class="{ 'filter-btn--active': filterStatus === status }"
          @click="filterStatus = status as 0 | 1 | 'all'"
        >
          {{ status === 'all' ? '全部' : status === 1 ? '启用中' : '已禁用' }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div v-for="i in 5" :key="i" class="skeleton-row">
        <div class="skeleton-cell skeleton-cell--id"></div>
        <div class="skeleton-cell skeleton-cell--name"></div>
        <div class="skeleton-cell skeleton-cell--category"></div>
        <div class="skeleton-cell skeleton-cell--type"></div>
        <div class="skeleton-cell skeleton-cell--layout"></div>
        <div class="skeleton-cell skeleton-cell--status"></div>
        <div class="skeleton-cell skeleton-cell--actions"></div>
      </div>
    </div>

    <div v-else-if="filteredTemplates.length === 0" class="empty-state">
      <p>暂无模版数据</p>
    </div>

    <div v-else class="table-container">
      <table class="templates-table">
        <thead>
          <tr>
            <th class="th th--mono">序号</th>
            <th class="th th--name">模版名称</th>
            <th class="th th--category">分类</th>
            <th class="th th--type">类型</th>
            <th class="th th--layout">布局</th>
            <th class="th th--status">状态</th>
            <th class="th th--actions">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="template in filteredTemplates" :key="template.id" class="table-row">
            <td class="td td--mono">{{ template.id }}</td>
            <td class="td td--name">
              <div class="name-main">{{ template.name }}</div>
            </td>
            <td class="td td--category">{{ categoryLabel(template.category) }}</td>
            <td class="td td--type">
              <span class="type-badge">{{ typeLabel(template.type) }}</span>
            </td>
            <td class="td td--layout">{{ layoutTypeLabel(template.layoutType) }}</td>
            <td class="td td--status">
              <button
                class="status-toggle"
                :class="{ 'status-toggle--active': template.status === 1 }"
                @click="handleToggleStatus(template.id, template.status)"
              >
                <span class="status-toggle__track">
                  <span class="status-toggle__thumb"></span>
                </span>
                <span class="status-toggle__label">
                  {{ template.status === 1 ? '启用中 ●' : '已禁用 ○' }}
                </span>
              </button>
            </td>
            <td class="td td--actions">
              <div class="action-buttons">
                <button class="btn-action" @click="handleEdit(template)">编辑</button>
                <button class="btn-action btn-action--preview" @click="handlePreview(template)">
                  预览
                </button>
                <button class="btn-action btn-action--danger" @click="handleDelete(template.id)">
                  删除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!loading && filteredTemplates.length > 0" class="table-footer">
      <span class="footer-text"
        >显示 1-{{ filteredTemplates.length }} / 共 {{ filteredTemplates.length }} 条</span
      >
    </div>
  </div>
</template>

<style scoped>
.templates-manage-table {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-lg);
}

/* Header */
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-element-md);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-component-md);
}

.label--mono {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
}

.btn-create {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  padding: 6px 12px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.15s ease-out;
  white-space: nowrap;
}

.btn-create:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-tertiary);
}

.filter-actions {
  display: flex;
  align-items: center;
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

.filter-divider {
  width: 1px;
  height: 24px;
  background: var(--color-border-default);
  margin: 0 var(--spacing-element-xs);
}

/* Table */
.table-container {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  overflow-x: auto;
  overflow-y: visible;
}

.templates-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
}

.templates-table .th {
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

.templates-table .th--mono {
  width: 60px;
}

.templates-table .th--name {
  min-width: 150px;
}

.templates-table .th--category {
  width: 80px;
}

.templates-table .th--type {
  width: 80px;
}

.templates-table .th--layout {
  width: 80px;
}

.templates-table .th--status {
  width: 140px;
}

.templates-table .th--actions {
  width: 260px;
}

.templates-table .td {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  padding: 16px;
  border-bottom: 1px solid var(--color-border-default);
  vertical-align: middle;
}

.templates-table tr:last-child .td {
  border-bottom: none;
}

.table-row:hover {
  background: var(--color-bg-tertiary);
}

.table-row:hover .td {
  border-bottom-color: transparent;
}

.templates-table tr:last-child:hover .td {
  border-bottom: none;
}

/* Cell styles */
.td--mono {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  text-transform: uppercase;
  white-space: nowrap;
}

.td--name {
  min-width: 150px;
}

.name-main {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.td--category,
.td--layout {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.type-badge {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  text-transform: uppercase;
  padding: 4px 10px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.td--actions {
  width: 260px;
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

.btn-action--preview {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.btn-action--preview:hover {
  background: rgba(215, 25, 33, 0.1);
}

.btn-action--danger {
  color: var(--color-error);
  border-color: var(--color-error);
}

.btn-action--danger:hover {
  background: rgba(215, 25, 33, 0.1);
}

/* Status toggle */
.status-toggle {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.status-toggle__track {
  width: 40px;
  height: 22px;
  border: 1px solid var(--color-border-default);
  border-radius: 999px;
  position: relative;
  background: var(--color-bg-primary);
  transition: border-color 0.15s ease-out;
  flex-shrink: 0;
}

.status-toggle--active .status-toggle__track {
  border-color: var(--color-success);
}

.status-toggle__thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-text-secondary);
  position: absolute;
  top: 2px;
  left: 2px;
  transition: all 0.15s ease-out;
}

.status-toggle--active .status-toggle__thumb {
  left: 20px;
  background: var(--color-success);
}

.status-toggle__label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.status-toggle--active .status-toggle__label {
  color: var(--color-text-primary);
}

/* Footer */
.table-footer {
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
  grid-template-columns: 60px 150px 80px 80px 80px 140px 260px;
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
