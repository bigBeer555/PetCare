<template>
  <view class="page">
    <PageNavBar title="AI宠物师" fixed compact title-size="44rpx" />

    <scroll-view
      class="chat-scroll"
      scroll-y
      :scroll-top="scrollTop"
      :show-scrollbar="false"
    >
      <view class="chat-list">
        <!-- AI 欢迎消息 -->
        <view class="message-row message-row-ai">
          <view class="avatar-ai">
            <image class="avatar-ai-icon" src="/static/svg/smart.svg" mode="aspectFit" />
          </view>
          <view class="message-content">
            <view class="bubble bubble-ai">
              <text class="bubble-text">
                您好！我是您的AI宠物顾问。根据档案，我看到您的毛孩子有
                <text class="text-highlight">玻璃胃</text>
                和
                <text class="text-highlight">鸡肉过敏</text>
                的情况。
              </text>
              <text class="bubble-text bubble-text-gap">
                今天有什么我可以帮您的吗？不管是日常饮食还是健康咨询，我都在这里。
              </text>
            </view>
            <text class="message-time">上午 10:00</text>
          </view>
        </view>

        <!-- 用户消息 -->
        <view class="message-row message-row-user">
          <image
            class="avatar-user"
            :src="userAvatar"
            mode="aspectFill"
          />
          <view class="message-content message-content-user">
            <view class="bubble bubble-user">
              <text class="bubble-text bubble-text-light">
                它最近有点软便，我该怎么办？需要换粮吗？
              </text>
            </view>
            <text class="message-time message-time-right">上午 10:05</text>
          </view>
        </view>

        <!-- AI 详细回复 -->
        <view class="message-row message-row-ai">
          <view class="avatar-ai">
            <image class="avatar-ai-icon" src="/static/svg/smart.svg" mode="aspectFit" />
          </view>
          <view class="message-content message-content-wide">
            <view class="bubble bubble-ai">
              <text class="bubble-text">
                考虑到它属于
                <text class="tag-secondary">玻璃胃</text>
                ，软便可能与应激或饮食不当有关。建议采取以下步骤：
              </text>
              <view class="tip-list">
                <view v-for="(tip, index) in aiTips" :key="index" class="tip-item">
                  <image class="tip-icon" src="/static/svg/check-success.svg" mode="aspectFit" />
                  <text class="tip-text">{{ tip }}</text>
                </view>
              </view>
            </view>
            <text class="message-time">上午 10:06</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部输入区 -->
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
        <view class="input-action" @click="onAttach">
          <image class="input-action-icon" src="/static/svg/add-label.svg" mode="aspectFit" />
        </view>
        <input
          v-model="inputMessage"
          class="input-field"
          type="text"
          placeholder="咨询AI宠物师..."
          confirm-type="send"
          @confirm="onSend"
        />
        <view class="send-btn" @click="onSend">
          <image class="send-icon" src="/static/svg/nav-back.svg" mode="aspectFit" />
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import PageNavBar from '@/components/page-nav-bar/index.vue'

const userAvatar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCgfGsva-YXEjjumEmPI8CQqYTIlBgD1nY0TNxW0Rt3pqc9nZITc9KXXUs_bdSvtTC2iRmxWb3frb-OsXek9cGg_T7tKGQDnxUQJj3AlRC5PjQRn5gqdxH6l-6jj0MtuMPTxI6wtBqlQjNnWypi7cUO1V1Lqpxkh2sB9sW2PAtZw5KjnbQqxl-1FvrNlLoZXSrh604yUljWc6hCGJyEGcDVsnTrHbiqp4ZDYTrRXHLrcf8akP5pyl2kyKXAvfp-_f93yRbzEcD4wKs'

const inputMessage = ref('')
const scrollTop = ref(0)

const suggestions = [
  { text: '最近拉肚子怎么办？', type: 'chip-primary' },
  { text: '换粮需要注意什么？', type: 'chip-secondary' },
  { text: '疫苗接种提醒', type: 'chip-tertiary' },
]

const aiTips = [
  '暂时禁食4-6小时，给肠胃减负。',
  '补充益生菌，观察粪便形状变化。',
  '由于它鸡肉过敏，换粮时请务必避开禽类蛋白。',
]

const scrollToBottom = () => {
  nextTick(() => {
    scrollTop.value = 99999
  })
}

const onSuggestion = (text: string) => {
  inputMessage.value = text
}

const onAttach = () => {
  uni.showToast({ title: '添加附件', icon: 'none' })
}

const onSend = () => {
  if (!inputMessage.value.trim()) {
    uni.showToast({ title: '请输入咨询内容', icon: 'none' })
    return
  }
  uni.showToast({ title: '已发送', icon: 'none' })
  inputMessage.value = ''
}

onMounted(scrollToBottom)
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

.chat-scroll {
  flex: 1;
  height: 0;
  padding-top: calc(96rpx + env(safe-area-inset-top));
  padding-bottom: 200rpx;
  box-sizing: border-box;
}

.chat-list {
  padding: 48rpx 40rpx;
  display: flex;
  flex-direction: column;
  gap: 48rpx;
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

.bubble-text {
  display: block;
  font-size: 28rpx;
  line-height: 40rpx;
  color: var(--color-on-surface);
}

.bubble-text-gap {
  margin-top: 16rpx;
}

.bubble-text-light {
  color: var(--color-on-primary);
}

.text-highlight {
  color: var(--color-tertiary);
  font-weight: 700;
}

.tag-secondary {
  background: var(--color-secondary-fixed);
  color: var(--color-on-secondary-fixed);
  padding: 0 8rpx;
  border-radius: 8rpx;
}

.tip-list {
  margin-top: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
}

.tip-icon {
  width: 32rpx;
  height: 32rpx;
  margin-top: 4rpx;
  flex-shrink: 0;
}

.tip-text {
  flex: 1;
  font-size: 28rpx;
  line-height: 40rpx;
  color: var(--color-on-surface);
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
  padding: 0 40rpx calc(24rpx + env(safe-area-inset-bottom));
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
  background: rgba(118, 215, 196, 0.2);
  color: var(--color-primary);
  border: 1rpx solid rgba(0, 107, 93, 0.3);
}

.chip-secondary {
  background: rgba(143, 198, 253, 0.2);
  color: var(--color-secondary);
  border: 1rpx solid rgba(36, 98, 147, 0.3);
}

.chip-tertiary {
  background: rgba(255, 182, 132, 0.2);
  color: var(--color-tertiary);
  border: 1rpx solid rgba(138, 80, 36, 0.3);
}

.input-bar {
  background: var(--color-surface-container-lowest);
  padding: 16rpx;
  border-radius: 9999rpx;
  border: 2rpx solid var(--color-surface-variant);
  box-shadow: 0 8rpx 32rpx rgba(0, 107, 93, 0.05);
  display: flex;
  align-items: center;
  gap: 16rpx;
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
  height: 80rpx;
  background: var(--color-surface-container-low);
  border-radius: 9999rpx;
  padding: 0 32rpx;
  font-size: 28rpx;
  color: var(--color-on-surface);
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
}

.send-icon {
  width: 36rpx;
  height: 36rpx;
  transform: rotate(180deg);
}
</style>
