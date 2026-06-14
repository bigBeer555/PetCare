import { request } from '@/utils/request'
import type { LoginData, User } from '@/types/api'

export function wechatLogin(code: string) {
  return request<LoginData>({
    url: '/auth/wechat/login',
    method: 'POST',
    data: { code },
    auth: false,
  })
}

export function getAuthMe() {
  return request<User>({
    url: '/auth/me',
    method: 'GET',
  })
}
