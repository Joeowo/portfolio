/**
 * User entity
 */
export interface User {
  id: string
  username: string
  nickname?: string
  avatar?: string
  email?: string
  bio?: string
  role: UserRole
  status: UserStatus
  createdAt: string
  updatedAt: string
}

/**
 * User roles
 */
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

/**
 * User status
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned'
}

/**
 * User profile update DTO
 */
export interface UpdateProfileDto {
  nickname?: string
  avatar?: string
  bio?: string
}
