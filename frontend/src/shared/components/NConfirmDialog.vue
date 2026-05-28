<script setup lang="ts">
/**
 * NConfirmDialog - Nothing Design System 确认对话框
 *
 * Design Principles:
 * - 无阴影，无模糊
 * - 机械感边框 (4px 圆角)
 * - 图标直接显示，无背景块
 * - 标题使用 Space Mono 全大写
 * - 简单淡入淡出动画
 */
import { computed, onMounted, ref, watch } from 'vue'

export type DialogType = 'danger' | 'warning' | 'info' | 'success'

export interface ConfirmDialogProps {
  isOpen?: boolean
  type?: DialogType
  title?: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  showCancel?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<ConfirmDialogProps>(), {
  isOpen: false,
  type: 'info',
  title: '确认操作',
  message: '您确定要执行此操作吗？',
  confirmLabel: '确认',
  cancelLabel: '取消',
  showCancel: true,
  closeOnOverlay: true,
  closeOnEscape: true
})

const emit = defineEmits<{
  confirm: []
  cancel: []
  close: []
}>()

const isVisible = ref(false)

// Sync with isOpen prop
watch(
  () => props.isOpen,
  newValue => {
    if (newValue) {
      open()
    } else {
      close()
    }
  }
)

// Handle escape key
function handleEscapeKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.closeOnEscape && isVisible.value) {
    cancel()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

function open() {
  isVisible.value = true
  document.body.style.overflow = 'hidden'
}

function close() {
  isVisible.value = false
  document.body.style.overflow = ''
}

function confirm() {
  emit('confirm')
  close()
}

function cancel() {
  emit('cancel')
  close()
}

function handleOverlayClick() {
  if (props.closeOnOverlay) {
    cancel()
  }
}

function handleContentClick(e: Event) {
  e.stopPropagation()
}

const typeClass = computed(() => `dialog--${props.type}`)

// Icon for each type - Doto Display
const iconMap = {
  danger: '!',
  warning: '!',
  info: 'i',
  success: '✓'
}

// Status color for text only
const colorVar = computed(() => {
  const colors = {
    danger: 'var(--color-error-text)',
    warning: 'var(--color-warning-text)',
    info: 'var(--color-info-text)',
    success: 'var(--color-success-text)'
  }
  return colors[props.type] || colors.info
})
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog-overlay">
      <div v-if="isVisible" class="dialog-overlay" @click="handleOverlayClick">
        <Transition name="dialog-content">
          <div v-if="isVisible" :class="['dialog', typeClass]" @click="handleContentClick">
            <!-- Icon - Pure Doto Display, no background -->
            <div class="dialog__icon" :style="{ color: colorVar }">
              <span class="dialog__icon-text">{{ iconMap[type] }}</span>
            </div>

            <!-- Content -->
            <div class="dialog__content">
              <!-- Label-style title in ALL CAPS -->
              <div class="dialog__label">{{ title }}</div>
              <!-- Message as primary text -->
              <p v-if="message" class="dialog__message">{{ message }}</p>
            </div>

            <!-- Actions - Technical buttons for cancel, Pill for confirm -->
            <div class="dialog__actions">
              <button
                v-if="showCancel"
                type="button"
                class="dialog__button dialog__button--cancel"
                @click="cancel"
              >
                <span class="dialog__button-label">{{ cancelLabel }}</span>
              </button>
              <button
                type="button"
                :class="['dialog__button', 'dialog__button--confirm', typeClass]"
                @click="confirm"
              >
                <span class="dialog__button-label">{{ confirmLabel }}</span>
              </button>
            </div>

            <!-- Minimal escape hint -->
            <div class="dialog__hint">
              <span class="dialog__hint-text">[ESC TO CLOSE]</span>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* === OVERLAY === */
/* Pure black with opacity, no blur */
.dialog-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-screen-lg);
  background: rgba(0, 0, 0, 0.85);
  z-index: var(--z-modal);
}

/* === DIALOG CONTAINER === */
/* Mechanical: 4px radius, thin border, no shadow */
.dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: var(--spacing-16);
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  background: var(--color-bg-primary);
  text-align: center;
}

/* === ICON === */
/* Doto Display, no background, pure typography */
.dialog__icon {
  margin-bottom: var(--spacing-6);
}

.dialog__icon-text {
  font-family: var(--font-family-display);
  font-size: 48px;
  font-weight: 400;
  line-height: 1;
}

/* === CONTENT === */
.dialog__content {
  width: 100%;
  margin-bottom: var(--spacing-6);
}

/* Title as label - Space Mono, ALL CAPS */
.dialog__label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-3);
}

/* Message as primary text */
.dialog__message {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* === ACTIONS === */
.dialog__actions {
  display: flex;
  gap: var(--spacing-2);
  width: 100%;
  justify-content: center;
}

/* Base button */
.dialog__button {
  flex: 1;
  max-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-element-sm) var(--spacing-element-lg);
  border: 1px solid var(--color-border-default);
  background: var(--color-bg-secondary);
  cursor: pointer;
  transition:
    background-color 0.15s ease-out,
    border-color 0.15s ease-out;
}

.dialog__button:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-tertiary);
}

.dialog__button:active {
  transform: scale(0.98);
}

/* Cancel - Technical shape (4px) */
.dialog__button--cancel {
  border-radius: 4px;
}

.dialog__button--cancel .dialog__button-label {
  color: var(--color-text-primary);
}

/* Confirm - Pill shape with status color */
.dialog__button--confirm {
  border-radius: 999px;
  border-color: currentColor;
}

/* Type-specific colors */
.dialog--danger .dialog__button--confirm {
  color: var(--color-error-text);
  background: transparent;
}

.dialog--danger .dialog__button--confirm:hover {
  background: var(--color-error-bg);
}

.dialog--warning .dialog__button--confirm {
  color: var(--color-warning-text);
  background: transparent;
}

.dialog--warning .dialog__button--confirm:hover {
  background: var(--color-warning-bg);
}

.dialog--info .dialog__button--confirm {
  color: var(--color-info-text);
  background: transparent;
}

.dialog--info .dialog__button--confirm:hover {
  background: var(--color-info-bg);
}

.dialog--success .dialog__button--confirm {
  color: var(--color-success-text);
  background: transparent;
}

.dialog--success .dialog__button--confirm:hover {
  background: var(--color-success-bg);
}

/* Button label - Space Mono, ALL CAPS */
.dialog__button-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* === HINT === */
/* Tertiary level info */
.dialog__hint {
  margin-top: var(--spacing-4);
}

.dialog__hint-text {
  font-family: var(--font-family-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-disabled);
}

/* === ANIMATIONS === */
/* Simple fade, no spring/bounce */

/* Overlay fade */
.dialog-overlay-enter-active,
.dialog-overlay-leave-active {
  transition: opacity 0.2s ease-out;
}

.dialog-overlay-enter-from,
.dialog-overlay-leave-to {
  opacity: 0;
}

/* Content fade + slide */
.dialog-content-enter-active {
  transition:
    opacity 0.25s ease-out,
    transform 0.25s ease-out;
}

.dialog-content-leave-active {
  transition:
    opacity 0.15s ease-out,
    transform 0.15s ease-out;
}

.dialog-content-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

.dialog-content-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
