export interface User {
  id: number
  username: string
  nickname: string
  avatarUrl?: string
  email: string
  bio?: string
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
  createdAt: string
  updatedAt: string
}

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'demo_user',
    nickname: '演示用户',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    email: 'demo@example.com',
    bio: '这是一个演示用户账号，用于测试平台功能。',
    role: 'USER',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-05-20T10:15:00Z'
  },
  {
    id: 2,
    username: 'admin',
    nickname: '管理员',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    email: 'admin@example.com',
    bio: '平台管理员，负责内容审核和系统维护。',
    role: 'ADMIN',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-05-25T14:20:00Z'
  },
  {
    id: 3,
    username: 'creator_jane',
    nickname: 'Jane Designer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    email: 'jane@example.com',
    bio: 'UI/UX 设计师，专注于数字产品设计。',
    role: 'USER',
    createdAt: '2024-02-10T12:00:00Z',
    updatedAt: '2024-05-18T09:30:00Z'
  },
  {
    id: 4,
    username: 'photographer_mike',
    nickname: 'Mike Photo',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    email: 'mike@example.com',
    bio: '自由摄影师，擅长人像和风景摄影。',
    role: 'USER',
    createdAt: '2024-03-05T16:45:00Z',
    updatedAt: '2024-05-22T11:00:00Z'
  },
  {
    id: 5,
    username: 'super_admin',
    nickname: '超级管理员',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=super',
    email: 'super@example.com',
    bio: '系统超级管理员，拥有所有权限。',
    role: 'SUPER_ADMIN',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

export const getUserById = (id: number): User | undefined => {
  return mockUsers.find(user => user.id === id)
}

export const getUserByUsername = (username: string): User | undefined => {
  return mockUsers.find(user => user.username === username)
}

export const getDefaultUser = (): User => mockUsers[0]
