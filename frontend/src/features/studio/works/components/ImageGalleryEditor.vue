<script setup lang="ts">
/**
 * ImageGalleryEditor 组件 - 图片画廊编辑器（模态框）
 * Phase 5: 作品编辑器模块 - Task 5.9
 */
import { ref, watch, computed } from 'vue'
import type { Section, SectionContent, GalleryImage } from '../types'

interface Props {
  section?: Section | null
  open?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'save', content: SectionContent): void
}

const props = withDefaults(defineProps<Props>(), {
  section: null,
  open: false
})
const emit = defineEmits<Emits>()

// 表单数据
const images = ref<GalleryImage[]>([])
const layout = ref<'grid' | 'masonry'>('grid')

// 监听 section 变化，初始化表单
watch(
  () => props.section,
  newSection => {
    if (newSection?.content.image_gallery) {
      images.value = [...(newSection.content.image_gallery.images || [])]
      layout.value = newSection.content.image_gallery.layout || 'grid'
    } else {
      images.value = []
      layout.value = 'grid'
    }
  },
  { immediate: true }
)

// 是否为空
const isEmpty = computed(() => images.value.length === 0)

// 模拟打开素材库选择器（实际应集成素材库组件）
const openAssetSelector = () => {
  // 模拟添加图片
  const mockImages: GalleryImage[] = [
    {
      id: Date.now(),
      url: 'https://via.placeholder.com/300',
      thumbnail: 'https://via.placeholder.com/150'
    },
    {
      id: Date.now() + 1,
      url: 'https://via.placeholder.com/300',
      thumbnail: 'https://via.placeholder.com/150'
    }
  ]
  images.value.push(...mockImages)
}

// 移除图片
const removeImage = (id: number) => {
  images.value = images.value.filter(img => img.id !== id)
}

// 保存
const handleSave = () => {
  emit('save', {
    image_gallery: {
      images: images.value,
      layout: layout.value
    }
  })
}

// 取消
const handleCancel = () => {
  emit('close')
}

// 关闭
const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="image-gallery-editor-overlay" @click.self="handleCancel">
        <div class="image-gallery-editor">
          <!-- 头部 -->
          <div class="image-gallery-editor__header">
            <h3 class="image-gallery-editor__title">编辑图片画廊</h3>
            <button class="image-gallery-editor__close" @click="handleClose">×</button>
          </div>

          <!-- 内容 -->
          <div class="image-gallery-editor__body">
            <!-- 已选择的图片 -->
            <div class="editor-field">
              <label class="editor-label"> 已选择的图片 ({{ images.length }}) </label>
              <div v-if="!isEmpty" class="selected-images">
                <div v-for="img in images" :key="img.id" class="selected-image-item">
                  <img
                    :src="img.thumbnail || img.url"
                    :alt="img.alt || ''"
                    class="selected-image-thumb"
                  />
                  <button class="selected-image-remove" @click="removeImage(img.id)">[移除]</button>
                </div>
              </div>
              <div v-else class="empty-images">暂未选择图片</div>
            </div>

            <!-- 从素材库选择 -->
            <div class="editor-field">
              <label class="editor-label">从素材库选择</label>
              <button class="asset-selector-btn" @click="openAssetSelector">
                [打开素材库选择器]
              </button>
            </div>

            <!-- 布局选择 -->
            <div class="editor-field">
              <label class="editor-label">布局方式</label>
              <div class="layout-options">
                <button
                  :class="['layout-option', { 'layout-option--active': layout === 'grid' }]"
                  @click="layout = 'grid'"
                >
                  网格布局
                </button>
                <button
                  :class="['layout-option', { 'layout-option--active': layout === 'masonry' }]"
                  @click="layout = 'masonry'"
                >
                  瀑布流
                </button>
              </div>
            </div>
          </div>

          <!-- 底部操作 -->
          <div class="image-gallery-editor__footer">
            <button class="editor-btn editor-btn--secondary" @click="handleCancel">取消</button>
            <button class="editor-btn editor-btn--primary" @click="handleSave">保存</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.image-gallery-editor-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 26, 0.5);
  z-index: var(--z-modal);
  padding: var(--spacing-screen-md);
}

.image-gallery-editor {
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 头部 */
.image-gallery-editor__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-element-md);
  border-bottom: 1px solid var(--color-border-subtle);
}

.image-gallery-editor__title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
  margin: 0;
}

.image-gallery-editor__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  font-size: var(--font-size-h2);
  line-height: 1;
  color: var(--color-text-primary);
  transition: var(--transition-fast);
}

.image-gallery-editor__close:hover {
  border-color: var(--color-border-strong);
}

/* 内容 */
.image-gallery-editor__body {
  flex: 1;
  padding: var(--spacing-element-md);
  overflow-y: auto;
}

.editor-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-element-sm);
  margin-bottom: var(--spacing-component-md);
}

.editor-field:last-child {
  margin-bottom: 0;
}

.editor-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

/* 已选择的图片 */
.selected-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-2);
}

.selected-image-item {
  position: relative;
  aspect-ratio: 1;
}

.selected-image-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-sm);
  background: var(--color-bg-tertiary);
}

.selected-image-remove {
  position: absolute;
  bottom: var(--spacing-1);
  left: var(--spacing-1);
  right: var(--spacing-1);
  padding: var(--spacing-1);
  border: none;
  background: rgba(26, 26, 26, 0.8);
  color: var(--color-text-inverse);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  text-transform: uppercase;
  cursor: pointer;
  opacity: 0;
  transition: var(--transition-fast);
}

.selected-image-item:hover .selected-image-remove {
  opacity: 1;
}

.empty-images {
  padding: var(--spacing-element-md);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-secondary);
  text-align: center;
}

/* 素材选择器按钮 */
.asset-selector-btn {
  width: 100%;
  height: var(--height-input-md);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  transition: var(--transition-fast);
}

.asset-selector-btn:hover {
  border-color: var(--color-border-strong);
}

/* 布局选项 */
.layout-options {
  display: flex;
  gap: var(--spacing-element-sm);
}

.layout-option {
  flex: 1;
  height: var(--height-input-md);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  transition: var(--transition-fast);
}

.layout-option:hover {
  border-color: var(--color-border-strong);
}

.layout-option--active {
  border-color: var(--color-text-display);
  color: var(--color-text-display);
}

/* 底部 */
.image-gallery-editor__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-element-sm);
  padding: var(--spacing-element-md);
  border-top: 1px solid var(--color-border-subtle);
}

.editor-btn {
  height: var(--height-button-md);
  padding: 0 var(--spacing-6);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  transition: var(--transition-fast);
}

.editor-btn--secondary {
  background: transparent;
  color: var(--color-text-primary);
}

.editor-btn--secondary:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-tertiary);
}

.editor-btn--primary {
  background: var(--color-text-display);
  color: var(--color-text-inverse);
  border-color: var(--color-text-display);
}

.editor-btn--primary:hover {
  background: var(--color-text-primary);
  border-color: var(--color-text-primary);
}

/* 动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--duration-normal) var(--ease-out);
}

.modal-enter-active .image-gallery-editor,
.modal-leave-active .image-gallery-editor {
  transition: transform var(--duration-normal) var(--ease-out);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .image-gallery-editor,
.modal-leave-to .image-gallery-editor {
  transform: scale(0.95);
}
</style>
