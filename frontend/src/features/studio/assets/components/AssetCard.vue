<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { Asset } from '../types/Asset'

interface Props {
  asset: Asset
  selected?: boolean
  selectable?: boolean
  showMenu?: boolean
}

interface Emits {
  (e: 'click', asset: Asset): void
  (e: 'select', id: number): void
  (e: 'menu', asset: Asset, event: MouseEvent): void
  (e: 'delete', id: number): void
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
  selectable: true,
  showMenu: true
})

const emit = defineEmits<Emits>()

const isHovered = ref(false)
const showMenuDropdown = ref(false)

const assetTypeIcon = computed(() => {
  switch (props.asset.assetType) {
    case 'image':
      return 'ph:image'
    case 'video':
      return 'ph:video-camera'
    case 'text':
      return 'ph:text-aa'
    default:
      return 'ph:file'
  }
})

const formattedSize = computed(() => {
  const bytes = props.asset.fileSize
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
})

const handleClick = () => {
  emit('click', props.asset)
}

const handleSelect = (event: Event) => {
  event.stopPropagation()
  emit('select', props.asset.id)
}

const handleMenuClick = (event: MouseEvent) => {
  event.stopPropagation()
  showMenuDropdown.value = !showMenuDropdown.value
  emit('menu', props.asset, event)
}

const handleDelete = (event: Event) => {
  event.stopPropagation()
  emit('delete', props.asset.id)
}

// Close menu when clicking outside
const closeMenu = () => {
  showMenuDropdown.value = false
}
</script>

<template>
  <div
    class="asset-card"
    :class="{
      'asset-card--selected': selected,
      'asset-card--hovered': isHovered
    }"
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    v-click-outside="closeMenu"
  >
    <!-- Thumbnail Area -->
    <div class="asset-card__thumbnail">
      <img
        v-if="asset.assetType === 'image' && asset.thumbnailUrl"
        :src="asset.thumbnailUrl"
        :alt="asset.name"
        class="asset-card__image"
      />
      <video
        v-else-if="asset.assetType === 'video' && asset.thumbnailUrl"
        :src="asset.thumbnailUrl"
        class="asset-card__image"
        muted
      />
      <div v-else class="asset-card__placeholder">
        <Icon :icon="assetTypeIcon" class="asset-card__placeholder-icon" />
      </div>

      <!-- Checkbox for selection -->
      <div
        v-if="selectable"
        class="asset-card__checkbox"
        :class="{ 'asset-card__checkbox--checked': selected }"
        @click="handleSelect"
      >
        <Icon v-if="selected" icon="ph:check-bold" class="asset-card__check-icon" />
      </div>

      <!-- Menu Button -->
      <div
        v-if="showMenu && (isHovered || showMenuDropdown)"
        class="asset-card__menu"
        @click="handleMenuClick"
      >
        <Icon icon="ph:dots-three-bold" class="asset-card__menu-icon" />
      </div>

      <!-- Menu Dropdown -->
      <div v-if="showMenuDropdown" class="asset-card__dropdown">
        <button class="asset-card__dropdown-item" @click.stop="handleDelete">
          <Icon icon="ph:trash" class="asset-card__dropdown-icon" />
          删除
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="asset-card__footer">
      <div class="asset-card__name" :title="asset.name">
        {{ asset.name }}
      </div>
      <div class="asset-card__meta">
        <span class="asset-card__type">{{ asset.assetType.toUpperCase() }}</span>
        <span class="asset-card__separator">·</span>
        <span class="asset-card__size">{{ formattedSize }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.asset-card {
  width: 200px;
  height: 220px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-out-cubic);
  position: relative;
  display: flex;
  flex-direction: column;
}

.asset-card:hover {
  border-color: var(--color-border-strong);
}

.asset-card--selected {
  border-color: var(--color-text-display);
  border-width: 2px;
}

.asset-card__thumbnail {
  width: 100%;
  flex: 1;
  min-height: 0;
  position: relative;
  background: var(--color-bg-tertiary);
  overflow: hidden;
}

.asset-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.asset-card__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.asset-card__placeholder-icon {
  width: 48px;
  height: 48px;
  color: var(--color-text-disabled);
}

.asset-card__checkbox {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 20px;
  height: 20px;
  border: 1px solid var(--color-border-default);
  border-radius: 2px;
  background: var(--color-bg-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-fast) var(--ease-out-cubic);
}

.asset-card__checkbox:hover {
  border-color: var(--color-text-display);
}

.asset-card__checkbox--checked {
  background: var(--color-text-display);
  border-color: var(--color-text-display);
}

.asset-card__check-icon {
  width: 14px;
  height: 14px;
  color: var(--color-bg-primary);
}

.asset-card__menu {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-fast) var(--ease-out-cubic);
}

.asset-card__menu:hover {
  border-color: var(--color-text-display);
}

.asset-card__menu-icon {
  width: 16px;
  height: 16px;
  color: var(--color-text-primary);
}

.asset-card__dropdown {
  position: absolute;
  top: 40px;
  right: 8px;
  min-width: 120px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.asset-card__dropdown-item {
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  text-align: left;
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background var(--duration-fast) var(--ease-out-cubic);
}

.asset-card__dropdown-item:hover {
  background: var(--color-bg-secondary);
}

.asset-card__dropdown-icon {
  width: 16px;
  height: 16px;
  color: var(--color-text-secondary);
}

.asset-card__footer {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid var(--color-border-subtle);
  background: var(--color-bg-secondary);
}

.asset-card__name {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
}

.asset-card__meta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.asset-card__separator {
  color: var(--color-text-disabled);
}
</style>
