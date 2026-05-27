<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import type { FolderTreeNode } from '../types/Asset'

interface Props {
  folder: FolderTreeNode
  currentFolderId: number | null
  expanded: boolean
}

interface Emits {
  (e: 'toggle', id: number): void
  (e: 'select', id: number | null): void
  (e: 'create', parentId: number | null): void
  (e: 'rename', id: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const editing = ref(false)
const editingName = ref('')

const hasChildren = props.folder.children && props.folder.children.length > 0

const handleToggle = () => {
  emit('toggle', props.folder.id)
}

const handleClick = () => {
  emit('select', props.folder.id)
}

const handleCreate = () => {
  emit('create', props.folder.id)
}

const startEditing = () => {
  editingName.value = props.folder.name
  editing.value = true
}

const finishEditing = () => {
  if (editingName.value.trim()) {
    emit('rename', props.folder.id)
  }
  editing.value = false
}

const cancelEditing = () => {
  editing.value = false
  editingName.value = ''
}
</script>

<template>
  <div class="folder-tree__node">
    <div
      class="folder-item"
      :class="{
        'folder-item--active': folder.id === currentFolderId,
        'folder-item--editing': editing
      }"
      @click="handleClick"
    >
      <!-- Expand/Collapse Icon -->
      <button
        v-if="hasChildren"
        class="folder-item__expand"
        @click.stop="handleToggle"
      >
        <Icon :icon="expanded ? 'ph:caret-down-bold' : 'ph:caret-right-bold'" class="folder-item__expand-icon" />
      </button>
      <div v-else class="folder-item__spacer"></div>

      <!-- Folder Icon -->
      <Icon icon="ph:folder" class="folder-item__icon" />

      <!-- Folder Name -->
      <span v-if="!editing" class="folder-item__name">{{ folder.name }}</span>
      <input
        v-else
        v-model="editingName"
        class="folder-item__input"
        @blur="finishEditing"
        @keyup.enter="finishEditing"
        @keyup.esc="cancelEditing"
      />

      <!-- Asset Count -->
      <span v-if="!editing" class="folder-item__count">{{ folder.assetCount || 0 }}</span>

      <!-- Actions (shown on hover) -->
      <div v-if="!editing" class="folder-item__actions">
        <button class="folder-item__action" @click.stop="handleCreate">
          <Icon icon="ph:plus" class="folder-item__action-icon" />
        </button>
        <button class="folder-item__action" @click.stop="startEditing">
          <Icon icon="ph:pencil" class="folder-item__action-icon" />
        </button>
      </div>
    </div>

    <!-- Children -->
    <div v-if="expanded && hasChildren" class="folder-tree__children">
      <FolderItem
        v-for="child in folder.children"
        :key="child.id"
        :folder="child"
        :current-folder-id="currentFolderId"
        :expanded="false"
        @toggle="emit('toggle', $event)"
        @select="emit('select', $event)"
        @create="emit('create', $event)"
        @rename="emit('rename', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.folder-tree__node {
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

.folder-item:hover {
  background: var(--color-bg-secondary);
}

.folder-item:hover .folder-item__actions {
  opacity: 1;
}

.folder-item--active {
  background: var(--color-bg-tertiary);
  font-weight: var(--font-weight-medium);
}

.folder-item--editing {
  background: var(--color-bg-secondary);
}

.folder-item__spacer {
  width: 16px;
  flex-shrink: 0;
}

.folder-item__expand {
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.folder-item__expand-icon {
  width: 12px;
  height: 12px;
  color: var(--color-text-secondary);
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

.folder-item__input {
  flex: 1;
  height: 24px;
  padding: 0 4px;
  border: 1px solid var(--color-border-strong);
  border-radius: 2px;
  background: var(--color-bg-primary);
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
  outline: none;
}

.folder-item__input:focus {
  border-color: var(--color-text-display);
}

.folder-item__count {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-disabled);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.folder-item__actions {
  position: absolute;
  right: 8px;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out-cubic);
}

.folder-item__action {
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}

.folder-item__action:hover {
  background: var(--color-bg-tertiary);
}

.folder-item__action-icon {
  width: 14px;
  height: 14px;
  color: var(--color-text-secondary);
}

.folder-tree__children {
  margin-left: 16px;
}
</style>
