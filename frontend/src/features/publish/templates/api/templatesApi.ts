/**
 * Templates API
 * 模版相关 API 调用
 */

import request from '@/shared/utils/request'
import type {
  Template,
  CreateTemplateDto,
  UpdateTemplateDto,
  TemplateFilters
} from '../types/Template'

interface TemplateListResponse {
  list: Template[]
  total: number
}

/** 模版 API */
export const templatesApi = {
  /** 获取模版列表 */
  getTemplates(filters?: TemplateFilters): Promise<TemplateListResponse> {
    const params = new URLSearchParams()
    if (filters?.type) params.append('type', filters.type)
    if (filters?.category) params.append('category', filters.category)
    if (filters?.status !== undefined) params.append('status', String(filters.status))

    const queryString = params.toString()
    const url = queryString ? `/templates?${queryString}` : '/templates'

    return request.get<TemplateListResponse>(url)
  },

  /** 获取模版详情 */
  getTemplateById(id: number): Promise<Template> {
    return request.get<Template>(`/templates/${id}`)
  },

  /** 创建模版 */
  createTemplate(data: CreateTemplateDto): Promise<Template> {
    return request.post<Template>('/templates', data)
  },

  /** 更新模版 */
  updateTemplate(id: number, data: UpdateTemplateDto): Promise<Template> {
    return request.put<Template>(`/templates/${id}`, data)
  },

  /** 删除模版 */
  deleteTemplate(id: number): Promise<void> {
    return request.delete<void>(`/templates/${id}`)
  },

  /** 更新模版状态 */
  updateTemplateStatus(id: number, status: boolean): Promise<Template> {
    return request.put<Template>(`/templates/${id}/status`, { status })
  }
}
