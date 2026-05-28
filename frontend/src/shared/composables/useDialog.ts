/**
 * useDialog - 对话框管理 Composable
 * 提供确认对话框的显示和管理功能
 */
import { reactive } from 'vue'
import type { DialogType } from '@/shared/components/NConfirmDialog.vue'

export interface DialogOptions {
  type?: DialogType
  title?: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  showCancel?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
}

export interface UseDialogReturn {
  confirm: (options: DialogOptions) => Promise<boolean>
  alert: (message: string, title?: string) => Promise<void>
}

// Global dialog state - 响应式
const dialogState = reactive({
  isOpen: false,
  type: 'info' as DialogType,
  title: '确认操作',
  message: '您确定要执行此操作吗？',
  confirmLabel: '确认',
  cancelLabel: '取消',
  showCancel: true,
  closeOnOverlay: true,
  closeOnEscape: true
})

let resolveConfirm: ((value: boolean) => void) | null = null

export function useDialog(): UseDialogReturn {
  const confirm = (options: DialogOptions = {}): Promise<boolean> => {
    return new Promise(resolve => {
      // Update state
      dialogState.type = options.type || 'info'
      dialogState.title = options.title || '确认操作'
      dialogState.message = options.message || '您确定要执行此操作吗？'
      dialogState.confirmLabel = options.confirmLabel || '确认'
      dialogState.cancelLabel = options.cancelLabel || '取消'
      dialogState.showCancel = options.showCancel !== false
      dialogState.closeOnOverlay = options.closeOnOverlay !== false
      dialogState.closeOnEscape = options.closeOnEscape !== false
      dialogState.isOpen = true

      // Store resolver
      resolveConfirm = resolve
    })
  }

  const alert = (message: string, title?: string): Promise<void> => {
    return new Promise(resolve => {
      dialogState.type = 'info'
      dialogState.title = title || '提示'
      dialogState.message = message
      dialogState.confirmLabel = '确定'
      dialogState.showCancel = false
      dialogState.isOpen = true

      resolveConfirm = () => {
        resolve()
        return true
      }
    })
  }

  return {
    confirm,
    alert
  }
}

// Internal functions called by the dialog component
export function handleDialogConfirm() {
  dialogState.isOpen = false
  if (resolveConfirm) {
    resolveConfirm(true)
    resolveConfirm = null
  }
}

export function handleDialogCancel() {
  dialogState.isOpen = false
  if (resolveConfirm) {
    resolveConfirm(false)
    resolveConfirm = null
  }
}

// Export state for NConfirmDialog component (响应式对象)
export function getDialogState() {
  return dialogState
}
