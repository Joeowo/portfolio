import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import authApi from '../api/authApi'
import type { LoginDto, RegisterDto, User } from '../types'

const TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'user'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const refreshTokenValue = ref<string | null>(localStorage.getItem(REFRESH_TOKEN_KEY))
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  // Computed
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() =>
    user.value?.role === 'ADMIN' || user.value?.role === 'SUPER_ADMIN'
  )
  const username = computed(() => user.value?.username ?? '')
  const nickname = computed(() => user.value?.nickname ?? user.value?.username ?? '')

  // Actions
  function setToken(newToken: string | null) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  }

  function setRefreshToken(newRefreshToken: string | null) {
    refreshTokenValue.value = newRefreshToken
    if (newRefreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)
    } else {
      localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
  }

  function setUser(newUser: User | null) {
    user.value = newUser
    if (newUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  }

  function restoreUser() {
    const savedUser = localStorage.getItem(USER_KEY)
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser)
      } catch {
        user.value = null
      }
    }
  }

  async function login(loginDto: LoginDto) {
    isLoading.value = true
    try {
      const response = await authApi.login(loginDto)
      setToken(response.token)
      setRefreshToken(response.refreshToken)
      setUser(response.user)
      return response
    } finally {
      isLoading.value = false
    }
  }

  async function register(registerDto: RegisterDto) {
    isLoading.value = true
    try {
      const response = await authApi.register(registerDto)
      setToken(response.token)
      setRefreshToken(response.refreshToken)
      setUser(response.user)
      return response
    } finally {
      isLoading.value = false
    }
  }

  async function getMe() {
    if (!token.value) {
      return null
    }
    isLoading.value = true
    try {
      const userData = await authApi.getMe()
      setUser(userData)
      return userData
    } catch (err) {
      // Token might be invalid, clear auth
      clearAuth()
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function refreshAccessToken() {
    if (!refreshTokenValue.value) {
      throw new Error('No refresh token available')
    }
    try {
      const response = await authApi.refreshToken({
        refreshToken: refreshTokenValue.value
      })
      setToken(response.token)
      setRefreshToken(response.refreshToken)
      setUser(response.user)
      return response
    } catch (err) {
      clearAuth()
      throw err
    }
  }

  async function logout() {
    try {
      await authApi.logout()
    } finally {
      clearAuth()
    }
  }

  function clearAuth() {
    setToken(null)
    setRefreshToken(null)
    setUser(null)
  }

  async function updateProfile(data: {
    nickname?: string
    avatar?: string
    bio?: string
  }) {
    isLoading.value = true
    try {
      const updatedUser = await authApi.updateProfile(data)
      setUser(updatedUser)
      return updatedUser
    } finally {
      isLoading.value = false
    }
  }

  // Initialize user from localStorage
  restoreUser()

  return {
    // State
    token,
    user,
    isLoading,

    // Computed
    isAuthenticated,
    isAdmin,
    username,
    nickname,

    // Actions
    login,
    register,
    getMe,
    logout,
    clearAuth,
    refreshAccessToken,
    updateProfile,
    setUser
  }
})
