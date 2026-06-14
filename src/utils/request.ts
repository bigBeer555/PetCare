import { API_BASE_URL } from '@/config/env'
import type { ApiResponse } from '@/types/api'
import { clearAuth } from '@/utils/storage'

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

interface RequestOptions {
  url: string
  method?: RequestMethod
  data?: UniApp.RequestOptions['data']
  auth?: boolean
}

export class ApiError extends Error {
  code: number
  statusCode: number

  constructor(message: string, code: number, statusCode: number) {
    super(message)
    this.code = code
    this.statusCode = statusCode
  }
}

function buildHeaders(auth: boolean): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (auth) {
    const token = uni.getStorageSync('petcare_access_token')
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }
  return headers
}

export function request<T>(options: RequestOptions): Promise<T> {
  const { url, method = 'GET', data, auth = true } = options

  return new Promise((resolve, reject) => {
    uni.request({
      url: `${API_BASE_URL}${url}`,
      method: method as UniApp.RequestOptions['method'],
      data,
      header: buildHeaders(auth),
      success: (res) => {
        const statusCode = res.statusCode || 0
        const body = res.data as ApiResponse<T> | undefined

        if (statusCode === 401 || body?.code === 40100) {
          clearAuth()
          reject(new ApiError(body?.message || '请先登录', body?.code || 40100, statusCode))
          return
        }

        if (!body || typeof body !== 'object' || !('code' in body)) {
          reject(new ApiError('服务响应异常', statusCode, statusCode))
          return
        }

        if (body.code !== 0) {
          reject(new ApiError(body.message || '请求失败', body.code, statusCode))
          return
        }

        resolve(body.data)
      },
      fail: (err) => {
        reject(new ApiError(err.errMsg || '网络请求失败', -1, 0))
      },
    })
  })
}
