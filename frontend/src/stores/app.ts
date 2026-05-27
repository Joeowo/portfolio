import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)
  const pageTitle = ref('Portfolio Platform')

  function setLoading(value: boolean) {
    isLoading.value = value
  }

  function setPageTitle(title: string) {
    pageTitle.value = title
    document.title = title
  }

  return {
    isLoading,
    pageTitle,
    setLoading,
    setPageTitle
  }
})
