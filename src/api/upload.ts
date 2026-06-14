import { API_BASE_URL } from '@/config/env'
import type { ApiResponse, UploadImageData } from '@/types/api'
import { getToken } from '@/utils/storage'
import { ApiError } from '@/utils/request'

export function uploadImage(filePath: string): Promise<UploadImageData> {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: `${API_BASE_URL}/upload/image`,
      filePath,
      name: 'file',
      header: {
        Authorization: `Bearer ${getToken()}`,
      },
      success: (res) => {
        try {
          const body = JSON.parse(res.data) as ApiResponse<UploadImageData>
          if (body.code !== 0) {
            reject(new ApiError(body.message || '上传失败', body.code, res.statusCode))
            return
          }
          resolve(body.data)
        } catch {
          reject(new ApiError('上传响应解析失败', -1, res.statusCode))
        }
      },
      fail: (err) => {
        reject(new ApiError(err.errMsg || '上传失败', -1, 0))
      },
    })
  })
}
