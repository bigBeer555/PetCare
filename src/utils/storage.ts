import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '@/config/env'
import type { User } from '@/types/api'

export function getToken(): string {
  return uni.getStorageSync(TOKEN_STORAGE_KEY) || ''
}

export function setToken(token: string) {
  uni.setStorageSync(TOKEN_STORAGE_KEY, token)
}

export function clearToken() {
  uni.removeStorageSync(TOKEN_STORAGE_KEY)
}

export function getStoredUser(): User | null {
  const raw = uni.getStorageSync(USER_STORAGE_KEY)
  if (!raw) return null
  try {
    return typeof raw === 'string' ? JSON.parse(raw) : raw
  } catch {
    return null
  }
}

export function setStoredUser(user: User) {
  uni.setStorageSync(USER_STORAGE_KEY, user)
}

export function clearStoredUser() {
  uni.removeStorageSync(USER_STORAGE_KEY)
}

export function clearAuth() {
  clearToken()
  clearStoredUser()
}

export function isLoggedIn(): boolean {
  return !!getToken()
}
