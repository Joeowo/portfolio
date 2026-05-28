/**
 * 管理后台统计数据类型
 */

export interface AdminStats {
  totalUsers: number
  totalWorks: number
  totalPages: number
  totalViews: number
  pendingPages: number
  activeTemplates: number
  todayViews: number
  weekViews: number
}

export interface StatCard {
  id: string
  label: string
  value: string | number
  trend?: string
  trendType?: 'positive' | 'negative' | 'neutral'
}

/**
 * 网页审核相关类型
 */

export type PageStatus = 'draft' | 'pending' | 'published' | 'offline'

export interface PageReviewItem {
  id: number
  userId: number
  workId: number
  templateId: number
  customSlug?: string
  title: string
  description?: string
  seoTitle?: string
  seoDescription?: string
  status: PageStatus
  viewCount: number
  previewUrl: string
  publishedUrl?: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
  user?: PageUser
}

export interface PageUser {
  id: number
  username: string
  nickname?: string
  avatarUrl?: string
}

/**
 * 模版管理相关类型
 */

export type LayoutType = 'single' | 'grid' | 'two_column' | 'masonry'
export type TemplateType = 'system' | 'custom'

export interface TemplateManageItem {
  id: number
  name: string
  category: string
  type: TemplateType
  previewUrl: string
  layoutType: LayoutType
  description?: string
  status: 0 | 1 // 0: disabled, 1: enabled
  createdAt: string
}

/**
 * 最近活动类型
 */

export interface ActivityItem {
  id: string
  type: 'user_created' | 'work_created' | 'page_pending' | 'page_approved' | 'page_rejected' | 'page_offline'
  title: string
  description?: string
  actor?: string
  targetId?: number
  createdAt: string
}

/**
 * 用户管理类型
 */

export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN'

export interface UserManageItem {
  id: number
  username: string
  nickname?: string
  email?: string
  avatarUrl?: string
  role: UserRole
  status: 0 | 1 // 0: disabled, 1: enabled
  createdAt: string
  worksCount?: number
  pagesCount?: number
}
