import { http, HttpResponse, delay } from 'msw'
import { mockWorks, getWorkVersions } from '../data/works'
import type { Work } from '@/features/studio/works/types'

// In-memory storage for mutations
const works = [...mockWorks]
let nextWorkId = 100

export const worksHandlers = [
  // GET /api/works
  http.get('/api/works', async ({ request }) => {
    await delay(200)

    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const visibility = url.searchParams.get('visibility')
    const keyword = url.searchParams.get('keyword')

    let filteredWorks = [...works]

    if (userId) {
      filteredWorks = filteredWorks.filter(w => w.userId === parseInt(userId))
    }

    if (visibility) {
      filteredWorks = filteredWorks.filter(w => w.visibility === (visibility === 'public' ? 1 : 0))
    }

    if (keyword) {
      filteredWorks = filteredWorks.filter(
        w =>
          w.title.toLowerCase().includes(keyword.toLowerCase()) ||
          (w.description && w.description.toLowerCase().includes(keyword.toLowerCase()))
      )
    }

    // Sort by updated date descending
    filteredWorks.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: {
        list: filteredWorks,
        total: filteredWorks.length
      }
    })
  }),

  // GET /api/works/:id
  http.get('/api/works/:id', async ({ params }) => {
    await delay(100)

    const work = works.find(w => w.id === parseInt(params.id as string))

    if (!work) {
      return HttpResponse.json({ code: 404, msg: '作品不存在', data: null }, { status: 404 })
    }

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: work
    })
  }),

  // POST /api/works
  http.post('/api/works', async ({ request }) => {
    await delay(400)

    const body = (await request.json()) as any
    const { title, description, userId } = body

    const newWork: Work = {
      id: nextWorkId++,
      userId,
      title,
      description,
      coverUrl: undefined,
      sections: [],
      version: 1,
      visibility: 0,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    works.push(newWork)

    return HttpResponse.json({
      code: 200,
      msg: '创建成功',
      data: newWork
    })
  }),

  // PUT /api/works/:id
  http.put('/api/works/:id', async ({ params, request }) => {
    await delay(300)

    const index = works.findIndex(w => w.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json({ code: 404, msg: '作品不存在', data: null }, { status: 404 })
    }

    const updates = (await request.json()) as any

    // Increment version if sections changed
    const shouldIncrementVersion =
      updates.sections && JSON.stringify(updates.sections) !== JSON.stringify(works[index].sections)

    works[index] = {
      ...works[index],
      ...updates,
      version: shouldIncrementVersion ? works[index].version + 1 : works[index].version,
      updatedAt: new Date().toISOString()
    }

    return HttpResponse.json({
      code: 200,
      msg: '更新成功',
      data: works[index]
    })
  }),

  // DELETE /api/works/:id
  http.delete('/api/works/:id', async ({ params }) => {
    await delay(200)

    const index = works.findIndex(w => w.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json({ code: 404, msg: '作品不存在', data: null }, { status: 404 })
    }

    works.splice(index, 1)

    return HttpResponse.json({
      code: 200,
      msg: '删除成功',
      data: null
    })
  }),

  // POST /api/works/:id/duplicate
  http.post('/api/works/:id/duplicate', async ({ params }) => {
    await delay(400)

    const originalWork = works.find(w => w.id === parseInt(params.id as string))

    if (!originalWork) {
      return HttpResponse.json({ code: 404, msg: '作品不存在', data: null }, { status: 404 })
    }

    const duplicatedWork = {
      ...originalWork,
      id: nextWorkId++,
      title: `${originalWork.title} (副本)`,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    works.push(duplicatedWork)

    return HttpResponse.json({
      code: 200,
      msg: '复制成功',
      data: duplicatedWork
    })
  }),

  // GET /api/works/:id/versions
  http.get('/api/works/:id/versions', async ({ params }) => {
    await delay(200)

    const workId = parseInt(params.id as string)
    const versions = getWorkVersions(workId)

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: {
        list: versions,
        total: versions.length
      }
    })
  }),

  // POST /api/works/:id/versions/:ver/rollback
  http.post('/api/works/:id/versions/:ver/rollback', async ({ params }) => {
    await delay(600)

    const workId = parseInt(params.id as string)
    const targetVersion = parseInt(params.ver as string)

    const index = works.findIndex(w => w.id === workId)

    if (index === -1) {
      return HttpResponse.json({ code: 404, msg: '作品不存在', data: null }, { status: 404 })
    }

    // Get version history
    const versions = getWorkVersions(workId)
    const targetVersionData = versions.find(v => v.version === targetVersion)

    if (!targetVersionData) {
      return HttpResponse.json({ code: 404, msg: '版本不存在', data: null }, { status: 404 })
    }

    // Parse version data
    const versionData = JSON.parse(targetVersionData.data)

    // Rollback to target version
    works[index] = {
      ...works[index],
      title: targetVersionData.title,
      description: targetVersionData.description,
      sections: versionData.sections || works[index].sections,
      version: works[index].version + 1, // Increment version on rollback
      updatedAt: new Date().toISOString()
    }

    return HttpResponse.json({
      code: 200,
      msg: '回滚成功',
      data: works[index]
    })
  }),

  // PUT /api/works/:id/visibility
  http.put('/api/works/:id/visibility', async ({ params, request }) => {
    await delay(300)

    const index = works.findIndex(w => w.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json({ code: 404, msg: '作品不存在', data: null }, { status: 404 })
    }

    const body = (await request.json()) as { visibility: string }
    works[index] = {
      ...works[index],
      visibility: body.visibility === 'public' ? 1 : 0,
      updatedAt: new Date().toISOString()
    }

    return HttpResponse.json({
      code: 200,
      msg: '更新成功',
      data: works[index]
    })
  })
]
