/**
 * Pages API
 * Phase 7: Pages Management Module
 */

import request from '@/shared/utils/request'
import type {
  PublishedPage,
  GeneratePageDto,
  UpdatePageDto,
  UpdatePageStatusDto,
  RegeneratePageDto,
  PageWithWork
} from '../types'

export interface PageListQuery {
  userId?: number
  status?: string
  keyword?: string
  page?: number
  pageSize?: number
}

export interface PageListResponse {
  list: PublishedPage[]
  total: number
}

/**
 * Generate a new page from work
 */
export const generatePageApi = async (data: GeneratePageDto): Promise<PublishedPage> => {
  return await request.post<PublishedPage>('/api/pages/generate', data)
}

/**
 * Get pages list with filters
 */
export const getPagesApi = async (query: PageListQuery = {}): Promise<PageListResponse> => {
  const params = new URLSearchParams()

  if (query.userId) params.append('userId', query.userId.toString())
  if (query.status) params.append('status', query.status)
  if (query.keyword) params.append('keyword', query.keyword)
  if (query.page) params.append('page', query.page.toString())
  if (query.pageSize) params.append('pageSize', query.pageSize.toString())

  const url = params.toString() ? `/api/pages?${params}` : '/api/pages'
  return await request.get<PageListResponse>(url)
}

/**
 * Get page by ID
 */
export const getPageApi = async (id: number): Promise<PublishedPage> => {
  return await request.get<PublishedPage>(`/api/pages/${id}`)
}

/**
 * Update page
 */
export const updatePageApi = async (id: number, data: UpdatePageDto): Promise<PublishedPage> => {
  return await request.put<PublishedPage>(`/api/pages/${id}`, data)
}

/**
 * Regenerate page with new template
 */
export const regeneratePageApi = async (
  id: number,
  data: RegeneratePageDto
): Promise<PublishedPage> => {
  return await request.post<PublishedPage>(`/api/pages/${id}/regenerate`, data)
}

/**
 * Update page status
 */
export const updatePageStatusApi = async (
  id: number,
  data: UpdatePageStatusDto
): Promise<PublishedPage> => {
  return await request.put<PublishedPage>(`/api/pages/${id}/status`, data)
}

/**
 * View page (increments view count)
 */
export const viewPageApi = async (id: number): Promise<PageWithWork> => {
  return await request.get<PageWithWork>(`/api/pages/view/${id}`)
}

/**
 * Delete page
 */
export const deletePageApi = async (id: number): Promise<void> => {
  await request.delete(`/api/pages/${id}`)
}
