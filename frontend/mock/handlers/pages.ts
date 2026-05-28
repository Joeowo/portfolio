import { http, HttpResponse, delay } from 'msw'
import { mockPages } from '../data/pages'
import { getTemplateById } from '../data/templates'
import { getWorkById } from '../data/works'

// In-memory storage for mutations
const pages = [...mockPages]
let nextPageId = 100

export const pagesHandlers = [
  // POST /api/pages/generate
  http.post('/api/pages/generate', async ({ request }) => {
    await delay(1000)

    const body = (await request.json()) as Record<string, unknown>
    const { workId, templateId, userId, title, description, seoTitle, seoDescription, customSlug } =
      body

    // Get work and template
    const work = getWorkById(workId)
    const template = getTemplateById(templateId)

    if (!work) {
      return HttpResponse.json({ code: 404, msg: '作品不存在', data: null }, { status: 404 })
    }

    if (!template) {
      return HttpResponse.json({ code: 404, msg: '模版不存在', data: null }, { status: 404 })
    }

    // Create new page
    const newPage = {
      id: nextPageId++,
      userId,
      workId,
      templateId,
      customSlug,
      title: title || work.title,
      description: description || work.description,
      seoTitle,
      seoDescription,
      status: 'draft' as const,
      viewCount: 0,
      previewUrl: template.previewUrl,
      publishedUrl: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    pages.push(newPage)

    return HttpResponse.json({
      code: 200,
      msg: '生成成功',
      data: newPage
    })
  }),

  // GET /api/pages
  http.get('/api/pages', async ({ request }) => {
    await delay(200)

    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const status = url.searchParams.get('status')
    const keyword = url.searchParams.get('keyword')

    let filteredPages = [...pages]

    if (userId) {
      filteredPages = filteredPages.filter(p => p.userId === parseInt(userId))
    }

    if (status) {
      filteredPages = filteredPages.filter(p => p.status === status)
    }

    if (keyword) {
      filteredPages = filteredPages.filter(p =>
        p.title.toLowerCase().includes(keyword.toLowerCase())
      )
    }

    // Sort by updated date descending
    filteredPages.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: {
        list: filteredPages,
        total: filteredPages.length
      }
    })
  }),

  // GET /api/pages/:id
  http.get('/api/pages/:id', async ({ params }) => {
    await delay(100)

    const page = pages.find(p => p.id === parseInt(params.id as string))

    if (!page) {
      return HttpResponse.json({ code: 404, msg: '页面不存在', data: null }, { status: 404 })
    }

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: page
    })
  }),

  // PUT /api/pages/:id
  http.put('/api/pages/:id', async ({ params, request }) => {
    await delay(300)

    const index = pages.findIndex(p => p.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json({ code: 404, msg: '页面不存在', data: null }, { status: 404 })
    }

    const updates = (await request.json()) as Record<string, unknown>

    // If page is published, don't allow some fields to change
    if (pages[index].status === 'published') {
      delete updates.templateId
      delete updates.customSlug
    }

    pages[index] = { ...pages[index], ...updates, updatedAt: new Date().toISOString() }

    return HttpResponse.json({
      code: 200,
      msg: '更新成功',
      data: pages[index]
    })
  }),

  // POST /api/pages/:id/regenerate
  http.post('/api/pages/:id/regenerate', async ({ params, request }) => {
    await delay(1000)

    const index = pages.findIndex(p => p.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json({ code: 404, msg: '页面不存在', data: null }, { status: 404 })
    }

    const body = (await request.json()) as { templateId: number }
    const template = getTemplateById(body.templateId)

    if (!template) {
      return HttpResponse.json({ code: 404, msg: '模版不存在', data: null }, { status: 404 })
    }

    // Update with new template
    pages[index] = {
      ...pages[index],
      templateId: body.templateId,
      previewUrl: template.previewUrl,
      updatedAt: new Date().toISOString()
    }

    // Reset to draft if was published
    if (pages[index].status === 'published') {
      pages[index].status = 'draft'
      pages[index].publishedUrl = undefined
      ;(pages[index] as { publishedAt?: string }).publishedAt = undefined
    }

    return HttpResponse.json({
      code: 200,
      msg: '重新生成成功',
      data: pages[index]
    })
  }),

  // PUT /api/pages/:id/status
  http.put('/api/pages/:id/status', async ({ params, request }) => {
    await delay(300)

    const index = pages.findIndex(p => p.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json({ code: 404, msg: '页面不存在', data: null }, { status: 404 })
    }

    const body = (await request.json()) as { status: string }

    pages[index] = {
      ...pages[index],
      status: body.status as 'draft' | 'published' | 'offline',
      updatedAt: new Date().toISOString()
    }

    // If publishing, set published URL and date
    if (body.status === 'published' && !pages[index].publishedUrl) {
      const slug = pages[index].customSlug || `page-${pages[index].id}`
      pages[index].publishedUrl = `https://portfolio.demo/p/${slug}`
      ;(pages[index] as { publishedAt?: string }).publishedAt = new Date().toISOString()
    }

    // If unpublishing, clear published data
    if (body.status === 'draft' || body.status === 'offline') {
      pages[index].publishedUrl = undefined
      ;(pages[index] as { publishedAt?: string }).publishedAt = undefined
    }

    return HttpResponse.json({
      code: 200,
      msg: '更新成功',
      data: pages[index]
    })
  }),

  // GET /api/pages/view/:id
  http.get('/api/pages/view/:id', async ({ params }) => {
    await delay(100)

    const page = pages.find(p => p.id === parseInt(params.id as string))

    if (!page) {
      return HttpResponse.json({ code: 404, msg: '页面不存在', data: null }, { status: 404 })
    }

    // Increment view count
    page.viewCount += 1

    // Get work data for the page
    const work = getWorkById(page.workId)

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: {
        page,
        work,
        template: getTemplateById(page.templateId)
      }
    })
  }),

  // DELETE /api/pages/:id
  http.delete('/api/pages/:id', async ({ params }) => {
    await delay(200)

    const index = pages.findIndex(p => p.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json({ code: 404, msg: '页面不存在', data: null }, { status: 404 })
    }

    pages.splice(index, 1)

    return HttpResponse.json({
      code: 200,
      msg: '删除成功',
      data: null
    })
  })
]
