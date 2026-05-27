import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateUrl,
  validateRequired,
  validateLength,
  validateRange,
  validateFileSize,
  validateFileType
} from '../validate'

describe('validateEmail', () => {
  it('should accept valid email addresses', () => {
    expect(validateEmail('test@example.com').valid).toBe(true)
    expect(validateEmail('user.name@example.com').valid).toBe(true)
    expect(validateEmail('user+tag@example.co.uk').valid).toBe(true)
  })

  it('should reject invalid email addresses', () => {
    expect(validateEmail('').valid).toBe(false)
    expect(validateEmail('invalid').valid).toBe(false)
    expect(validateEmail('@example.com').valid).toBe(false)
    expect(validateEmail('user@').valid).toBe(false)
  })

  it('should reject emails over 254 characters', () => {
    const longEmail = `${'a'.repeat(250)}@example.com`
    expect(validateEmail(longEmail).valid).toBe(false)
  })
})

describe('validatePassword', () => {
  it('should reject empty password', () => {
    const result = validatePassword('')
    expect(result.valid).toBe(false)
    expect(result.strength).toBe('weak')
  })

  it('should reject password shorter than 6 characters', () => {
    const result = validatePassword('abc12')
    expect(result.valid).toBe(false)
  })

  it('should calculate password strength correctly', () => {
    expect(validatePassword('abcdef').strength).toBe('weak')
    expect(validatePassword('abcdef12').strength).toBe('fair')
    expect(validatePassword('Abcdef12!').strength).toBe('good') // 10 chars + all 4 char types
    expect(validatePassword('Abcdefgh1234!').strength).toBe('strong') // 13 chars + all 4 char types = score 6
  })
})

describe('validateUsername', () => {
  it('should accept valid usernames', () => {
    expect(validateUsername('abc').valid).toBe(true)
    expect(validateUsername('user123').valid).toBe(true)
    expect(validateUsername('user_name').valid).toBe(true)
    expect(validateUsername('user-name').valid).toBe(true)
    expect(validateUsername('UserName123').valid).toBe(true)
  })

  it('should reject invalid usernames', () => {
    expect(validateUsername('').valid).toBe(false)
    expect(validateUsername('ab').valid).toBe(false) // Too short
    expect(validateUsername('123abc').valid).toBe(false) // Starts with number
    expect(validateUsername('user name').valid).toBe(false) // Contains space
    expect(validateUsername('user@name').valid).toBe(false) // Contains special char
    expect(validateUsername('a'.repeat(21)).valid).toBe(false) // Too long
  })
})

describe('validateUrl', () => {
  it('should accept valid URLs', () => {
    expect(validateUrl('https://example.com').valid).toBe(true)
    expect(validateUrl('http://example.com/path').valid).toBe(true)
    expect(validateUrl('https://example.com:8080/path?query=1').valid).toBe(true)
  })

  it('should reject invalid URLs', () => {
    expect(validateUrl('').valid).toBe(false)
    expect(validateUrl('not-a-url').valid).toBe(false)
    expect(validateUrl('example.com').valid).toBe(false)
  })
})

describe('validateRequired', () => {
  it('should reject null, undefined, or empty string', () => {
    expect(validateRequired(null).valid).toBe(false)
    expect(validateRequired(undefined).valid).toBe(false)
    expect(validateRequired('').valid).toBe(false)
  })

  it('should accept valid values', () => {
    expect(validateRequired('text').valid).toBe(true)
    expect(validateRequired(0).valid).toBe(true)
    expect(validateRequired('0').valid).toBe(true)
  })
})

describe('validateLength', () => {
  it('should validate string length', () => {
    expect(validateLength('abc', 1, 5).valid).toBe(true)
    expect(validateLength('abc', 5, 10).valid).toBe(false)
    expect(validateLength('abcdefghijk', 1, 10).valid).toBe(false)
  })
})

describe('validateRange', () => {
  it('should validate number range', () => {
    expect(validateRange(5, 1, 10).valid).toBe(true)
    expect(validateRange(0, 1, 10).valid).toBe(false)
    expect(validateRange(11, 1, 10).valid).toBe(false)
    expect(validateRange(NaN, 1, 10).valid).toBe(false)
  })
})

describe('validateFileSize', () => {
  it('should validate file size', () => {
    expect(validateFileSize(1024 * 1024, 5 * 1024 * 1024).valid).toBe(true)
    expect(validateFileSize(10 * 1024 * 1024, 5 * 1024 * 1024).valid).toBe(false)
  })
})

describe('validateFileType', () => {
  it('should validate file type', () => {
    expect(validateFileType('image.jpg', ['jpg', 'png']).valid).toBe(true)
    expect(validateFileType('document.pdf', ['jpg', 'png']).valid).toBe(false)
    expect(validateFileType('noextension', ['jpg', 'png']).valid).toBe(false)
  })
})
