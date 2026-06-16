<template>
  <view class="page">
    <PageNavBar
      variant="brand"
      :title="navTitle"
      sticky
      title-size="24"
      :avatar="navAvatar"
    >
      <template #right>
        <view class="nav-actions">
          <view class="nav-action-btn" @click.stop="openConversationList">
            <view class="nav-action-icon nav-action-icon--message" />
          </view>
          <view class="nav-action-btn" @click.stop="onNewConversation">
            <view class="nav-action-icon nav-action-icon--session" />
          </view>
        </view>
      </template>
    </PageNavBar>

    <scroll-view
      class="chat-scroll"
      scroll-y
      :scroll-into-view="scrollIntoView"
      scroll-with-animation
      :show-scrollbar="false"
    >
      <view v-if="pageLoading" class="state-box">
        <text class="state-text">加载中...</text>
      </view>

      <view v-else class="chat-list">
        <view
          v-for="(msg, index) in displayMessages"
          :key="msg.isWelcome ? 'welcome-message' : (msg.id ?? `msg-${index}`)"
          class="message-row"
          :class="msg.role === 'user' ? 'message-row-user' : 'message-row-ai'"
        >
          <view v-if="msg.role !== 'user'" class="avatar-ai">
            <image class="avatar-ai-icon" src="/static/svg/smart.svg" mode="aspectFit" />
          </view>
          <image
            v-else
            class="avatar-user"
            :src="userAvatar"
            mode="aspectFill"
          />
          <view
            class="message-content"
            :class="{
              'message-content-user': msg.role === 'user',
              'message-content-wide': msg.role !== 'user',
            }"
          >
            <view
              class="bubble"
              :class="[
                msg.role === 'user' ? 'bubble-user' : 'bubble-ai',
                isMessageStreaming(msg) ? 'bubble-streaming' : '',
              ]"
            >
              <view
                v-if="msg.role === 'user' && getMessageImages(msg).length"
                class="bubble-images"
              >
                <image
                  v-for="(src, imgIndex) in getMessageImages(msg)"
                  :key="`${msg.id ?? index}-img-${imgIndex}`"
                  class="bubble-image"
                  :src="src"
                  mode="aspectFill"
                  @click="previewMessageImages(getMessageImages(msg), imgIndex)"
                />
              </view>
              <text
                v-if="getMessageContent(msg)"
                class="bubble-text"
                :class="{ 'bubble-text-light': msg.role === 'user' }"
              >
                {{ getMessageContent(msg) }}<text
                  v-if="isMessageStreaming(msg)"
                  class="stream-cursor"
                >▍</text>
              </text>
            </view>
            <text
              v-if="msg.createdAt && !isMessageStreaming(msg)"
              class="message-time"
              :class="{ 'message-time-right': msg.role === 'user' }"
            >
              {{ formatMessageTime(msg.createdAt) }}
            </text>
          </view>
        </view>

        <view v-if="sending" class="message-row message-row-ai">
          <view class="avatar-ai">
            <image class="avatar-ai-icon" src="/static/svg/smart.svg" mode="aspectFit" />
          </view>
          <view class="message-content">
            <view class="bubble bubble-ai bubble-loading">
              <text class="bubble-text thinking-text">
                正在思考中<text class="thinking-dots">{{ thinkingDots }}</text>
              </text>
            </view>
          </view>
        </view>
        <view id="chat-bottom-anchor" class="chat-bottom-anchor" />
      </view>
    </scroll-view>

    <view class="bottom-panel">
      <scroll-view class="suggestions-scroll" scroll-x :show-scrollbar="false">
        <view class="suggestions-row">
          <view
            v-for="item in suggestions"
            :key="item.text"
            class="suggestion-chip"
            :class="item.type"
            @click="onSuggestion(item.text)"
          >
            <text>{{ item.text }}</text>
          </view>
        </view>
      </scroll-view>

      <view class="input-bar">
        <view v-if="pendingImages.length" class="pending-images">
          <view
            v-for="item in pendingImages"
            :key="item.id"
            class="pending-image-item"
          >
            <image
              class="pending-image"
              :src="item.localPath"
              mode="aspectFill"
              @click.stop="previewPendingImages(item.id)"
            />
            <view v-if="item.uploading" class="pending-image-mask">
              <text class="pending-image-mask-text">上传中</text>
            </view>
            <view class="pending-image-remove" @click.stop="removePendingImage(item.id)">
              <text>×</text>
            </view>
          </view>
          <view
            v-if="pendingImages.length < MAX_PENDING_IMAGES"
            class="pending-image-item pending-add-btn"
            :class="{ 'pending-add-btn-disabled': sending || isStreamingReply }"
            @click.stop="onAttach"
          >
            <text class="pending-add-plus">+</text>
          </view>
        </view>

        <view class="input-row">
          <view
            v-if="!pendingImages.length"
            class="input-action"
            :class="{ 'input-action-disabled': sending || isStreamingReply }"
            @click="onAttach"
          >
            <image class="input-action-icon" src="/static/svg/img-up.svg" mode="aspectFit" />
          </view>
          <textarea
            v-model="inputMessage"
            class="input-field"
            :disabled="sending || isStreamingReply"
            placeholder="咨询AI宠物师，可附带图片"
            :maxlength="2000"
            :auto-height="true"
            confirm-type="send"
            @confirm="onSend"
          />
          <view
            class="send-btn"
            :class="{ 'send-btn-disabled': !canSend || sending || isStreamingReply }"
            @click="onSend"
          >
            <image class="send-icon" src="/static/svg/send-message.svg" mode="aspectFit" />
          </view>
        </view>
      </view>
    </view>

    <view v-if="showList" class="drawer-mask" @click="closeConversationList" />
    <view class="drawer" :class="{ 'drawer-open': showList }">
      <view class="drawer-header">
        <text class="drawer-title">聊天记录</text>
        <view class="drawer-new-btn" @click="onNewConversation">
          <text>新对话</text>
        </view>
      </view>

      <scroll-view class="drawer-scroll" scroll-y :show-scrollbar="false">
        <view v-if="listLoading" class="state-box">
          <text class="state-text">加载中...</text>
        </view>

        <view v-else-if="conversations.length === 0" class="state-box">
          <text class="state-text">暂无聊天记录</text>
          <text class="state-subtext">点击「新对话」开始咨询</text>
        </view>

        <view v-else class="conversation-list">
          <view
            v-for="item in conversations"
            :key="item.id"
            class="conversation-item"
            :class="{ 'conversation-item-active': item.id === currentConversationId }"
            @click="onSelectConversation(item.id)"
          >
            <view class="conversation-main">
              <text class="conversation-title">{{ item.title }}</text>
              <text class="conversation-preview">{{ item.preview }}</text>
            </view>
            <view class="conversation-meta">
              <text class="conversation-time">{{ formatListTime(item.updatedAt) }}</text>
              <view class="conversation-delete" @click.stop="onDeleteConversation(item.id)">
                <text>删除</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { onShow, onUnload } from '@dcloudio/uni-app'
import PageNavBar from '@/components/page-nav-bar/index.vue'
import {
  createAiConversation,
  deleteAiConversation,
  fetchAiConversation,
  fetchAiConversations,
  sendAiMessage,
} from '@/api/ai'
import { uploadImage } from '@/api/upload'
import type { AiConversationListItem, AiMessage, SendAiMessageRequest } from '@/types/api'
import { defaultPetRef, refreshDefaultPet } from '@/utils/default-pet'
import { ensureLoggedIn, handleApiError } from '@/utils/auth'
import { getPetAvatarUrl } from '@/utils/pet-mapper'
import { getStoredUser } from '@/utils/storage'

const AI_WELCOME_MESSAGE =
  '您好！我是您的AI宠物顾问。今天有什么我可以帮您的吗？不管是日常饮食还是健康咨询，我都在这里。'

const STREAM_CHAR_INTERVAL_MS = 32
const STREAM_SCROLL_EVERY_CHARS = 4
const THINKING_DOTS_INTERVAL_MS = 450
const MAX_PENDING_IMAGES = 4

interface PendingImage {
  id: string
  localPath: string
  url: string | null
  uploading: boolean
}

const fallbackUserAvatar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCgfGsva-YXEjjumEmPI8CQqYTIlBgD1nY0TNxW0Rt3pqc9nZITc9KXXUs_bdSvtTC2iRmxWb3frb-OsXek9cGg_T7tKGQDnxUQJj3AlRC5PjQRn5gqdxH6l-6jj0MtuMPTxI6wtBqlQjNnWypi7cUO1V1Lqpxkh2sB9sW2PAtZw5KjnbQqxl-1FvrNlLoZXSrh604yUljWc6hCGJyEGcDVsnTrHbiqp4ZDYTrRXHLrcf8akP5pyl2kyKXAvfp-_f93yRbzEcD4wKs'

const inputMessage = ref('')
const scrollIntoView = ref('')
const pageLoading = ref(false)
const listLoading = ref(false)
const sending = ref(false)
const showList = ref(false)
const conversations = ref<AiConversationListItem[]>([])
const currentConversationId = ref<number | null>(null)
const currentTitle = ref('AI宠物师')
const messages = ref<AiMessage[]>([])
const pendingImages = ref<PendingImage[]>([])
const streamingMessageId = ref<number | null>(null)
const streamingDisplayedText = ref('')

let streamTimer: ReturnType<typeof setInterval> | null = null
let thinkingDotsTimer: ReturnType<typeof setInterval> | null = null

const thinkingDots = ref('.')

const suggestions = [
  { text: '最近拉肚子怎么办？', type: 'chip-primary' },
  { text: '换粮需要注意什么？', type: 'chip-secondary' },
  { text: '疫苗接种提醒', type: 'chip-tertiary' },
]

const navTitle = computed(() => defaultPetRef.value?.name || 'AI宠物师')
const navAvatar = computed(() =>
  defaultPetRef.value ? getPetAvatarUrl(defaultPetRef.value) : '',
)

const userAvatar = computed(() => {
  const user = getStoredUser()
  return user?.avatarUrl || fallbackUserAvatar
})

const createWelcomeMessage = (): AiMessage => ({
  id: null,
  role: 'assistant',
  content: AI_WELCOME_MESSAGE,
  createdAt: '',
  isWelcome: true,
})

const withoutWelcomeMessages = (list: AiMessage[]) =>
  list.filter((item) => !item.isWelcome)

const displayMessages = computed(() => [
  createWelcomeMessage(),
  ...withoutWelcomeMessages(messages.value),
])

const scrollToBottom = () => {
  nextTick(() => {
    scrollIntoView.value = ''
    nextTick(() => {
      scrollIntoView.value = 'chat-bottom-anchor'
    })
  })
}

const createOptimisticUserMessage = (
  content: string,
  imageUrls: string[] = [],
  localImagePaths: string[] = [],
): AiMessage => ({
  id: -Date.now(),
  role: 'user',
  content,
  createdAt: '',
  isWelcome: false,
  imageUrls: imageUrls.length ? imageUrls : undefined,
  localImagePaths: localImagePaths.length ? localImagePaths : undefined,
})

const isStreamingReply = computed(() => streamingMessageId.value !== null)

const hasPendingUpload = computed(() =>
  pendingImages.value.some((item) => item.uploading),
)

const canSend = computed(() => {
  const text = inputMessage.value.trim()
  const readyImages = pendingImages.value.filter((item) => item.url)
  return Boolean(text || readyImages.length) && !hasPendingUpload.value
})

const isMessageStreaming = (msg: AiMessage) =>
  msg.role === 'assistant' &&
  msg.id !== null &&
  streamingMessageId.value === msg.id

const getMessageContent = (msg: AiMessage) => {
  if (isMessageStreaming(msg)) {
    return streamingDisplayedText.value
  }
  return msg.content
}

const getMessageImages = (msg: AiMessage) => {
  if (msg.localImagePaths?.length) {
    return msg.localImagePaths
  }
  return msg.imageUrls ?? []
}

const previewMessageImages = (urls: string[], index: number) => {
  if (!urls.length) return
  uni.previewImage({ urls, current: urls[index] })
}

const previewPendingImages = (id: string) => {
  const urls = pendingImages.value.map((item) => item.localPath)
  const index = pendingImages.value.findIndex((item) => item.id === id)
  if (index < 0 || !urls.length) return
  uni.previewImage({ urls, current: urls[index] })
}

const pickImages = (sourceType: Array<'album' | 'camera'>) => {
  const remaining = MAX_PENDING_IMAGES - pendingImages.value.length
  if (remaining <= 0) {
    uni.showToast({ title: `最多上传${MAX_PENDING_IMAGES}张图片`, icon: 'none' })
    return
  }

  uni.chooseImage({
    count: remaining,
    sizeType: ['compressed'],
    sourceType,
    success: (res) => {
      const paths = Array.isArray(res.tempFilePaths)
        ? res.tempFilePaths
        : [res.tempFilePaths]
      paths.forEach((localPath: string) => {
        void uploadPendingImage(localPath)
      })
    },
  })
}

const stopStreamTyping = () => {
  if (streamTimer !== null) {
    clearInterval(streamTimer)
    streamTimer = null
  }
  streamingMessageId.value = null
  streamingDisplayedText.value = ''
}

const stopThinkingAnimation = () => {
  if (thinkingDotsTimer !== null) {
    clearInterval(thinkingDotsTimer)
    thinkingDotsTimer = null
  }
  thinkingDots.value = '.'
}

const startThinkingAnimation = () => {
  stopThinkingAnimation()
  let step = 0
  thinkingDots.value = '.'
  thinkingDotsTimer = setInterval(() => {
    step = (step + 1) % 3
    thinkingDots.value = '.'.repeat(step + 1)
  }, THINKING_DOTS_INTERVAL_MS)
}

watch(sending, (isSending) => {
  if (isSending) {
    startThinkingAnimation()
  } else {
    stopThinkingAnimation()
  }
})

const startStreamTyping = (message: AiMessage) => {
  stopStreamTyping()

  if (!message.id || !message.content) {
    scrollToBottom()
    return
  }

  streamingMessageId.value = message.id
  streamingDisplayedText.value = ''
  const fullText = message.content
  let index = 0

  streamTimer = setInterval(() => {
    index += 1
    streamingDisplayedText.value = fullText.slice(0, index)

    if (index % STREAM_SCROLL_EVERY_CHARS === 0 || index >= fullText.length) {
      scrollToBottom()
    }

    if (index >= fullText.length) {
      stopStreamTyping()
    }
  }, STREAM_CHAR_INTERVAL_MS)
}

const formatMessageTime = (datetime: string) => {
  const timePart = datetime.split(' ')[1] || datetime
  const [hourText, minuteText] = timePart.split(':')
  const hour = Number(hourText)
  const minute = minuteText || '00'
  if (Number.isNaN(hour)) {
    return timePart.slice(0, 5)
  }
  const period = hour < 12 ? '上午' : '下午'
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  return `${period} ${hour12}:${minute}`
}

const formatListTime = (datetime: string) => {
  const datePart = datetime.split(' ')[0] || ''
  const today = new Date()
  const todayText = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  if (datePart === todayText) {
    return formatMessageTime(datetime)
  }
  return datePart.slice(5)
}

const loadConversationList = async () => {
  listLoading.value = true
  try {
    conversations.value = await fetchAiConversations()
  } catch (error) {
    handleApiError(error, '加载聊天记录失败')
  } finally {
    listLoading.value = false
  }
}

const loadConversationDetail = async (conversationId: number) => {
  stopStreamTyping()
  pageLoading.value = true
  try {
    const detail = await fetchAiConversation(conversationId)
    currentConversationId.value = detail.id
    currentTitle.value = detail.title
    messages.value = withoutWelcomeMessages(detail.messages)
    scrollToBottom()
  } catch (error) {
    handleApiError(error, '加载对话失败')
  } finally {
    pageLoading.value = false
  }
}

const initPage = async () => {
  stopStreamTyping()

  if (!ensureLoggedIn()) {
    messages.value = []
    conversations.value = []
    currentConversationId.value = null
    currentTitle.value = 'AI宠物师'
    return
  }

  pageLoading.value = true
  try {
    await refreshDefaultPet()
    conversations.value = await fetchAiConversations()

    if (conversations.value.length > 0) {
      await loadConversationDetail(conversations.value[0].id)
      return
    }

    currentConversationId.value = null
    currentTitle.value = 'AI宠物师'
    messages.value = []
  } catch (error) {
    handleApiError(error, '加载失败')
  } finally {
    pageLoading.value = false
  }
}

const openConversationList = async () => {
  if (!ensureLoggedIn()) return
  showList.value = true
  await loadConversationList()
}

const closeConversationList = () => {
  showList.value = false
}

const onSelectConversation = async (conversationId: number) => {
  showList.value = false
  if (conversationId === currentConversationId.value) return
  await loadConversationDetail(conversationId)
}

const onNewConversation = async () => {
  if (!ensureLoggedIn()) return

  stopStreamTyping()

  try {
    pageLoading.value = true
    await refreshDefaultPet()

    const petId = defaultPetRef.value?.id
      ? Number(defaultPetRef.value.id)
      : undefined

    const detail = await createAiConversation(petId ? { petId } : {})
    currentConversationId.value = detail.id
    currentTitle.value = detail.title
    messages.value = withoutWelcomeMessages(detail.messages)
    showList.value = false
    await loadConversationList()
    scrollToBottom()
  } catch (error) {
    handleApiError(error, '创建对话失败')
  } finally {
    pageLoading.value = false
  }
}

const onDeleteConversation = (conversationId: number) => {
  uni.showModal({
    title: '删除对话',
    content: '确定删除这条聊天记录吗？',
    success: async (res) => {
      if (!res.confirm) return

      try {
        await deleteAiConversation(conversationId)
        conversations.value = conversations.value.filter((item) => item.id !== conversationId)

        if (currentConversationId.value === conversationId) {
          if (conversations.value.length > 0) {
            await loadConversationDetail(conversations.value[0].id)
          } else {
            currentConversationId.value = null
            currentTitle.value = 'AI宠物师'
            messages.value = []
          }
        }

        uni.showToast({ title: '已删除', icon: 'none' })
      } catch (error) {
        handleApiError(error, '删除失败')
      }
    },
  })
}

const ensureConversationId = async () => {
  if (currentConversationId.value) {
    return currentConversationId.value
  }

  await refreshDefaultPet()
  const petId = defaultPetRef.value?.id
    ? Number(defaultPetRef.value.id)
    : undefined

  const detail = await createAiConversation(petId ? { petId } : {})
  currentConversationId.value = detail.id
  currentTitle.value = detail.title
  const visibleMessages = withoutWelcomeMessages(messages.value)
  if (visibleMessages.length === 0) {
    messages.value = withoutWelcomeMessages(detail.messages)
  }
  await loadConversationList()
  return detail.id
}

const onSuggestion = (text: string) => {
  inputMessage.value = text
}

const onAttach = () => {
  if (!ensureLoggedIn()) return
  if (sending.value || isStreamingReply.value) return

  const remaining = MAX_PENDING_IMAGES - pendingImages.value.length
  if (remaining <= 0) {
    uni.showToast({ title: `最多上传${MAX_PENDING_IMAGES}张图片`, icon: 'none' })
    return
  }

  uni.showActionSheet({
    itemList: ['从相册选择', '拍照'],
    success: (res) => {
      if (res.tapIndex === 0) {
        pickImages(['album'])
      } else if (res.tapIndex === 1) {
        pickImages(['camera'])
      }
    },
  })
}

const uploadPendingImage = async (localPath: string) => {
  const id = `${Date.now()}-${Math.random()}`
  pendingImages.value = [
    ...pendingImages.value,
    { id, localPath, url: null, uploading: true },
  ]

  try {
    const result = await uploadImage(localPath)
    pendingImages.value = pendingImages.value.map((item) =>
      item.id === id ? { ...item, url: result.url, uploading: false } : item,
    )
  } catch (error) {
    pendingImages.value = pendingImages.value.filter((item) => item.id !== id)
    handleApiError(error, '图片上传失败')
  }
}

const removePendingImage = (id: string) => {
  pendingImages.value = pendingImages.value.filter((item) => item.id !== id)
}

const onSend = async () => {
  const text = inputMessage.value.trim()
  const readyImages = pendingImages.value.filter((item) => item.url)
  const imageUrls = readyImages.map((item) => item.url as string)
  const localImagePaths = readyImages.map((item) => item.localPath)

  if (
    (!text && imageUrls.length === 0) ||
    sending.value ||
    isStreamingReply.value ||
    hasPendingUpload.value
  ) {
    if (!text && imageUrls.length === 0) {
      uni.showToast({ title: '请输入咨询内容或上传图片', icon: 'none' })
    }
    return
  }

  if (!ensureLoggedIn()) return

  stopStreamTyping()

  const optimisticMessage = createOptimisticUserMessage(text, imageUrls, localImagePaths)
  messages.value = [...withoutWelcomeMessages(messages.value), optimisticMessage]
  inputMessage.value = ''
  pendingImages.value = []
  sending.value = true
  scrollToBottom()

  try {
    const conversationId = await ensureConversationId()
    const payload: SendAiMessageRequest = {}
    if (text) payload.message = text
    if (imageUrls.length) payload.imageUrls = imageUrls
    const result = await sendAiMessage(conversationId, payload)

    currentTitle.value = result.title
    messages.value = [
      ...withoutWelcomeMessages(messages.value).filter(
        (item) => item.id !== optimisticMessage.id,
      ),
      result.userMessage,
      result.assistantMessage,
    ]

    const listItem = conversations.value.find((item) => item.id === conversationId)
    if (listItem) {
      listItem.title = result.title
      listItem.preview = result.assistantMessage.content.slice(0, 80)
      listItem.messageCount += 2
      listItem.updatedAt = result.assistantMessage.createdAt
      conversations.value = [...conversations.value].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
    } else {
      await loadConversationList()
    }

    startStreamTyping(result.assistantMessage)
  } catch (error) {
    messages.value = messages.value.filter((item) => item.id !== optimisticMessage.id)
    inputMessage.value = text
    pendingImages.value = readyImages.map((item) => ({
      id: `${Date.now()}-${Math.random()}`,
      localPath: item.localPath,
      url: item.url,
      uploading: false,
    }))
    handleApiError(error, '发送失败')
  } finally {
    sending.value = false
  }
}

onShow(() => {
  initPage()
})

onUnload(() => {
  stopStreamTyping()
  stopThinkingAnimation()
})
</script>

<style scoped>
.page {
  --color-primary: #006b5d;
  --color-on-primary: #ffffff;
  --color-primary-container: #76d7c4;
  --color-on-primary-container: #005d51;
  --color-secondary: #246293;
  --color-secondary-container: #8fc6fd;
  --color-secondary-fixed: #cfe5ff;
  --color-on-secondary-fixed: #001d33;
  --color-tertiary: #8a5024;
  --color-tertiary-container: #ffb684;
  --color-tertiary-fixed: #ffdcc6;
  --color-on-tertiary-fixed: #301400;
  --color-background: #fcf9f2;
  --color-on-surface: #1c1c18;
  --color-on-surface-variant: #3e4946;
  --color-surface-container-low: #f6f3ec;
  --color-surface-container-lowest: #ffffff;
  --color-surface-variant: #e5e2db;
  --color-outline: #6e7a76;
  --color-outline-variant: #bdc9c5;
  /* 在 --color-background 上预混合，避免半透明 */
  --color-primary-chip-bg: #e1f2e9;
  --color-primary-chip-border: #b0cec5;
  --color-secondary-chip-bg: #e6eff4;
  --color-secondary-chip-border: #bbccd6;
  --color-tertiary-chip-bg: #fdecdc;
  --color-tertiary-chip-border: #dac6b4;
  --color-primary-highlight-bg: #ecf1ec;
}

.page {
  height: 100vh;
  background: var(--color-background);
  color: var(--color-on-surface);
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.nav-action-btn {
  width: 76rpx;
  height: 76rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nav-action-icon {
  width: var(--page-nav-bar-icon-size, 62rpx);
  height: var(--page-nav-bar-icon-size, 62rpx);
  background-color: var(--color-primary);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: var(--page-nav-bar-icon-mask-size, 132%);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: var(--page-nav-bar-icon-mask-size, 132%);
  -webkit-filter: var(--page-nav-bar-icon-bold-filter);
  filter: var(--page-nav-bar-icon-bold-filter);
  flex-shrink: 0;
}

.nav-action-icon--message {
  -webkit-mask-image: url('/static/svg/message.svg');
  mask-image: url('/static/svg/message.svg');
}

.nav-action-icon--session {
  -webkit-mask-image: url('/static/svg/session.svg');
  mask-image: url('/static/svg/session.svg');
}

.chat-scroll {
  flex: 1;
  height: 0;
  padding-bottom: 200rpx;
  box-sizing: border-box;
}

.chat-list {
  padding: 32rpx 40rpx 48rpx;
  display: flex;
  flex-direction: column;
  gap: 48rpx;
}

.chat-bottom-anchor {
  height: 1rpx;
  width: 100%;
}

.state-box {
  padding: 120rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.state-text {
  font-size: 28rpx;
  color: var(--color-outline);
}

.state-subtext {
  font-size: 24rpx;
  color: var(--color-outline-variant);
}

.message-row {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
}

.message-row-user {
  flex-direction: row-reverse;
}

.avatar-ai {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: var(--color-primary-container);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-ai-icon {
  width: 48rpx;
  height: 40rpx;
}

.avatar-user {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  min-width: 0;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.message-content-user {
  align-items: flex-end;
}

.message-content-wide {
  max-width: 85%;
}

.bubble {
  padding: 32rpx;
  border-radius: 24rpx;
}

.bubble-ai {
  background: var(--color-surface-container-lowest);
  border: 1rpx solid var(--color-surface-variant);
  border-bottom-left-radius: 8rpx;
}

.bubble-user {
  background: var(--color-primary);
  border-bottom-right-radius: 8rpx;
}

.bubble-loading {
  animation: bubble-breathe 2.4s ease-in-out infinite;
}

.thinking-text {
  color: var(--color-on-surface-variant);
}

.thinking-dots {
  display: inline-block;
  min-width: 1.5em;
  color: var(--color-primary);
  animation: thinking-dots-breathe 1.8s ease-in-out infinite;
}

@keyframes thinking-dots-breathe {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.35;
  }
}

.bubble-streaming {
  animation: bubble-breathe 2.4s ease-in-out infinite;
}

@keyframes bubble-breathe {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 0 rgba(0, 107, 93, 0);
  }

  50% {
    opacity: 0.94;
    box-shadow: 0 0 24rpx rgba(118, 215, 196, 0.35);
  }
}

.stream-cursor {
  display: inline;
  margin-left: 2rpx;
  color: var(--color-primary);
  animation: cursor-breathe 1.1s ease-in-out infinite;
}

@keyframes cursor-breathe {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.25;
  }
}

.bubble-text {
  display: block;
  font-size: 28rpx;
  line-height: 40rpx;
  color: var(--color-on-surface);
  white-space: pre-wrap;
  word-break: break-word;
}

.bubble-text-light {
  color: var(--color-on-primary);
}

.message-time {
  font-size: 20rpx;
  color: var(--color-outline);
  margin-left: 8rpx;
}

.message-time-right {
  margin-left: 0;
  margin-right: 8rpx;
}

.bottom-panel {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  padding: 0 40rpx 24rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  box-sizing: border-box;
}

.suggestions-scroll {
  width: 100%;
  white-space: nowrap;
}

.suggestions-row {
  display: inline-flex;
  gap: 16rpx;
  padding-bottom: 8rpx;
}

.suggestion-chip {
  flex-shrink: 0;
  padding: 16rpx 32rpx;
  border-radius: 9999rpx;
  font-size: 24rpx;
  font-weight: 600;
  letter-spacing: 0.05em;
  box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
}

.chip-primary {
  background: var(--color-primary-chip-bg);
  color: var(--color-primary);
  border: 1rpx solid var(--color-primary-chip-border);
}

.chip-secondary {
  background: var(--color-secondary-chip-bg);
  color: var(--color-secondary);
  border: 1rpx solid var(--color-secondary-chip-border);
}

.chip-tertiary {
  background: var(--color-tertiary-chip-bg);
  color: var(--color-tertiary);
  border: 1rpx solid var(--color-tertiary-chip-border);
}

.pending-images {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12rpx;
  padding: 4rpx 8rpx 0;
}

.pending-image-item {
  position: relative;
  width: 88rpx;
  height: 88rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pending-image {
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
  border: 1rpx solid var(--color-surface-variant);
}

.pending-image-mask {
  position: absolute;
  inset: 0;
  border-radius: 12rpx;
  background: rgba(28, 28, 24, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pending-image-mask-text {
  font-size: 18rpx;
  color: #ffffff;
}

.pending-image-remove {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  background: rgba(28, 28, 24, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pending-image-remove text {
  font-size: 22rpx;
  line-height: 1;
  color: #ffffff;
}

.pending-add-btn {
  border-radius: 12rpx;
  border: 2rpx dashed var(--color-primary-chip-border);
  background: var(--color-primary-chip-bg);
  box-sizing: border-box;
}

.pending-add-btn-disabled {
  opacity: 0.5;
}

.pending-add-plus {
  font-size: 44rpx;
  line-height: 1;
  font-weight: 300;
  color: var(--color-primary);
}

.bubble-images {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-bottom: 12rpx;
}

.bubble-images:last-child {
  margin-bottom: 0;
}

.bubble-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 0.12);
}

.input-bar {
  background: var(--color-surface-container-lowest);
  padding: 16rpx;
  border-radius: 40rpx;
  border: 2rpx solid var(--color-surface-variant);
  box-shadow: 0 8rpx 32rpx rgba(0, 107, 93, 0.05);
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.input-row {
  display: flex;
  align-items: flex-end;
}

.input-action-disabled {
  opacity: 0.5;
}

.input-action {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.input-action-icon {
  width: 40rpx;
  height: 40rpx;
}

.input-field {
  flex: 1;
  min-width: 0;
  width: 100%;
  min-height: 80rpx;
  max-height: 240rpx;
  background: var(--color-surface-container-low);
  border-radius: 32rpx;
  padding: 20rpx 32rpx;
  font-size: 28rpx;
  line-height: 40rpx;
  color: var(--color-on-surface);
  box-sizing: border-box;
}

.send-btn {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4rpx 16rpx rgba(0, 107, 93, 0.2);
  margin-left: 16rpx;
}

.send-btn-disabled {
  opacity: 0.6;
}

.send-icon {
  width: 36rpx;
  height: 36rpx;
}

.drawer-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 60;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 78%;
  max-width: 560rpx;
  background: var(--color-surface-container-lowest);
  z-index: 70;
  transform: translateX(100%);
  transition: transform 0.25s ease;
  display: flex;
  flex-direction: column;
  box-shadow: -8rpx 0 32rpx rgba(0, 0, 0, 0.08);
}

.drawer-open {
  transform: translateX(0);
}

.drawer-header {
  padding: calc(env(safe-area-inset-top) + 32rpx) 32rpx 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx solid var(--color-surface-variant);
}

.drawer-title {
  font-size: 32rpx;
  font-weight: 700;
  color: var(--color-primary);
}

.drawer-new-btn {
  padding: 12rpx 24rpx;
  border-radius: 9999rpx;
  background: var(--color-primary-chip-bg);
  border: 1rpx solid var(--color-primary-chip-border);
}

.drawer-new-btn text {
  font-size: 24rpx;
  color: var(--color-primary);
  font-weight: 600;
}

.drawer-scroll {
  flex: 1;
  height: 0;
}

.conversation-list {
  padding: 16rpx 0;
}

.conversation-item {
  padding: 24rpx 32rpx;
  display: flex;
  gap: 16rpx;
  border-bottom: 1rpx solid var(--color-surface-variant);
}

.conversation-item-active {
  background: var(--color-primary-highlight-bg);
}

.conversation-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.conversation-title {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--color-on-surface);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conversation-preview {
  font-size: 24rpx;
  color: var(--color-outline);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conversation-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12rpx;
  flex-shrink: 0;
}

.conversation-time {
  font-size: 20rpx;
  color: var(--color-outline-variant);
}

.conversation-delete text {
  font-size: 22rpx;
  color: #c0392b;
}
</style>
