<script setup lang="ts">
/**
 * SectionItem 组件 - 区块项（可拖拽）
 * Phase 5: 作品编辑器模块 - Task 5.6
 */
import { computed } from 'vue'
import type { Section, SectionType } from '../types'

interface Props {
  section: Section
  dragging?: boolean
}

interface Emits {
  (e: 'edit', section: Section): void
  (e: 'delete', order: number): void
  (e: 'duplicate', section: Section): void
}

const props = withDefaults(defineProps<Props>(), {
  dragging: false
})
const emit = defineEmits<Emits>()

// 区块类型标签映射
const sectionTypeLabels: Record<SectionType, string> = {
  text_block: 'TEXT BLOCK',
  image_gallery: 'IMAGE GALLERY',
  video_player: 'VIDEO PLAYER',
  quote: 'QUOTE'
}

// 获取预览内容
const previewContent = computed(() => {
  const { type, content } = props.section

  switch (type) {
    case 'text_block':
      return content.text_block?.content || ''

    case 'image_gallery':
      return {
        type: 'gallery',
        images: content.image_gallery?.images || [],
        count: content.image_gallery?.images.length || 0
      }

    case 'video_player':
      return {
        type: 'video',
        title: content.video_player?.title,
        thumbnail: content.video_player?.thumbnail
      }

    case 'quote':
      return {
        type: 'quote',
        content: content.quote?.content || '',
        author: content.quote?.author
      }

    default:
      return null
  }
})

// 文本预览（截取前两行）
const textPreview = computed(() => {
  if (previewContent.value && typeof previewContent.value === 'string') {
    const text = previewContent.value
    const maxLength = 100
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }
  return ''
})

// 操作处理
const handleEdit = () => {
  emit('edit', props.section)
}

const handleDelete = () => {
  emit('delete', props.section.order)
}

const handleDuplicate = () => {
  emit('duplicate', props.section)
}
</script>

<template>
  <div :class="['section-item', { 'section-item--dragging': dragging }]">
    <!-- 头部 -->
    <div class="section-item__header">
      <div class="section-item__drag-handle">
        <span class="drag-icon">⋮⋮</span>
        <span class="drag-label">{{ sectionTypeLabels[section.type] }}</span>
      </div>
      <button class="section-item__delete" title="删除区块" @click="handleDelete">×</button>
    </div>

    <!-- 预览区域 -->
    <div class="section-item__preview">
      <!-- 文本块预览 -->
      <div v-if="section.type === 'text_block'" class="preview-text">
        {{ textPreview || '暂无内容' }}
      </div>

      <!-- 图片画廊预览 -->
      <div v-else-if="section.type === 'image_gallery'" class="preview-gallery">
        <div class="image-grid">
          <div
            v-for="img in (previewContent as any).images?.slice(0, 3)"
            :key="img.id"
            class="image-thumb"
          >
            <img :src="img.thumbnail || img.url" :alt="img.alt || ''" />
          </div>
        </div>
        <div v-if="(previewContent as any).count > 3" class="more-count">
          +{{ (previewContent as any).count - 3 }}
        </div>
      </div>

      <!-- 视频预览 -->
      <div v-else-if="section.type === 'video_player'" class="preview-video">
        <div class="video-placeholder">
          <span class="play-icon">▶</span>
          <span v-if="(previewContent as any).title" class="video-title">
            {{ (previewContent as any).title }}
          </span>
          <span v-else class="video-label">VIDEO</span>
        </div>
      </div>

      <!-- 引言预览 -->
      <div v-else-if="section.type === 'quote'" class="preview-quote">
        <div class="quote-content">"{{ (previewContent as any).content }}"</div>
        <div v-if="(previewContent as any).author" class="quote-author">
          — {{ (previewContent as any).author }}
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="section-item__actions">
      <button class="action-btn" @click="handleDuplicate">复制</button>
      <button class="action-btn action-btn--primary" @click="handleEdit">编辑</button>
    </div>
  </div>
</template>

<style scoped>
.section-item {
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  transition: var(--transition-fast);
}

.section-item:hover {
  border-color: var(--color-border-strong);
}

.section-item--dragging {
  opacity: 0.5;
  border: 2px dashed var(--color-border-strong);
}

/* 头部 */
.section-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  border-bottom: 1px solid var(--color-border-subtle);
  background: var(--color-bg-primary);
}

.section-item__drag-handle {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  cursor: grab;
}

.section-item__drag-handle:active {
  cursor: grabbing;
}

.drag-icon {
  font-size: var(--font-size-body-lg);
  color: var(--color-text-secondary);
  letter-spacing: -2px;
}

.drag-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.section-item__delete {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--color-text-disabled);
  cursor: pointer;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-h3);
  line-height: 1;
  transition: var(--transition-fast);
}

.section-item__delete:hover {
  color: var(--color-error-text);
}

/* 预览区域 */
.section-item__preview {
  padding: var(--spacing-element-md);
  min-height: 80px;
}

.preview-text {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.preview-gallery {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-2);
}

.image-thumb {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--color-bg-tertiary);
}

.image-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.more-count {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
}

.preview-video {
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-placeholder {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
  background: var(--color-bg-tertiary);
}

.play-icon {
  font-size: var(--font-size-h3);
  color: var(--color-text-secondary);
}

.video-title,
.video-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.preview-quote {
  text-align: center;
}

.quote-content {
  font-family: var(--font-family-display);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
  line-height: var(--line-height-relaxed);
  font-style: italic;
}

.quote-author {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-align: right;
  margin-top: var(--spacing-2);
}

/* 操作按钮 */
.section-item__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-element-sm);
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  border-top: 1px solid var(--color-border-subtle);
}

.action-btn {
  padding: var(--spacing-1) var(--spacing-element-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  transition: var(--transition-fast);
}

.action-btn:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-tertiary);
}

.action-btn--primary {
  background: var(--color-text-display);
  color: var(--color-text-inverse);
  border-color: var(--color-text-display);
}

.action-btn--primary:hover {
  background: var(--color-text-primary);
  border-color: var(--color-text-primary);
}
</style>
