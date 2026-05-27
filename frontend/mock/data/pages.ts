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

// 辅助函数：生成图片URL
const getImageUrl = (seed: string, width: number = 800, height: number = 600): string => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}

// 基于 works 数据生成的 pages 数据
export const mockPages: PublishedPage[] = [
  // Work 1: 2024 个人作品集 -> 已发布页面
  {
    id: 1,
    userId: 1,
    workId: 1,
    templateId: 1,
    customSlug: 'portfolio-2024',
    title: '2024 个人作品集',
    description: '这是我 2024 年的设计作品集，包含了多个 Web 和移动应用项目。',
    seoTitle: 'Jane Designer - 2024 个人作品集 | UI/UX 设计师',
    seoDescription: '浏览 Jane Designer 在 2024 年完成的 Web 和移动应用设计项目。专注于简洁易用的数字产品设计。',
    status: 'published' as PageStatus,
    viewCount: 1523,
    previewUrl: getImageUrl('page-preview-1'),
    publishedUrl: 'https://portfolio.demo/p/portfolio-2024',
    createdAt: '2024-05-20T10:00:00Z',
    updatedAt: '2024-05-20T10:00:00Z',
    publishedAt: '2024-05-20T10:05:00Z'
  },
  // Work 2: 移动应用 UI 设计 -> 已发布页面
  {
    id: 2,
    userId: 1,
    workId: 2,
    templateId: 2,
    customSlug: 'mobile-app-ui',
    title: '移动应用 UI 设计',
    description: '一个社交应用的完整 UI 设计系统，包含组件库、设计规范和交互原型。',
    seoTitle: '移动应用 UI 设计系统 - 社交应用完整设计方案',
    seoDescription: '查看社交应用的完整 UI 设计系统，包含登录、首页、消息等页面设计。',
    status: 'published' as PageStatus,
    viewCount: 892,
    previewUrl: getImageUrl('page-preview-2'),
    publishedUrl: 'https://portfolio.demo/p/mobile-app-ui',
    createdAt: '2024-05-18T14:30:00Z',
    updatedAt: '2024-05-18T14:30:00Z',
    publishedAt: '2024-05-18T14:35:00Z'
  },
  // Work 3: 品牌视觉识别系统 -> 已发布页面
  {
    id: 3,
    userId: 1,
    workId: 3,
    templateId: 3,
    customSlug: 'brand-identity',
    title: '品牌视觉识别系统',
    description: '完整的品牌 VI 设计，包含 logo、配色、字体、应用规范等。',
    seoTitle: '品牌视觉识别系统设计 - 科技公司品牌 VI 案例',
    seoDescription: '科技公司品牌 VI 设计，包含 logo、色彩系统、字体规范和应用指南。',
    status: 'published' as PageStatus,
    viewCount: 654,
    previewUrl: getImageUrl('page-preview-3'),
    publishedUrl: 'https://portfolio.demo/p/brand-identity',
    createdAt: '2024-05-15T09:00:00Z',
    updatedAt: '2024-05-15T09:00:00Z',
    publishedAt: '2024-05-15T09:10:00Z'
  },
  // Work 4: 摄影作品集 -> 已发布页面
  {
    id: 4,
    userId: 1,
    workId: 4,
    templateId: 1,
    customSlug: 'photography-portfolio',
    title: '摄影作品集',
    description: '精选风景和人像摄影作品，记录生活中的美好瞬间。',
    seoTitle: '摄影作品集 - 风景与人文摄影展示',
    seoDescription: '精选风景和人像摄影作品，用镜头记录生活中的美好瞬间。',
    status: 'published' as PageStatus,
    viewCount: 1205,
    previewUrl: getImageUrl('page-preview-4'),
    publishedUrl: 'https://portfolio.demo/p/photography-portfolio',
    createdAt: '2024-05-10T11:00:00Z',
    updatedAt: '2024-05-10T11:00:00Z',
    publishedAt: '2024-05-10T11:15:00Z'
  },
  // Work 5: 后台管理系统界面 -> 已发布页面 (用户 2)
  {
    id: 5,
    userId: 2,
    workId: 5,
    templateId: 2,
    customSlug: 'admin-dashboard-ui',
    title: '后台管理系统界面',
    description: '企业级后台管理系统的 UI 设计，注重数据可视化与操作效率。',
    seoTitle: '后台管理系统 UI 设计 - 企业级数据可视化界面',
    seoDescription: '企业级后台管理系统的 UI 设计，重点优化数据展示、报表生成和批量操作功能。',
    status: 'published' as PageStatus,
    viewCount: 342,
    previewUrl: getImageUrl('page-preview-5'),
    publishedUrl: 'https://portfolio.demo/p/admin-dashboard-ui',
    createdAt: '2024-05-08T10:00:00Z',
    updatedAt: '2024-05-08T10:00:00Z',
    publishedAt: '2024-05-08T10:20:00Z'
  },
  // Work 6: Jane 的设计项目 -> 已发布页面 (用户 3)
  {
    id: 6,
    userId: 3,
    workId: 6,
    templateId: 1,
    customSlug: 'jane-design-projects',
    title: 'Jane 的设计项目',
    description: 'UI/UX 设计师 Jane 的个人项目展示，专注移动端体验设计。',
    seoTitle: 'Jane 设计项目 - UI/UX 设计师作品展示',
    seoDescription: 'UI/UX 设计师 Jane 的个人项目展示，专注移动端体验设计。',
    status: 'published' as PageStatus,
    viewCount: 567,
    previewUrl: getImageUrl('page-preview-6'),
    publishedUrl: 'https://portfolio.demo/p/jane-design-projects',
    createdAt: '2024-05-12T16:00:00Z',
    updatedAt: '2024-05-15T11:00:00Z',
    publishedAt: '2024-05-12T16:30:00Z'
  },
  // Work 8: 电商网站设计 -> 草稿状态 (待发布)
  {
    id: 7,
    userId: 1,
    workId: 8,
    templateId: 2,
    customSlug: 'ecommerce-website',
    title: '电商网站设计',
    description: '现代简约风格的电商平台界面设计，提升购物体验和转化率。',
    seoTitle: '电商网站设计 - 现代简约风格电商平台',
    seoDescription: '为时尚品牌设计的电商平台，注重用户体验和转化率优化。',
    status: 'draft' as PageStatus,
    viewCount: 0,
    previewUrl: getImageUrl('page-preview-7'),
    createdAt: '2024-05-22T14:00:00Z',
    updatedAt: '2024-05-22T14:00:00Z'
  },
  // Work 9: 抽象艺术作品 -> 草稿状态 (待发布)
  {
    id: 8,
    userId: 1,
    workId: 9,
    templateId: 3,
    customSlug: 'abstract-art-works',
    title: '抽象艺术作品',
    description: '探索形式与色彩的抽象艺术创作，每件作品都是一次实验。',
    seoTitle: '抽象艺术作品 - 探索形式与色彩的艺术创作',
    seoDescription: '抽象艺术作品集，探索形式与色彩的艺术创作实验。',
    status: 'draft' as PageStatus,
    viewCount: 0,
    previewUrl: getImageUrl('page-preview-8'),
    createdAt: '2024-05-23T09:00:00Z',
    updatedAt: '2024-05-23T09:00:00Z'
  },
  // Work 10: 街头摄影系列 -> 已发布页面
  {
    id: 9,
    userId: 1,
    workId: 10,
    templateId: 1,
    customSlug: 'street-photography',
    title: '街头摄影系列',
    description: '记录城市生活的街头摄影作品，捕捉平凡中的不凡。',
    seoTitle: '街头摄影系列 - 城市生活记录',
    seoDescription: '街头摄影作品集，记录城市生活的真实瞬间，捕捉平凡中的不凡。',
    status: 'published' as PageStatus,
    viewCount: 234,
    previewUrl: getImageUrl('page-preview-9'),
    publishedUrl: 'https://portfolio.demo/p/street-photography',
    createdAt: '2024-05-20T11:00:00Z',
    updatedAt: '2024-05-20T11:00:00Z',
    publishedAt: '2024-05-20T11:30:00Z'
  },
  // Work 4 用户 4 的版本 -> 已下线页面
  {
    id: 10,
    userId: 4,
    workId: 4,
    templateId: 3,
    customSlug: 'nature-photography-offline',
    title: '自然风光摄影',
    description: '专注于自然风光的摄影系列，探索光影与构图的魅力。',
    seoTitle: '自然风光摄影 - 光影与构图的艺术',
    seoDescription: '专注于自然风光的摄影系列，用镜头记录大自然的美丽瞬间。',
    status: 'offline' as PageStatus,
    viewCount: 89,
    previewUrl: getImageUrl('page-preview-10'),
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
