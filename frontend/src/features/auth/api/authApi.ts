import request from '@/shared/utils/request'
import type {
  AuthResponse,
  LoginDto,
  RegisterDto,
  RefreshTokenDto,
  User
} from '../types'

const AUTH_BASE_URL = '/auth'

/**
 * Login with username and password
 */
export const login = (data: LoginDto): Promise<AuthResponse> => {
  return request.post(`${AUTH_BASE_URL}/login`, data)
}

/**
 * Register a new user
 */
export const register = (data: RegisterDto): Promise<AuthResponse> => {
  return request.post(`${AUTH_BASE_URL}/register`, data)
}

/**
 * Refresh access token
 */
export const refreshToken = (data: RefreshTokenDto): Promise<AuthResponse> => {
  return request.post(`${AUTH_BASE_URL}/refresh`, data)
}

/**
 * Get current user info
 */
export const getMe = (): Promise<User> => {
  return request.get(`${AUTH_BASE_URL}/me`)
}

/**
 * Logout (clear token on client side)
 */
export const logout = (): Promise<void> => {
  return request.post(`${AUTH_BASE_URL}/logout`)
}

/**
 * Update user profile
 */
export const updateProfile = (data: {
  nickname?: string
  avatar?: string
  bio?: string
}): Promise<User> => {
  return request.put(`${AUTH_BASE_URL}/profile`, data)
}

/**
 * Change password
 */
export const changePassword = (data: {
  oldPassword: string
  newPassword: string
}): Promise<void> => {
  return request.post(`${AUTH_BASE_URL}/change-password`, data)
}

const authApi = {
  login,
  register,
  refreshToken,
  getMe,
  logout,
  updateProfile,
  changePassword
}

export default authApi
