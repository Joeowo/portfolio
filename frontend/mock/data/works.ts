import type {
  Work,
  Section,
  SectionType,
  SectionContent,
  WorkVersion,
  Visibility,
  GalleryImage
} from '@/features/studio/works/types'

export type { Work, Section, SectionType, SectionContent, WorkVersion, Visibility, GalleryImage }

// 辅助函数：生成图片URL
const getImageUrl = (seed: string, width: number = 800, height: number = 600): string => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}

export const mockWorks: Work[] = [
  {
    id: 1,
    userId: 1,
    title: '2024 个人作品集',
    description:
      '这是我 2024 年的设计作品集，包含了多个 Web 和移动应用项目。展示了我的设计思维和解决问题的能力。',
    coverUrl: getImageUrl('work1'),
    status: 'published',
    sections: [
      {
        id: 101,
        type: 'text_block' as SectionType,
        order: 0,
        content: {
          text_block: {
            content:
              '欢迎来到我的个人作品集！这里展示了我在过去一年中的设计项目。我相信好的设计不仅要美观，更要解决实际问题。'
          }
        },
        createdAt: '2024-01-15T08:30:00Z',
        updatedAt: '2024-01-15T08:30:00Z'
      },
      {
        id: 102,
        type: 'image_gallery' as SectionType,
        order: 1,
        content: {
          image_gallery: {
            images: [
              {
                id: 1,
                url: getImageUrl('proj1a'),
                thumbnail: getImageUrl('proj1a', 200, 150),
                caption: '项目预览图 1'
              },
              {
                id: 2,
                url: getImageUrl('proj1b'),
                thumbnail: getImageUrl('proj1b', 200, 150),
                caption: '项目预览图 2'
              },
              {
                id: 4,
                url: getImageUrl('proj1c'),
                thumbnail: getImageUrl('proj1c', 200, 150),
                caption: 'UI 设计稿'
              }
            ],
            layout: 'grid'
          }
        },
        createdAt: '2024-01-15T08:31:00Z',
        updatedAt: '2024-05-20T10:00:00Z'
      },
      {
        id: 103,
        type: 'quote' as SectionType,
        order: 2,
        content: {
          quote: {
            content:
              '设计不仅仅是外观，更是功能。它关于人们如何使用产品，以及产品如何融入他们的生活。',
            author: 'Steve Jobs'
          }
        },
        createdAt: '2024-05-20T10:00:00Z',
        updatedAt: '2024-05-20T10:00:00Z'
      }
    ],
    version: 3,
    visibility: 1 as Visibility,
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-05-20T10:00:00Z'
  },
  {
    id: 2,
    userId: 1,
    title: '移动应用 UI 设计',
    description: '一个社交应用的完整 UI 设计系统，包含组件库、设计规范和交互原型。',
    coverUrl: getImageUrl('work2'),
    status: 'published',
    sections: [
      {
        id: 201,
        type: 'text_block' as SectionType,
        order: 0,
        content: {
          text_block: {
            content:
              '这个项目是为一家初创公司设计的社交应用界面。目标是打造一个简洁、现代、易于使用的社交平台。'
          }
        },
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z'
      },
      {
        id: 202,
        type: 'image_gallery' as SectionType,
        order: 1,
        content: {
          image_gallery: {
            images: [
              {
                id: 18,
                url: getImageUrl('login'),
                thumbnail: getImageUrl('login', 200, 150),
                caption: '登录页面'
              },
              {
                id: 7,
                url: getImageUrl('icon'),
                thumbnail: getImageUrl('icon', 200, 150),
                caption: '应用图标'
              },
              {
                id: 15,
                url: getImageUrl('colors'),
                thumbnail: getImageUrl('colors', 200, 150),
                caption: '配色方案'
              }
            ],
            layout: 'masonry'
          }
        },
        createdAt: '2024-02-01T10:01:00Z',
        updatedAt: '2024-05-18T14:30:00Z'
      }
    ],
    version: 2,
    visibility: 1 as Visibility,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-05-18T14:30:00Z'
  },
  {
    id: 3,
    userId: 1,
    title: '品牌视觉识别系统',
    description: '完整的品牌 VI 设计，包含 logo、配色、字体、应用规范等。',
    coverUrl: getImageUrl('work3'),
    status: 'published',
    sections: [
      {
        id: 301,
        type: 'text_block' as SectionType,
        order: 0,
        content: {
          text_block: {
            content:
              '为一家科技公司设计的完整品牌视觉识别系统。项目包括 logo 设计、色彩系统、字体规范和应用指南。'
          }
        },
        createdAt: '2024-02-15T12:00:00Z',
        updatedAt: '2024-02-15T12:00:00Z'
      },
      {
        id: 302,
        type: 'image_gallery' as SectionType,
        order: 1,
        content: {
          image_gallery: {
            images: [
              {
                id: 5,
                url: getImageUrl('icons'),
                thumbnail: getImageUrl('icons', 200, 150),
                caption: '图标集'
              },
              {
                id: 15,
                url: getImageUrl('brand-colors'),
                thumbnail: getImageUrl('brand-colors', 200, 150),
                caption: '品牌色彩'
              },
              {
                id: 16,
                url: getImageUrl('typography'),
                thumbnail: getImageUrl('typography', 200, 150),
                caption: '字体样机'
              }
            ],
            layout: 'grid'
          }
        },
        createdAt: '2024-02-15T12:01:00Z',
        updatedAt: '2024-02-15T12:01:00Z'
      },
      {
        id: 303,
        type: 'quote' as SectionType,
        order: 2,
        content: {
          quote: {
            content: '一致性是品牌识别的关键。每一个触点都应该传达相同的品牌价值观。',
            author: '品牌设计团队'
          }
        },
        createdAt: '2024-02-15T12:02:00Z',
        updatedAt: '2024-02-15T12:02:00Z'
      }
    ],
    version: 1,
    visibility: 1 as Visibility,
    createdAt: '2024-02-15T12:00:00Z',
    updatedAt: '2024-02-15T12:00:00Z'
  },
  {
    id: 4,
    userId: 1,
    title: '摄影作品集',
    description: '精选风景和人像摄影作品，记录生活中的美好瞬间。',
    coverUrl: getImageUrl('work4'),
    status: 'published',
    sections: [
      {
        id: 401,
        type: 'text_block' as SectionType,
        order: 0,
        content: {
          text_block: {
            content:
              '这是我过去一年拍摄的精选照片。摄影让我用不同的方式观察世界，发现平凡中的不凡。'
          }
        },
        createdAt: '2024-03-01T09:00:00Z',
        updatedAt: '2024-03-01T09:00:00Z'
      },
      {
        id: 402,
        type: 'image_gallery' as SectionType,
        order: 1,
        content: {
          image_gallery: {
            images: [
              {
                id: 1,
                url: getImageUrl('landscape1'),
                thumbnail: getImageUrl('landscape1', 200, 150),
                caption: '山水风景'
              },
              {
                id: 2,
                url: getImageUrl('portrait1'),
                thumbnail: getImageUrl('portrait1', 200, 150),
                caption: '人像摄影'
              },
              {
                id: 3,
                url: getImageUrl('city1'),
                thumbnail: getImageUrl('city1', 200, 150),
                caption: '城市夜景'
              },
              {
                id: 13,
                url: getImageUrl('mountain'),
                thumbnail: getImageUrl('mountain', 200, 150),
                caption: '山川'
              },
              {
                id: 14,
                url: getImageUrl('beach'),
                thumbnail: getImageUrl('beach', 200, 150),
                caption: '日落海滩'
              }
            ],
            layout: 'masonry'
          }
        },
        createdAt: '2024-03-01T09:01:00Z',
        updatedAt: '2024-03-01T09:01:00Z'
      }
    ],
    version: 1,
    visibility: 1 as Visibility,
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-03-01T09:00:00Z'
  },
  {
    id: 5,
    userId: 2,
    title: '后台管理系统界面',
    description: '企业级后台管理系统的 UI 设计，注重数据可视化与操作效率。',
    coverUrl: getImageUrl('work5'),
    status: 'published',
    sections: [
      {
        id: 501,
        type: 'text_block' as SectionType,
        order: 0,
        content: {
          text_block: {
            content: '为企业管理需求设计的后台系统界面。重点优化数据展示、报表生成和批量操作功能。'
          }
        },
        createdAt: '2024-01-20T14:00:00Z',
        updatedAt: '2024-01-20T14:00:00Z'
      },
      {
        id: 502,
        type: 'image_gallery' as SectionType,
        order: 1,
        content: {
          image_gallery: {
            images: [
              {
                id: 6,
                url: getImageUrl('dashboard'),
                thumbnail: getImageUrl('dashboard', 200, 150),
                caption: '仪表盘'
              },
              {
                id: 17,
                url: getImageUrl('admin'),
                thumbnail: getImageUrl('admin', 200, 150),
                caption: '管理页面'
              }
            ],
            layout: 'grid'
          }
        },
        createdAt: '2024-01-20T14:01:00Z',
        updatedAt: '2024-01-20T14:01:00Z'
      }
    ],
    version: 1,
    visibility: 1 as Visibility,
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-01-20T14:00:00Z'
  },
  {
    id: 6,
    userId: 3,
    title: 'Jane 的设计项目',
    description: 'UI/UX 设计师 Jane 的个人项目展示，专注移动端体验设计。',
    coverUrl: getImageUrl('work6'),
    status: 'published',
    sections: [
      {
        id: 601,
        type: 'text_block' as SectionType,
        order: 0,
        content: {
          text_block: {
            content:
              '作为一名 UI/UX 设计师，我专注于创造简洁易用的数字产品。我相信好的设计应该是invisible的——用户在使用时不会注意到设计的存在，只会感受到流畅的体验。'
          }
        },
        createdAt: '2024-02-10T12:00:00Z',
        updatedAt: '2024-05-15T11:00:00Z'
      },
      {
        id: 602,
        type: 'image_gallery' as SectionType,
        order: 1,
        content: {
          image_gallery: {
            images: [
              {
                id: 4,
                url: getImageUrl('uikit'),
                thumbnail: getImageUrl('uikit', 200, 150),
                caption: 'UI Kit 组件库'
              }
            ],
            layout: 'grid'
          }
        },
        createdAt: '2024-02-10T12:01:00Z',
        updatedAt: '2024-05-15T11:00:00Z'
      }
    ],
    version: 2,
    visibility: 1 as Visibility,
    createdAt: '2024-02-10T12:00:00Z',
    updatedAt: '2024-05-15T11:00:00Z'
  },
  {
    id: 7,
    userId: 4,
    title: '摄影作品 - 自然风光',
    description: '专注于自然风光的摄影系列，探索光影与构图的魅力。',
    coverUrl: getImageUrl('work7'),
    status: 'draft',
    sections: [
      {
        id: 701,
        type: 'text_block' as SectionType,
        order: 0,
        content: {
          text_block: {
            content: '用镜头记录大自然的美丽瞬间。每一次拍摄都是与自然的对话。'
          }
        },
        createdAt: '2024-03-05T16:45:00Z',
        updatedAt: '2024-03-05T16:45:00Z'
      },
      {
        id: 702,
        type: 'image_gallery' as SectionType,
        order: 1,
        content: {
          image_gallery: {
            images: [
              {
                id: 1,
                url: getImageUrl('sunrise'),
                thumbnail: getImageUrl('sunrise', 200, 150),
                caption: '日出时分'
              },
              {
                id: 13,
                url: getImageUrl('snow'),
                thumbnail: getImageUrl('snow', 200, 150),
                caption: '雪山之巅'
              }
            ],
            layout: 'grid'
          }
        },
        createdAt: '2024-03-05T16:46:00Z',
        updatedAt: '2024-03-05T16:46:00Z'
      }
    ],
    version: 1,
    visibility: 0 as Visibility,
    createdAt: '2024-03-05T16:45:00Z',
    updatedAt: '2024-03-05T16:45:00Z'
  },
  {
    id: 8,
    userId: 1,
    title: '电商网站设计',
    description: '现代简约风格的电商平台界面设计，提升购物体验和转化率。',
    coverUrl: getImageUrl('work8'),
    status: 'draft',
    sections: [
      {
        id: 801,
        type: 'text_block' as SectionType,
        order: 0,
        content: {
          text_block: {
            content:
              '为时尚品牌设计的电商平台，注重用户体验和转化率优化。设计语言简洁现代，突出产品本身。'
          }
        },
        createdAt: '2024-04-01T10:00:00Z',
        updatedAt: '2024-04-01T10:00:00Z'
      },
      {
        id: 802,
        type: 'image_gallery' as SectionType,
        order: 1,
        content: {
          image_gallery: {
            images: [
              {
                id: 16,
                url: getImageUrl('home'),
                thumbnail: getImageUrl('home', 200, 150),
                caption: '首页设计'
              },
              {
                id: 15,
                url: getImageUrl('product'),
                thumbnail: getImageUrl('product', 200, 150),
                caption: '商品详情页'
              }
            ],
            layout: 'grid'
          }
        },
        createdAt: '2024-04-01T10:01:00Z',
        updatedAt: '2024-04-01T10:01:00Z'
      },
      {
        id: 803,
        type: 'video_player' as SectionType,
        order: 2,
        content: {
          video_player: {
            videoId: 8,
            title: '设计演示视频',
            thumbnail: getImageUrl('video-thumb', 800, 450)
          }
        },
        createdAt: '2024-04-01T10:02:00Z',
        updatedAt: '2024-04-01T10:02:00Z'
      }
    ],
    version: 1,
    visibility: 0 as Visibility,
    createdAt: '2024-04-01T10:00:00Z',
    updatedAt: '2024-04-01T10:00:00Z'
  },
  {
    id: 9,
    userId: 1,
    title: '抽象艺术作品',
    description: '探索形式与色彩的抽象艺术创作，每件作品都是一次实验。',
    coverUrl: getImageUrl('work9'),
    status: 'published',
    sections: [
      {
        id: 901,
        type: 'text_block' as SectionType,
        order: 0,
        content: {
          text_block: {
            content:
              '抽象艺术让观者自由解读，每双眼睛都能看到不同的故事。这些作品是我对色彩和形式的探索。'
          }
        },
        createdAt: '2024-04-15T10:00:00Z',
        updatedAt: '2024-04-15T10:00:00Z'
      },
      {
        id: 902,
        type: 'image_gallery' as SectionType,
        order: 1,
        content: {
          image_gallery: {
            images: [
              {
                id: 19,
                url: getImageUrl('abstract1'),
                thumbnail: getImageUrl('abstract1', 200, 150),
                caption: '无题 No.1 - 2024'
              },
              {
                id: 21,
                url: getImageUrl('abstract2'),
                thumbnail: getImageUrl('abstract2', 200, 150),
                caption: '无题 No.2 - 2024'
              },
              {
                id: 22,
                url: getImageUrl('abstract3'),
                thumbnail: getImageUrl('abstract3', 200, 150),
                caption: '流动'
              }
            ],
            layout: 'masonry'
          }
        },
        createdAt: '2024-04-15T10:01:00Z',
        updatedAt: '2024-04-15T10:01:00Z'
      },
      {
        id: 903,
        type: 'quote' as SectionType,
        order: 2,
        content: {
          quote: {
            content: '抽象艺术是心灵的视觉语言，它绕过逻辑，直接与情感对话。',
            author: ''
          }
        },
        createdAt: '2024-04-15T10:02:00Z',
        updatedAt: '2024-04-15T10:02:00Z'
      }
    ],
    version: 1,
    visibility: 1 as Visibility,
    createdAt: '2024-04-15T10:00:00Z',
    updatedAt: '2024-04-15T10:00:00Z'
  },
  {
    id: 10,
    userId: 1,
    title: '街头摄影系列',
    description: '记录城市生活的街头摄影作品，捕捉平凡中的不凡。',
    coverUrl: getImageUrl('work10'),
    status: 'published',
    sections: [
      {
        id: 1001,
        type: 'text_block' as SectionType,
        order: 0,
        content: {
          text_block: {
            content:
              '街头摄影让我捕捉城市中真实而生动的生活片段。每个人都有自己的故事，街道就是最好的舞台。'
          }
        },
        createdAt: '2024-04-20T11:00:00Z',
        updatedAt: '2024-04-20T11:00:00Z'
      },
      {
        id: 1002,
        type: 'image_gallery' as SectionType,
        order: 1,
        content: {
          image_gallery: {
            images: [
              {
                id: 20,
                url: getImageUrl('street1'),
                thumbnail: getImageUrl('street1', 200, 150),
                caption: '街头一角'
              },
              {
                id: 23,
                url: getImageUrl('street2'),
                thumbnail: getImageUrl('street2', 200, 150),
                caption: '匆匆'
              },
              {
                id: 24,
                url: getImageUrl('street3'),
                thumbnail: getImageUrl('street3', 200, 150),
                caption: '等待'
              }
            ],
            layout: 'masonry'
          }
        },
        createdAt: '2024-04-20T11:01:00Z',
        updatedAt: '2024-04-20T11:01:00Z'
      }
    ],
    version: 1,
    visibility: 1 as Visibility,
    createdAt: '2024-04-20T11:00:00Z',
    updatedAt: '2024-04-20T11:00:00Z'
  }
]

// Version history for work with id 1
export const mockWorkVersions: WorkVersion[] = [
  {
    id: 1001,
    workId: 1,
    version: 1,
    title: '2024 个人作品集',
    description: '初版，包含基础项目介绍。',
    data: JSON.stringify({
      sections: [
        {
          id: 101,
          type: 'text_block' as SectionType,
          order: 0,
          content: { text_block: { content: '欢迎来到我的个人作品集！' } },
          createdAt: '2024-01-15T08:30:00Z',
          updatedAt: '2024-01-15T08:30:00Z'
        }
      ]
    }),
    createdAt: '2024-01-15T08:30:00Z'
  },
  {
    id: 1002,
    workId: 1,
    version: 2,
    title: '2024 个人作品集',
    description: '增加了更多项目图片。',
    data: JSON.stringify({
      sections: [
        {
          id: 101,
          type: 'text_block' as SectionType,
          order: 0,
          content: {
            text_block: { content: '欢迎来到我的个人作品集！这里展示了我在过去一年中的设计项目。' }
          },
          createdAt: '2024-01-15T08:30:00Z',
          updatedAt: '2024-01-15T08:30:00Z'
        },
        {
          id: 102,
          type: 'image_gallery' as SectionType,
          order: 1,
          content: {
            image_gallery: {
              images: [
                { id: 1, url: getImageUrl('proj1a'), caption: '项目预览图' },
                { id: 2, url: getImageUrl('proj1b'), caption: '项目预览图 2' }
              ]
            }
          },
          createdAt: '2024-01-15T08:31:00Z',
          updatedAt: '2024-03-01T10:00:00Z'
        }
      ]
    }),
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: 1003,
    workId: 1,
    version: 3,
    title: '2024 个人作品集',
    description: '这是我 2024 年的设计作品集，包含了多个 Web 和移动应用项目。',
    data: JSON.stringify({
      sections: [
        {
          id: 101,
          type: 'text_block' as SectionType,
          order: 0,
          content: {
            text_block: { content: '欢迎来到我的个人作品集！这里展示了我在过去一年中的设计项目。' }
          },
          createdAt: '2024-01-15T08:30:00Z',
          updatedAt: '2024-01-15T08:30:00Z'
        },
        {
          id: 102,
          type: 'image_gallery' as SectionType,
          order: 1,
          content: {
            image_gallery: {
              images: [
                { id: 1, url: getImageUrl('proj1a'), caption: '项目预览图 1' },
                { id: 2, url: getImageUrl('proj1b'), caption: '项目预览图 2' },
                { id: 4, url: getImageUrl('proj1c'), caption: 'UI 设计稿' }
              ]
            }
          },
          createdAt: '2024-01-15T08:31:00Z',
          updatedAt: '2024-05-20T10:00:00Z'
        },
        {
          id: 103,
          type: 'quote' as SectionType,
          order: 2,
          content: { quote: { content: '设计不仅仅是外观，更是功能。', author: 'Steve Jobs' } },
          createdAt: '2024-05-20T10:00:00Z',
          updatedAt: '2024-05-20T10:00:00Z'
        }
      ]
    }),
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
      id: workId * 100 + work.version,
      workId,
      version: work.version,
      title: work.title,
      description: work.description,
      data: JSON.stringify({ sections: work.sections }),
      createdAt: work.updatedAt
    }
  ]
}
