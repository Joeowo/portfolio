/**
 * Authentication response
 */
export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
  expiresIn: number
}

/**
 * Login request DTO
 */
export interface LoginDto {
  username: string
  password: string
}

/**
 * Register request DTO
 */
export interface RegisterDto {
  username: string
  password: string
  nickname?: string
}

/**
 * Refresh token request DTO
 */
export interface RefreshTokenDto {
  refreshToken: string
}

/**
 * Token payload (decoded JWT)
 */
export interface TokenPayload {
  sub: string
  username: string
  role: string
  iat: number
  exp: number
}

import type { User } from './User'

export { User }
