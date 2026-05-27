/**
 * Works Store - 作品状态管理
 * Phase 5: 作品编辑器模块 - Task 5.3
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Work,
  Section,
  WorkVersion,
  WorksQueryParams,
  SaveStatus,
  CreateWorkDto,
  UpdateWorkDto,
  CreateSectionDto,
  UpdateSectionDto
} from '../types'
import {
  fetchWorksApi,
  fetchWorkApi,
  createWorkApi,
  updateWorkApi,
  deleteWorkApi,
  duplicateWorkApi,
  publishWorkApi,
  unpublishWorkApi,
  fetchSectionsApi,
  createSectionApi,
  updateSectionApi,
  deleteSectionApi,
  duplicateSectionApi,
  reorderSectionsApi,
  fetchVersionsApi,
  rollbackVersionApi
} from '../api/worksApi'

export const useWorksStore = defineStore('works', () => {
  // ========== 状态 ==========
  const works = ref<Work[]>([])
  const currentWork = ref<Work | null>(null)
  const currentSections = ref<Section[]>([])
  const versions = ref<WorkVersion[]>([])
  const loading = ref(false)
  const saveStatus = ref<SaveStatus>('saved')
  const autoSaveTimer = ref<number | null>(null)

  // 分页
  const total = ref(0)
  const page = ref(1)
  const pageSize = ref(12)

  // 筛选条件
  const filterStatus = ref<'draft' | 'published' | 'all'>('all')
  const searchKeyword = ref('')

  // ========== 计算属性 ==========
  const filteredWorks = computed(() => {
    let result = works.value

    // 状态筛选
    if (filterStatus.value !== 'all') {
      result = result.filter(w => w.status === filterStatus.value)
    }

    // 搜索筛选
    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase()
      result = result.filter(w =>
        w.title.toLowerCase().includes(keyword) ||
        w.description?.toLowerCase().includes(keyword)
      )
    }

    return result
  })

  const hasUnsavedChanges = computed(() => {
    return saveStatus.value === 'unsaved'
  })

  const isEmpty = computed(() => {
    return works.value.length === 0
  })

  // ========== 作品操作 ==========

  /**
   * 获取作品列表
   */
  async function fetchWorks(params?: WorksQueryParams) {
    loading.value = true
    try {
      const response = await fetchWorksApi({
        page: page.value,
        pageSize: pageSize.value,
        ...params
      })
      works.value = response.list
      total.value = response.total
    } catch (error) {
      console.error('获取作品列表失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * 获取作品详情
   */
  async function fetchWork(id: number) {
    loading.value = true
    try {
      const work = await fetchWorkApi(id)
      currentWork.value = work
      currentSections.value = work.sections.sort((a, b) => a.order - b.order)
      saveStatus.value = 'saved'
      return work
    } catch (error) {
      console.error('获取作品详情失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * 创建作品
   */
  async function createWork(dto: CreateWorkDto) {
    loading.value = true
    try {
      const work = await createWorkApi(dto)
      works.value.unshift(work)
      return work
    } catch (error) {
      console.error('创建作品失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * 更新作品
   */
  async function updateWork(id: number, dto: UpdateWorkDto) {
    loading.value = true
    try {
      const work = await updateWorkApi(id, dto)
      // 更新列表中的作品
      const index = works.value.findIndex(w => w.id === id)
      if (index !== -1) {
        works.value[index] = work
      }
      // 更新当前作品
      if (currentWork.value?.id === id) {
        currentWork.value = work
      }
      saveStatus.value = 'saved'
      return work
    } catch (error) {
      console.error('更新作品失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * 删除作品
   */
  async function deleteWork(id: number) {
    loading.value = true
    try {
      await deleteWorkApi(id)
      works.value = works.value.filter(w => w.id !== id)
      if (currentWork.value?.id === id) {
        currentWork.value = null
      }
    } catch (error) {
      console.error('删除作品失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * 复制作品
   */
  async function duplicateWork(id: number) {
    loading.value = true
    try {
      const work = await duplicateWorkApi(id)
      works.value.unshift(work)
      return work
    } catch (error) {
      console.error('复制作品失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * 发布作品
   */
  async function publishWork(id: number) {
    loading.value = true
    try {
      const work = await publishWorkApi(id)
      const index = works.value.findIndex(w => w.id === id)
      if (index !== -1) {
        works.value[index] = work
      }
      if (currentWork.value?.id === id) {
        currentWork.value = work
      }
      return work
    } catch (error) {
      console.error('发布作品失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * 取消发布作品
   */
  async function unpublishWork(id: number) {
    loading.value = true
    try {
      const work = await unpublishWorkApi(id)
      const index = works.value.findIndex(w => w.id === id)
      if (index !== -1) {
        works.value[index] = work
      }
      if (currentWork.value?.id === id) {
        currentWork.value = work
      }
      return work
    } catch (error) {
      console.error('取消发布失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // ========== 区块操作 ==========

  /**
   * 获取作品区块
   */
  async function fetchSections(workId: number) {
    try {
      const sections = await fetchSectionsApi(workId)
      currentSections.value = sections.sort((a, b) => a.order - b.order)
      return sections
    } catch (error) {
      console.error('获取区块失败:', error)
      throw error
    }
  }

  /**
   * 添加区块
   */
  async function addSection(workId: number, dto: CreateSectionDto) {
    try {
      const section = await createSectionApi(workId, dto)
      currentSections.value.push(section)
      markUnsaved()
      return section
    } catch (error) {
      console.error('添加区块失败:', error)
      throw error
    }
  }

  /**
   * 更新区块
   */
  async function updateSection(workId: number, sectionId: number, dto: UpdateSectionDto) {
    try {
      const section = await updateSectionApi(workId, sectionId, dto)
      const index = currentSections.value.findIndex(s => s.id === sectionId)
      if (index !== -1) {
        currentSections.value[index] = section
      }
      markUnsaved()
      return section
    } catch (error) {
      console.error('更新区块失败:', error)
      throw error
    }
  }

  /**
   * 删除区块
   */
  async function removeSection(workId: number, sectionId: number) {
    try {
      await deleteSectionApi(workId, sectionId)
      currentSections.value = currentSections.value.filter(s => s.id !== sectionId)
      markUnsaved()
    } catch (error) {
      console.error('删除区块失败:', error)
      throw error
    }
  }

  /**
   * 复制区块
   */
  async function duplicateSection(workId: number, sectionId: number) {
    try {
      const section = await duplicateSectionApi(workId, sectionId)
      currentSections.value.push(section)
      markUnsaved()
      return section
    } catch (error) {
      console.error('复制区块失败:', error)
      throw error
    }
  }

  /**
   * 重新排序区块
   */
  async function reorderSections(workId: number, sectionIds: number[]) {
    try {
      const sections = await reorderSectionsApi(workId, { sectionIds })
      currentSections.value = sections.sort((a, b) => a.order - b.order)
      markUnsaved()
      return sections
    } catch (error) {
      console.error('排序区块失败:', error)
      throw error
    }
  }

  // ========== 版本管理 ==========

  /**
   * 获取版本历史
   */
  async function fetchVersions(workId: number) {
    try {
      versions.value = await fetchVersionsApi(workId)
      return versions.value
    } catch (error) {
      console.error('获取版本历史失败:', error)
      throw error
    }
  }

  /**
   * 回滚到指定版本
   */
  async function rollbackToVersion(workId: number, version: number) {
    loading.value = true
    try {
      const work = await rollbackVersionApi(workId, version)
      currentWork.value = work
      currentSections.value = work.sections.sort((a, b) => a.order - b.order)
      await fetchVersions(workId)
      saveStatus.value = 'saved'
      return work
    } catch (error) {
      console.error('回滚版本失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // ========== 自动保存 ==========

  /**
   * 标记为未保存
   */
  function markUnsaved() {
    saveStatus.value = 'unsaved'
    resetAutoSave()
  }

  /**
   * 开始自动保存
   */
  function startAutoSave() {
    stopAutoSave()
    autoSaveTimer.value = window.setInterval(() => {
      if (hasUnsavedChanges.value && currentWork.value) {
        autoSave()
      }
    }, 5 * 60 * 1000) // 5 分钟
  }

  /**
   * 停止自动保存
   */
  function stopAutoSave() {
    if (autoSaveTimer.value) {
      clearInterval(autoSaveTimer.value)
      autoSaveTimer.value = null
    }
  }

  /**
   * 重置自动保存计时器
   */
  function resetAutoSave() {
    stopAutoSave()
    startAutoSave()
  }

  /**
   * 自动保存
   */
  async function autoSave() {
    if (!currentWork.value) return

    saveStatus.value = 'saving'
    try {
      await updateWork(currentWork.value.id, {
        title: currentWork.value.title,
        description: currentWork.value.description
      })
    } catch (error) {
      console.error('自动保存失败:', error)
      saveStatus.value = 'unsaved'
    }
  }

  // ========== 筛选 ==========

  /**
   * 设置状态筛选
   */
  function setFilterStatus(status: 'draft' | 'published' | 'all') {
    filterStatus.value = status
  }

  /**
   * 设置搜索关键词
   */
  function setSearchKeyword(keyword: string) {
    searchKeyword.value = keyword
  }

  /**
   * 重置筛选
   */
  function resetFilters() {
    filterStatus.value = 'all'
    searchKeyword.value = ''
  }

  // ========== 清理 ==========

  /**
   * 清空当前作品
   */
  function clearCurrentWork() {
    currentWork.value = null
    currentSections.value = []
    versions.value = []
    stopAutoSave()
    saveStatus.value = 'saved'
  }

  return {
    // 状态
    works,
    currentWork,
    currentSections,
    versions,
    loading,
    saveStatus,
    total,
    page,
    pageSize,
    filterStatus,
    searchKeyword,

    // 计算属性
    filteredWorks,
    hasUnsavedChanges,
    isEmpty,

    // 作品操作
    fetchWorks,
    fetchWork,
    createWork,
    updateWork,
    deleteWork,
    duplicateWork,
    publishWork,
    unpublishWork,

    // 区块操作
    fetchSections,
    addSection,
    updateSection,
    removeSection,
    duplicateSection,
    reorderSections,

    // 版本管理
    fetchVersions,
    rollbackToVersion,

    // 自动保存
    markUnsaved,
    startAutoSave,
    stopAutoSave,
    resetAutoSave,
    autoSave,

    // 筛选
    setFilterStatus,
    setSearchKeyword,
    resetFilters,

    // 清理
    clearCurrentWork
  }
})
