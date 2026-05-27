<script setup lang="ts">
/**
 * WorksList 组件 - 作品列表网格
 * Phase 5: 作品编辑器模块 - Task 5.5
 */
import { computed, ref } from 'vue'
import type { Work } from '../types'
import WorkCard from './WorkCard.vue'

interface Props {
  works: Work[]
  loading?: boolean
}

interface Emits {
  (e: 'select', work: Work): void
  (e: 'edit', work: Work): void
  (e: 'delete', id: number): void
  (e: 'duplicate', id: number): void
  (e: 'publish', id: number): void
  (e: 'unpublish', id: number): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})
const emit = defineEmits<Emits>()

// 空状态判断
const isEmpty = computed(() => props.works.length === 0 && !props.loading)

// 选中状态
const selectedWorkId = ref<number | null>(null)

// 选择作品
const handleSelect = (work: Work) => {
  selectedWorkId.value = work.id
  emit('select', work)
}

// 操作处理
const handleEdit = (work: Work) => {
  emit('edit', work)
}

const handleDelete = (id: number) => {
  emit('delete', id)
}

const handleDuplicate = (id: number) => {
  emit('duplicate', id)
}

const handlePublish = (id: number) => {
  emit('publish', id)
}

const handleUnpublish = (id: number) => {
  emit('unpublish', id)
}
</script>

<template>
  <div :class="['works-list', { 'works-list--empty': isEmpty }]">
    <!-- 加载状态 -->
    <div v-if="loading" class="works-list__loading">
      <div class="loading-text">[LOADING...]</div>
    </div>

    <!-- 空状态 -->
    <div v-else-if="isEmpty" class="works-list__empty">
      <div class="empty-number">0</div>
      <div class="empty-label">WORKS</div>
      <p class="empty-description">创建你的第一个作品</p>
      <slot name="empty-action" />
    </div>

    <!-- 作品网格 -->
    <div v-else class="works-list__grid">
      <WorkCard
        v-for="work in works"
        :key="work.id"
        :work="work"
        :selected="selectedWorkId === work.id"
        @click="handleSelect"
        @edit="handleEdit"
        @delete="handleDelete"
        @duplicate="handleDuplicate"
        @publish="handlePublish"
        @unpublish="handleUnpublish"
      />
    </div>
  </div>
</template>

<style scoped>
.works-list {
  width: 100%;
}

.works-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-component-md);
  padding: var(--spacing-screen-md);
}

/* 加载状态 */
.works-list__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-text {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

/* 空状态 */
.works-list__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: var(--spacing-component-sm);
}

.empty-number {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-2xl);
  color: var(--color-text-disabled);
  line-height: var(--line-height-tight);
}

.empty-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  color: var(--color-text-disabled);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.empty-description {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  color: var(--color-text-secondary);
  margin: 0;
}
</style>
