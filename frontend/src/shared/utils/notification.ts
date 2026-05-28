/**
 * notification - 全局通知工具
 * 可以在非 Vue 组件上下文中使用（如 request.ts 拦截器）
 */
import { getToasts } from '@/shared/composables/useNotification'
import type { ToastType } from '@/shared/components/NToast.vue'

/**
 * 显示全局通知（可在任何地方调用）
 */
export function showNotification(type: ToastType, message: string, title?: string): void {
  const toasts = getToasts()

  if (toasts.value.length < 10) {
    // 限制最多10个通知
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    toasts.value.push({
      id,
      type,
      title,
      message,
      duration: 3000,
      closable: true,
      showIcon: true
    })

    // 自动移除
    setTimeout(() => {
      const index = toasts.value.findIndex(t => t.id === id)
      if (index > -1) {
        toasts.value.splice(index, 1)
      }
    }, 3000)
  }
}

/**
 * 快捷方法
 */
export const notify = {
  success: (message: string, title?: string) => showNotification('success', message, title),
  error: (message: string, title?: string) => showNotification('error', message, title),
  warning: (message: string, title?: string) => showNotification('warning', message, title),
  info: (message: string, title?: string) => showNotification('info', message, title)
}
