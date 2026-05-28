import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { showNotification } from './notification'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

interface ApiResponse<T = unknown> {
  code: number
  msg: string
  data: T
}

class Request {
  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        // Debug: Log outgoing requests
        console.log('[Request] Sending:', config.method?.toUpperCase(), config.url)
        return config
      },
      error => {
        console.error('[Request] Request error:', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        console.log('[Request] Response received:', response.config.url, {
          status: response.status,
          hasData: !!response.data,
          dataType: typeof response.data,
          dataKeys: response.data ? Object.keys(response.data) : null
        })

        // Check if response.data exists
        if (!response.data || typeof response.data !== 'object') {
          console.error('[Request] Invalid response:', response)
          showNotification('error', '服务器响应格式错误')
          return Promise.reject(new Error('Invalid response'))
        }

        const { code, msg, data } = response.data

        if (code === 200) {
          console.log('[Request] Success:', { url: response.config.url, dataType: typeof data })
          return data
        }

        // Handle business errors
        console.error('[Request] Business error:', { code, msg, data, url: response.config?.url })
        showNotification('warning', msg || '请求失败')
        return Promise.reject(new Error(msg || '请求失败'))
      },
      error => {
        // Handle HTTP errors
        if (error.response) {
          const { status, data } = error.response

          switch (status) {
            case 401:
              showNotification('error', '未授权，请重新登录')
              localStorage.removeItem('token')
              window.location.href = '/login'
              break
            case 403:
              showNotification('error', '无权限访问')
              break
            case 404:
              showNotification('error', '请求的资源不存在')
              break
            case 500:
              showNotification('error', '服务器错误')
              break
            default:
              showNotification('error', data?.msg || '请求失败')
          }
        } else if (error.request) {
          showNotification('error', '网络错误，请检查网络连接')
        } else {
          showNotification('error', '请求配置错误')
        }

        return Promise.reject(error)
      }
    )
  }

  public get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  public post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config)
  }

  public put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config)
  }

  public delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config)
  }

  public patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch(url, data, config)
  }
}

const request = new Request({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default request
export type { ApiResponse }
