import { http, HttpResponse, delay } from 'msw'
import { mockUsers, getUserByUsername } from '../data/users'
import type { User } from '../data/users'

interface LoginRequest {
  username: string
  password: string
}

interface RegisterRequest {
  username: string
  password: string
  nickname?: string
}

interface RefreshTokenRequest {
  refreshToken: string
}

interface AuthResponse {
  user: Omit<User, 'password'>
  token: string
  refreshToken: string
  expiresIn: number
}

// Helper to convert User to response format
function userToResponse(user: User): Omit<User, 'password'> {
  const { password: _, ...userWithoutPassword } = user as any
  return userWithoutPassword
}

// Mock token storage
let currentRefreshToken = 'mock-refresh-token-valid'

export const authHandlers = [
  // POST /api/auth/login
  http.post('/api/auth/login', async ({ request }) => {
    console.log('[MSW Auth] Login request received')
    await delay(500)

    const body = (await request.json()) as LoginRequest
    const user = getUserByUsername(body.username)

    // Mock password check - any password >= 6 chars works for demo
    if (!user || body.password.length < 6) {
      return HttpResponse.json(
        { code: 401, msg: '用户名或密码错误', data: null },
        { status: 401 }
      )
    }

    // Generate mock tokens
    const token = `mock-access-token-${user.id}-${Date.now()}`
    const newRefreshToken = `mock-refresh-token-${user.id}-${Date.now()}`
    currentRefreshToken = newRefreshToken

    return HttpResponse.json({
      code: 200,
      msg: '登录成功',
      data: {
        user: userToResponse(user),
        token,
        refreshToken: newRefreshToken,
        expiresIn: 7200
      } as AuthResponse
    })
  }),

  // POST /api/auth/register
  http.post('/api/auth/register', async ({ request }) => {
    await delay(700)

    const body = (await request.json()) as RegisterRequest

    // Check if username already exists
    const existingUser = getUserByUsername(body.username)
    if (existingUser) {
      return HttpResponse.json(
        { code: 400, msg: '用户名已存在', data: null },
        { status: 400 }
      )
    }

    // Create new user
    const newUser: User = {
      id: mockUsers.length + 1,
      username: body.username,
      nickname: body.nickname || body.username,
      email: `${body.username}@example.com`,
      role: 'USER',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Add to mock users (in-memory only)
    mockUsers.push(newUser)

    // Generate mock tokens for new user
    const token = `mock-access-token-new-${Date.now()}`
    const newRefreshToken = `mock-refresh-token-new-${Date.now()}`

    return HttpResponse.json({
      code: 200,
      msg: '注册成功',
      data: {
        user: userToResponse(newUser),
        token,
        refreshToken: newRefreshToken,
        expiresIn: 7200
      } as AuthResponse
    })
  }),

  // POST /api/auth/refresh
  http.post('/api/auth/refresh', async ({ request }) => {
    await delay(350)

    const body = (await request.json()) as RefreshTokenRequest

    if (body.refreshToken !== currentRefreshToken) {
      return HttpResponse.json(
        { code: 401, msg: 'Refresh Token 无效', data: null },
        { status: 401 }
      )
    }

    // Use default user for refresh
    const user = mockUsers[0]
    const newToken = `mock-access-token-refreshed-${Date.now()}`

    return HttpResponse.json({
      code: 200,
      msg: '刷新成功',
      data: {
        user: userToResponse(user),
        token: newToken,
        refreshToken: body.refreshToken,
        expiresIn: 7200
      } as AuthResponse
    })
  }),

  // GET /api/auth/me
  http.get('/api/auth/me', async ({ request }) => {
    await delay(300)

    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { code: 401, msg: '未授权', data: null },
        { status: 401 }
      )
    }

    // Extract user ID from token (format: mock-access-token-{userId}-...)
    const token = authHeader.substring(7)
    const match = token.match(/mock-access-token-(\d+)-/)

    if (match) {
      const userId = parseInt(match[1])
      const user = mockUsers.find(u => u.id === userId)
      if (user) {
        return HttpResponse.json({
          code: 200,
          msg: 'success',
          data: userToResponse(user)
        })
      }
    }

    // Default to first user for demo
    const defaultUser = mockUsers[0]
    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: userToResponse(defaultUser)
    })
  }),

  // POST /api/auth/logout
  http.post('/api/auth/logout', async () => {
    await delay(200)
    return HttpResponse.json({
      code: 200,
      msg: '登出成功',
      data: null
    })
  }),

  // PUT /api/auth/profile
  http.put('/api/auth/profile', async ({ request }) => {
    await delay(400)

    const body = await request.json() as { nickname?: string; avatar?: string; bio?: string }
    const user = mockUsers[0]

    // Update user
    if (body.nickname) user.nickname = body.nickname
    if (body.avatar) user.avatarUrl = body.avatar
    if (body.bio) user.bio = body.bio
    user.updatedAt = new Date().toISOString()

    return HttpResponse.json({
      code: 200,
      msg: '更新成功',
      data: userToResponse(user)
    })
  })
]
