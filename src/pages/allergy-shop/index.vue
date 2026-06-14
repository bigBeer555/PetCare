<template>
  <view class="page">
    <PageNavBar
      variant="brand"
      title="避敏商城"
      mobile-only
      sticky
      title-size="24"
      :avatar="mobileAvatar"
      @notification-click="onNotification"
    />

    <view class="main-content">
      <view class="recommend-banner">
        <view class="banner-blob" />
        <view class="banner-icon">
          <image
            class="banner-icon-img"
            src="/static/svg/word-remind.svg"
            mode="aspectFit"
          />
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

      <ProductWaterfall :products="products" @product-click="onProductClick" />
    </view>

  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageNavBar from '@/components/page-nav-bar/index.vue'
import ProductWaterfall from '@/components/product-waterfall/index.vue'
import type { ProductItem } from '@/components/product-card/types'

const mobileAvatar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCLf1dEm0P0iLgUzCm6Qnmti5qHATwnCMx-Zd-uLiC0JGT99aIOxe9Ej2N86u0qdFnyd66NuC0B515jh_wow_pw76Ycc2iM-br7G9S3qujTnf9_zPE5BZEMdMLPmRlCNTq5EwIzQxiAEnGi_6ixKFej1cHasJDioNo3WeQ7BKF2IhIh5gwZWegCETgRQMX9LHiBr65T4tUwnbWTMD1dxw2Ki-yaRs3hXgNrMZ_xvjGXf2cD0wIm5ehfIiowmrRbcU-k_H64-ssdFrI'

interface Category {
  id: string
  label: string
  styleClass: string
}

const activeCategory = ref('all')

const categories: Category[] = [
  { id: 'all', label: '全部推荐', styleClass: 'tag-primary' },
  { id: 'food', label: '主粮专区', styleClass: 'tag-tertiary' },
  { id: 'health', label: '营养保健', styleClass: 'tag-secondary' },
  { id: 'snack', label: '零食', styleClass: 'tag-neutral' },
]

const products: ProductItem[] = [
  {
    id: 1,
    name: '天然鸭肉烘焙粮（去泪痕配方）',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPXRvk1Y3GrhDrUZjnimn0V4tKu8pu5TE_fiwqjoMo8Xuh9nyfGejMEIqqZoEVe0dA3ytwc2GPv87tCJLrX-KQgN8o3kmUPPxyKypHrwkcczL9NfpUNbZFAXvtSOszS_yVf_20gY_6ZAtQFlOx_8t_qYG-rUzuxzkoue5fAfzqwInXwQbZ5KA6WuYPGVuEtz3JVUDeFA6bae2PjjUV8-GeiKTEJUbPOETfZIcXnXAPwHDLk1HahhlIf8Bm4flgd0m2O_gP6vZNLlQ',
    price: 129,
    sales: '月销 2000+',
    matchScore: '98% 适配',
    starColorClass: 'color-tertiary',
    suitable: true,
    stars: [
      { filled: true },
      { filled: true },
      { filled: true },
      { filled: true },
      { filled: true, half: true },
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
    stars: [
      { filled: true },
      { filled: true },
      { filled: true },
      { filled: true },
      { filled: false },
    ],
  },
  {
    id: 3,
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

.main-content {
  padding: 32rpx 40rpx 0;
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
  flex-shrink: 0;
}

.banner-icon-img {
  width: 80rpx;
  height: 80rpx;
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
</style>
