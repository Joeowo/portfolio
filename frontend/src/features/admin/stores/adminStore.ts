import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  AdminStats,
  PageReviewItem,
  TemplateManageItem,
  UserManageItem,
  ActivityItem
} from '../types'
import {
  getDashboardStatsApi,
  getPagesReviewApi,
  reviewPageApi,
  offlinePageApi,
  getTemplatesManageApi,
  createTemplateApi,
  updateTemplateApi,
  deleteTemplateApi,
  toggleTemplateStatusApi,
  getUsersManageApi,
  updateUserRoleApi,
  getViewsStatsApi,
  getPagesStatsApi,
  getRecentActivitiesApi
} from '../api/adminApi'

export const useAdminStore = defineStore('admin', () => {
  // State
  const stats = ref<AdminStats>({
    totalUsers: 0,
    totalWorks: 0,
    totalPages: 0,
    totalViews: 0,
    pendingPages: 0,
    activeTemplates: 0,
    todayViews: 0,
    weekViews: 0
  })

  const pagesReview = ref<PageReviewItem[]>([])
  const pagesReviewTotal = ref(0)

  const templates = ref<TemplateManageItem[]>([])
  const templatesTotal = ref(0)

  const users = ref<UserManageItem[]>([])
  const usersTotal = ref(0)

  const activities = ref<ActivityItem[]>([])

  const viewsStats = ref<Array<{ date: string; views: number }>>([])
  const pagesStats = ref<Array<{ status: string; count: number }>>([])

  const loading = ref(false)

  // Computed
  const statCards = computed(() => [
    {
      id: 'users',
      label: '用户总数',
      value: stats.value.totalUsers.toLocaleString(),
      trend: '+12%',
      trendType: 'positive' as const
    },
    {
      id: 'works',
      label: '作品总数',
      value: stats.value.totalWorks.toLocaleString(),
      trend: '+8%',
      trendType: 'positive' as const
    },
    {
      id: 'pages',
      label: '网页总数',
      value: stats.value.totalPages.toLocaleString(),
      trend: '+3',
      trendType: 'neutral' as const
    },
    {
      id: 'approval',
      label: '审核通过率',
      value: '98.5%',
      trend: '↓',
      trendType: 'neutral' as const
    }
  ])

  const pendingPagesCount = computed(() => stats.value.pendingPages)

  const enabledTemplates = computed(() => templates.value.filter(t => t.status === 1))

  // Actions
  const fetchStats = async () => {
    try {
      stats.value = await getDashboardStatsApi()
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const fetchPagesReview = async () => {
    try {
      loading.value = true
      const { list, total } = await getPagesReviewApi()
      pagesReview.value = list
      pagesReviewTotal.value = total
    } catch (error) {
      console.error('Failed to fetch pages review:', error)
    } finally {
      loading.value = false
    }
  }

  const approvePage = async (id: number) => {
    try {
      await reviewPageApi(id, true)
      // 从列表中移除已审核的页面
      pagesReview.value = pagesReview.value.filter(p => p.id !== id)
      pagesReviewTotal.value--
      // 更新统计
      stats.value.pendingPages--
    } catch (error) {
      console.error('Failed to approve page:', error)
      throw error
    }
  }

  const rejectPage = async (id: number) => {
    try {
      await reviewPageApi(id, false)
      pagesReview.value = pagesReview.value.filter(p => p.id !== id)
      pagesReviewTotal.value--
      stats.value.pendingPages--
    } catch (error) {
      console.error('Failed to reject page:', error)
      throw error
    }
  }

  const setPageOffline = async (id: number) => {
    try {
      await offlinePageApi(id)
      // 更新页面状态
      const page = pagesReview.value.find(p => p.id === id)
      if (page) {
        page.status = 'offline'
      }
    } catch (error) {
      console.error('Failed to set page offline:', error)
      throw error
    }
  }

  const fetchTemplates = async () => {
    try {
      loading.value = true
      const { list, total } = await getTemplatesManageApi()
      templates.value = list
      templatesTotal.value = total
    } catch (error) {
      console.error('Failed to fetch templates:', error)
    } finally {
      loading.value = false
    }
  }

  const createTemplate = async (data: Partial<TemplateManageItem>) => {
    try {
      const newTemplate = await createTemplateApi(data)
      templates.value.push(newTemplate)
      templatesTotal.value++
      stats.value.activeTemplates++
      return newTemplate
    } catch (error) {
      console.error('Failed to create template:', error)
      throw error
    }
  }

  const updateTemplate = async (id: number, data: Partial<TemplateManageItem>) => {
    try {
      const updated = await updateTemplateApi(id, data)
      const index = templates.value.findIndex(t => t.id === id)
      if (index !== -1) {
        templates.value[index] = updated
      }
      return updated
    } catch (error) {
      console.error('Failed to update template:', error)
      throw error
    }
  }

  const deleteTemplate = async (id: number) => {
    try {
      await deleteTemplateApi(id)
      templates.value = templates.value.filter(t => t.id !== id)
      templatesTotal.value--
      if (templates.value.length < templatesTotal.value) {
        stats.value.activeTemplates--
      }
    } catch (error) {
      console.error('Failed to delete template:', error)
      throw error
    }
  }

  const toggleTemplateStatus = async (id: number, status: boolean) => {
    try {
      await toggleTemplateStatusApi(id, status)
      const template = templates.value.find(t => t.id === id)
      if (template) {
        template.status = status ? 1 : 0
      }
      if (status) {
        stats.value.activeTemplates++
      } else {
        stats.value.activeTemplates--
      }
    } catch (error) {
      console.error('Failed to toggle template status:', error)
      throw error
    }
  }

  const fetchUsers = async () => {
    try {
      loading.value = true
      const { list, total } = await getUsersManageApi()
      users.value = list
      usersTotal.value = total
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      loading.value = false
    }
  }

  const updateUserRole = async (id: number, role: string) => {
    try {
      await updateUserRoleApi(id, role)
      const user = users.value.find(u => u.id === id)
      if (user) {
        user.role = role as 'USER' | 'ADMIN' | 'SUPER_ADMIN'
      }
    } catch (error) {
      console.error('Failed to update user role:', error)
      throw error
    }
  }

  const fetchViewsStats = async () => {
    try {
      viewsStats.value = await getViewsStatsApi()
    } catch (error) {
      console.error('Failed to fetch views stats:', error)
    }
  }

  const fetchPagesStats = async () => {
    try {
      pagesStats.value = await getPagesStatsApi()
    } catch (error) {
      console.error('Failed to fetch pages stats:', error)
    }
  }

  const fetchActivities = async () => {
    try {
      activities.value = await getRecentActivitiesApi()
    } catch (error) {
      console.error('Failed to fetch activities:', error)
      // 如果 API 不存在，生成模拟数据
      activities.value = generateMockActivities()
    }
  }

  // Helper function
  const generateMockActivities = (): ActivityItem[] => {
    return [
      {
        id: '1',
        type: 'work_created',
        title: '用户@alice 创建了新作品',
        description: '「我的摄影集」',
        actor: 'alice',
        targetId: 1,
        createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        type: 'page_pending',
        title: '网页进入审核队列',
        description: '网页#127',
        targetId: 127,
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        type: 'page_approved',
        title: '管理员审核通过了网页',
        description: '网页#126',
        actor: 'bob',
        targetId: 126,
        createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString()
      }
    ]
  }

  // Init
  const init = async () => {
    await Promise.all([fetchStats(), fetchActivities()])
  }

  return {
    // State
    stats,
    pagesReview,
    pagesReviewTotal,
    templates,
    templatesTotal,
    users,
    usersTotal,
    activities,
    viewsStats,
    pagesStats,
    loading,

    // Computed
    statCards,
    pendingPagesCount,
    enabledTemplates,

    // Actions
    fetchStats,
    fetchPagesReview,
    approvePage,
    rejectPage,
    setPageOffline,
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    toggleTemplateStatus,
    fetchUsers,
    updateUserRole,
    fetchViewsStats,
    fetchPagesStats,
    fetchActivities,
    init
  }
})
