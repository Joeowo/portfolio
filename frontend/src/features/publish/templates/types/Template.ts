/**
 * Template Types
 * 模版相关类型定义
 */

/** 布局类型 */
export type LayoutType = 'single' | 'grid' | 'two_column' | 'masonry'

/** 模版类型 */
export type TemplateCategory = 'system' | 'custom'

/** 模版分类 */
export type TemplateCategoryType =
  | 'minimal'
  | 'gallery'
  | 'editorial'
  | 'dark'
  | 'blog'
  | 'immersive'

/** 模版实体 */
export interface Template {
  id: number
  name: string
  category: TemplateCategoryType
  type: TemplateCategory
  previewUrl: string
  layoutType: LayoutType
  description?: string
  status: 0 | 1
  createdAt: string
}

/** 创建模版 DTO */
export interface CreateTemplateDto {
  name: string
  category: TemplateCategoryType
  previewUrl: string
  layoutType: LayoutType
  description?: string
}

/** 更新模版 DTO */
export interface UpdateTemplateDto {
  name?: string
  category?: TemplateCategoryType
  previewUrl?: string
  layoutType?: LayoutType
  description?: string
}

/** 模版筛选条件 */
export interface TemplateFilters {
  type?: TemplateCategory
  category?: TemplateCategoryType
  status?: 0 | 1
  search?: string
}
