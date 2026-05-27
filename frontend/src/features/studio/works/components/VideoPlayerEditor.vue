<script setup lang="ts">
/**
 * VideoPlayerEditor 组件 - 视频播放器编辑器（模态框）
 * Phase 5: 作品编辑器模块 - Task 5.10
 */
import { ref, watch, computed } from 'vue'
import type { Section, SectionContent } from '../types'

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
const videoId = ref<number | null>(null)
const title = ref('')

// 监听 section 变化，初始化表单
watch(
  () => props.section,
  (newSection) => {
    if (newSection?.content.video_player) {
      videoId.value = newSection.content.video_player.videoId || null
      title.value = newSection.content.video_player.title || ''
    } else {
      videoId.value = null
      title.value = ''
    }
  },
  { immediate: true }
)

// 是否已选择视频
const hasVideo = computed(() => videoId.value !== null)

// 模拟打开素材库选择器
const openAssetSelector = () => {
  // 模拟选择视频
  videoId.value = Date.now()
}

// 移除视频
const removeVideo = () => {
  videoId.value = null
  title.value = ''
}

// 保存
const handleSave = () => {
  if (!videoId.value) return

  emit('save', {
    video_player: {
      videoId: videoId.value,
      title: title.value || undefined
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
      <div v-if="open" class="video-player-editor-overlay" @click.self="handleCancel">
        <div class="video-player-editor">
          <!-- 头部 -->
          <div class="video-player-editor__header">
            <h3 class="video-player-editor__title">编辑视频播放器</h3>
            <button class="video-player-editor__close" @click="handleClose">×</button>
          </div>

          <!-- 内容 -->
          <div class="video-player-editor__body">
            <!-- 视频 -->
            <div class="editor-field">
              <label class="editor-label">视频</label>
              <div v-if="!hasVideo" class="video-placeholder">
                <div class="video-placeholder-content">
                  <span class="video-placeholder-icon">▶</span>
                  <span class="video-placeholder-text">[从素材库选择视频]</span>
                </div>
              </div>
              <div v-else class="selected-video">
                <div class="selected-video-info">
                  <span class="selected-video-label">已选择视频</span>
                  <span v-if="title" class="selected-video-title">{{ title }}</span>
                </div>
                <button class="selected-video-remove" @click="removeVideo">[移除]</button>
              </div>
              <button class="asset-selector-btn" @click="openAssetSelector">
                [打开素材库选择器]
              </button>
            </div>

            <!-- 标题（可选） -->
            <div class="editor-field">
              <label class="editor-label">标题（可选）</label>
              <input
                v-model="title"
                type="text"
                class="editor-input"
                placeholder="输入视频标题..."
                :disabled="!hasVideo"
              />
            </div>
          </div>

          <!-- 底部操作 -->
          <div class="video-player-editor__footer">
            <button class="editor-btn editor-btn--secondary" @click="handleCancel">取消</button>
            <button class="editor-btn editor-btn--primary" :disabled="!hasVideo" @click="handleSave">
              保存
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.video-player-editor-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 26, 0.5);
  z-index: var(--z-modal);
  padding: var(--spacing-screen-md);
}

.video-player-editor {
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
.video-player-editor__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-element-md);
  border-bottom: 1px solid var(--color-border-subtle);
}

.video-player-editor__title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
  margin: 0;
}

.video-player-editor__close {
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

.video-player-editor__close:hover {
  border-color: var(--color-border-strong);
}

/* 内容 */
.video-player-editor__body {
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

/* 视频占位 */
.video-placeholder {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 2px dashed var(--color-border-default);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
}

.video-placeholder-icon {
  font-size: 32px;
  color: var(--color-text-disabled);
}

.video-placeholder-text {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

/* 已选择的视频 */
.selected-video {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-element-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
}

.selected-video-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.selected-video-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.selected-video-title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-primary);
}

.selected-video-remove {
  padding: var(--spacing-1) var(--spacing-element-sm);
  border: none;
  background: transparent;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-error-text);
  text-transform: uppercase;
  cursor: pointer;
  transition: var(--transition-fast);
}

.selected-video-remove:hover {
  opacity: 0.8;
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

/* 输入框 */
.editor-input {
  height: var(--height-input-md);
  padding: 0 var(--spacing-element-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
}

.editor-input:focus {
  outline: none;
  border-color: var(--color-text-display);
  background: var(--color-bg-primary);
}

.editor-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 底部 */
.video-player-editor__footer {
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

.editor-btn--primary:hover:not(:disabled) {
  background: var(--color-text-primary);
  border-color: var(--color-text-primary);
}

.editor-btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--duration-normal) var(--ease-out);
}

.modal-enter-active .video-player-editor,
.modal-leave-active .video-player-editor {
  transition: transform var(--duration-normal) var(--ease-out);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .video-player-editor,
.modal-leave-to .video-player-editor {
  transform: scale(0.95);
}
</style>
