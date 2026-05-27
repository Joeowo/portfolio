<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { UploadProgress } from '../types/Asset'

interface Props {
  accept?: string
  maxSize?: number
  multiple?: boolean
  uploading?: boolean
  uploadQueue?: UploadProgress[]
}

interface Emits {
  (e: 'upload', files: File[]): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  accept: 'image/*,video/*,.txt',
  maxSize: 100 * 1024 * 1024, // 100MB
  multiple: true,
  uploading: false,
  uploadQueue: () => []
})

const emit = defineEmits<Emits>()

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const dragCounter = ref(0)

const acceptedExtensions = computed(() => {
  return props.accept.split(',').map(e => e.trim())
})

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault()
  dragCounter.value++
  if (event.dataTransfer?.items) {
    isDragging.value = true
  }
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  dragCounter.value--
  if (dragCounter.value === 0) {
    isDragging.value = false
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  event.dataTransfer!.dropEffect = 'copy'
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  dragCounter.value = 0
  isDragging.value = false

  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    validateAndUpload(Array.from(files))
  }
}

const handleClick = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    validateAndUpload(Array.from(files))
  }
  target.value = ''
}

const validateAndUpload = (files: File[]) => {
  const validFiles: File[] = []
  const errors: string[] = []

  files.forEach(file => {
    // Check file size
    if (file.size > props.maxSize) {
      errors.push(`${file.name}: 文件大小超过 ${(props.maxSize / 1024 / 1024).toFixed(0)}MB 限制`)
      return
    }

    // Check file type
    const isValidType = acceptedExtensions.value.some(ext => {
      if (ext.startsWith('.') && file.name.endsWith(ext)) return true
      if (ext.includes('/') && file.type.startsWith(ext.split('/')[0] + '/')) return true
      return false
    })

    if (!isValidType) {
      errors.push(`${file.name}: 不支持的文件类型`)
      return
    }

    validFiles.push(file)
  })

  if (errors.length > 0) {
    console.warn('Upload validation errors:', errors)
  }

  if (validFiles.length > 0) {
    emit('upload', validFiles)
  }
}

const handleCancel = () => {
  emit('cancel')
}

const getProgressMessage = computed(() => {
  const queue = props.uploadQueue
  if (queue.length === 0) return ''

  const uploading = queue.filter(f => f.status === 'uploading' || f.status === 'pending').length
  const success = queue.filter(f => f.status === 'success').length
  const total = queue.length

  if (uploading > 0) {
    return `上传中... ${success}/${total}`
  }
  return `已完成 ${success}/${total}`
})

const getOverallProgress = computed(() => {
  const queue = props.uploadQueue
  if (queue.length === 0) return 0
  const totalProgress = queue.reduce((acc, item) => acc + item.progress, 0)
  return Math.round(totalProgress / queue.length)
})

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
</script>

<template>
  <div
    class="upload-dropzone"
    :class="{ 'upload-dropzone--dragging': isDragging }"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @click="handleClick"
  >
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="multiple"
      class="upload-dropzone__input"
      @change="handleFileSelect"
    />

    <!-- Drag State -->
    <template v-if="isDragging">
      <div class="upload-dropzone__overlay">
        <Icon icon="ph:upload-simple" class="upload-dropzone__overlay-icon" />
        <div class="upload-dropzone__overlay-text">释放文件以上传</div>
        <div class="upload-dropzone__overlay-hint">支持 JPG, PNG, MP4, TXT</div>
        <button class="upload-dropzone__overlay-cancel" @click.stop="handleCancel">
          取消上传
        </button>
      </div>
    </template>

    <!-- Default State -->
    <template v-else>
      <Icon icon="ph:upload-simple" class="upload-dropzone__icon" />
      <div class="upload-dropzone__text">点击或拖拽文件到此处上传</div>
      <div class="upload-dropzone__hint">
        支持 JPG, PNG, MP4, TXT · 最大 {{ (maxSize / 1024 / 1024).toFixed(0) }}MB
      </div>
    </template>

    <!-- Upload Progress -->
    <div v-if="uploading && uploadQueue.length > 0" class="upload-progress">
      <div class="upload-progress__header">
        <span class="upload-progress__filename">{{ getProgressMessage }}</span>
        <span class="upload-progress__percent">{{ getOverallProgress }}%</span>
      </div>
      <div class="upload-progress__bar">
        <div class="upload-progress__fill" :style="{ width: getOverallProgress + '%' }"></div>
      </div>

      <!-- Individual File Progress -->
      <div class="upload-progress__files">
        <div
          v-for="item in uploadQueue"
          :key="item.file.name"
          class="upload-progress__file"
        >
          <div class="upload-progress__file-info">
            <Icon
              :icon="item.status === 'success' ? 'ph:check-circle' : item.status === 'error' ? 'ph:x-circle' : 'ph:spinner'"
              class="upload-progress__file-icon"
              :class="{ 'upload-progress__file-icon--spinning': item.status === 'uploading' }"
            />
            <span class="upload-progress__file-name">{{ item.file.name }}</span>
            <span class="upload-progress__file-size">{{ formatFileSize(item.file.size) }}</span>
          </div>
          <div v-if="item.status === 'error'" class="upload-progress__error">
            {{ item.error || '上传失败' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-dropzone {
  border: 2px dashed var(--color-border-default);
  border-radius: var(--radius-md);
  background: var(--color-bg-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-component-xl);
  min-height: 240px;
  transition: all var(--duration-normal) var(--ease-out-cubic);
  cursor: pointer;
  position: relative;
}

.upload-dropzone--dragging {
  border-color: var(--color-text-display);
  border-style: solid;
  background: var(--color-bg-tertiary);
}

.upload-dropzone__input {
  display: none;
}

.upload-dropzone__icon {
  width: 48px;
  height: 48px;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-element-md);
}

.upload-dropzone__text {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-lg);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-element-sm);
}

.upload-dropzone__hint {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.upload-dropzone__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-text-display);
  color: var(--color-bg-primary);
}

.upload-dropzone__overlay-icon {
  width: 64px;
  height: 64px;
  margin-bottom: var(--spacing-element-md);
}

.upload-dropzone__overlay-text {
  font-family: var(--font-family-display);
  font-size: var(--font-size-h3);
  margin-bottom: var(--spacing-element-sm);
}

.upload-dropzone__overlay-hint {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--spacing-element-lg);
}

.upload-dropzone__overlay-cancel {
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  border: 1px solid var(--color-bg-primary);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-bg-primary);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out-cubic);
}

.upload-dropzone__overlay-cancel:hover {
  background: var(--color-bg-primary);
  color: var(--color-text-display);
}

.upload-progress {
  position: absolute;
  bottom: var(--spacing-element-md);
  left: var(--spacing-element-md);
  right: var(--spacing-element-md);
  max-width: 400px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  padding: var(--spacing-element-sm);
}

.upload-progress__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-1);
}

.upload-progress__filename {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-primary);
}

.upload-progress__percent {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.upload-progress__bar {
  height: 2px;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.upload-progress__fill {
  height: 100%;
  background: var(--color-text-display);
  transition: width var(--duration-slow) var(--ease-out-cubic);
}

.upload-progress__files {
  margin-top: var(--spacing-element-sm);
  max-height: 120px;
  overflow-y: auto;
}

.upload-progress__file {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 0;
}

.upload-progress__file-info {
  display: flex;
  align-items: center;
  gap: 6px;
}

.upload-progress__file-icon {
  width: 14px;
  height: 14px;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.upload-progress__file-icon--spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.upload-progress__file-name {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.upload-progress__file-size {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-disabled);
}

.upload-progress__error {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-error-text);
  text-transform: uppercase;
  padding-left: 20px;
}
</style>
