/**
 * Assets Store
 * Manages asset library state and operations
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { assetsApi, foldersApi } from '../api/assetsApi'
import type { Asset, Folder, FolderTreeNode, AssetFilters, UploadProgress } from '../types/Asset'

export const useAssetsStore = defineStore('assets', () => {
  // State
  const assets = ref<Asset[]>([])
  const folders = ref<Folder[]>([])
  const currentFolderId = ref<number | null>(null)
  const selectedAssetIds = ref<Set<number>>(new Set())
  const filters = ref<AssetFilters>({
    type: '',
    keyword: '',
    folderId: null
  })
  const loading = ref(false)
  const error = ref<string | null>(null)
  const uploadQueue = ref<UploadProgress[]>([])

  // Computed
  const filteredAssets = computed(() => {
    let result = [...assets.value]

    if (filters.value.folderId !== undefined) {
      result = result.filter(a => a.folderId === filters.value.folderId)
    }

    if (filters.value.type) {
      result = result.filter(a => a.assetType === filters.value.type)
    }

    if (filters.value.keyword) {
      const keyword = filters.value.keyword.toLowerCase()
      result = result.filter(
        a => a.name.toLowerCase().includes(keyword) || a.tags?.toLowerCase().includes(keyword)
      )
    }

    return result
  })

  const currentFolder = computed(() => {
    if (currentFolderId.value === null) return null
    return folders.value.find(f => f.id === currentFolderId.value) || null
  })

  const currentFolderName = computed(() => {
    return currentFolder.value?.name || '全部素材'
  })

  const folderTree = computed((): FolderTreeNode[] => {
    const tree: FolderTreeNode[] = []
    const folderMap = new Map<number, FolderTreeNode>()

    // Create map of all folders
    folders.value.forEach(folder => {
      folderMap.set(folder.id, { ...folder, children: [], assetCount: 0 })
    })

    // Count assets per folder
    assets.value.forEach(asset => {
      if (asset.folderId) {
        const node = folderMap.get(asset.folderId)
        if (node) {
          node.assetCount = (node.assetCount || 0) + 1
        }
      }
    })

    // Build tree structure
    folders.value.forEach(folder => {
      const node = folderMap.get(folder.id)!
      if (folder.parentId === null) {
        tree.push(node)
      } else {
        const parent = folderMap.get(folder.parentId)
        if (parent) {
          if (!parent.children) parent.children = []
          parent.children.push(node)
        }
      }
    })

    return tree
  })

  const selectedAssets = computed(() => {
    return assets.value.filter(a => selectedAssetIds.value.has(a.id))
  })

  const isMultiSelect = computed(() => selectedAssetIds.value.size > 1)

  // Actions
  const fetchAssets = async (params?: AssetFilters) => {
    loading.value = true
    error.value = null

    try {
      const userId = 1 // TODO: Get from auth store
      const response = await assetsApi.list({
        userId,
        ...params
      })
      assets.value = response.list
    } catch (err: any) {
      error.value = err.message || '加载素材失败'
      console.error('Failed to fetch assets:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchFolders = async () => {
    try {
      const userId = 1 // TODO: Get from auth store
      folders.value = await foldersApi.list(userId)
    } catch (err: any) {
      error.value = err.message || '加载文件夹失败'
      console.error('Failed to fetch folders:', err)
    }
  }

  const setCurrentFolder = (folderId: number | null) => {
    currentFolderId.value = folderId
    filters.value.folderId = folderId
    fetchAssets({ ...filters.value, folderId })
  }

  const setFilters = (newFilters: Partial<AssetFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const toggleSelectAsset = (assetId: number) => {
    if (selectedAssetIds.value.has(assetId)) {
      selectedAssetIds.value.delete(assetId)
    } else {
      selectedAssetIds.value.add(assetId)
    }
    // Force reactivity
    selectedAssetIds.value = new Set(selectedAssetIds.value)
  }

  const selectAllAssets = () => {
    selectedAssetIds.value = new Set(filteredAssets.value.map(a => a.id))
  }

  const clearSelection = () => {
    selectedAssetIds.value = new Set()
  }

  const uploadFiles = async (files: File[]) => {
    const userId = 1 // TODO: Get from auth store
    const uploadPromises: Promise<Asset>[] = []

    files.forEach(file => {
      // Add to upload queue
      const uploadItem: UploadProgress = {
        file,
        progress: 0,
        status: 'pending'
      }
      uploadQueue.value.push(uploadItem)

      const promise = assetsApi
        .upload({
          file,
          folderId: currentFolderId.value,
          userId
        })
        .then(asset => {
          uploadItem.progress = 100
          uploadItem.status = 'success'
          return asset
        })
        .catch(err => {
          uploadItem.status = 'error'
          uploadItem.error = err.message || '上传失败'
          throw err
        })

      uploadPromises.push(promise)
    })

    try {
      const results = await Promise.all(uploadPromises)
      // Refresh assets list
      await fetchAssets(filters.value)
      return results
    } catch (err) {
      console.error('Upload failed:', err)
      throw err
    }
  }

  const createTextAsset = async (content: string, name: string) => {
    loading.value = true
    error.value = null

    try {
      const userId = 1 // TODO: Get from auth store
      const asset = await assetsApi.createText({
        content,
        name,
        folderId: currentFolderId.value,
        userId
      })
      assets.value.push(asset)
      return asset
    } catch (err: any) {
      error.value = err.message || '创建文本素材失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateAsset = async (
    id: number,
    data: { name?: string; tags?: string; folderId?: number | null }
  ) => {
    loading.value = true
    error.value = null

    try {
      const asset = await assetsApi.update(id, data)
      const index = assets.value.findIndex(a => a.id === id)
      if (index !== -1) {
        assets.value[index] = asset
      }
      return asset
    } catch (err: any) {
      error.value = err.message || '更新素材失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteAsset = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      await assetsApi.delete(id)
      assets.value = assets.value.filter(a => a.id !== id)
      selectedAssetIds.value.delete(id)
      selectedAssetIds.value = new Set(selectedAssetIds.value)
    } catch (err: any) {
      error.value = err.message || '删除素材失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteSelectedAssets = async () => {
    const ids = Array.from(selectedAssetIds.value)
    await Promise.all(ids.map(id => deleteAsset(id)))
  }

  const moveAssets = async (assetIds: number[], folderId: number | null) => {
    loading.value = true
    error.value = null

    try {
      await Promise.all(assetIds.map(id => assetsApi.move(id, { folderId })))

      // Update local state
      assets.value = assets.value.map(asset => {
        if (assetIds.includes(asset.id)) {
          return { ...asset, folderId }
        }
        return asset
      })

      clearSelection()
    } catch (err: any) {
      error.value = err.message || '移动素材失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createFolder = async (name: string, parentId: number | null = null) => {
    loading.value = true
    error.value = null

    try {
      const userId = 1 // TODO: Get from auth store
      const folder = await foldersApi.create({ name, userId, parentId })
      folders.value.push(folder)
      return folder
    } catch (err: any) {
      error.value = err.message || '创建文件夹失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateFolder = async (id: number, name: string) => {
    loading.value = true
    error.value = null

    try {
      const folder = await foldersApi.update(id, { name })
      const index = folders.value.findIndex(f => f.id === id)
      if (index !== -1) {
        folders.value[index] = folder
      }
      return folder
    } catch (err: any) {
      error.value = err.message || '更新文件夹失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteFolder = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      await foldersApi.delete(id)
      folders.value = folders.value.filter(f => f.id !== id)

      // Also remove assets in this folder from local state
      assets.value = assets.value.filter(a => a.folderId !== id)

      if (currentFolderId.value === id) {
        setCurrentFolder(null)
      }
    } catch (err: any) {
      error.value = err.message || '删除文件夹失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  const initialize = async () => {
    await Promise.all([fetchAssets(), fetchFolders()])
  }

  return {
    // State
    assets,
    folders,
    currentFolderId,
    currentFolder,
    currentFolderName,
    selectedAssetIds,
    selectedAssets,
    isMultiSelect,
    filters,
    filteredAssets,
    folderTree,
    loading,
    error,
    uploadQueue,

    // Actions
    initialize,
    fetchAssets,
    fetchFolders,
    setCurrentFolder,
    setFilters,
    toggleSelectAsset,
    selectAllAssets,
    clearSelection,
    uploadFiles,
    createTextAsset,
    updateAsset,
    deleteAsset,
    deleteSelectedAssets,
    moveAssets,
    createFolder,
    updateFolder,
    deleteFolder
  }
})
