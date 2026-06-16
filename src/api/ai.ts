import { request } from '@/utils/request'
import type {
  AiConversationDetail,
  AiConversationListItem,
  CreateAiConversationRequest,
  DeleteAiConversationData,
  SendAiMessageData,
  SendAiMessageRequest,
} from '@/types/api'

export function fetchAiConversations() {
  return request<AiConversationListItem[]>({
    url: '/ai/conversations',
    method: 'GET',
  })
}

export function createAiConversation(data: CreateAiConversationRequest = {}) {
  return request<AiConversationDetail>({
    url: '/ai/conversations',
    method: 'POST',
    data,
  })
}

export function fetchAiConversation(id: number) {
  return request<AiConversationDetail>({
    url: `/ai/conversations/${id}`,
    method: 'GET',
  })
}

export function sendAiMessage(conversationId: number, data: SendAiMessageRequest) {
  return request<SendAiMessageData>({
    url: `/ai/conversations/${conversationId}/messages`,
    method: 'POST',
    data,
  })
}

export function deleteAiConversation(id: number) {
  return request<DeleteAiConversationData>({
    url: `/ai/conversations/${id}`,
    method: 'DELETE',
  })
}
