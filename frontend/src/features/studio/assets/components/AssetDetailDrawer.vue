<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Icon } from '@iconify/vue'
import NButton from '@/shared/components/NButton.vue'
import NInput from '@/shared/components/NInput.vue'
import type { Asset, Folder } from '../types/Asset'

interface Props {
  asset: Asset | null
  open?: boolean
  folders?: Folder[]
}

interface Emits {
  (e: 'close'): void
  (e: 'update', id: number, data: { name?: string; tags?: string; folderId?: number | null }): void
  (e: 'delete', id: number): void
  (e: 'download', asset: Asset): void
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  folders: () => []
})

const emit = defineEmits<Emits>()

const editingName = ref('')
const editingTags = ref('')
const selectedFolderId = ref<number | null>(null)

// Reset form when asset changes
watch(
  () => props.asset,
  newAsset => {
    if (newAsset) {
      editingName.value = newAsset.name
      editingTags.value = newAsset.tags || ''
      selectedFolderId.value = newAsset.folderId
    }
  },
  { immediate: true }
)

const formattedSize = computed(() => {
  if (!props.asset) return ''
  const bytes = props.asset.fileSize
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
})

const formattedDimensions = computed(() => {
  if (!props.asset || !props.asset.width || !props.asset.height) return null
  return `${props.asset.width} × ${props.asset.height}`
})

const formattedDuration = computed(() => {
  if (!props.asset || !props.asset.duration) return null
  const minutes = Math.floor(props.asset.duration / 60)
  const seconds = props.asset.duration % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const formattedDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleClose = () => {
  emit('close')
}

const handleSave = () => {
  if (!props.asset) return
  emit('update', props.asset.id, {
    name: editingName.value,
    tags: editingTags.value,
    folderId: selectedFolderId.value
  })
}

const handleDelete = () => {
  if (!props.asset) return
  emit('delete', props.asset.id)
}

const handleDownload = () => {
  if (!props.asset) return
  emit('download', props.asset)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="open && asset" class="drawer-overlay" @click.self="handleClose">
        <div class="drawer">
          <!-- Header -->
          <div class="drawer__header">
            <button class="drawer__close" @click="handleClose">
              <Icon icon="ph:x" class="drawer__close-icon" />
            </button>
          </div>

          <!-- Preview -->
          <div class="drawer__preview">
            <img
              v-if="asset.assetType === 'image' && asset.thumbnailUrl"
              :src="asset.thumbnailUrl"
              :alt="asset.name"
              class="drawer__preview-image"
            />
            <video
              v-else-if="asset.assetType === 'video' && asset.thumbnailUrl"
              :src="asset.fileUrl"
              :poster="asset.thumbnailUrl"
              class="drawer__preview-video"
              controls
            />
            <div v-else class="drawer__preview-placeholder">
              <Icon icon="ph:text-aa" class="drawer__preview-icon" />
              <pre class="drawer__preview-text">{{
                asset.assetType === 'text' ? 'Text File' : 'Preview N/A'
              }}</pre>
            </div>
          </div>

          <!-- Info -->
          <div class="drawer__info">
            <h2 class="drawer__title">{{ asset.name }}</h2>
            <div class="drawer__meta">
              <span class="drawer__meta-item">{{ asset.assetType.toUpperCase() }}</span>
              <span class="drawer__meta-separator">·</span>
              <span class="drawer__meta-item">{{ formattedSize }}</span>
              <template v-if="formattedDimensions">
                <span class="drawer__meta-separator">·</span>
                <span class="drawer__meta-item">{{ formattedDimensions }}</span>
              </template>
              <template v-if="formattedDuration">
                <span class="drawer__meta-separator">·</span>
                <span class="drawer__meta-item">{{ formattedDuration }}</span>
              </template>
            </div>

            <hr class="drawer__divider" />

            <!-- Editable Fields -->
            <div class="drawer__fields">
              <div class="drawer__field">
                <label class="drawer__label">名称</label>
                <NInput v-model="editingName" placeholder="输入文件名" />
              </div>

              <div class="drawer__field">
                <label class="drawer__label">标签</label>
                <NInput v-model="editingTags" placeholder="输入标签，用逗号分隔" />
              </div>

              <div class="drawer__field">
                <label class="drawer__label">文件夹</label>
                <select v-model="selectedFolderId" class="drawer__select">
                  <option :value="null">未分类</option>
                  <option v-for="folder in folders" :key="folder.id" :value="folder.id">
                    {{ folder.name }}
                  </option>
                </select>
              </div>
            </div>

            <hr class="drawer__divider" />

            <!-- Metadata -->
            <div class="drawer__metadata">
              <div class="drawer__metadata-row">
                <span class="drawer__metadata-label">创建时间</span>
                <span class="drawer__metadata-value">{{ formattedDate(asset.createdAt) }}</span>
              </div>
              <div class="drawer__metadata-row">
                <span class="drawer__metadata-label">修改时间</span>
                <span class="drawer__metadata-value">{{ formattedDate(asset.updatedAt) }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="drawer__actions">
            <NButton type="secondary" @click="handleDownload">
              <Icon icon="ph:download-simple" class="drawer__action-icon" />
              下载
            </NButton>
            <NButton type="secondary" @click="handleDelete">
              <Icon icon="ph:trash" class="drawer__action-icon" />
              删除
            </NButton>
            <div class="drawer__actions-spacer"></div>
            <NButton type="primary" @click="handleSave"> 保存更改 </NButton>
            <NButton type="secondary" @click="handleClose"> 关闭 </NButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: var(--z-drawer, 1000);
  display: flex;
  justify-content: flex-end;
}

.drawer {
  width: 400px;
  height: 100%;
  background: var(--color-bg-primary);
  border-left: 1px solid var(--color-border-default);
  display: flex;
  flex-direction: column;
  transform: translateX(0);
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform var(--duration-normal) var(--ease-out-cubic);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

.drawer__header {
  display: flex;
  justify-content: flex-end;
  padding: var(--spacing-element-md);
  border-bottom: 1px solid var(--color-border-subtle);
}

.drawer__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out-cubic);
}

.drawer__close:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-secondary);
}

.drawer__close-icon {
  width: 18px;
  height: 18px;
  color: var(--color-text-primary);
}

.drawer__preview {
  width: 100%;
  aspect-ratio: 16 / 10;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.drawer__preview-image,
.drawer__preview-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.drawer__preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-element-sm);
  color: var(--color-text-disabled);
}

.drawer__preview-icon {
  width: 48px;
  height: 48px;
}

.drawer__preview-text {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.drawer__info {
  flex: 1;
  padding: var(--spacing-element-md);
  overflow-y: auto;
}

.drawer__title {
  font-family: var(--font-family-base);
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-display);
  margin-bottom: var(--spacing-element-sm);
  word-break: break-word;
}

.drawer__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.drawer__meta-separator {
  color: var(--color-text-disabled);
}

.drawer__divider {
  border: none;
  border-top: 1px solid var(--color-border-subtle);
  margin: var(--spacing-element-md) 0;
}

.drawer__fields {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-element-md);
}

.drawer__field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.drawer__label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.drawer__select {
  height: 40px;
  padding: 0 var(--spacing-element-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-out-cubic);
}

.drawer__select:focus {
  outline: none;
  border-color: var(--color-text-display);
  background: var(--color-bg-primary);
}

.drawer__metadata {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-element-sm);
}

.drawer__metadata-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer__metadata-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.drawer__metadata-value {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-primary);
}

.drawer__actions {
  display: flex;
  gap: var(--spacing-element-sm);
  padding: var(--spacing-element-md);
  border-top: 1px solid var(--color-border-subtle);
  flex-wrap: wrap;
}

.drawer__actions-spacer {
  flex: 1;
}

.drawer__action-icon {
  width: 16px;
  height: 16px;
}
</style>
