<script setup lang="ts">
/**
 * NToastContainer - 消息提示容器组件
 * 管理所有消息的显示和位置
 */
import { computed } from 'vue'
import NToast, { type ToastPosition, type ToastProps, type ToastType } from './NToast.vue'

export interface ToastOptions {
  id?: string
  type?: ToastType
  title?: string
  message: string
  duration?: number
  closable?: boolean
  showIcon?: boolean
  onClose?: () => void
}

interface ToastItem extends ToastProps {
  id: string
}

interface Props {
  items: ToastItem[]
  position?: ToastPosition
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top-right'
})

const emit = defineEmits<{
  close: [id: string]
}>()

const positionClass = computed(() => {
  const [vertical, horizontal] = props.position.split('-')
  return `toast-container--${vertical} toast-container--${horizontal}`
})

function handleClose(id: string) {
  emit('close', id)
}
</script>

<template>
  <div :class="['toast-container', positionClass]">
    <TransitionGroup name="toast-list" tag="div" class="toast-list">
      <NToast v-for="item in items" :key="item.id" v-bind="item" @close="handleClose(item.id)" />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  z-index: var(--z-toast);
  pointer-events: none;
  max-width: 100vw;
  padding: var(--spacing-screen-md);
}

.toast-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

/* Vertical position */
.toast-container--top {
  top: 0;
}

.toast-container--bottom {
  bottom: 0;
}

/* Horizontal position */
.toast-container--left .toast-list {
  align-items: flex-start;
}

.toast-container--center .toast-list {
  align-items: center;
}

.toast-container--right .toast-list {
  align-items: flex-end;
}

/* Make toasts interactive */
.toast-list >>> .toast {
  pointer-events: auto;
}

/* List animations */
.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.3s var(--ease-out);
}

.toast-list-enter-from,
.toast-list-leave-to {
  opacity: 0;
  transform: scaleY(0.8);
}

.toast-list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
