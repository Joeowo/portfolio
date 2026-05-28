/**
 * Pages Store
 * Phase 7: Pages Management Module
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { PageStatus, PublishedPage } from '../types'
import {
  getPagesApi,
  generatePageApi,
  updatePageApi,
  updatePageStatusApi,
  deletePageApi,
  regeneratePageApi
} from '../api/pagesApi'

export const usePagesStore = defineStore('pages', () => {
  // State
  const pages = ref<PublishedPage[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Filters
  const statusFilter = ref<string>('all')
  const searchQuery = ref('')
  const sortBy = ref<'updatedAt' | 'viewCount' | 'createdAt'>('updatedAt')

  // Computed
  const filteredPages = computed(() => {
    let filtered = [...pages.value]

    // Status filter
    if (statusFilter.value !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter.value)
    }

    // Search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        p => p.title.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query)
      )
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy.value === 'viewCount') {
        return b.viewCount - a.viewCount
      }
      return new Date(b[sortBy.value]).getTime() - new Date(a[sortBy.value]).getTime()
    })

    return filtered
  })

  const pageStats = computed(() => {
    return {
      all: pages.value.length,
      published: pages.value.filter(p => p.status === 'published').length,
      draft: pages.value.filter(p => p.status === 'draft').length,
      offline: pages.value.filter(p => p.status === 'offline').length,
      pending: pages.value.filter(p => p.status === 'pending').length
    }
  })

  // Actions
  const fetchPages = async (userId: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await getPagesApi({ userId })
      pages.value = response.list
    } catch (err: unknown) {
      // Silently handle errors - don't throw to prevent UI errors
      console.error('[PagesStore] Failed to fetch pages:', err)
      // Set empty pages instead of throwing
      pages.value = []
      error.value = '无法加载页面数据'
    } finally {
      loading.value = false
    }
  }

  const generatePage = async (data: {
    workId: number
    templateId: number
    title?: string
    description?: string
    customSlug?: string
  }) => {
    loading.value = true
    error.value = null

    try {
      const newPage = await generatePageApi(data)
      pages.value.unshift(newPage)
      return newPage
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to generate page'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePage = async (id: number, data: Partial<PublishedPage>) => {
    loading.value = true
    error.value = null

    try {
      const updated = await updatePageApi(id, data)

      const index = pages.value.findIndex(p => p.id === id)
      if (index !== -1) {
        pages.value[index] = updated
      }

      return updated
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to update page'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateStatus = async (id: number, status: PageStatus) => {
    loading.value = true
    error.value = null

    try {
      const updated = await updatePageStatusApi(id, { status })

      const index = pages.value.findIndex(p => p.id === id)
      if (index !== -1) {
        pages.value[index] = updated
      }

      return updated
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to update status'
      throw err
    } finally {
      loading.value = false
    }
  }

  const regeneratePage = async (id: number, templateId: number) => {
    loading.value = true
    error.value = null

    try {
      const updated = await regeneratePageApi(id, { templateId })

      const index = pages.value.findIndex(p => p.id === id)
      if (index !== -1) {
        pages.value[index] = updated
      }

      return updated
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to regenerate page'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePage = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      await deletePageApi(id)
      pages.value = pages.value.filter(p => p.id !== id)
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to delete page'
      throw err
    } finally {
      loading.value = false
    }
  }

  const setPageById = (page: PublishedPage) => {
    const index = pages.value.findIndex(p => p.id === page.id)
    if (index !== -1) {
      pages.value[index] = page
    }
  }

  const getStatusLabel = (status: PageStatus): string => {
    const labels: Record<PageStatus, string> = {
      draft: 'DRAFT',
      published: 'ONLINE',
      offline: 'OFFLINE',
      pending: 'PENDING'
    }
    return labels[status]
  }

  const resetFilters = () => {
    statusFilter.value = 'all'
    searchQuery.value = ''
    sortBy.value = 'updatedAt'
  }

  return {
    // State
    pages,
    loading,
    error,
    statusFilter,
    searchQuery,
    sortBy,

    // Computed
    filteredPages,
    pageStats,

    // Actions
    fetchPages,
    generatePage,
    updatePage,
    updateStatus,
    regeneratePage,
    deletePage,
    setPageById,
    getStatusLabel,
    resetFilters
  }
})
