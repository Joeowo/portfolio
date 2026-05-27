/**
 * Assets API
 * Handles all asset-related API calls
 */

import request from '@/shared/utils/request'
import type { Asset, Folder, AssetListResponse } from '../types/Asset'

export interface UploadAssetDto {
  file: File
  folderId?: number | null
  userId: number
}

export interface CreateTextAssetDto {
  content: string
  name: string
  folderId?: number | null
  userId: number
}

export interface UpdateAssetDto {
  name?: string
  tags?: string
  folderId?: number | null
}

export interface CreateFolderDto {
  name: string
  userId: number
  parentId?: number | null
}

export interface UpdateFolderDto {
  name?: string
  parentId?: number | null
}

export interface MoveAssetDto {
  folderId?: number | null
}

export interface AssetsQueryParams {
  folderId?: number | null
  userId?: number
  type?: string
  keyword?: string
}

/**
 * Assets API
 */
export const assetsApi = {
  /**
   * Upload a file asset
   */
  upload: async (data: UploadAssetDto): Promise<Asset> => {
    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('userId', data.userId.toString())
    if (data.folderId !== undefined) {
      formData.append('folderId', data.folderId === null ? 'null' : data.folderId.toString())
    }

    return request.post<Asset>('/assets/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  /**
   * Create a text asset
   */
  createText: async (data: CreateTextAssetDto): Promise<Asset> => {
    return request.post<Asset>('/assets/text', data)
  },

  /**
   * Get assets list with filters
   */
  list: async (params: AssetsQueryParams = {}): Promise<AssetListResponse> => {
    const queryParams: Record<string, string> = {}
    if (params.folderId !== undefined) {
      queryParams.folderId = params.folderId === null ? 'null' : params.folderId.toString()
    }
    if (params.userId !== undefined) {
      queryParams.userId = params.userId.toString()
    }
    if (params.type) {
      queryParams.type = params.type
    }
    if (params.keyword) {
      queryParams.keyword = params.keyword
    }

    return request.get<AssetListResponse>('/assets', { params: queryParams })
  },

  /**
   * Get asset by ID
   */
  getById: async (id: number): Promise<Asset> => {
    return request.get<Asset>(`/assets/${id}`)
  },

  /**
   * Update asset
   */
  update: async (id: number, data: UpdateAssetDto): Promise<Asset> => {
    return request.put<Asset>(`/assets/${id}`, data)
  },

  /**
   * Delete asset
   */
  delete: async (id: number): Promise<void> => {
    await request.delete(`/assets/${id}`)
  },

  /**
   * Move asset to folder
   */
  move: async (id: number, data: MoveAssetDto): Promise<Asset> => {
    return request.put<Asset>(`/assets/${id}/move`, data)
  }
}

/**
 * Folders API
 */
export const foldersApi = {
  /**
   * Get folders list
   */
  list: async (userId?: number): Promise<Folder[]> => {
    const params = userId ? { userId } : {}
    return request.get<Folder[]>('/assets/folders', { params })
  },

  /**
   * Create folder
   */
  create: async (data: CreateFolderDto): Promise<Folder> => {
    return request.post<Folder>('/assets/folders', data)
  },

  /**
   * Update folder
   */
  update: async (id: number, data: UpdateFolderDto): Promise<Folder> => {
    return request.put<Folder>(`/assets/folders/${id}`, data)
  },

  /**
   * Delete folder
   */
  delete: async (id: number): Promise<void> => {
    await request.delete(`/assets/folders/${id}`)
  }
}
