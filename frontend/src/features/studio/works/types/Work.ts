/**
 * 作品类型定义
 * Phase 5: 作品编辑器模块
 */

/**
 * 区块类型枚举
 */
export enum SectionType {
  TEXT_BLOCK = 'text_block',
  IMAGE_GALLERY = 'image_gallery',
  VIDEO_PLAYER = 'video_player',
  QUOTE = 'quote'
}

/**
 * 区块内容接口
 */
export interface SectionContent {
  text_block?: {
    content: string
    html?: string
  }
  image_gallery?: {
    images: GalleryImage[]
    layout?: 'grid' | 'masonry'
  }
  video_player?: {
    videoId: number
    title?: string
    thumbnail?: string
  }
  quote?: {
    content: string
    author?: string
  }
}

/**
 * 画廊图片
 */
export interface GalleryImage {
  id: number
  url: string
  thumbnail?: string
  alt?: string
  caption?: string
}

/**
 * 区块接口
 */
export interface Section {
  id: number
  type: SectionType
  order: number
  content: SectionContent
  createdAt: string
  updatedAt: string
}

/**
 * 可见性枚举
 */
export enum Visibility {
  PRIVATE = 0,
  PUBLIC = 1
}

/**
 * 作品接口
 */
export interface Work {
  id: number
  userId: number
  title: string
  description?: string
  coverUrl?: string
  sections: Section[]
  version: number
  visibility: Visibility
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

/**
 * 作品版本历史
 */
export interface WorkVersion {
  id: number
  workId: number
  version: number
  title: string
  description?: string
  data: string // JSON stringified work data
  createdAt: string
}

/**
 * 创建作品 DTO
 */
export interface CreateWorkDto {
  title: string
  description?: string
  coverUrl?: string
  visibility?: Visibility
}

/**
 * 更新作品 DTO
 */
export interface UpdateWorkDto {
  title?: string
  description?: string
  coverUrl?: string
  visibility?: Visibility
  status?: 'draft' | 'published'
}

/**
 * 区块操作 DTO
 */
export interface CreateSectionDto {
  type: SectionType
  content: SectionContent
}

export interface UpdateSectionDto {
  content: SectionContent
}

export interface ReorderSectionsDto {
  sectionIds: number[]
}

/**
 * 作品筛选参数
 */
export interface WorksQueryParams {
  status?: 'draft' | 'published' | 'all'
  visibility?: Visibility
  search?: string
  page?: number
  pageSize?: number
  sortBy?: 'createdAt' | 'updatedAt' | 'title'
  sortOrder?: 'asc' | 'desc'
}

/**
 * 作品列表响应
 */
export interface WorksListResponse {
  list: Work[]
  total: number
  page: number
  pageSize: number
}

/**
 * 保存状态
 */
export type SaveStatus = 'saved' | 'unsaved' | 'saving'
