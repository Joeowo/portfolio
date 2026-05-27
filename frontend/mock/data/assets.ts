export interface Asset {
  id: number
  userId: number
  folderId: number | null
  name: string
  assetType: 'image' | 'video' | 'text'
  fileUrl: string
  thumbnailUrl?: string
  fileSize: number
  width?: number
  height?: number
  duration?: number
  tags?: string
  createdAt: string
  updatedAt: string
}

export interface Folder {
  id: number
  userId: number
  name: string
  parentId: number | null
  createdAt: string
}

export const mockFolders: Folder[] = [
  { id: 1, userId: 1, name: '我的照片', parentId: null, createdAt: '2024-01-15T08:30:00Z' },
  { id: 2, userId: 1, name: '设计素材', parentId: null, createdAt: '2024-02-01T10:00:00Z' },
  { id: 3, userId: 1, name: '项目截图', parentId: 2, createdAt: '2024-02-01T10:05:00Z' },
  { id: 4, userId: 1, name: '图标资源', parentId: 2, createdAt: '2024-02-01T10:10:00Z' },
  { id: 5, userId: 2, name: '管理素材', parentId: null, createdAt: '2024-01-01T00:00:00Z' }
]

export const mockAssets: Asset[] = [
  // Images in "我的照片" folder
  {
    id: 1,
    userId: 1,
    folderId: 1,
    name: 'landscape_001.jpg',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/001/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/001/400/300',
    fileSize: 2048576,
    width: 1920,
    height: 1080,
    tags: 'landscape,nature',
    createdAt: '2024-03-01T08:00:00Z',
    updatedAt: '2024-03-01T08:00:00Z'
  },
  {
    id: 2,
    userId: 1,
    folderId: 1,
    name: 'portrait_001.jpg',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/002/1080/1350',
    thumbnailUrl: 'https://picsum.photos/seed/002/300/375',
    fileSize: 1536000,
    width: 1080,
    height: 1350,
    tags: 'portrait,people',
    createdAt: '2024-03-02T09:15:00Z',
    updatedAt: '2024-03-02T09:15:00Z'
  },
  {
    id: 3,
    userId: 1,
    folderId: 1,
    name: 'city_night.jpg',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/003/2560/1440',
    thumbnailUrl: 'https://picsum.photos/seed/003/400/225',
    fileSize: 3145728,
    width: 2560,
    height: 1440,
    tags: 'city,night,urban',
    createdAt: '2024-03-05T14:30:00Z',
    updatedAt: '2024-03-05T14:30:00Z'
  },
  // Design assets in "设计素材" folder
  {
    id: 4,
    userId: 1,
    folderId: 2,
    name: 'ui_kit.png',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/004/1200/800',
    thumbnailUrl: 'https://picsum.photos/seed/004/300/200',
    fileSize: 1048576,
    width: 1200,
    height: 800,
    tags: 'ui,design',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 5,
    userId: 1,
    folderId: 2,
    name: 'icon_set.svg',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/005/500/500',
    thumbnailUrl: 'https://picsum.photos/seed/005/200/200',
    fileSize: 51200,
    width: 500,
    height: 500,
    tags: 'icons,svg',
    createdAt: '2024-02-16T11:00:00Z',
    updatedAt: '2024-02-16T11:00:00Z'
  },
  {
    id: 6,
    userId: 1,
    folderId: 3,
    name: 'dashboard_mockup.png',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/006/1600/900',
    thumbnailUrl: 'https://picsum.photos/seed/006/400/225',
    fileSize: 2621440,
    width: 1600,
    height: 900,
    tags: 'mockup,dashboard',
    createdAt: '2024-02-20T13:00:00Z',
    updatedAt: '2024-02-20T13:00:00Z'
  },
  {
    id: 7,
    userId: 1,
    folderId: 4,
    name: 'app_icon.png',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/007/1024/1024',
    thumbnailUrl: 'https://picsum.photos/seed/007/200/200',
    fileSize: 524288,
    width: 1024,
    height: 1024,
    tags: 'icon,app',
    createdAt: '2024-02-18T10:30:00Z',
    updatedAt: '2024-02-18T10:30:00Z'
  },
  // Videos
  {
    id: 8,
    userId: 1,
    folderId: null,
    name: 'product_demo.mp4',
    assetType: 'video',
    fileUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/008/640/360',
    fileSize: 52428800,
    width: 1280,
    height: 720,
    duration: 60,
    tags: 'demo,product',
    createdAt: '2024-04-01T08:00:00Z',
    updatedAt: '2024-04-01T08:00:00Z'
  },
  {
    id: 9,
    userId: 1,
    folderId: null,
    name: 'tutorial_intro.mp4',
    assetType: 'video',
    fileUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/009/640/360',
    fileSize: 73400320,
    width: 1280,
    height: 720,
    duration: 120,
    tags: 'tutorial',
    createdAt: '2024-04-05T14:00:00Z',
    updatedAt: '2024-04-05T14:00:00Z'
  },
  {
    id: 10,
    userId: 1,
    folderId: 1,
    name: 'timelapse_sunset.mp4',
    assetType: 'video',
    fileUrl: 'https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/010/640/360',
    fileSize: 31457280,
    width: 854,
    height: 480,
    duration: 30,
    tags: 'timelapse,sunset',
    createdAt: '2024-04-10T16:30:00Z',
    updatedAt: '2024-04-10T16:30:00Z'
  },
  // Text assets
  {
    id: 11,
    userId: 1,
    folderId: null,
    name: 'about_me.txt',
    assetType: 'text',
    fileUrl: 'data:text/plain;base64,SGVsbG8hIEkgYW0gYSBkZXNpZ25lciBhbmQgY3JlYXRvci4=',
    fileSize: 2048,
    tags: 'bio,text',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 12,
    userId: 1,
    folderId: null,
    name: 'project_notes.txt',
    assetType: 'text',
    fileUrl: 'data:text/plain;base64,UHJvamVjdCBub3RlcyBhbmQgaWRlYXM=',
    fileSize: 4096,
    tags: 'notes,project',
    createdAt: '2024-03-20T11:30:00Z',
    updatedAt: '2024-03-20T11:30:00Z'
  },
  // More images
  {
    id: 13,
    userId: 1,
    folderId: 1,
    name: 'mountains.jpg',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/013/2400/1600',
    thumbnailUrl: 'https://picsum.photos/seed/013/400/267',
    fileSize: 4194304,
    width: 2400,
    height: 1600,
    tags: 'mountains,nature',
    createdAt: '2024-03-25T08:00:00Z',
    updatedAt: '2024-03-25T08:00:00Z'
  },
  {
    id: 14,
    userId: 1,
    folderId: 1,
    name: 'beach_sunset.jpg',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/014/3000/2000',
    thumbnailUrl: 'https://picsum.photos/seed/014/400/267',
    fileSize: 6291456,
    width: 3000,
    height: 2000,
    tags: 'beach,sunset',
    createdAt: '2024-03-28T15:00:00Z',
    updatedAt: '2024-03-28T15:00:00Z'
  },
  {
    id: 15,
    userId: 1,
    folderId: 2,
    name: 'color_palette.png',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/015/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/015/300/225',
    fileSize: 786432,
    width: 800,
    height: 600,
    tags: 'colors,palette',
    createdAt: '2024-02-25T09:00:00Z',
    updatedAt: '2024-02-25T09:00:00Z'
  },
  {
    id: 16,
    userId: 1,
    folderId: 2,
    name: 'typography_sample.jpg',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/016/1400/1000',
    thumbnailUrl: 'https://picsum.photos/seed/016/400/286',
    fileSize: 1835008,
    width: 1400,
    height: 1000,
    tags: 'typography,design',
    createdAt: '2024-02-28T12:00:00Z',
    updatedAt: '2024-02-28T12:00:00Z'
  },
  {
    id: 17,
    userId: 2,
    folderId: 5,
    name: 'admin_banner.png',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/017/1200/400',
    thumbnailUrl: 'https://picsum.photos/seed/017/400/133',
    fileSize: 1310720,
    width: 1200,
    height: 400,
    tags: 'banner,admin',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 18,
    userId: 1,
    folderId: 3,
    name: 'mobile_ui.png',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/018/750/1334',
    thumbnailUrl: 'https://picsum.photos/seed/018/225/400',
    fileSize: 1572864,
    width: 750,
    height: 1334,
    tags: 'mobile,ui',
    createdAt: '2024-02-22T14:00:00Z',
    updatedAt: '2024-02-22T14:00:00Z'
  },
  {
    id: 19,
    userId: 1,
    folderId: null,
    name: 'abstract_art.jpg',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/019/2000/2000',
    thumbnailUrl: 'https://picsum.photos/seed/019/400/400',
    fileSize: 3670016,
    width: 2000,
    height: 2000,
    tags: 'abstract,art',
    createdAt: '2024-04-15T10:00:00Z',
    updatedAt: '2024-04-15T10:00:00Z'
  },
  {
    id: 20,
    userId: 1,
    folderId: 1,
    name: 'street_photo.jpg',
    assetType: 'image',
    fileUrl: 'https://picsum.photos/seed/020/1800/1200',
    thumbnailUrl: 'https://picsum.photos/seed/020/400/267',
    fileSize: 2457600,
    width: 1800,
    height: 1200,
    tags: 'street,photo',
    createdAt: '2024-04-20T11:00:00Z',
    updatedAt: '2024-04-20T11:00:00Z'
  }
]

export const getAssetById = (id: number): Asset | undefined => {
  return mockAssets.find(asset => asset.id === id)
}

export const getAssetsByUserId = (userId: number): Asset[] => {
  return mockAssets.filter(asset => asset.userId === userId)
}

export const getAssetsByFolderId = (folderId: number | null): Asset[] => {
  return mockAssets.filter(asset => asset.folderId === folderId)
}

export const getFolderById = (id: number): Folder | undefined => {
  return mockFolders.find(folder => folder.id === id)
}

export const getFoldersByUserId = (userId: number): Folder[] => {
  return mockFolders.filter(folder => folder.userId === userId)
}
