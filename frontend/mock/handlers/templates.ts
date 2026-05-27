import { http, HttpResponse, delay } from 'msw'
import { mockTemplates } from '../data/templates'

// In-memory storage for mutations
let templates = [...mockTemplates]
let nextTemplateId = 100

export const templatesHandlers = [
  // GET /api/templates
  http.get('/api/templates', async ({ request }) => {
    await delay(100)

    const url = new URL(request.url)
    const type = url.searchParams.get('type')
    const category = url.searchParams.get('category')
    const status = url.searchParams.get('status')

    let filteredTemplates = [...templates]

    if (type) {
      filteredTemplates = filteredTemplates.filter(t => t.type === type)
    }

    if (category) {
      filteredTemplates = filteredTemplates.filter(t => t.category === category)
    }

    if (status === 'enabled') {
      filteredTemplates = filteredTemplates.filter(t => t.status === 1)
    }

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: {
        list: filteredTemplates,
        total: filteredTemplates.length
      }
    })
  }),

  // GET /api/templates/:id
  http.get('/api/templates/:id', async ({ params }) => {
    await delay(100)

    const template = templates.find(t => t.id === parseInt(params.id as string))

    if (!template) {
      return HttpResponse.json(
        { code: 404, msg: '模版不存在', data: null },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: template
    })
  }),

  // POST /api/templates
  http.post('/api/templates', async ({ request }) => {
    await delay(300)

    const body = await request.json() as any
    const { name, category, previewUrl, layoutType, description } = body

    const newTemplate = {
      id: nextTemplateId++,
      name,
      category,
      type: 'custom' as const,
      previewUrl,
      layoutType: layoutType as any,
      description,
      status: 1 as 0 | 1,
      createdAt: new Date().toISOString()
    }

    templates.push(newTemplate)

    return HttpResponse.json({
      code: 200,
      msg: '创建成功',
      data: newTemplate
    })
  }),

  // PUT /api/templates/:id
  http.put('/api/templates/:id', async ({ params, request }) => {
    await delay(300)

    const index = templates.findIndex(t => t.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, msg: '模版不存在', data: null },
        { status: 404 }
      )
    }

    const updates = await request.json() as any
    templates[index] = { ...templates[index], ...updates }

    return HttpResponse.json({
      code: 200,
      msg: '更新成功',
      data: templates[index]
    })
  }),

  // DELETE /api/templates/:id
  http.delete('/api/templates/:id', async ({ params }) => {
    await delay(200)

    const index = templates.findIndex(t => t.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, msg: '模版不存在', data: null },
        { status: 404 }
      )
    }

    // System templates cannot be deleted
    if (templates[index].type === 'system') {
      return HttpResponse.json(
        { code: 400, msg: '系统模版不能删除', data: null },
        { status: 400 }
      )
    }

    templates.splice(index, 1)

    return HttpResponse.json({
      code: 200,
      msg: '删除成功',
      data: null
    })
  }),

  // PUT /api/templates/:id/status
  http.put('/api/templates/:id/status', async ({ params, request }) => {
    await delay(200)

    const index = templates.findIndex(t => t.id === parseInt(params.id as string))

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, msg: '模版不存在', data: null },
        { status: 404 }
      )
    }

    const body = await request.json() as { status: boolean }
    templates[index] = { ...templates[index], status: body.status ? 1 : 0 }

    return HttpResponse.json({
      code: 200,
      msg: '更新成功',
      data: templates[index]
    })
  })
]
