import { ref, type Ref } from 'vue'

export interface UseLoadingReturn {
  loading: Ref<boolean>
  start: () => void
  stop: () => void
  toggle: () => void
}

export function useLoading(initialState = false): UseLoadingReturn {
  const loading = ref(initialState)

  const start = () => {
    loading.value = true
  }

  const stop = () => {
    loading.value = false
  }

  const toggle = () => {
    loading.value = !loading.value
  }

  return {
    loading,
    start,
    stop,
    toggle
  }
}
