<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useAssetsStore } from '../stores/assetsStore'
import AssetGrid from '../components/AssetGrid.vue'
import FolderTree from '../components/FolderTree.vue'
import AssetFilterBar from '../components/AssetFilterBar.vue'
import AssetDetailDrawer from '../components/AssetDetailDrawer.vue'
import UploadDropzone from '../components/UploadDropzone.vue'
import ImmersiveLayout from '@/shared/components/ImmersiveLayout.vue'

const assetsStore = useAssetsStore()

// State
const isSelectMode = ref(false)
const isDrawerOpen = ref(false)
const selectedAsset = ref<any>(null)
const showUploadModal = ref(false)

// Handlers
const handleGridClick = (asset: any) => {
  if (isSelectMode.value) {
    assetsStore.toggleSelectAsset(asset.id)
  } else {
    selectedAsset.value = asset
    isDrawerOpen.value = true
  }
}

const handleSelect = (id: number) => {
  assetsStore.toggleSelectAsset(id)
}

const handleDelete = (id: number) => {
  assetsStore.deleteAsset(id)
}

const handleUpload = () => {
  showUploadModal.value = true
}

const handleUploadFiles = async (files: File[]) => {
  await assetsStore.uploadFiles(files)
  showUploadModal.value = false
}

const handleUploadCancel = () => {
  showUploadModal.value = false
}

const handleKeywordChange = (value: string) => {
  assetsStore.setFilters({ keyword: value })
}

const handleTypeChange = (value: any) => {
  assetsStore.setFilters({ type: value })
}

const handleFolderSelect = (id: number | null) => {
  assetsStore.setCurrentFolder(id)
}

const handleFolderCreate = async (parentId: number | null) => {
  const name = prompt('输入文件夹名称：', '新建文件夹')
  if (name) {
    await assetsStore.createFolder(name, parentId)
  }
}

const handleFolderRename = async (id: number) => {
  const folder = assetsStore.folders.find(f => f.id === id)
  if (!folder) return

  const newName = prompt('输入新文件夹名称：', folder.name)
  if (newName) {
    await assetsStore.updateFolder(id, newName)
  }
}

const handleDrawerUpdate = (id: number, data: any) => {
  assetsStore.updateAsset(id, data)
  isDrawerOpen.value = false
}

const handleDrawerDelete = (id: number) => {
  assetsStore.deleteAsset(id)
  isDrawerOpen.value = false
}

const handleDownload = (asset: any) => {
  // Create download link
  const link = document.createElement('a')
  link.href = asset.fileUrl
  link.download = asset.name
  link.click()
}

const toggleSelectMode = () => {
  isSelectMode.value = !isSelectMode.value
  if (!isSelectMode.value) {
    assetsStore.clearSelection()
  }
}

const handleDeleteSelected = async () => {
  const selectedCount = assetsStore.selectedAssetIds.size
  if (confirm(`确定要删除选中的 ${selectedCount} 个素材吗？`)) {
    await assetsStore.deleteSelectedAssets()
    isSelectMode.value = false
  }
}

// Lifecycle
onMounted(() => {
  assetsStore.initialize()
})
</script>

<template>
  <ImmersiveLayout>
    <div class="assets-page">
      <!-- Upload Modal Overlay -->
      <div v-if="showUploadModal" class="upload-modal">
        <div class="upload-modal__content">
          <div class="upload-modal__header">
            <h2 class="upload-modal__title">上传素材</h2>
            <button class="upload-modal__close" @click="showUploadModal = false">
              <Icon icon="ph:x" class="upload-modal__close-icon" />
            </button>
          </div>
          <UploadDropzone
            :uploading="assetsStore.uploadQueue.length > 0"
            :upload-queue="assetsStore.uploadQueue"
            @upload="handleUploadFiles"
            @cancel="handleUploadCancel"
          />
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="assets-page__sidebar">
        <FolderTree
          :folders="assetsStore.folderTree"
          :current-folder-id="assetsStore.currentFolderId"
          @select="handleFolderSelect"
          @create="handleFolderCreate"
          @rename="handleFolderRename"
        />
      </aside>

      <!-- Main Content -->
      <main class="assets-page__main">
        <!-- Filter Bar -->
        <AssetFilterBar
          :current-folder-name="assetsStore.currentFolderName"
          :asset-count="assetsStore.filteredAssets.length"
          :filters="assetsStore.filters"
          @update:keyword="handleKeywordChange"
          @update:type="handleTypeChange"
          @upload="handleUpload"
        />

        <!-- Selection Actions Bar (shown when in select mode) -->
        <div v-if="isSelectMode" class="assets-page__selection-bar">
          <div class="selection-bar__info">
            已选择 <span class="selection-bar__count">{{ assetsStore.selectedAssetIds.size }}</span> 个素材
          </div>
          <div class="selection-bar__actions">
            <button class="selection-bar__button" @click="toggleSelectMode">
              取消选择
            </button>
            <button class="selection-bar__button selection-bar__button--danger" @click="handleDeleteSelected">
              <Icon icon="ph:trash" class="selection-bar__icon" />
              删除选中
            </button>
          </div>
        </div>

        <!-- Select Mode Toggle -->
        <div v-if="!isSelectMode" class="assets-page__actions">
          <button class="assets-page__select-toggle" @click="toggleSelectMode">
            <Icon icon="ph:check-square" class="assets-page__select-icon" />
            多选模式
          </button>
        </div>

        <!-- Asset Grid -->
        <AssetGrid
          :assets="assetsStore.filteredAssets"
          :loading="assetsStore.loading"
          :selected-ids="Array.from(assetsStore.selectedAssetIds)"
          :selectable="isSelectMode"
          @click="handleGridClick"
          @select="handleSelect"
          @delete="handleDelete"
        />

        <!-- Inline Error -->
        <div v-if="assetsStore.error" class="assets-page__error">
          [ERROR: {{ assetsStore.error }}]
        </div>
      </main>

      <!-- Detail Drawer -->
      <AssetDetailDrawer
        :asset="selectedAsset"
        :open="isDrawerOpen"
        :folders="assetsStore.folders"
        @close="() => isDrawerOpen = false"
        @update="handleDrawerUpdate"
        @delete="handleDrawerDelete"
        @download="handleDownload"
      />
    </div>
  </ImmersiveLayout>
</template>

<style scoped>
.assets-page {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.assets-page__sidebar {
  width: 200px;
  flex-shrink: 0;
  border-right: 1px solid var(--color-border-subtle);
  background: var(--color-bg-primary);
}

.assets-page__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.assets-page__selection-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  background: var(--color-bg-tertiary);
  border-bottom: 1px solid var(--color-border-subtle);
}

.selection-bar__info {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
}

.selection-bar__count {
  font-family: var(--font-family-display);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
  font-weight: var(--font-weight-medium);
}

.selection-bar__actions {
  display: flex;
  gap: var(--spacing-element-sm);
}

.selection-bar__button {
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-primary);
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all var(--duration-fast) var(--ease-out-cubic);
}

.selection-bar__button:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-secondary);
}

.selection-bar__button--danger {
  border-color: var(--color-error-border);
  color: var(--color-error-text);
}

.selection-bar__button--danger:hover {
  background: var(--color-error-bg);
}

.selection-bar__icon {
  width: 16px;
  height: 16px;
}

.assets-page__actions {
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  display: flex;
  justify-content: flex-end;
}

.assets-page__select-toggle {
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all var(--duration-fast) var(--ease-out-cubic);
}

.assets-page__select-toggle:hover {
  border-color: var(--color-text-display);
  color: var(--color-text-primary);
}

.assets-page__select-icon {
  width: 16px;
  height: 16px;
}

.assets-page__error {
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-error-text);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  background: var(--color-error-bg);
  border: 1px solid var(--color-error-border);
  border-radius: var(--radius-sm);
  margin: var(--spacing-element-md);
}

.upload-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.upload-modal__content {
  width: 90%;
  max-width: 600px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: var(--spacing-element-lg);
}

.upload-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-element-md);
}

.upload-modal__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-h3);
  color: var(--color-text-display);
}

.upload-modal__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
}

.upload-modal__close-icon {
  width: 18px;
  height: 18px;
  color: var(--color-text-primary);
}
</style>
