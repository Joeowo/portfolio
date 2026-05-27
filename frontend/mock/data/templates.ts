export type LayoutType = 'single' | 'grid' | 'two_column' | 'masonry'

export interface Template {
  id: number
  name: string
  category: string
  type: 'system' | 'custom'
  previewUrl: string
  layoutType: LayoutType
  description?: string
  status: 0 | 1 // 0: disabled, 1: enabled
  createdAt: string
}

export const mockTemplates: Template[] = [
  // System templates
  {
    id: 1,
    name: '简约单栏',
    category: 'minimal',
    type: 'system',
    previewUrl: 'https://picsum.photos/seed/tpl1/800/600',
    layoutType: 'single',
    description: '经典的单栏布局，适合内容型作品集。',
    status: 1,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: '网格画廊',
    category: 'gallery',
    type: 'system',
    previewUrl: 'https://picsum.photos/seed/tpl2/800/600',
    layoutType: 'grid',
    description: '等距网格布局，展示大量图片作品。',
    status: 1,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: '双栏图文',
    category: 'editorial',
    type: 'system',
    previewUrl: 'https://picsum.photos/seed/tpl3/800/600',
    layoutType: 'two_column',
    description: '左图右文的双栏布局，适合图文并茂的内容。',
    status: 1,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: '瀑布流',
    category: 'gallery',
    type: 'system',
    previewUrl: 'https://picsum.photos/seed/tpl4/800/600',
    layoutType: 'masonry',
    description: '瀑布流布局，适合不同尺寸的图片展示。',
    status: 1,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: '极简白',
    category: 'minimal',
    type: 'system',
    previewUrl: 'https://picsum.photos/seed/tpl5/800/600',
    layoutType: 'single',
    description: '纯白背景，极简设计的单栏模板。',
    status: 1,
    createdAt: '2024-01-01T00:00:00Z'
  },
  // Custom templates
  {
    id: 6,
    name: '暗黑风格',
    category: 'dark',
    type: 'custom',
    previewUrl: 'https://picsum.photos/seed/tpl6/800/600',
    layoutType: 'single',
    description: '深色主题的单栏布局，突出图片内容。',
    status: 1,
    createdAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 7,
    name: '杂志风格',
    category: 'editorial',
    type: 'custom',
    previewUrl: 'https://picsum.photos/seed/tpl7/800/600',
    layoutType: 'two_column',
    description: '杂志排版风格的双栏布局。',
    status: 1,
    createdAt: '2024-04-01T14:00:00Z'
  },
  {
    id: 8,
    name: '卡片式网格',
    category: 'gallery',
    type: 'custom',
    previewUrl: 'https://picsum.photos/seed/tpl8/800/600',
    layoutType: 'grid',
    description: '带卡片效果的网格布局。',
    status: 1,
    createdAt: '2024-04-15T09:00:00Z'
  },
  {
    id: 9,
    name: '时间轴',
    category: 'blog',
    type: 'system',
    previewUrl: 'https://picsum.photos/seed/tpl9/800/600',
    layoutType: 'single',
    description: '时间轴布局，适合展示创作历程。',
    status: 0,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 10,
    name: '全屏沉浸',
    category: 'immersive',
    type: 'system',
    previewUrl: 'https://picsum.photos/seed/tpl10/800/600',
    layoutType: 'single',
    description: '全屏展示的大图布局。',
    status: 1,
    createdAt: '2024-01-01T00:00:00Z'
  }
]

export const getTemplateById = (id: number): Template | undefined => {
  return mockTemplates.find(tpl => tpl.id === id)
}

export const getTemplatesByType = (type: 'system' | 'custom'): Template[] => {
  return mockTemplates.filter(tpl => tpl.type === type)
}

export const getEnabledTemplates = (): Template[] => {
  return mockTemplates.filter(tpl => tpl.status === 1)
}

export const getTemplatesByCategory = (category: string): Template[] => {
  return mockTemplates.filter(tpl => tpl.category === category)
}

export const templateCategories: string[] = [
  'minimal',
  'gallery',
  'editorial',
  'dark',
  'blog',
  'immersive'
]
