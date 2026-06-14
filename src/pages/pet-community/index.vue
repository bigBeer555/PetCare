<template>
  <view class="page">
    <PageNavBar
      variant="brand"
      title="训宠社区"
      sticky
      title-size="24"
      :avatar="mobileAvatar"
      @notification-click="onNotification"
    />

    <view class="tab-nav">
      <view
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-item"
        :class="{ 'tab-item-active': activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <text>{{ tab.label }}</text>
        <view v-if="activeTab === tab.id" class="tab-indicator" />
      </view>
    </view>

    <scroll-view class="feed-scroll" scroll-y :show-scrollbar="false">
      <view class="feed-list">
        <view v-for="post in posts" :key="post.id" class="post-card">
          <view class="post-header">
            <view class="post-author">
              <image class="author-avatar" :src="post.avatar" mode="aspectFill" />
              <view class="author-info">
                <view class="author-name-row">
                  <text class="author-name">{{ post.author }}</text>
                  <text class="author-badge" :class="post.badgeClass">{{ post.badge }}</text>
                </view>
                <view class="author-meta">
                  <text class="post-time">{{ post.time }}</text>
                  <view class="pet-tags">
                    <text
                      v-for="tag in post.petTags"
                      :key="tag"
                      class="pet-tag"
                    >{{ tag }}</text>
                  </view>
                </view>
              </view>
            </view>
            <view class="more-btn" @click.stop="onMore(post.id)">
              <image class="more-icon" src="/static/svg/post-more.svg" mode="aspectFit" />
            </view>
          </view>

          <text class="post-content">{{ post.content }}</text>
          <text v-if="post.expandText" class="post-expand">{{ post.expandText }}</text>

          <view v-if="post.images?.length === 1" class="post-media post-media-single">
            <image class="post-img" :src="post.images[0]" mode="aspectFill" />
          </view>
          <view v-else-if="post.images?.length" class="post-media post-media-grid">
            <image
              v-for="(img, idx) in post.images"
              :key="idx"
              class="post-img-grid-item"
              :src="img"
              mode="aspectFill"
            />
          </view>

          <view class="post-actions">
            <view class="action-group">
              <view class="action-item" @click.stop="onLike(post.id)">
                <image class="action-icon" src="/static/svg/collect.svg" mode="aspectFit" />
                <text class="action-count">{{ post.likes }}</text>
              </view>
              <view class="action-item" @click.stop="onComment(post.id)">
                <image class="action-icon" src="/static/svg/comment.svg" mode="aspectFit" />
                <text class="action-count">{{ post.comments }}</text>
              </view>
              <view class="action-item" @click.stop="onShare(post.id)">
                <image class="action-icon" src="/static/svg/share.svg" mode="aspectFit" />
                <text class="action-count">分享</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="fab" @click="onCompose">
      <image class="fab-icon" src="/static/svg/writting.svg" mode="aspectFit" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageNavBar from '@/components/page-nav-bar/index.vue'

const mobileAvatar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA61cPilVF0lUoWSxl5ohc0hgIREyHQsWwzbEpE3WgA9ArcPdY5rYdgn-QTXJ25QAciDwxLnJjY9T6aEQAOavldIfoO1iPcqkOONc4C6SVWPLWR6ACIh2uS82qyxji78MT5ZngtBTkc9OiZ2Vyw80Qo1Jw9LEMne_piO42vrlZObZZ5L63E_C5IJ42RcLBTK5iHOBFExRtul3-cHaR1irQrUXanvqO1iMtMpag_yeMKlGzizmFgehyqahp7laNm7FI8kxdp36IFzUw'

interface PostItem {
  id: number
  author: string
  avatar: string
  badge: string
  badgeClass: string
  time: string
  petTags: string[]
  content: string
  expandText?: string
  images?: string[]
  likes: number
  comments: number
}

const tabs = [
  { id: 'follow', label: '关注' },
  { id: 'recommend', label: '推荐' },
  { id: 'local', label: '同城' },
]

const activeTab = ref('recommend')

const posts: PostItem[] = [
  {
    id: 1,
    author: '麦芽麻麻',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_XIxC9V0yQy8bzCXTRrpzVklhPzcxWWdOjl-hdgFYH9YRUbWlknXZXGgO8Lj7qnjFWAzhzPYELpBtTSj8pN7lgBFef8sSX80atzDRQDBVtJV4ilecrmvtZfACApASIsmm1x4kRKrQK5T0u2PZGeKJb8-zaFRuKx2N6Jxvn1rcDIDvgFP4l3pBFumVxMMqi6Eg-QLgvv2Lk8A175nxEu7iI6zsKfRKcl6yRKX3jIskiYUsTbTFUL5RwVDuKqKjxZIsZQbjwesuOTs',
    badge: 'LV.4',
    badgeClass: 'badge-tertiary',
    time: '2小时前',
    petTags: ['金毛', '2岁'],
    content:
      '今天带麦芽去公园练习“随行”，虽然路过草坪还是有点小兴奋，但整体表现已经比上周好太多啦！奖励了它最爱的鸡肉干肉脯~ 🍗',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBj-4wmNjI45bcos7_N4T_TFE6tNPN0Nc_0cqew8i-hS_Qj9C7CpakT6LctlZUaXw8HiYe1CaE8CLOGFosJaEKAedHEjHRAKBXOX0dLAPUMqxQubmygJmlir2hQXqN4Evn4CvLeFrzowvOzUmUpl4GulC92-BiPqLO5NIoe6dN5YVGh0fIt5chOpfO57HnTeKV_id07JL6yk7eT1eNqXTX-zfazhKxrHtaRS8jevDulgD_COJj3pg-1mI471ublgL29EYAvYkGIp7c',
    ],
    likes: 128,
    comments: 24,
  },
  {
    id: 2,
    author: '汪汪队长',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCW4DfvHHOflAoTJNCV2JJnTsADU1gN9FgJ9WqVHUZ1qcVcVku6VJCizwvzpXx9x8eveL-jrjJlwkUJCmCHiTkadAwRhp66mmhKCDZnnSD_aIZzNzRTAhJat6J1y7fmk4DHZkI5Cr0OTAldsfdBNimiyh9FWBNE7N8lKiHCKQeiaecz7L4GjhHsjn-2y4bwgt5PEi7OmXdLgUsXmM5SiISqeGIhi1L_gI0onq9LWbO1Vcpo2-am-rrAOqdN8B4nGGIZjtqrZ2pN6Fo',
    badge: 'PRO',
    badgeClass: 'badge-primary',
    time: '5小时前',
    petTags: ['边牧', '8个月'],
    content: '关于幼犬拆家的问题，最近总结了几点心得，大家可以参考一下：1. 消耗精力是核心...',
    expandText: '展开全文',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDG5TAnddN8M_2FOeRs8oO9pMINgD0VWXTqHugP9Uxho9bNYPx0UlJci7i2Xgyi3zpL_lI9z35OgSsmX4-jasEKdFgch89ebFBSUFnN4IYmHLjIleCipDdPqaDcxEsBCiTzfcvvPNZW6AXqZqLtP2OPz7AgRXbc7lu_di5JD6D7nQdn36jrMNm6_KpHf9xqxVDYf4qQ1TtZvnA9u0brifsoNbAz-FQhVsFj4gZHpmV-orjjf8aFgAITLi4Qm4LLV4AEPixkukAM6ok',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA61cPilVF0lUoWSxl5ohc0hgIREyHQsWwzbEpE3WgA9ArcPdY5rYdgn-QTXJ25QAciDwxLnJjY9T6aEQAOavldIfoO1iPcqkOONc4C6SVWPLWR6ACIh2uS82qyxji78MT5ZngtBTkc9OiZ2Vyw80Qo1Jw9LEMne_piO42vrlZObZZ5L63E_C5IJ42RcLBTK5iHOBFExRtul3-cHaR1irQrUXanvqO1iMtMpag_yeMKlGzizmFgehyqahp7laNm7FI8kxdp36IFzUw',
    ],
    likes: 356,
    comments: 82,
  },
]

const onNotification = () => {
  uni.showToast({ title: '消息通知', icon: 'none' })
}

const onMore = (id: number) => {
  uni.showToast({ title: `更多操作 #${id}`, icon: 'none' })
}

const onLike = (id: number) => {
  uni.showToast({ title: `点赞 #${id}`, icon: 'none' })
}

const onComment = (id: number) => {
  uni.showToast({ title: `评论 #${id}`, icon: 'none' })
}

const onShare = (id: number) => {
  uni.showToast({ title: `分享 #${id}`, icon: 'none' })
}

const onCompose = () => {
  uni.showToast({ title: '发布动态', icon: 'none' })
}
</script>

<style scoped>
.page {
  --color-primary: #006b5d;
  --color-on-primary: #ffffff;
  --color-on-primary-container: #005d51;
  --color-background: #fcf9f2;
  --color-on-surface: #1c1c18;
  --color-on-surface-variant: #3e4946;
  --color-primary-container: #76d7c4;
  --color-secondary-fixed: #cfe5ff;
  --color-tertiary: #8a5024;
  --color-tertiary-container: #ffb684;
  --color-on-tertiary-container: #7b4419;
  --color-surface-container: #f0eee7;
  --color-surface-container-high: #ebe8e1;
  --color-surface-container-lowest: #ffffff;
  --color-surface-variant: #e5e2db;
  --color-outline: #6e7a76;
  --color-outline-variant: #bdc9c5;
  --color-error: #ba1a1a;
}

.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--color-background);
  color: var(--color-on-surface);
}

.tab-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 64rpx;
  padding: 32rpx 40rpx;
  background: var(--color-background);
  border-bottom: 2rpx solid var(--color-surface-container-high);
  flex-shrink: 0;
}

.tab-item {
  position: relative;
  font-size: 30rpx;
  font-weight: 700;
  color: var(--color-on-surface-variant);
  padding-bottom: 12rpx;
}

.tab-item-active {
  color: var(--color-primary);
}

.tab-indicator {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 32rpx;
  height: 8rpx;
  margin-left: -16rpx;
  background: var(--color-primary);
  border-radius: 9999rpx;
}

.feed-scroll {
  flex: 1;
  min-height: 0;
}

.feed-list {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  padding: 16rpx 40rpx calc(200rpx + env(safe-area-inset-bottom));
}

.post-card {
  background: var(--color-surface-container-lowest);
  border: 4rpx solid var(--color-surface-container-high);
  border-radius: 24rpx;
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.post-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.post-author {
  display: flex;
  gap: 24rpx;
  min-width: 0;
}

.author-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 2rpx solid var(--color-outline-variant);
  background: var(--color-secondary-fixed);
  flex-shrink: 0;
}

.author-info {
  min-width: 0;
}

.author-name-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.author-name {
  font-size: 30rpx;
  font-weight: 700;
  color: var(--color-on-surface);
}

.author-badge {
  font-size: 20rpx;
  font-weight: 700;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}

.badge-tertiary {
  background: var(--color-tertiary-container);
  color: var(--color-on-tertiary-container);
}

.badge-primary {
  background: var(--color-primary-container);
  color: var(--color-on-primary-container);
}

.author-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-top: 8rpx;
}

.post-time {
  font-size: 24rpx;
  color: var(--color-on-surface-variant);
}

.pet-tags {
  display: flex;
  gap: 8rpx;
}

.pet-tag {
  font-size: 20rpx;
  color: var(--color-on-surface-variant);
  background: var(--color-surface-container);
  padding: 4rpx 16rpx;
  border-radius: 9999rpx;
}

.more-btn {
  flex-shrink: 0;
  padding: 8rpx;
}

.more-icon {
  width: 40rpx;
  height: 40rpx;
}

.post-content {
  font-size: 28rpx;
  line-height: 44rpx;
  color: var(--color-on-surface);
}

.post-expand {
  font-size: 28rpx;
  line-height: 44rpx;
  color: var(--color-primary);
  font-weight: 600;
}

.post-media-single {
  aspect-ratio: 4 / 3;
  border-radius: 16rpx;
  overflow: hidden;
  background: var(--color-surface-container-high);
}

.post-media-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

.post-img {
  width: 100%;
  height: 100%;
}

.post-img-grid-item {
  width: 100%;
  aspect-ratio: 1;
  background: var(--color-surface-container-high);
}

.post-actions {
  padding-top: 16rpx;
  border-top: 2rpx solid var(--color-surface-container);
}

.action-group {
  display: flex;
  align-items: center;
  gap: 48rpx;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.action-icon {
  width: 40rpx;
  height: 40rpx;
  flex-shrink: 0;
}

.action-count {
  font-size: 24rpx;
  color: var(--color-on-surface-variant);
}

.fab {
  position: fixed;
  right: 48rpx;
  bottom: calc(160rpx + env(safe-area-inset-bottom));
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(0, 107, 93, 0.25);
  z-index: 40;
}

.fab-icon {
  width: 48rpx;
  height: 48rpx;
}
</style>
