/**
 * useNotification - 消息通知管理 Composable
 * 提供 toast 消息的创建和管理功能
 */
import { ref } from 'vue'
import type { ToastPosition, ToastType } from '@/shared/components/NToast.vue'

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

export interface UseNotificationReturn {
  toasts: ReturnType<typeof ref<ToastItem[]>>
  show: (options: ToastOptions) => string
  success: (message: string, options?: Partial<ToastOptions>) => string
  error: (message: string, options?: Partial<ToastOptions>) => string
  warning: (message: string, options?: Partial<ToastOptions>) => string
  info: (message: string, options?: Partial<ToastOptions>) => string
  close: (id: string) => void
  closeAll: () => void
  position: ToastPosition
}

interface ToastItem {
  id: string
  type: ToastType
  title?: string
  message: string
  duration?: number
  closable?: boolean
  showIcon?: boolean
}

// Global state (shared across all instances)
const toasts = ref<ToastItem[]>([])
const position = ref<ToastPosition>('top-right')

let idCounter = 0

function generateId(): string {
  return `toast-${++idCounter}-${Date.now()}`
}

export function useNotification(): UseNotificationReturn {
  const show = (options: ToastOptions): string => {
    const id = options.id || generateId()

    const toast: ToastItem = {
      id,
      type: options.type || 'info',
      title: options.title,
      message: options.message,
      duration: options.duration ?? 3000,
      closable: options.closable ?? true,
      showIcon: options.showIcon ?? true
    }

    toasts.value.push(toast)

    // Call onClose when toast closes
    if (options.onClose) {
      // We'll handle this in the component
    }

    return id
  }

  const success = (message: string, options: Partial<ToastOptions> = {}): string => {
    return show({ ...options, type: 'success', message })
  }

  const error = (message: string, options: Partial<ToastOptions> = {}): string => {
    return show({ ...options, type: 'error', message })
  }

  const warning = (message: string, options: Partial<ToastOptions> = {}): string => {
    return show({ ...options, type: 'warning', message })
  }

  const info = (message: string, options: Partial<ToastOptions> = {}): string => {
    return show({ ...options, type: 'info', message })
  }

  const close = (id: string): void => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const closeAll = (): void => {
    toasts.value = []
  }

  return {
    toasts,
    show,
    success,
    error,
    warning,
    info,
    close,
    closeAll,
    position: position.value
  }
}

// Export setter for position (used by app initialization)
export function setToastPosition(newPosition: ToastPosition): void {
  position.value = newPosition
}

// Export getter for toasts (used by NToastContainer)
export function getToasts() {
  return toasts
}
