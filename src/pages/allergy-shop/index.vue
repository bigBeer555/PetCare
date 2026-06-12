<template>
  <view class="page">
    <view class="top-bar">
      <image
        class="avatar"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBcP_5YSG7HkyLF24bBG1IrlfwEpYpQskYjNMav159xza6Fv5uXt36al86eGh08YjGnrzyZZDnqb3gK179gV9YHN2eBi-pFXXFhpIwQh_ehjQ4FJVduGziVDPBq-USzJ0mG9lhuVV5vz7Duc_Uv59I8S9LDannS-kTMAgwyM4Bwl8HVvhR95SjHyr8EAWhe-2xcnVvFXh9cD6_wuN7MedmZI8I8cRFoRL9h9mJllSTN12dYzdDqlqV8GL1v9pV5qN--WA10O_xWpg"
      />
      <text class="page-title">避敏商城</text>
      <view class="notification-btn" @click="onNotification">
        <text class="material-icons">notifications</text>
      </view>
    </view>

    <view class="main-content">
      <view class="recommend-banner">
        <view class="banner-blob" />
        <view class="banner-icon">
          <text class="material-icons icon-fill">sound_detection_dog_barking</text>
        </view>
        <view class="banner-text">
          <text>针对 </text>
          <text class="banner-highlight">【泪痕重】</text>
          <text> 的跳跳，\n我们为您甄选：</text>
        </view>
      </view>

      <scroll-view class="category-scroll" scroll-x :show-scrollbar="false">
        <view class="category-list">
          <view
            v-for="cat in categories"
            :key="cat.id"
            class="category-tag"
            :class="[cat.styleClass, { 'category-active': activeCategory === cat.id }]"
            @click="activeCategory = cat.id"
          >
            <text>{{ cat.label }}</text>
          </view>
        </view>
      </scroll-view>

      <view class="product-grid">
        <view
          v-for="product in products"
          :key="product.id"
          class="product-card"
          @click="onProductClick(product.id)"
        >
          <view class="product-cover" :class="product.coverClass">
            <image
              v-if="product.image"
              class="product-img"
              :src="product.image"
              mode="aspectFit"
            />
            <view v-else class="placeholder-cover">
              <text class="material-icons placeholder-icon">medication_liquid</text>
              <text class="placeholder-text">更多洗护好物</text>
            </view>
            <view v-if="product.suitable" class="suitable-tag">
              <text class="material-icons suitable-icon">check_circle</text>
              <text>适合跳跳</text>
            </view>
          </view>
          <view class="product-body">
            <template v-if="product.name">
              <text class="product-name">{{ product.name }}</text>
              <view class="rating-row">
                <view class="stars">
                  <text
                    v-for="(star, idx) in product.stars"
                    :key="idx"
                    class="material-icons star-icon"
                    :class="product.starColorClass"
                    :style="star.filled ? 'font-variation-settings: \'FILL\' 1' : ''"
                  >{{ star.icon }}</text>
                </view>
                <text class="match-score" :class="product.starColorClass">{{ product.matchScore }}</text>
              </view>
              <view class="price-row">
                <view class="price">
                  <text class="price-symbol">¥</text>
                  <text class="price-value">{{ product.price }}</text>
                </view>
                <text class="sales">{{ product.sales }}</text>
              </view>
            </template>
            <template v-else>
              <view class="skeleton-line skeleton-long" />
              <view class="skeleton-line skeleton-short" />
            </template>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Category {
  id: string
  label: string
  styleClass: string
}

interface StarItem {
  icon: string
  filled: boolean
}

interface Product {
  id: number
  name?: string
  image?: string
  price?: number
  sales?: string
  matchScore?: string
  starColorClass?: string
  stars?: StarItem[]
  suitable?: boolean
  coverClass?: string
}

const activeCategory = ref('all')

const categories: Category[] = [
  { id: 'all', label: '全部推荐', styleClass: 'tag-primary' },
  { id: 'food', label: '主粮专区', styleClass: 'tag-tertiary' },
  { id: 'health', label: '营养保健', styleClass: 'tag-secondary' },
  { id: 'snack', label: '零食', styleClass: 'tag-neutral' },
]

const products: Product[] = [
  {
    id: 1,
    name: '天然鸭肉烘焙粮（去泪痕配方）',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPXRvk1Y3GrhDrUZjnimn0V4tKu8pu5TE_fiwqjoMo8Xuh9nyfGejMEIqqZoEVe0dA3ytwc2GPv87tCJLrX-KQgN8o3kmUPPxyKypHrwkcczL9NfpUNbZFAXvtSOszS_yVf_20gY_6ZAtQFlOx_8t_qYG-rUzuxzkoue5fAfzqwInXwQbZ5KA6WuYPGVuEtz3JVUDeFA6bae2PjjUV8-GeiKTEJUbPOETfZIcXnXAPwHDLk1HahhlIf8Bm4flgd0m2O_gP6vZNLlQ',
    price: 129,
    sales: '月销 2000+',
    matchScore: '98% 适配',
    starColorClass: 'color-tertiary',
    suitable: true,
    coverClass: 'cover-square',
    stars: [
      { icon: 'star', filled: true },
      { icon: 'star', filled: true },
      { icon: 'star', filled: true },
      { icon: 'star', filled: true },
      { icon: 'star_half', filled: true },
    ],
  },
  {
    id: 2,
    name: '深海鱼油（Omega-3）焕亮毛发',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDncx2_Jxw5gUcq71c_D--X92vaAATQ0awZnMURQKGBQDDYPtiui_esXb6GcCst24eM0Od7UscZOQ3tWGIzpJWhzokDhsV69nPx7Cqi3FRlIpa1a5xmO7GQVUZOfohBlUyABDWgdT4VtsH9DKg5qXrU4z8fvGj8dk8H-yqMWC0ztFn3DIQI_5K3hTuJ3J7qHPPCYhoM1MQWk8U6H0RICQ5Pm302xQsNBboFIFlxt67a4PKxRDpph-9CK_S-ybLEsz4kM07DQWw_fUs',
    price: 89,
    sales: '月销 800+',
    matchScore: '85% 适配',
    starColorClass: 'color-secondary',
    coverClass: 'cover-tall',
    stars: [
      { icon: 'star', filled: true },
      { icon: 'star', filled: true },
      { icon: 'star', filled: true },
      { icon: 'star', filled: true },
      { icon: 'star', filled: false },
    ],
  },
  {
    id: 3,
    coverClass: 'cover-tall',
  },
]

const onNotification = () => {
  uni.showToast({ title: '通知', icon: 'none' })
}

const onProductClick = (id: number) => {
  uni.showToast({ title: `查看商品 #${id}`, icon: 'none' })
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
  --color-secondary: #246293;
  --color-secondary-container: #8fc6fd;
  --color-on-secondary-container: #075283;
  --color-tertiary: #8a5024;
  --color-tertiary-container: #ffb684;
  --color-on-tertiary-container: #7b4419;
  --color-surface-container: #f0eee7;
  --color-surface-container-high: #ebe8e1;
  --color-surface-container-lowest: #ffffff;
  --color-surface-variant: #e5e2db;
  --color-outline: #6e7a76;
  --color-error: #ba1a1a;
  --color-active-green: #76d7c4;
  --color-active-text: #005d51;
  --color-grey-text: #717171;
}

.page {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--color-background);
  min-height: 100vh;
}

@font-face {
  font-family: 'Material Symbols Outlined';
  font-style: normal;
  font-weight: 100 700;
  src: url(https://fonts.gstatic.com/s/materialsymbolsoutlined/v219/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1n-q_4MrImHCIJIZrDCvHeem.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Symbols Outlined';
  font-size: 48rpx;
  line-height: 1;
  display: inline-block;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.icon-fill {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 128rpx;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40rpx;
  background: var(--color-background);
  border-bottom: 2rpx solid rgba(229, 226, 219, 0.1);
  box-sizing: border-box;
}

.avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  border: 2rpx solid var(--color-surface-variant);
  flex-shrink: 0;
}

.page-title {
  font-size: 48rpx;
  font-weight: 700;
  color: var(--color-primary);
}

.notification-btn {
  color: var(--color-primary);
  flex-shrink: 0;
}

.main-content {
  padding: 160rpx 40rpx 0;
}

.recommend-banner {
  position: relative;
  overflow: hidden;
  background: var(--color-surface-container-lowest);
  border: 4rpx solid var(--color-primary-container);
  border-radius: 24rpx;
  padding: 32rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
  margin-bottom: 48rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 107, 93, 0.05);
}

.banner-blob {
  position: absolute;
  top: -80rpx;
  right: -80rpx;
  width: 256rpx;
  height: 256rpx;
  background: rgba(118, 215, 196, 0.3);
  border-radius: 50%;
  filter: blur(64rpx);
  pointer-events: none;
}

.banner-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: var(--color-primary-container);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-on-primary-container);
  flex-shrink: 0;
}

.banner-text {
  font-size: 28rpx;
  line-height: 44rpx;
  color: var(--color-on-surface-variant);
}

.banner-highlight {
  font-weight: 700;
  color: var(--color-tertiary);
}

.category-scroll {
  width: 100%;
  white-space: nowrap;
  margin-bottom: 32rpx;
}

.category-list {
  display: inline-flex;
  gap: 24rpx;
  padding-bottom: 16rpx;
}

.category-tag {
  display: inline-flex;
  padding: 16rpx 32rpx;
  border-radius: 19998rpx;
  font-size: 24rpx;
  font-weight: 600;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.category-active.tag-primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.tag-primary {
  background: var(--color-surface-container-high);
  color: var(--color-on-surface-variant);
}

.tag-tertiary {
  background: var(--color-tertiary-container);
  color: var(--color-on-tertiary-container);
  border: 2rpx solid var(--color-tertiary-container);
}

.tag-secondary {
  background: var(--color-secondary-container);
  color: var(--color-on-secondary-container);
  border: 2rpx solid var(--color-secondary-container);
}

.tag-neutral {
  background: var(--color-surface-container-high);
  color: var(--color-on-surface-variant);
  border: 2rpx solid var(--color-surface-variant);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.product-card {
  background: var(--color-surface-container-lowest);
  border: 4rpx solid var(--color-surface-variant);
  border-radius: 24rpx;
  overflow: hidden;
}

.product-cover {
  position: relative;
  background: var(--color-surface-container);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32rpx;
}

.cover-square {
  aspect-ratio: 1;
}

.cover-tall {
  aspect-ratio: 4 / 5;
}

.product-img {
  width: 100%;
  height: 100%;
}

.placeholder-cover {
  width: 100%;
  height: 100%;
  border: 4rpx dashed var(--color-outline-variant);
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-outline);
}

.placeholder-icon {
  font-size: 64rpx !important;
}

.placeholder-text {
  font-size: 24rpx;
  font-weight: 600;
  margin-top: 16rpx;
}

.suitable-tag {
  position: absolute;
  top: 16rpx;
  left: 16rpx;
  background: var(--color-primary-container);
  color: var(--color-on-primary-container);
  font-size: 20rpx;
  font-weight: 600;
  padding: 8rpx 16rpx;
  border-radius: 19998rpx;
  display: flex;
  align-items: center;
  gap: 4rpx;
  border: 2rpx solid rgba(0, 107, 93, 0.2);
}

.suitable-icon {
  font-size: 24rpx !important;
}

.product-body {
  padding: 24rpx;
}

.product-name {
  font-size: 28rpx;
  font-weight: 600;
  line-height: 40rpx;
  color: var(--color-on-surface);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-top: 8rpx;
}

.stars {
  display: flex;
}

.star-icon {
  font-size: 28rpx !important;
}

.color-tertiary {
  color: var(--color-tertiary);
}

.color-secondary {
  color: var(--color-secondary);
}

.match-score {
  font-size: 20rpx;
  font-weight: 600;
}

.price-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 16rpx;
}

.price {
  display: flex;
  align-items: baseline;
  color: var(--color-error);
}

.price-symbol {
  font-size: 24rpx;
  font-weight: 600;
}

.price-value {
  font-size: 44rpx;
  font-weight: 700;
}

.sales {
  font-size: 20rpx;
  color: var(--color-outline);
}

.skeleton-line {
  height: 32rpx;
  background: var(--color-surface-variant);
  border-radius: 8rpx;
  margin-bottom: 16rpx;
}

.skeleton-long {
  width: 75%;
}

.skeleton-short {
  width: 50%;
}
</style>
