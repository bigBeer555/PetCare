import { wechatLogin } from '@/api/auth'
import { clearAuth, setStoredUser, setToken } from '@/utils/storage'
import { ApiError } from '@/utils/request'

export async function loginWithWechat(): Promise<boolean> {
  const loginResult = await new Promise<UniApp.LoginRes>((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: resolve,
      fail: reject,
    })
  })

  if (!loginResult.code) {
    throw new ApiError('获取微信登录 code 失败', -1, 0)
  }

  const data = await wechatLogin(loginResult.code)
  setToken(data.accessToken)
  setStoredUser(data.user)
  return true
}

export function logout() {
  clearAuth()
}

export function ensureLoggedIn(): boolean {
  const token = uni.getStorageSync('petcare_access_token')
  if (token) return true

  uni.showToast({ title: '请先登录', icon: 'none' })
  setTimeout(() => {
    uni.navigateTo({ url: '/extra/login/index' })
  }, 300)
  return false
}

export function handleApiError(error: unknown, fallback = '操作失败') {
  const message = error instanceof ApiError ? error.message : fallback
  uni.showToast({ title: message, icon: 'none' })
}
