<script setup lang="ts">
/**
 * WorkCard 组件 - 作品卡片
 * Phase 5: 作品编辑器模块 - Task 5.4
 */
import { computed, ref, onMounted, onUnmounted } from 'vue'
import type { Work } from '../types'

interface Props {
  work: Work
  selected?: boolean
}

interface Emits {
  (e: 'click', work: Work): void
  (e: 'edit', work: Work): void
  (e: 'delete', id: number): void
  (e: 'duplicate', id: number): void
  (e: 'publish', id: number): void
  (e: 'unpublish', id: number): void
}

const props = withDefaults(defineProps<Props>(), {
  selected: false
})
const emit = defineEmits<Emits>()

// 计算区块数量
const blockCount = computed(() => props.work.sections.length)

// 格式化时间
const timeAgo = computed(() => {
  const now = new Date()
  const updated = new Date(props.work.updatedAt)
  const diff = now.getTime() - updated.getTime()

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes}M AGO`
  if (hours < 24) return `${hours}H AGO`
  return `${days}D AGO`
})

// 状态文本
const statusText = computed(() => {
  return props.work.status === 'published' ? 'PUBLISHED' : 'DRAFT'
})

// 封面占位符
const coverPlaceholder = computed(() => {
  return props.work.title.charAt(0).toUpperCase()
})

// 点击卡片
const handleClick = () => {
  emit('click', props.work)
}

// 编辑
const handleEdit = (e: Event) => {
  e.stopPropagation()
  emit('edit', props.work)
}

// 删除
const handleDelete = (e: Event) => {
  e.stopPropagation()
  emit('delete', props.work.id)
}

// 复制
const handleDuplicate = (e: Event) => {
  e.stopPropagation()
  emit('duplicate', props.work.id)
}

// 发布/取消发布
const handleTogglePublish = (e: Event) => {
  e.stopPropagation()
  if (props.work.status === 'published') {
    emit('unpublish', props.work.id)
  } else {
    emit('publish', props.work.id)
  }
}

// 显示操作菜单
const showMenu = ref(false)
const menuRef = ref<HTMLElement | null>(null)

// 点击外部关闭菜单
const onClickOutside = (e: Event) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})

const toggleMenu = (e: Event) => {
  e.stopPropagation()
  showMenu.value = !showMenu.value
}
</script>

<template>
  <div
    :class="['work-card', { 'work-card--selected': selected }]"
    @click="handleClick"
  >
    <!-- 封面图 -->
    <div class="work-card__cover">
      <img
        v-if="work.coverUrl"
        :src="work.coverUrl"
        :alt="work.title"
        class="work-card__cover-image"
      />
      <div v-else class="work-card__cover-placeholder">
        {{ coverPlaceholder }}
      </div>

      <!-- 悬停菜单 -->
      <div class="work-card__menu" ref="menuRef">
        <button class="work-card__menu-btn" @click="toggleMenu">
          <span class="dots">···</span>
        </button>
        <div v-if="showMenu" class="work-card__dropdown">
          <button class="dropdown-item" @click="handleEdit">编辑</button>
          <button class="dropdown-item" @click="handleDuplicate">复制</button>
          <button
            :class="['dropdown-item', { 'dropdown-item--danger': work.status === 'published' }]"
            @click="handleTogglePublish"
          >
            {{ work.status === 'published' ? '取消发布' : '发布' }}
          </button>
          <button class="dropdown-item dropdown-item--danger" @click="handleDelete">删除</button>
        </div>
      </div>
    </div>

    <!-- 内容信息 -->
    <div class="work-card__content">
      <h3 class="work-card__title">{{ work.title || '未命名的作品' }}</h3>
      <div class="work-card__meta">
        <span class="work-card__blocks">{{ blockCount }} BLOCKS</span>
        <span
          :class="[
            'work-card__status',
            { 'work-card__status--published': work.status === 'published' }
          ]"
        >
          {{ statusText }} · {{ timeAgo }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.work-card {
  width: 280px;
  height: 320px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
  display: flex;
  flex-direction: column;
  position: relative;
}

.work-card:hover {
  border-color: var(--color-border-strong);
}

.work-card--selected {
  border-color: var(--color-text-display);
  border-width: 2px;
}

/* 封面 */
.work-card__cover {
  width: 100%;
  height: 220px;
  position: relative;
  overflow: hidden;
}

.work-card__cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: var(--color-bg-tertiary);
}

.work-card__cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  font-family: var(--font-family-display);
  font-size: 32px;
  color: var(--color-text-disabled);
  font-weight: var(--font-weight-medium);
}

/* 菜单按钮 */
.work-card__menu {
  position: absolute;
  top: var(--spacing-element-sm);
  right: var(--spacing-element-sm);
  z-index: 2;
}

.work-card__menu-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-elevated);
  cursor: pointer;
  opacity: 0;
  transition: var(--transition-fast);
}

.work-card:hover .work-card__menu-btn {
  opacity: 1;
}

.work-card__menu-btn:hover {
  border-color: var(--color-border-strong);
}

.dots {
  font-size: var(--font-size-body-lg);
  color: var(--color-text-primary);
  letter-spacing: -2px;
}

/* 下拉菜单 */
.work-card__dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--spacing-1);
  min-width: 120px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-elevated);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.dropdown-item {
  width: 100%;
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  border: none;
  background: transparent;
  text-align: left;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: var(--transition-fast);
}

.dropdown-item:hover {
  background: var(--color-bg-tertiary);
}

.dropdown-item--danger {
  color: var(--color-error-text);
}

.dropdown-item--danger:hover {
  background: var(--color-error-bg);
}

/* 内容 */
.work-card__content {
  flex: 1;
  padding: var(--spacing-element-md);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.work-card__title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.work-card__meta {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.work-card__blocks {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.work-card__status {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.work-card__status--published {
  color: var(--color-success-text);
}
</style>
