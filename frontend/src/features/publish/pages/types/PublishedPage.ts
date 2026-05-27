/**
 * PublishedPage Type Definitions
 * Phase 7: Pages Management Module
 */

export type PageStatus = 'draft' | 'pending' | 'published' | 'offline'

export interface PublishedPage {
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
}

export interface GeneratePageDto {
  workId: number
  templateId: number
  title?: string
  description?: string
  seoTitle?: string
  seoDescription?: string
  customSlug?: string
}

export interface UpdatePageDto {
  title?: string
  description?: string
  seoTitle?: string
  seoDescription?: string
  customSlug?: string
}

export interface UpdatePageStatusDto {
  status: PageStatus
}

export interface RegeneratePageDto {
  templateId: number
}

export interface PageWithWork extends PublishedPage {
  workTitle: string
  templateName: string
  templatePreviewUrl: string
}

export interface SeoPreviewData {
  title: string
  description: string
  url: string
}
