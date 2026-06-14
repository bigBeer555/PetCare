export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface User {
  id: string
  openid: string
  unionid: string | null
  nickname: string | null
  avatarUrl: string | null
  phone: string | null
  createdAt: string
  updatedAt: string
}

export interface LoginData {
  accessToken: string
  user: User
}

export interface Pet {
  id: string
  userId: string
  name: string
  species: string
  breed: string | null
  gender: string | null
  birthday: string | null
  weight: number | null
  avatarUrl: string | null
  notes: string | null
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface CreatePetRequest {
  name: string
  species: string
  breed?: string
  gender?: string
  birthday?: string
  weight?: number
  avatarUrl?: string
  notes?: string
  isDefault?: boolean
}

export type UpdatePetRequest = Partial<CreatePetRequest>

export interface UploadImageData {
  url: string
  filename: string
  size: number
  ext: string
}

export interface DeletePetData {
  deleted: true
}
