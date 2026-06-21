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

export interface PetTag {
  id: string
  petId: string
  label: string
  createdAt: string
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
  tags: PetTag[]
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

export interface CreatePetTagRequest {
  label: string
}

export interface DeletePetTagData {
  deleted: true
}

export interface UploadImageData {
  url: string
  filename: string
  size: number
  ext: string
}

export interface DeletePetData {
  deleted: true
}

export interface AiMessage {
  id: number | null
  role: 'user' | 'assistant' | string
  content: string
  createdAt: string
  isWelcome: boolean
  imageUrls?: string[]
  localImagePaths?: string[]
}

export interface AiConversationListItem {
  id: number
  title: string
  petId: number | null
  preview: string
  messageCount: number
  createdAt: string
  updatedAt: string
}

export interface AiConversationDetail {
  id: number
  title: string
  petId: number | null
  messageCount: number
  messages: AiMessage[]
  createdAt: string
  updatedAt: string
}

export interface CreateAiConversationRequest {
  petId?: number
}

export interface SendAiMessageRequest {
  message?: string
  imageUrls?: string[]
}

export interface SendAiMessageData {
  conversationId: number
  title: string
  model: string
  userMessage: AiMessage
  assistantMessage: AiMessage
}

export interface DeleteAiConversationData {
  deleted: true
}
