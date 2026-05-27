import { ElMessage } from 'element-plus'

export interface UseToastReturn {
  success: (message: string) => void
  error: (message: string) => void
  warning: (message: string) => void
  info: (message: string) => void
}

export function useToast(): UseToastReturn {
  const success = (message: string) => {
    ElMessage.success({
      message,
      showClose: true,
      duration: 3000
    })
  }

  const error = (message: string) => {
    ElMessage.error({
      message,
      showClose: true,
      duration: 3000
    })
  }

  const warning = (message: string) => {
    ElMessage.warning({
      message,
      showClose: true,
      duration: 3000
    })
  }

  const info = (message: string) => {
    ElMessage.info({
      message,
      showClose: true,
      duration: 3000
    })
  }

  return {
    success,
    error,
    warning,
    info
  }
}
