export type PageStatus = 'draft' | 'pending' | 'published' | 'offline'

export interface PublishedPage {
  id: number
  userId: number
  workId: number
  templateId: number
  customSlug?: string
  title: string
  description?: string
  seoTitle?: string
  seoDescription?: string
  status: PageStatus
  viewCount: number
  previewUrl: string
  publishedUrl?: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export const mockPages: PublishedPage[] = [
  {
    id: 1,
    userId: 1,
    workId: 1,
    templateId: 1,
    customSlug: 'portfolio-2024',
    title: '2024 个人作品集',
    description: '这是我 2024 年的设计作品集',
    seoTitle: 'Jane Designer - 2024 个人作品集',
    seoDescription: '浏览 Jane Designer 在 2024 年完成的 Web 和移动应用设计项目。',
    status: 'published',
    viewCount: 1523,
    previewUrl: 'https://picsum.photos/seed/page1/800/600',
    publishedUrl: 'https://portfolio.demo/p/portfolio-2024',
    createdAt: '2024-05-20T10:00:00Z',
    updatedAt: '2024-05-20T10:00:00Z',
    publishedAt: '2024-05-20T10:05:00Z'
  },
  {
    id: 2,
    userId: 1,
    workId: 2,
    templateId: 2,
    customSlug: 'mobile-app-ui',
    title: '移动应用 UI 设计',
    description: '社交应用的完整 UI 设计系统',
    seoTitle: '移动应用 UI 设计 - 社交应用',
    seoDescription: '查看社交应用的完整 UI 设计系统，包含登录、首页、消息等页面。',
    status: 'published',
    viewCount: 892,
    previewUrl: 'https://picsum.photos/seed/page2/800/600',
    publishedUrl: 'https://portfolio.demo/p/mobile-app-ui',
    createdAt: '2024-05-18T14:30:00Z',
    updatedAt: '2024-05-18T14:30:00Z',
    publishedAt: '2024-05-18T14:35:00Z'
  },
  {
    id: 3,
    userId: 1,
    workId: 3,
    templateId: 3,
    title: '品牌视觉识别系统',
    description: '完整的品牌 VI 设计',
    seoTitle: '品牌视觉识别系统设计',
    seoDescription: '科技公司品牌 VI 设计，包含 logo、配色、字体等。',
    status: 'published',
    viewCount: 654,
    previewUrl: 'https://picsum.photos/seed/page3/800/600',
    publishedUrl: 'https://portfolio.demo/p/brand-identity',
    createdAt: '2024-05-15T09:00:00Z',
    updatedAt: '2024-05-15T09:00:00Z',
    publishedAt: '2024-05-15T09:10:00Z'
  },
  {
    id: 4,
    userId: 1,
    workId: 4,
    templateId: 4,
    title: '摄影作品集',
    description: '精选风景和人像摄影',
    status: 'published',
    viewCount: 1205,
    previewUrl: 'https://picsum.photos/seed/page4/800/600',
    publishedUrl: 'https://portfolio.demo/p/photography',
    createdAt: '2024-05-10T11:00:00Z',
    updatedAt: '2024-05-10T11:00:00Z',
    publishedAt: '2024-05-10T11:15:00Z'
  },
  {
    id: 5,
    userId: 2,
    workId: 5,
    templateId: 5,
    title: '后台管理系统界面',
    description: '企业级后台管理系统的 UI 设计',
    status: 'published',
    viewCount: 342,
    previewUrl: 'https://picsum.photos/seed/page5/800/600',
    publishedUrl: 'https://portfolio.demo/p/admin-dashboard',
    createdAt: '2024-05-08T10:00:00Z',
    updatedAt: '2024-05-08T10:00:00Z',
    publishedAt: '2024-05-08T10:20:00Z'
  },
  {
    id: 6,
    userId: 1,
    workId: 8,
    templateId: 6,
    title: '电商网站设计',
    description: '现代简约风格的电商平台',
    status: 'pending',
    viewCount: 0,
    previewUrl: 'https://picsum.photos/seed/page6/800/600',
    createdAt: '2024-05-22T14:00:00Z',
    updatedAt: '2024-05-22T14:00:00Z'
  },
  {
    id: 7,
    userId: 3,
    workId: 6,
    templateId: 1,
    title: 'Jane 的设计项目',
    description: 'UI/UX 设计项目展示',
    status: 'published',
    viewCount: 567,
    previewUrl: 'https://picsum.photos/seed/page7/800/600',
    publishedUrl: 'https://portfolio.demo/p/jane-design',
    createdAt: '2024-05-12T16:00:00Z',
    updatedAt: '2024-05-15T11:00:00Z',
    publishedAt: '2024-05-12T16:30:00Z'
  },
  {
    id: 8,
    userId: 1,
    workId: 9,
    templateId: 1,
    title: '抽象艺术作品',
    description: '探索形式与色彩的抽象艺术',
    status: 'draft',
    viewCount: 0,
    previewUrl: 'https://picsum.photos/seed/page8/800/600',
    createdAt: '2024-05-23T09:00:00Z',
    updatedAt: '2024-05-23T09:00:00Z'
  },
  {
    id: 9,
    userId: 1,
    workId: 10,
    templateId: 2,
    title: '街头摄影系列',
    description: '记录城市生活的街头摄影',
    status: 'published',
    viewCount: 234,
    previewUrl: 'https://picsum.photos/seed/page9/800/600',
    publishedUrl: 'https://portfolio.demo/p/street-photo',
    createdAt: '2024-05-20T11:00:00Z',
    updatedAt: '2024-05-20T11:00:00Z',
    publishedAt: '2024-05-20T11:30:00Z'
  },
  {
    id: 10,
    userId: 4,
    workId: 7,
    templateId: 4,
    title: '自然风光摄影',
    description: '专注于自然风光的摄影系列',
    status: 'offline',
    viewCount: 89,
    previewUrl: 'https://picsum.photos/seed/page10/800/600',
    createdAt: '2024-05-05T15:00:00Z',
    updatedAt: '2024-05-18T10:00:00Z',
    publishedAt: '2024-05-05T15:30:00Z'
  }
]

export const getPageById = (id: number): PublishedPage | undefined => {
  return mockPages.find(page => page.id === id)
}

export const getPagesByUserId = (userId: number): PublishedPage[] => {
  return mockPages.filter(page => page.userId === userId)
}

export const getPagesByStatus = (status: PageStatus): PublishedPage[] => {
  return mockPages.filter(page => page.status === status)
}

export const getPagesByWorkId = (workId: number): PublishedPage[] => {
  return mockPages.filter(page => page.workId === workId)
}

export const getPublishedPages = (): PublishedPage[] => {
  return mockPages.filter(page => page.status === 'published')
}

export const getPendingPages = (): PublishedPage[] => {
  return mockPages.filter(page => page.status === 'pending')
}
