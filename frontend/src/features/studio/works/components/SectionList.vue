<script setup lang="ts">
/**
 * SectionList 组件 - 区块列表（可拖拽排序）
 * Phase 5: 作品编辑器模块 - Task 5.7
 */
import { ref, computed, watch } from 'vue'
import draggable from 'vuedraggable'
import type { Section } from '../types'
import { SectionType } from '../types'
import SectionItem from './SectionItem.vue'

interface Props {
  sections: Section[]
}

interface Emits {
  (e: 'reorder', sections: Section[]): void
  (e: 'add', type: SectionType): void
  (e: 'edit', section: Section): void
  (e: 'delete', order: number): void
  (e: 'duplicate', section: Section): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 本地段列表（用于拖拽）
const localSections = ref<Section[]>([...props.sections])

// 同步外部 sections 变化
watch(
  () => props.sections,
  (newSections) => {
    localSections.value = [...newSections]
  },
  { deep: true }
)

// 拖拽状态
const isDragging = ref(false)

// 拖拽开始
const onDragStart = () => {
  isDragging.value = true
}

// 拖拽结束
const onDragEnd = () => {
  isDragging.value = false
  // 更新 order 属性
  localSections.value.forEach((section, index) => {
    section.order = index
  })
  emit('reorder', localSections.value)
}

// 空状态判断
const isEmpty = computed(() => localSections.value.length === 0)

// 区块类型选项
const sectionTypes: { type: SectionType; label: string; description: string }[] = [
  { type: SectionType.TEXT_BLOCK, label: 'TEXT BLOCK', description: '添加文本内容区块' },
  { type: SectionType.IMAGE_GALLERY, label: 'IMAGE GALLERY', description: '添加图片画廊' },
  { type: SectionType.VIDEO_PLAYER, label: 'VIDEO PLAYER', description: '添加视频播放器' },
  { type: SectionType.QUOTE, label: 'QUOTE', description: '添加引言块' }
]

// 添加区块菜单
const showAddMenu = ref(false)

const toggleAddMenu = () => {
  showAddMenu.value = !showAddMenu.value
}

const handleAddSection = (type: SectionType) => {
  emit('add', type)
  showAddMenu.value = false
}

// 编辑区块
const handleEdit = (section: Section) => {
  emit('edit', section)
}

// 删除区块
const handleDelete = (order: number) => {
  emit('delete', order)
}

// 复制区块
const handleDuplicate = (section: Section) => {
  emit('duplicate', section)
}
</script>

<template>
  <div class="section-list">
    <!-- 区块列表 -->
    <draggable
      v-model="localSections"
      item-key="id"
      handle=".section-item__drag-handle"
      :class="{ 'section-list--dragging': isDragging }"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <template #item="{ element: section }">
        <SectionItem
          :section="section"
          :dragging="isDragging"
          @edit="handleEdit"
          @delete="handleDelete"
          @duplicate="handleDuplicate"
        />
      </template>
    </draggable>

    <!-- 空状态 -->
    <div v-if="isEmpty" class="section-list__empty">
      <div class="empty-number">0</div>
      <div class="empty-label">SECTIONS</div>
      <p class="empty-description">添加你的第一个内容区块</p>
    </div>

    <!-- 添加区块按钮 -->
    <div class="section-list__add">
      <div v-if="showAddMenu" class="add-menu">
        <button
          v-for="option in sectionTypes"
          :key="option.type"
          class="add-menu-item"
          @click="handleAddSection(option.type)"
        >
          <span class="add-menu-label">{{ option.label }}</span>
          <span class="add-menu-description">{{ option.description }}</span>
        </button>
      </div>
      <button
        :class="['add-button', { 'add-button--active': showAddMenu }]"
        @click="toggleAddMenu"
      >
        <span class="add-icon">+</span>
        <span>添加区块</span>
        <span class="add-arrow">{{ showAddMenu ? '▼' : '▶' }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.section-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-sm);
}

.section-list--dragging .section-item {
  cursor: move;
}

/* 空状态 */
.section-list__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: var(--spacing-component-sm);
}

.empty-number {
  font-family: var(--font-family-display);
  font-size: 48px;
  color: var(--color-text-disabled);
  line-height: var(--line-height-tight);
  font-weight: var(--font-weight-medium);
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

/* 添加按钮区域 */
.section-list__add {
  position: relative;
  margin-top: var(--spacing-component-md);
}

.add-button {
  width: 100%;
  height: var(--height-button-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-element-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-elevated);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  transition: var(--transition-fast);
}

.add-button:hover {
  border-color: var(--color-border-strong);
}

.add-button--active {
  border-color: var(--color-text-display);
  color: var(--color-text-display);
}

.add-icon {
  font-size: var(--font-size-h3);
  line-height: 1;
}

.add-arrow {
  margin-left: auto;
  font-size: var(--font-size-label-sm);
}

/* 添加菜单 */
.add-menu {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  margin-bottom: var(--spacing-1);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-elevated);
  overflow: hidden;
  z-index: var(--z-dropdown);
}

.add-menu-item {
  width: 100%;
  padding: var(--spacing-element-md);
  border: none;
  border-bottom: 1px solid var(--color-border-subtle);
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-1);
  text-align: left;
  cursor: pointer;
  transition: var(--transition-fast);
}

.add-menu-item:last-child {
  border-bottom: none;
}

.add-menu-item:hover {
  background: var(--color-bg-tertiary);
}

.add-menu-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.add-menu-description {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-secondary);
}
</style>
