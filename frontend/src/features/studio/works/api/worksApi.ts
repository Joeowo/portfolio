/**
 * Works API 封装
 * Phase 5: 作品编辑器模块 - Task 5.2
 */

import request from '@/shared/utils/request'
import type {
  Work,
  CreateWorkDto,
  UpdateWorkDto,
  Section,
  CreateSectionDto,
  UpdateSectionDto,
  ReorderSectionsDto,
  WorkVersion,
  WorksQueryParams,
  WorksListResponse
} from '../types'

/**
 * 作品 API 基础路径
 */
const BASE_URL = '/works'

/**
 * 获取作品列表
 */
export async function fetchWorksApi(params?: WorksQueryParams): Promise<WorksListResponse> {
  return request.get<WorksListResponse>(BASE_URL, { params })
}

/**
 * 获取作品详情
 */
export async function fetchWorkApi(id: number): Promise<Work> {
  return request.get<Work>(`${BASE_URL}/${id}`)
}

/**
 * 创建作品
 */
export async function createWorkApi(dto: CreateWorkDto): Promise<Work> {
  return request.post<Work>(BASE_URL, dto)
}

/**
 * 更新作品
 */
export async function updateWorkApi(id: number, dto: UpdateWorkDto): Promise<Work> {
  return request.put<Work>(`${BASE_URL}/${id}`, dto)
}

/**
 * 删除作品
 */
export async function deleteWorkApi(id: number): Promise<void> {
  await request.delete(`${BASE_URL}/${id}`)
}

/**
 * 复制作品
 */
export async function duplicateWorkApi(id: number): Promise<Work> {
  return request.post<Work>(`${BASE_URL}/${id}/duplicate`)
}

/**
 * 发布作品
 */
export async function publishWorkApi(id: number): Promise<Work> {
  return request.post<Work>(`${BASE_URL}/${id}/publish`)
}

/**
 * 取消发布作品
 */
export async function unpublishWorkApi(id: number): Promise<Work> {
  return request.post<Work>(`${BASE_URL}/${id}/unpublish`)
}

/**
 * ========== 区块操作 API ========== */

/**
 * 获取作品的所有区块
 */
export async function fetchSectionsApi(workId: number): Promise<Section[]> {
  return request.get<Section[]>(`${BASE_URL}/${workId}/sections`)
}

/**
 * 添加区块
 */
export async function createSectionApi(workId: number, dto: CreateSectionDto): Promise<Section> {
  return request.post<Section>(`${BASE_URL}/${workId}/sections`, dto)
}

/**
 * 更新区块
 */
export async function updateSectionApi(
  workId: number,
  sectionId: number,
  dto: UpdateSectionDto
): Promise<Section> {
  return request.put<Section>(`${BASE_URL}/${workId}/sections/${sectionId}`, dto)
}

/**
 * 删除区块
 */
export async function deleteSectionApi(workId: number, sectionId: number): Promise<void> {
  await request.delete(`${BASE_URL}/${workId}/sections/${sectionId}`)
}

/**
 * 复制区块
 */
export async function duplicateSectionApi(workId: number, sectionId: number): Promise<Section> {
  return request.post<Section>(`${BASE_URL}/${workId}/sections/${sectionId}/duplicate`)
}

/**
 * 重新排序区块
 */
export async function reorderSectionsApi(
  workId: number,
  dto: ReorderSectionsDto
): Promise<Section[]> {
  return request.post<Section[]>(`${BASE_URL}/${workId}/sections/reorder`, dto)
}

/**
 * ========== 版本管理 API ========== */

/**
 * 获取版本历史
 */
export async function fetchVersionsApi(workId: number): Promise<WorkVersion[]> {
  return request.get<WorkVersion[]>(`${BASE_URL}/${workId}/versions`)
}

/**
 * 回滚到指定版本
 */
export async function rollbackVersionApi(workId: number, version: number): Promise<Work> {
  return request.post<Work>(`${BASE_URL}/${workId}/versions/${version}/rollback`)
}

/**
 * 获取版本详情
 */
export async function fetchVersionDetailApi(workId: number, version: number): Promise<WorkVersion> {
  return request.get<WorkVersion>(`${BASE_URL}/${workId}/versions/${version}`)
}
