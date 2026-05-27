<script setup lang="ts">
/**
 * TextBlockEditor 组件 - 文本块编辑器（模态框）
 * Phase 5: 作品编辑器模块 - Task 5.8
 */
import { ref, watch } from 'vue'
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
const content = ref('')

// 监听 section 变化，初始化表单
watch(
  () => props.section,
  newSection => {
    if (newSection?.content.text_block) {
      content.value = newSection.content.text_block.content || ''
    } else {
      content.value = ''
    }
  },
  { immediate: true }
)

// 保存
const handleSave = () => {
  emit('save', {
    text_block: {
      content: content.value
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

// 快捷键
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    handleCancel()
  } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    handleSave()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="text-block-editor-overlay"
        @click.self="handleCancel"
        @keydown="handleKeydown"
      >
        <div class="text-block-editor">
          <!-- 头部 -->
          <div class="text-block-editor__header">
            <h3 class="text-block-editor__title">编辑文本区块</h3>
            <button class="text-block-editor__close" @click="handleClose">×</button>
          </div>

          <!-- 内容 -->
          <div class="text-block-editor__body">
            <div class="editor-field">
              <label class="editor-label">内容</label>
              <textarea
                v-model="content"
                class="editor-textarea"
                placeholder="在这里输入文本内容..."
                rows="8"
                autofocus
              />
            </div>
          </div>

          <!-- 底部操作 -->
          <div class="text-block-editor__footer">
            <button class="editor-btn editor-btn--secondary" @click="handleCancel">取消</button>
            <button class="editor-btn editor-btn--primary" @click="handleSave">保存</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.text-block-editor-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 26, 0.5);
  z-index: var(--z-modal);
  padding: var(--spacing-screen-md);
}

.text-block-editor {
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
.text-block-editor__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-element-md);
  border-bottom: 1px solid var(--color-border-subtle);
}

.text-block-editor__title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
  margin: 0;
}

.text-block-editor__close {
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

.text-block-editor__close:hover {
  border-color: var(--color-border-strong);
}

/* 内容 */
.text-block-editor__body {
  flex: 1;
  padding: var(--spacing-element-md);
  overflow-y: auto;
}

.editor-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-element-sm);
}

.editor-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.editor-textarea {
  width: 100%;
  min-height: 200px;
  padding: var(--spacing-element-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
  resize: vertical;
}

.editor-textarea:focus {
  outline: none;
  border-color: var(--color-text-display);
  background: var(--color-bg-primary);
}

/* 底部 */
.text-block-editor__footer {
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

.modal-enter-active .text-block-editor,
.modal-leave-active .text-block-editor {
  transition: transform var(--duration-normal) var(--ease-out);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .text-block-editor,
.modal-leave-to .text-block-editor {
  transform: scale(0.95);
}
</style>
