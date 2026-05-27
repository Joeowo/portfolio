/**
 * Format date to locale string
 * @param date - Date object, timestamp, or date string
 * @param format - Format type: 'full', 'short', 'time', or 'relative'
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | number | string,
  format: 'full' | 'short' | 'time' | 'relative' = 'short'
): string {
  const dateObj = typeof date === 'object' ? date : new Date(date)

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date'
  }

  const now = new Date()
  const diffMs = now.getTime() - dateObj.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  switch (format) {
    case 'full':
      return dateObj.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })

    case 'time':
      return dateObj.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      })

    case 'relative':
      if (diffSecs < 60) return '刚刚'
      if (diffMins < 60) return `${diffMins}分钟前`
      if (diffHours < 24) return `${diffHours}小时前`
      if (diffDays < 7) return `${diffDays}天前`
      if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`
      if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`
      return `${Math.floor(diffDays / 365)}年前`

    case 'short':
    default:
      return dateObj.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
  }
}

/**
 * Format file size to human-readable string
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

/**
 * Format number with locale-specific formatting
 * @param num - Number to format
 * @param options - Intl.NumberFormatOptions
 * @returns Formatted number string
 */
export function formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
  if (isNaN(num)) return '0'

  return num.toLocaleString('zh-CN', options)
}

/**
 * Format number as compact string (e.g., 1.2K, 1.5M)
 * @param num - Number to format
 * @returns Compact formatted string
 */
export function formatNumberCompact(num: number): string {
  if (isNaN(num)) return '0'

  const abs = Math.abs(num)
  const sign = num < 0 ? '-' : ''

  if (abs >= 1_000_000_000) {
    return `${sign}${(abs / 1_000_000_000).toFixed(1)}B`
  }
  if (abs >= 1_000_000) {
    return `${sign}${(abs / 1_000_000).toFixed(1)}M`
  }
  if (abs >= 1_000) {
    return `${sign}${(abs / 1_000).toFixed(1)}K`
  }

  return num.toString()
}

/**
 * Format duration in seconds to human-readable string
 * @param seconds - Duration in seconds
 * @returns Formatted duration string (e.g., "1:23:45" or "3:45")
 */
export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00'

  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  const pad = (n: number) => n.toString().padStart(2, '0')

  if (hours > 0) {
    return `${hours}:${pad(mins)}:${pad(secs)}`
  }
  return `${mins}:${pad(secs)}`
}

/**
 * Format percentage with optional decimal places
 * @param value - Value between 0 and 1
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercent(value: number, decimals = 0): string {
  if (isNaN(value)) return '0%'

  return `${(value * 100).toFixed(decimals)}%`
}
