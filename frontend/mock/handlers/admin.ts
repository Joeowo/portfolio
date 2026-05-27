import { http, HttpResponse, delay } from 'msw'
import { mockPages, getPendingPages } from '../data/pages'
import { mockTemplates, getEnabledTemplates } from '../data/templates'
import { mockUsers } from '../data/users'

export interface AdminStats {
  totalUsers: number
  totalWorks: number
  totalPages: number
  totalViews: number
  pendingPages: number
  activeTemplates: number
  todayViews: number
  weekViews: number
}

export const adminHandlers = [
  // GET /api/admin/dashboard
  http.get('/api/admin/dashboard', async () => {
    await delay(200)

    const stats: AdminStats = {
      totalUsers: mockUsers.length,
      totalWorks: 10,
      totalPages: mockPages.length,
      totalViews: mockPages.reduce((sum, p) => sum + p.viewCount, 0),
      pendingPages: getPendingPages().length,
      activeTemplates: getEnabledTemplates().length,
      todayViews: Math.floor(Math.random() * 100) + 50,
      weekViews: Math.floor(Math.random() * 500) + 200
    }

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: stats
    })
  }),

  // GET /api/admin/pages/review
  http.get('/api/admin/pages/review', async () => {
    await delay(200)

    const pendingPages = getPendingPages()

    const enrichedPages = pendingPages.map(page => ({
      ...page,
      user: mockUsers.find(u => u.id === page.userId),
      createdAt: page.createdAt,
      updatedAt: page.updatedAt
    }))

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: {
        list: enrichedPages,
        total: enrichedPages.length
      }
    })
  }),

  // PUT /api/admin/pages/:id/review
  http.put('/api/admin/pages/:id/review', async ({ request }) => {
    await delay(300)

    const body = await request.json() as { approve: boolean }
    const approve = body.approve

    return HttpResponse.json({
      code: 200,
      msg: approve ? '审核通过' : '审核拒绝',
      data: { id: 0, approved: approve }
    })
  }),

  // PUT /api/admin/pages/:id/offline
  http.put('/api/admin/pages/:id/offline', async () => {
    await delay(200)

    return HttpResponse.json({
      code: 200,
      msg: '已下架',
      data: null
    })
  }),

  // GET /api/admin/templates
  http.get('/api/admin/templates', async () => {
    await delay(100)

    const allTemplates = [...mockTemplates]

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: {
        list: allTemplates,
        total: allTemplates.length
      }
    })
  }),

  // POST /api/admin/templates
  http.post('/api/admin/templates', async ({ request }) => {
    await delay(300)

    const body = await request.json() as any
    const newTemplate = {
      id: Date.now(),
      ...body,
      type: 'system',
      status: 1 as 0 | 1,
      createdAt: new Date().toISOString()
    }

    return HttpResponse.json({
      code: 200,
      msg: '创建成功',
      data: newTemplate
    })
  }),

  // PUT /api/admin/templates/:id
  http.put('/api/admin/templates/:id', async ({ request }) => {
    await delay(300)

    const updates = await request.json() as any

    return HttpResponse.json({
      code: 200,
      msg: '更新成功',
      data: { id: 0, ...updates }
    })
  }),

  // DELETE /api/admin/templates/:id
  http.delete('/api/admin/templates/:id', async () => {
    await delay(200)

    return HttpResponse.json({
      code: 200,
      msg: '删除成功',
      data: null
    })
  }),

  // PUT /api/admin/templates/:id/status
  http.put('/api/admin/templates/:id/status', async ({ request }) => {
    await delay(200)

    const body = await request.json() as { status: boolean }
    const status = body.status

    return HttpResponse.json({
      code: 200,
      msg: '更新成功',
      data: { id: 0, status: status ? 1 : 0 }
    })
  }),

  // GET /api/admin/users
  http.get('/api/admin/users', async () => {
    await delay(100)

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: {
        list: mockUsers,
        total: mockUsers.length
      }
    })
  }),

  // PUT /api/admin/users/:id/role
  http.put('/api/admin/users/:id/role', async ({ request }) => {
    await delay(200)

    const body = await request.json() as { role: string }
    const role = body.role

    return HttpResponse.json({
      code: 200,
      msg: '更新成功',
      data: { id: 0, role }
    })
  }),

  // GET /api/admin/stats/views
  http.get('/api/admin/stats/views', async () => {
    await delay(100)

    const stats = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return {
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 200) + 50
      }
    })

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: stats
    })
  }),

  // GET /api/admin/stats/pages
  http.get('/api/admin/stats/pages', async () => {
    await delay(100)

    const stats = [
      { status: 'published', count: mockPages.filter(p => p.status === 'published').length },
      { status: 'pending', count: mockPages.filter(p => p.status === 'pending').length },
      { status: 'draft', count: mockPages.filter(p => p.status === 'draft').length },
      { status: 'offline', count: mockPages.filter(p => p.status === 'offline').length }
    ]

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: stats
    })
  })
]
