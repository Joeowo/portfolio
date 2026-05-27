<script setup lang="ts">
/**
 * QuoteEditor 组件 - 引言块编辑器（模态框）
 * Phase 5: 作品编辑器模块 - Task 5.11
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
const content = ref('')
const author = ref('')

// 监听 section 变化，初始化表单
watch(
  () => props.section,
  newSection => {
    if (newSection?.content.quote) {
      content.value = newSection.content.quote.content || ''
      author.value = newSection.content.quote.author || ''
    } else {
      content.value = ''
      author.value = ''
    }
  },
  { immediate: true }
)

// 预览
const previewText = computed(() => {
  return content.value || '在这里输入引言内容...'
})

// 保存
const handleSave = () => {
  emit('save', {
    quote: {
      content: content.value,
      author: author.value || undefined
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
        class="quote-editor-overlay"
        @click.self="handleCancel"
        @keydown="handleKeydown"
      >
        <div class="quote-editor">
          <!-- 头部 -->
          <div class="quote-editor__header">
            <h3 class="quote-editor__title">编辑引言块</h3>
            <button class="quote-editor__close" @click="handleClose">×</button>
          </div>

          <!-- 内容 -->
          <div class="quote-editor__body">
            <!-- 引言内容 -->
            <div class="editor-field">
              <label class="editor-label">引言内容</label>
              <textarea
                v-model="content"
                class="editor-textarea"
                placeholder="在这里输入引言内容..."
                rows="4"
                autofocus
              />
            </div>

            <!-- 作者（可选） -->
            <div class="editor-field">
              <label class="editor-label">作者（可选）</label>
              <input
                v-model="author"
                type="text"
                class="editor-input"
                placeholder="输入作者姓名..."
              />
            </div>

            <!-- 预览 -->
            <div class="editor-field">
              <label class="editor-label">预览</label>
              <div class="quote-preview">
                <div class="quote-preview-content">"{{ previewText }}"</div>
                <div v-if="author" class="quote-preview-author">— {{ author }}</div>
              </div>
            </div>
          </div>

          <!-- 底部操作 -->
          <div class="quote-editor__footer">
            <button class="editor-btn editor-btn--secondary" @click="handleCancel">取消</button>
            <button class="editor-btn editor-btn--primary" @click="handleSave">保存</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.quote-editor-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 26, 0.5);
  z-index: var(--z-modal);
  padding: var(--spacing-screen-md);
}

.quote-editor {
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
.quote-editor__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-element-md);
  border-bottom: 1px solid var(--color-border-subtle);
}

.quote-editor__title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
  margin: 0;
}

.quote-editor__close {
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

.quote-editor__close:hover {
  border-color: var(--color-border-strong);
}

/* 内容 */
.quote-editor__body {
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

.editor-textarea {
  width: 100%;
  min-height: 120px;
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

/* 预览 */
.quote-preview {
  padding: var(--spacing-element-md);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  text-align: center;
}

.quote-preview-content {
  font-family: var(--font-family-display);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
  line-height: var(--line-height-relaxed);
  font-style: italic;
}

.quote-preview-author {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-align: right;
  margin-top: var(--spacing-2);
}

/* 底部 */
.quote-editor__footer {
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

.modal-enter-active .quote-editor,
.modal-leave-active .quote-editor {
  transition: transform var(--duration-normal) var(--ease-out);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .quote-editor,
.modal-leave-to .quote-editor {
  transform: scale(0.95);
}
</style>
