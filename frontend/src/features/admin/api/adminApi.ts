import request from '@/shared/utils/request'
import type {
  AdminStats,
  PageReviewItem,
  TemplateManageItem,
  UserManageItem,
  ActivityItem
} from '../types'

/**
 * 管理后台 API
 */

// 获取仪表盘统计数据
export const getDashboardStatsApi = (): Promise<AdminStats> => {
  return request.get('/admin/dashboard')
}

// 获取网页审核列表
export const getPagesReviewApi = (): Promise<{ list: PageReviewItem[]; total: number }> => {
  return request.get('/admin/pages/review')
}

// 审核网页
export const reviewPageApi = (
  id: number,
  approve: boolean
): Promise<{ id: number; approved: boolean }> => {
  return request.put(`/admin/pages/${id}/review`, { approve })
}

// 下架网页
export const offlinePageApi = (id: number): Promise<void> => {
  return request.put(`/admin/pages/${id}/offline`)
}

// 获取模版管理列表
export const getTemplatesManageApi = (): Promise<{ list: TemplateManageItem[]; total: number }> => {
  return request.get('/admin/templates')
}

// 创建模版
export const createTemplateApi = (
  data: Partial<TemplateManageItem>
): Promise<TemplateManageItem> => {
  return request.post('/admin/templates', data)
}

// 更新模版
export const updateTemplateApi = (
  id: number,
  data: Partial<TemplateManageItem>
): Promise<TemplateManageItem> => {
  return request.put(`/admin/templates/${id}`, data)
}

// 删除模版
export const deleteTemplateApi = (id: number): Promise<void> => {
  return request.delete(`/admin/templates/${id}`)
}

// 切换模版状态
export const toggleTemplateStatusApi = (
  id: number,
  status: boolean
): Promise<{ id: number; status: number }> => {
  return request.put(`/admin/templates/${id}/status`, { status })
}

// 获取用户列表
export const getUsersManageApi = (): Promise<{ list: UserManageItem[]; total: number }> => {
  return request.get('/admin/users')
}

// 更新用户角色
export const updateUserRoleApi = (
  id: number,
  role: string
): Promise<{ id: number; role: string }> => {
  return request.put(`/admin/users/${id}/role`, { role })
}

// 获取浏览量统计（按日期）
export const getViewsStatsApi = (): Promise<Array<{ date: string; views: number }>> => {
  return request.get('/admin/stats/views')
}

// 获取网页状态统计
export const getPagesStatsApi = (): Promise<Array<{ status: string; count: number }>> => {
  return request.get('/admin/stats/pages')
}

// 获取最近活动
export const getRecentActivitiesApi = (): Promise<ActivityItem[]> => {
  return request.get('/admin/activities')
}
