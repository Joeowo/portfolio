/**
 * Asset type definitions
 * Represents a media asset (image, video, or text) in the asset library
 */

export type AssetType = 'image' | 'video' | 'text'

export interface Asset {
  id: number
  userId: number
  folderId: number | null
  name: string
  assetType: AssetType
  fileUrl: string
  thumbnailUrl?: string
  fileSize: number
  width?: number
  height?: number
  duration?: number
  tags?: string
  createdAt: string
  updatedAt: string
}

export interface Folder {
  id: number
  userId: number
  name: string
  parentId: number | null
  createdAt: string
}

export interface FolderTreeNode extends Folder {
  children?: FolderTreeNode[]
  assetCount?: number
}

export interface AssetFilters {
  type?: AssetType | ''
  keyword?: string
  folderId?: number | null
}

export interface AssetListResponse {
  list: Asset[]
  total: number
}

export interface UploadProgress {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}
