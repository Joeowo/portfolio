import { computed, type ComputedRef } from 'vue'

// TODO: Replace with actual authStore import when implemented
// import { useAuthStore } from '@/features/auth/stores/authStore'

export interface User {
  id: number
  username: string
  nickname?: string
  avatarUrl?: string
  email?: string
  bio?: string
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
  createdAt: string
}

interface AuthStore {
  token: string | null
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export interface UseAuthReturn {
  user: ComputedRef<User | null>
  isAuthenticated: ComputedRef<boolean>
  isAdmin: ComputedRef<boolean>
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  // Placeholder until authStore is implemented
  const mockAuthStore: AuthStore = {
    token: localStorage.getItem('token'),
    user: null,
    login: async () => {
      // Mock implementation
    },
    logout: () => {
      localStorage.removeItem('token')
    },
    checkAuth: async () => {
      // Mock implementation
    }
  }

  const user = computed(() => mockAuthStore.user)
  const isAuthenticated = computed(() => !!mockAuthStore.token)
  const isAdmin = computed(() => {
    return mockAuthStore.user?.role === 'ADMIN' || mockAuthStore.user?.role === 'SUPER_ADMIN'
  })

  const login = async (username: string, password: string) => {
    await mockAuthStore.login(username, password)
  }

  const logout = () => {
    mockAuthStore.logout()
  }

  const checkAuth = async () => {
    await mockAuthStore.checkAuth()
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    checkAuth
  }
}
