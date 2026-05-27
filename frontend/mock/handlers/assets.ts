import { http, HttpResponse, delay } from 'msw'
import { mockAssets, mockFolders } from '../data/assets'

// In-memory storage for mutations
let assets = [...mockAssets]
const folders = [...mockFolders]
let nextAssetId = 100
let nextFolderId = 100

export const assetsHandlers = [
  // === Folders handlers (must come before :id handlers) ===

  // GET /api/assets/folders
  http.get('/api/assets/folders', async ({ request }) => {
    console.log('[MSW Assets] Folders request:', request.url)
    await delay(100)

    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')

    let filteredFolders = [...folders]

    if (userId) {
      filteredFolders = filteredFolders.filter(f => f.userId === parseInt(userId))
    }

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: filteredFolders
    })
  }),

  // POST /api/assets/folders
  http.post('/api/assets/folders', async ({ request }) => {
    await delay(200)

    const body = (await request.json()) as any
    const { name, userId, parentId } = body

    const newFolder = {
      id: nextFolderId++,
      userId,
      name,
      parentId: parentId || null,
      createdAt: new Date().toISOString()
    }

    folders.push(newFolder)

    return HttpResponse.json({
      code: 200,
      msg: '创建成功',
      data: newFolder
    })
  }),

  // PUT /api/assets/folders/:id
  http.put('/api/assets/folders/:id', async ({ params, request }) => {
    await delay(200)

    const index = folders.findIndex(f => f.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json({ code: 404, msg: '文件夹不存在', data: null }, { status: 404 })
    }

    const updates = (await request.json()) as any
    folders[index] = { ...folders[index], ...updates }

    return HttpResponse.json({
      code: 200,
      msg: '更新成功',
      data: folders[index]
    })
  }),

  // DELETE /api/assets/folders/:id
  http.delete('/api/assets/folders/:id', async ({ params }) => {
    await delay(200)

    const index = folders.findIndex(f => f.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json({ code: 404, msg: '文件夹不存在', data: null }, { status: 404 })
    }

    // Also delete assets in this folder
    const folderId = parseInt(params.id as string)
    assets = assets.filter(a => a.folderId !== folderId)

    folders.splice(index, 1)

    return HttpResponse.json({
      code: 200,
      msg: '删除成功',
      data: null
    })
  }),

  // === Assets handlers ===

  // POST /api/assets/upload
  http.post('/api/assets/upload', async ({ request }) => {
    await delay(500)

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folderId = formData.get('folderId') as string | null
    const userId = parseInt(formData.get('userId') as string)

    if (!file) {
      return HttpResponse.json({ code: 400, msg: '未找到文件', data: null }, { status: 400 })
    }

    // Determine asset type
    let assetType: 'image' | 'video' | 'text' = 'image'
    if (file.type.startsWith('video/')) {
      assetType = 'video'
    } else if (file.type.startsWith('text/')) {
      assetType = 'text'
    }

    // Create mock asset
    const newAsset = {
      id: nextAssetId++,
      userId,
      folderId: folderId ? parseInt(folderId) : null,
      name: file.name,
      assetType,
      fileUrl: URL.createObjectURL(file),
      thumbnailUrl: assetType === 'image' ? URL.createObjectURL(file) : undefined,
      fileSize: file.size,
      tags: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    assets.push(newAsset)

    return HttpResponse.json({
      code: 200,
      msg: '上传成功',
      data: newAsset
    })
  }),

  // POST /api/assets/text
  http.post('/api/assets/text', async ({ request }) => {
    await delay(300)

    const body = (await request.json()) as any
    const { content, name, folderId, userId } = body

    const newAsset = {
      id: nextAssetId++,
      userId,
      folderId: folderId || null,
      name: name || 'untitled.txt',
      assetType: 'text' as const,
      fileUrl: `data:text/plain;base64,${btoa(content)}`,
      fileSize: content.length,
      tags: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    assets.push(newAsset)

    return HttpResponse.json({
      code: 200,
      msg: '创建成功',
      data: newAsset
    })
  }),

  // GET /api/assets
  http.get('/api/assets', async ({ request }) => {
    await delay(200)

    const url = new URL(request.url)
    const folderId = url.searchParams.get('folderId')
    const userId = url.searchParams.get('userId')
    const type = url.searchParams.get('type')
    const keyword = url.searchParams.get('keyword')

    let filteredAssets = [...assets]

    if (folderId) {
      filteredAssets = filteredAssets.filter(
        a => a.folderId === (folderId === 'null' ? null : parseInt(folderId))
      )
    }

    if (userId) {
      filteredAssets = filteredAssets.filter(a => a.userId === parseInt(userId))
    }

    if (type) {
      filteredAssets = filteredAssets.filter(a => a.assetType === type)
    }

    if (keyword) {
      filteredAssets = filteredAssets.filter(a =>
        a.name.toLowerCase().includes(keyword.toLowerCase())
      )
    }

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: {
        list: filteredAssets,
        total: filteredAssets.length
      }
    })
  }),

  // GET /api/assets/:id
  http.get('/api/assets/:id', async ({ params }) => {
    await delay(100)

    const asset = assets.find(a => a.id === parseInt(params.id as string))

    if (!asset) {
      return HttpResponse.json({ code: 404, msg: '素材不存在', data: null }, { status: 404 })
    }

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: asset
    })
  }),

  // PUT /api/assets/:id
  http.put('/api/assets/:id', async ({ params, request }) => {
    await delay(300)

    const index = assets.findIndex(a => a.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json({ code: 404, msg: '素材不存在', data: null }, { status: 404 })
    }

    const updates = (await request.json()) as any
    assets[index] = { ...assets[index], ...updates, updatedAt: new Date().toISOString() }

    return HttpResponse.json({
      code: 200,
      msg: '更新成功',
      data: assets[index]
    })
  }),

  // DELETE /api/assets/:id
  http.delete('/api/assets/:id', async ({ params }) => {
    await delay(200)

    const index = assets.findIndex(a => a.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json({ code: 404, msg: '素材不存在', data: null }, { status: 404 })
    }

    assets.splice(index, 1)

    return HttpResponse.json({
      code: 200,
      msg: '删除成功',
      data: null
    })
  }),

  // PUT /api/assets/:id/move
  http.put('/api/assets/:id/move', async ({ params, request }) => {
    await delay(200)

    const index = assets.findIndex(a => a.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json({ code: 404, msg: '素材不存在', data: null }, { status: 404 })
    }

    const body = (await request.json()) as { folderId?: number }
    assets[index] = {
      ...assets[index],
      folderId: body.folderId || null,
      updatedAt: new Date().toISOString()
    }

    return HttpResponse.json({
      code: 200,
      msg: '移动成功',
      data: assets[index]
    })
  })
]
