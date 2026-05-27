import { http, HttpResponse, delay } from 'msw'
import { mockUsers, getUserByUsername } from '../data/users'

interface LoginRequest {
  username: string
  password: string
}

interface RegisterRequest {
  username: string
  password: string
  nickname: string
  email: string
}

interface RefreshTokenRequest {
  refreshToken: string
}

interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

// Mock token storage
let currentRefreshToken = 'mock-refresh-token-valid'

export const authHandlers = [
  // POST /api/auth/login
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500)

    const body = (await request.json()) as LoginRequest
    const user = getUserByUsername(body.username)

    // Mock password check - any password works for demo
    if (!user || body.password.length < 6) {
      return HttpResponse.json(
        { code: 401, msg: '用户名或密码错误', data: null },
        { status: 401 }
      )
    }

    // Generate mock tokens
    const accessToken = `mock-access-token-${user.id}-${Date.now()}`
    const newRefreshToken = `mock-refresh-token-${user.id}-${Date.now()}`
    currentRefreshToken = newRefreshToken

    return HttpResponse.json({
      code: 200,
      msg: '登录成功',
      data: {
        accessToken,
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

    // Generate mock tokens for new user
    const accessToken = `mock-access-token-new-${Date.now()}`
    const newRefreshToken = `mock-refresh-token-new-${Date.now()}`

    return HttpResponse.json({
      code: 200,
      msg: '注册成功',
      data: {
        accessToken,
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

    // Generate new access token
    const newAccessToken = `mock-access-token-refreshed-${Date.now()}`

    return HttpResponse.json({
      code: 200,
      msg: '刷新成功',
      data: {
        accessToken: newAccessToken,
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
        // Return user without sensitive data
        const { password, ...userWithoutPassword } = user as any
        return HttpResponse.json({
          code: 200,
          msg: 'success',
          data: userWithoutPassword
        })
      }
    }

    // Default to first user for demo
    const defaultUser = mockUsers[0]
    const { password, ...userWithoutPassword } = defaultUser as any
    return HttpResponse.json({
      code: 200,
      msg: 'success',
      data: userWithoutPassword
    })
  })
]
