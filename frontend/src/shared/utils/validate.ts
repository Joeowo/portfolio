/**
 * Email validation result
 */
export interface ValidationResult {
  valid: boolean
  message?: string
}

/**
 * Validate email address format
 * @param email - Email address to validate
 * @returns Validation result
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return { valid: false, message: '邮箱不能为空' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, message: '邮箱格式不正确' }
  }

  if (email.length > 254) {
    return { valid: false, message: '邮箱长度不能超过254个字符' }
  }

  return { valid: true }
}

/**
 * Password strength levels
 */
export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong'

/**
 * Password validation result
 */
export interface PasswordValidationResult extends ValidationResult {
  strength?: PasswordStrength
  score?: number
}

/**
 * Validate password strength
 * Requirements:
 * - At least 6 characters
 * - Contains lowercase and uppercase letters
 * - Contains numbers
 * - Contains special characters
 * @param password - Password to validate
 * @returns Validation result with strength level
 */
export function validatePassword(password: string): PasswordValidationResult {
  if (!password || password.trim() === '') {
    return {
      valid: false,
      message: '密码不能为空',
      strength: 'weak',
      score: 0
    }
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: '密码长度至少6个字符',
      strength: 'weak',
      score: 1
    }
  }

  if (password.length > 128) {
    return {
      valid: false,
      message: '密码长度不能超过128个字符',
      strength: 'weak',
      score: 1
    }
  }

  let score = 0

  // Length score
  if (password.length >= 8) score++
  if (password.length >= 12) score++

  // Character variety
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  let strength: PasswordStrength
  let message = ''

  if (score <= 2) {
    strength = 'weak'
    message = '密码强度：弱'
  } else if (score <= 4) {
    strength = 'fair'
    message = '密码强度：一般'
  } else if (score <= 5) {
    strength = 'good'
    message = '密码强度：良好'
  } else {
    strength = 'strong'
    message = '密码强度：强'
  }

  return {
    valid: true,
    message,
    strength,
    score
  }
}

/**
 * Username validation rules:
 * - 3-20 characters
 * - Only letters, numbers, underscores, hyphens
 * - Must start with a letter
 * @param username - Username to validate
 * @returns Validation result
 */
export function validateUsername(username: string): ValidationResult {
  if (!username || username.trim() === '') {
    return { valid: false, message: '用户名不能为空' }
  }

  if (username.length < 3) {
    return { valid: false, message: '用户名长度至少3个字符' }
  }

  if (username.length > 20) {
    return { valid: false, message: '用户名长度不能超过20个字符' }
  }

  // Must start with a letter
  if (!/^[a-zA-Z]/.test(username)) {
    return { valid: false, message: '用户名必须以字母开头' }
  }

  // Only letters, numbers, underscores, hyphens
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return { valid: false, message: '用户名只能包含字母、数字、下划线和连字符' }
  }

  return { valid: true }
}

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns Validation result
 */
export function validateUrl(url: string): ValidationResult {
  if (!url || url.trim() === '') {
    return { valid: false, message: 'URL不能为空' }
  }

  try {
    new URL(url)
    return { valid: true }
  } catch {
    return { valid: false, message: 'URL格式不正确' }
  }
}

/**
 * Validate required field
 * @param value - Value to validate
 * @param fieldName - Field name for error message
 * @returns Validation result
 */
export function validateRequired(
  value: string | number | null | undefined,
  fieldName = '此字段'
): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { valid: false, message: `${fieldName}不能为空` }
  }

  return { valid: true }
}

/**
 * Validate string length
 * @param value - String to validate
 * @param min - Minimum length
 * @param max - Maximum length
 * @param fieldName - Field name for error message
 * @returns Validation result
 */
export function validateLength(
  value: string,
  min: number,
  max: number,
  fieldName = '此字段'
): ValidationResult {
  if (value.length < min) {
    return { valid: false, message: `${fieldName}长度至少${min}个字符` }
  }

  if (value.length > max) {
    return { valid: false, message: `${fieldName}长度不能超过${max}个字符` }
  }

  return { valid: true }
}

/**
 * Validate number range
 * @param value - Number to validate
 * @param min - Minimum value
 * @param max - Maximum value
 * @param fieldName - Field name for error message
 * @returns Validation result
 */
export function validateRange(
  value: number,
  min: number,
  max: number,
  fieldName = '此字段'
): ValidationResult {
  if (isNaN(value)) {
    return { valid: false, message: `${fieldName}必须是数字` }
  }

  if (value < min) {
    return { valid: false, message: `${fieldName}不能小于${min}` }
  }

  if (value > max) {
    return { valid: false, message: `${fieldName}不能大于${max}` }
  }

  return { valid: true }
}

/**
 * Validate file size
 * @param fileSize - File size in bytes
 * @param maxSize - Maximum size in bytes
 * @returns Validation result
 */
export function validateFileSize(fileSize: number, maxSize: number): ValidationResult {
  if (fileSize > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0)
    return { valid: false, message: `文件大小不能超过${maxSizeMB}MB` }
  }

  return { valid: true }
}

/**
 * Validate file type
 * @param fileName - File name to check extension
 * @param allowedTypes - Allowed file extensions (e.g., ['jpg', 'png', 'pdf'])
 * @returns Validation result
 */
export function validateFileType(fileName: string, allowedTypes: string[]): ValidationResult {
  const extension = fileName.split('.').pop()?.toLowerCase()

  if (!extension || !allowedTypes.includes(extension)) {
    return {
      valid: false,
      message: `不支持的文件类型，允许的类型：${allowedTypes.join(', ')}`
    }
  }

  return { valid: true }
}
