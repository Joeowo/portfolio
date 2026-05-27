export type SectionType = 'text_block' | 'image_gallery' | 'video_player' | 'quote'

export interface Section {
  type: SectionType
  order: number
  content: Record<string, any>
}

export interface WorkVersion {
  version: number
  title: string
  description?: string
  sections: Section[]
  createdAt: string
}

export interface Work {
  id: number
  userId: number
  title: string
  description?: string
  coverUrl?: string
  sections: Section[]
  version: number
  visibility: 0 | 1 // 0: private, 1: public
  createdAt: string
  updatedAt: string
}

export const mockWorks: Work[] = [
  {
    id: 1,
    userId: 1,
    title: '2024 个人作品集',
    description: '这是我 2024 年的设计作品集，包含了多个 Web 和移动应用项目。',
    coverUrl: 'https://picsum.photos/seed/work1/800/600',
    sections: [
      {
        type: 'text_block',
        order: 1,
        content: {
          text: '欢迎来到我的个人作品集！这里展示了我在过去一年中的设计项目。'
        }
      },
      {
        type: 'image_gallery',
        order: 2,
        content: {
          images: [
            { assetId: 1, caption: '项目预览图 1' },
            { assetId: 2, caption: '项目预览图 2' },
            { assetId: 4, caption: 'UI 设计稿' }
          ]
        }
      },
      {
        type: 'quote',
        order: 3,
        content: {
          text: '设计不仅仅是外观，更是功能。',
          author: 'Steve Jobs'
        }
      }
    ],
    version: 3,
    visibility: 1,
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-05-20T10:00:00Z'
  },
  {
    id: 2,
    userId: 1,
    title: '移动应用 UI 设计',
    description: '一个社交应用的完整 UI 设计系统。',
    coverUrl: 'https://picsum.photos/seed/work2/800/600',
    sections: [
      {
        type: 'text_block',
        order: 1,
        content: {
          text: '这个项目是为一家初创公司设计的社交应用界面。'
        }
      },
      {
        type: 'image_gallery',
        order: 2,
        content: {
          images: [
            { assetId: 18, caption: '登录页面' },
            { assetId: 7, caption: '应用图标' },
            { assetId: 15, caption: '配色方案' }
          ]
        }
      }
    ],
    version: 2,
    visibility: 1,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-05-18T14:30:00Z'
  },
  {
    id: 3,
    userId: 1,
    title: '品牌视觉识别系统',
    description: '完整的品牌 VI 设计，包含 logo、配色、字体等。',
    coverUrl: 'https://picsum.photos/seed/work3/800/600',
    sections: [
      {
        type: 'text_block',
        order: 1,
        content: {
          text: '为一家科技公司设计的完整品牌视觉识别系统。'
        }
      },
      {
        type: 'image_gallery',
        order: 2,
        content: {
          images: [
            { assetId: 5, caption: '图标集' },
            { assetId: 15, caption: '品牌色彩' },
            { assetId: 16, caption: '字体样机' }
          ]
        }
      },
      {
        type: 'quote',
        order: 3,
        content: {
          text: '一致性是品牌识别的关键。',
          author: '设计团队'
        }
      }
    ],
    version: 1,
    visibility: 1,
    createdAt: '2024-02-15T12:00:00Z',
    updatedAt: '2024-02-15T12:00:00Z'
  },
  {
    id: 4,
    userId: 1,
    title: '摄影作品集',
    description: '精选风景和人像摄影作品。',
    coverUrl: 'https://picsum.photos/seed/work4/800/600',
    sections: [
      {
        type: 'text_block',
        order: 1,
        content: {
          text: '这是我过去一年拍摄的精选照片。'
        }
      },
      {
        type: 'image_gallery',
        order: 2,
        content: {
          images: [
            { assetId: 1, caption: '山水风景' },
            { assetId: 2, caption: '人像摄影' },
            { assetId: 3, caption: '城市夜景' },
            { assetId: 13, caption: '山川' },
            { assetId: 14, caption: '日落海滩' }
          ]
        }
      }
    ],
    version: 1,
    visibility: 1,
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-03-01T09:00:00Z'
  },
  {
    id: 5,
    userId: 2,
    title: '后台管理系统界面',
    description: '企业级后台管理系统的 UI 设计。',
    coverUrl: 'https://picsum.photos/seed/work5/800/600',
    sections: [
      {
        type: 'text_block',
        order: 1,
        content: {
          text: '为企业管理需求设计的后台系统界面。'
        }
      },
      {
        type: 'image_gallery',
        order: 2,
        content: {
          images: [
            { assetId: 6, caption: '仪表盘' },
            { assetId: 17, caption: '管理页面' }
          ]
        }
      }
    ],
    version: 1,
    visibility: 1,
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-01-20T14:00:00Z'
  },
  {
    id: 6,
    userId: 3,
    title: 'Jane 的设计项目',
    description: 'UI/UX 设计项目展示。',
    coverUrl: 'https://picsum.photos/seed/work6/800/600',
    sections: [
      {
        type: 'text_block',
        order: 1,
        content: {
          text: '作为一名 UI/UX 设计师，我专注于创造简洁易用的数字产品。'
        }
      },
      {
        type: 'image_gallery',
        order: 2,
        content: {
          images: [
            { assetId: 4, caption: 'UI Kit' }
          ]
        }
      }
    ],
    version: 2,
    visibility: 1,
    createdAt: '2024-02-10T12:00:00Z',
    updatedAt: '2024-05-15T11:00:00Z'
  },
  {
    id: 7,
    userId: 4,
    title: '摄影作品 - 自然风光',
    description: '专注于自然风光的摄影系列。',
    coverUrl: 'https://picsum.photos/seed/work7/800/600',
    sections: [
      {
        type: 'text_block',
        order: 1,
        content: {
          text: '用镜头记录大自然的美丽瞬间。'
        }
      },
      {
        type: 'image_gallery',
        order: 2,
        content: {
          images: [
            { assetId: 1, caption: '日出' },
            { assetId: 13, caption: '雪山' }
          ]
        }
      }
    ],
    version: 1,
    visibility: 0,
    createdAt: '2024-03-05T16:45:00Z',
    updatedAt: '2024-03-05T16:45:00Z'
  },
  {
    id: 8,
    userId: 1,
    title: '电商网站设计',
    description: '现代简约风格的电商平台界面设计。',
    coverUrl: 'https://picsum.photos/seed/work8/800/600',
    sections: [
      {
        type: 'text_block',
        order: 1,
        content: {
          text: '为时尚品牌设计的电商平台，注重用户体验和转化率。'
        }
      },
      {
        type: 'image_gallery',
        order: 2,
        content: {
          images: [
            { assetId: 16, caption: '首页设计' },
            { assetId: 15, caption: '商品详情页' }
          ]
        }
      },
      {
        type: 'video_player',
        order: 3,
        content: {
          assetId: 8,
          title: '设计演示视频',
          description: '展示交互流程'
        }
      }
    ],
    version: 1,
    visibility: 0,
    createdAt: '2024-04-01T10:00:00Z',
    updatedAt: '2024-04-01T10:00:00Z'
  },
  {
    id: 9,
    userId: 1,
    title: '抽象艺术作品',
    description: '探索形式与色彩的抽象艺术创作。',
    coverUrl: 'https://picsum.photos/seed/work9/800/600',
    sections: [
      {
        type: 'text_block',
        order: 1,
        content: {
          text: '抽象艺术让观者自由解读，每双眼睛都能看到不同的故事。'
        }
      },
      {
        type: 'image_gallery',
        order: 2,
        content: {
          images: [
            { assetId: 19, caption: '无题 No.1' }
          ]
        }
      }
    ],
    version: 1,
    visibility: 1,
    createdAt: '2024-04-15T10:00:00Z',
    updatedAt: '2024-04-15T10:00:00Z'
  },
  {
    id: 10,
    userId: 1,
    title: '街头摄影系列',
    description: '记录城市生活的街头摄影作品。',
    coverUrl: 'https://picsum.photos/seed/work10/800/600',
    sections: [
      {
        type: 'text_block',
        order: 1,
        content: {
          text: '街头摄影让我捕捉城市中真实而生动的生活片段。'
        }
      },
      {
        type: 'image_gallery',
        order: 2,
        content: {
          images: [
            { assetId: 20, caption: '街头一角' }
          ]
        }
      }
    ],
    version: 1,
    visibility: 1,
    createdAt: '2024-04-20T11:00:00Z',
    updatedAt: '2024-04-20T11:00:00Z'
  }
]

// Version history for work with id 1
export const mockWorkVersions: WorkVersion[] = [
  {
    version: 1,
    title: '2024 个人作品集',
    description: '初版，包含基础项目介绍。',
    sections: [
      {
        type: 'text_block',
        order: 1,
        content: { text: '欢迎来到我的个人作品集！' }
      }
    ],
    createdAt: '2024-01-15T08:30:00Z'
  },
  {
    version: 2,
    title: '2024 个人作品集',
    description: '增加了更多项目图片。',
    sections: [
      {
        type: 'text_block',
        order: 1,
        content: { text: '欢迎来到我的个人作品集！这里展示了我在过去一年中的设计项目。' }
      },
      {
        type: 'image_gallery',
        order: 2,
        content: {
          images: [
            { assetId: 1, caption: '项目预览图' },
            { assetId: 2, caption: '项目预览图 2' }
          ]
        }
      }
    ],
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    version: 3,
    title: '2024 个人作品集',
    description: '这是我 2024 年的设计作品集，包含了多个 Web 和移动应用项目。',
    sections: [
      {
        type: 'text_block',
        order: 1,
        content: { text: '欢迎来到我的个人作品集！这里展示了我在过去一年中的设计项目。' }
      },
      {
        type: 'image_gallery',
        order: 2,
        content: {
          images: [
            { assetId: 1, caption: '项目预览图 1' },
            { assetId: 2, caption: '项目预览图 2' },
            { assetId: 4, caption: 'UI 设计稿' }
          ]
        }
      },
      {
        type: 'quote',
        order: 3,
        content: { text: '设计不仅仅是外观，更是功能。', author: 'Steve Jobs' }
      }
    ],
    createdAt: '2024-05-20T10:00:00Z'
  }
]

export const getWorkById = (id: number): Work | undefined => {
  return mockWorks.find(work => work.id === id)
}

export const getWorksByUserId = (userId: number): Work[] => {
  return mockWorks.filter(work => work.userId === userId)
}

export const getPublicWorks = (): Work[] => {
  return mockWorks.filter(work => work.visibility === 1)
}

export const getWorkVersions = (workId: number): WorkVersion[] => {
  if (workId === 1) return mockWorkVersions
  // For other works, return current version only
  const work = getWorkById(workId)
  if (!work) return []
  return [
    {
      version: work.version,
      title: work.title,
      description: work.description,
      sections: work.sections,
      createdAt: work.updatedAt
    }
  ]
}
