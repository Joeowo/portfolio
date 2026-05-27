<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import FolderItem from './FolderItem.vue'
import type { FolderTreeNode } from '../types/Asset'

interface Props {
  folders: FolderTreeNode[]
  currentFolderId: number | null
  showCreateButton?: boolean
}

interface Emits {
  (e: 'select', id: number | null): void
  (e: 'create', parentId: number | null): void
  (e: 'rename', id: number): void
  (e: 'delete', id: number): void
}

defineProps<Props>()

const emit = defineEmits<Emits>()

const expandedFolders = ref<Set<number>>(new Set())

const isExpanded = (id: number) => expandedFolders.value.has(id)

const toggleExpand = (id: number) => {
  if (expandedFolders.value.has(id)) {
    expandedFolders.value.delete(id)
  } else {
    expandedFolders.value.add(id)
  }
  expandedFolders.value = new Set(expandedFolders.value)
}

const handleFolderClick = (id: number | null) => {
  emit('select', id)
}

const handleCreate = (parentId: number | null = null) => {
  emit('create', parentId)
}

const handleRename = (id: number) => {
  emit('rename', id)
}

const countAssetsInFolder = (folder: FolderTreeNode): number => {
  let count = folder.assetCount || 0
  if (folder.children) {
    folder.children.forEach(child => {
      count += countAssetsInFolder(child)
    })
  }
  return count
}

// Auto-expand folders when created
const expandFolder = (id: number) => {
  expandedFolders.value.add(id)
  expandedFolders.value = new Set(expandedFolders.value)
}

defineExpose({
  expandFolder
})
</script>

<template>
  <div class="folder-tree">
    <!-- All Assets (Root) -->
    <div
      class="folder-item folder-item--root"
      :class="{ 'folder-item--active': currentFolderId === null }"
      @click="handleFolderClick(null)"
    >
      <Icon icon="ph:files" class="folder-item__icon" />
      <span class="folder-item__name">全部素材</span>
      <span class="folder-item__count">{{ folders.reduce((acc, f) => acc + (f.assetCount || 0), 0) }}</span>
    </div>

    <!-- Folder Tree -->
    <FolderItem
      v-for="folder in folders"
      :key="folder.id"
      :folder="folder"
      :current-folder-id="currentFolderId"
      :expanded="isExpanded(folder.id)"
      @toggle="toggleExpand"
      @select="handleFolderClick"
      @create="handleCreate"
      @rename="handleRename"
    />

    <!-- Create Folder Button -->
    <button
      v-if="showCreateButton"
      class="folder-tree__create-btn"
      @click="handleCreate(null)"
    >
      <Icon icon="ph:plus" class="folder-tree__create-icon" />
      新建文件夹
    </button>
  </div>
</template>

<style scoped>
.folder-tree {
  width: 200px;
  height: 100%;
  border-right: 1px solid var(--color-border-subtle);
  padding: var(--spacing-element-md);
  background: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
}

.folder-item {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 var(--spacing-element-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
  transition: background var(--duration-fast) var(--ease-out-cubic);
  position: relative;
}

.folder-item--root {
  margin-bottom: var(--spacing-element-sm);
  font-weight: var(--font-weight-medium);
}

.folder-item:hover {
  background: var(--color-bg-secondary);
}

.folder-item--active {
  background: var(--color-bg-tertiary);
  font-weight: var(--font-weight-medium);
}

.folder-item__icon {
  width: 16px;
  height: 16px;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.folder-item__name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.folder-item__count {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-disabled);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.folder-tree__create-btn {
  margin-top: var(--spacing-element-md);
  padding: 0 var(--spacing-element-sm);
  height: 36px;
  border: 1px dashed var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-secondary);
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all var(--duration-fast) var(--ease-out-cubic);
}

.folder-tree__create-btn:hover {
  border-color: var(--color-text-display);
  color: var(--color-text-primary);
}

.folder-tree__create-icon {
  width: 16px;
  height: 16px;
}
</style>
