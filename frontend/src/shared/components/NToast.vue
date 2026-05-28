<script setup lang="ts">
/**
 * NToast - Nothing Design System 消息提示组件
 *
 * Design Principles:
 * - 无阴影
 * - 机械感边框 (4px 圆角)
 * - 状态色仅用于图标，不用于背景
 * - Space Mono 全大写标题
 * - 简单滑入滑出动画
 */
import { computed, onMounted, onUnmounted, ref } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'
export type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'

export interface ToastProps {
  id: string
  type: ToastType
  title?: string
  message: string
  duration?: number
  closable?: boolean
  showIcon?: boolean
  onClose?: () => void
}

const props = withDefaults(defineProps<ToastProps>(), {
  duration: 3000,
  closable: true,
  showIcon: true
})

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(false)
const progress = ref(100)

// Icon - simple symbols
const iconMap = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i'
}

const typeClass = computed(() => `toast--${props.type}`)

// Status color
const colorVar = computed(() => {
  const colors = {
    success: 'var(--color-success-text)',
    error: 'var(--color-error-text)',
    warning: 'var(--color-warning-text)',
    info: 'var(--color-info-text)'
  }
  return colors[props.type] || colors.info
})

// Auto close
onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })

  if (props.duration > 0) {
    const interval = 16
    const step = 100 / (props.duration / interval)

    const timer = setInterval(() => {
      progress.value -= step
      if (progress.value <= 0) {
        clearInterval(timer)
        close()
      }
    }, interval)

    onUnmounted(() => clearInterval(timer))
  }
})

function close() {
  isVisible.value = false
  setTimeout(() => {
    emit('close')
  }, 200)
}

const isPaused = ref(false)

function pause() {
  isPaused.value = true
}

function resume() {
  isPaused.value = false
}
</script>

<template>
  <Transition :name="isVisible ? 'toast-enter' : 'toast-leave'">
    <div
      v-if="isVisible"
      :class="['toast', typeClass]"
      @mouseenter="pause"
      @mouseleave="resume"
    >
      <!-- Status indicator - thin line -->
      <div class="toast__status" :style="{ background: colorVar }" />

      <!-- Icon - Optional, Doto Display -->
      <div v-if="showIcon" class="toast__icon" :style="{ color: colorVar }">
        <span class="toast__icon-text">{{ iconMap[type] }}</span>
      </div>

      <!-- Content -->
      <div class="toast__content">
        <div v-if="title" class="toast__title">{{ title }}</div>
        <div class="toast__message">{{ message }}</div>
      </div>

      <!-- Progress bar - thin line at bottom -->
      <div
        v-if="duration > 0"
        class="toast__progress"
        :style="{ width: `${progress}%`, background: colorVar }"
        :class="{ 'toast__progress--paused': isPaused }"
      />

      <!-- Close -->
      <button
        v-if="closable"
        class="toast__close"
        type="button"
        @click="close"
      >
        <span class="toast__close-icon">✕</span>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
/* === TOAST CONTAINER === */
.toast {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  min-width: 280px;
  max-width: 380px;
  padding: var(--spacing-element-md);
  padding-left: var(--spacing-2); /* space for status line */
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  background: var(--color-bg-elevated);
}

/* Status line - 2px colored indicator on left */
.toast__status {
  position: absolute;
  left: 0;
  top: var(--spacing-element-sm);
  bottom: var(--spacing-element-sm);
  width: 2px;
  border-radius: 1px;
}

/* === ICON === */
.toast__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast__icon-text {
  font-family: var(--font-family-display);
  font-size: 18px;
  font-weight: 400;
  line-height: 1;
}

/* === CONTENT === */
.toast__content {
  flex: 1;
  min-width: 0;
}

/* Title - Space Mono, ALL CAPS */
.toast__title {
  font-family: var(--font-family-mono);
  font-size: 11px;
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-1);
}

/* Message - Primary text */
.toast__message {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
  line-height: 1.4;
  word-wrap: break-word;
}

/* === PROGRESS BAR === */
.toast__progress {
  position: absolute;
  bottom: 0;
  left: 2px;
  right: 0;
  height: 1px;
  transition: width linear;
}

.toast__progress--paused {
  transition: none;
}

/* === CLOSE BUTTON === */
.toast__close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-text-tertiary);
  transition: color 0.15s ease-out;
}

.toast__close:hover {
  color: var(--color-text-primary);
}

.toast__close-icon {
  font-size: 14px;
  line-height: 1;
}

/* === ANIMATIONS === */
/* Simple slide in/out */
.toast-enter-active {
  animation: toastSlideIn 0.25s ease-out;
}

.toast-leave-active {
  animation: toastSlideOut 0.2s ease-out;
}

@keyframes toastSlideIn {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes toastSlideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(24px);
  }
}
</style>
