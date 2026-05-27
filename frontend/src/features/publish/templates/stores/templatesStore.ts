/**
 * Templates Store
 * 模版状态管理
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { templatesApi } from '../api/templatesApi'
import type {
  Template,
  TemplateFilters,
  CreateTemplateDto,
  UpdateTemplateDto
} from '../types/Template'

export const useTemplatesStore = defineStore('templates', () => {
  // State
  const templates = ref<Template[]>([])
  const currentTemplate = ref<Template | null>(null)
  const loading = ref(false)
  const filters = ref<TemplateFilters>({})

  // Computed
  const systemTemplates = computed(() => templates.value.filter(t => t.type === 'system'))

  const customTemplates = computed(() => templates.value.filter(t => t.type === 'custom'))

  const enabledTemplates = computed(() => templates.value.filter(t => t.status === 1))

  const templateCategories = computed(() => {
    const categories = new Set(templates.value.map(t => t.category))
    return Array.from(categories)
  })

  // Actions
  const fetchTemplates = async (newFilters?: TemplateFilters) => {
    loading.value = true
    try {
      if (newFilters) {
        filters.value = newFilters
      }
      const response = await templatesApi.getTemplates(filters.value)
      templates.value = response.list
    } catch (error) {
      console.error('Failed to fetch templates:', error)
    } finally {
      loading.value = false
    }
  }

  const fetchTemplateById = async (id: number) => {
    loading.value = true
    try {
      const template = await templatesApi.getTemplateById(id)
      currentTemplate.value = template
      return template
    } catch (error) {
      console.error('Failed to fetch template:', error)
      return null
    } finally {
      loading.value = false
    }
  }

  const createTemplate = async (data: CreateTemplateDto) => {
    loading.value = true
    try {
      const newTemplate = await templatesApi.createTemplate(data)
      templates.value.push(newTemplate)
      return newTemplate
    } catch (error) {
      console.error('Failed to create template:', error)
      return null
    } finally {
      loading.value = false
    }
  }

  const updateTemplate = async (id: number, data: UpdateTemplateDto) => {
    loading.value = true
    try {
      const updatedTemplate = await templatesApi.updateTemplate(id, data)
      const index = templates.value.findIndex(t => t.id === id)
      if (index !== -1) {
        templates.value[index] = updatedTemplate
      }
      if (currentTemplate.value?.id === id) {
        currentTemplate.value = updatedTemplate
      }
      return updatedTemplate
    } catch (error) {
      console.error('Failed to update template:', error)
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteTemplate = async (id: number) => {
    loading.value = true
    try {
      await templatesApi.deleteTemplate(id)
      templates.value = templates.value.filter(t => t.id !== id)
      if (currentTemplate.value?.id === id) {
        currentTemplate.value = null
      }
      return true
    } catch (error) {
      console.error('Failed to delete template:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const updateStatus = async (id: number, status: boolean) => {
    loading.value = true
    try {
      const updated = await templatesApi.updateTemplateStatus(id, status)
      const index = templates.value.findIndex(t => t.id === id)
      if (index !== -1) {
        templates.value[index] = updated
      }
      return updated
    } catch (error) {
      console.error('Failed to update template status:', error)
      return null
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: TemplateFilters) => {
    filters.value = newFilters
  }

  const clearFilters = () => {
    filters.value = {}
  }

  return {
    // State
    templates,
    currentTemplate,
    loading,
    filters,

    // Computed
    systemTemplates,
    customTemplates,
    enabledTemplates,
    templateCategories,

    // Actions
    fetchTemplates,
    fetchTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    updateStatus,
    setFilters,
    clearFilters
  }
})
