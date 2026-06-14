<template>
  <view class="product-card" @click="emit('click', product.id)">
    <view class="product-cover">
      <image
        v-if="product.image"
        class="product-img"
        :src="product.image"
        mode="aspectFit"
      />
      <view v-else class="placeholder-cover">
        <image
          class="placeholder-img"
          src="/static/svg/more-goods.svg"
          mode="aspectFit"
        />
      </view>
      <view v-if="product.suitable" class="suitable-tag">
        <image
          class="suitable-icon"
          src="/static/svg/suitable.svg"
          mode="aspectFit"
        />
        <text>适合跳跳</text>
      </view>
    </view>
    <view class="product-body">
      <template v-if="product.name">
        <text class="product-name">{{ product.name }}</text>
        <view class="rating-row">
          <view class="stars">
            <image
              v-for="(star, idx) in product.stars"
              :key="idx"
              class="star-icon"
              :src="getStarIcon(star)"
              mode="aspectFit"
            />
          </view>
          <text class="match-score" :class="product.starColorClass">
            {{ product.matchScore }}
          </text>
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
</template>

<script lang="ts">
export default {
  name: 'ProductCard',
}
</script>

<script setup lang="ts">
import type { ProductItem, StarItem } from './types'

defineProps<{
  product: ProductItem
}>()

const emit = defineEmits<{
  click: [id: number]
}>()

const getStarIcon = (star: StarItem) => {
  if (star.half) return '/static/svg/star-half.svg'
  return star.filled ? '/static/svg/star-filled.svg' : '/static/svg/star-empty.svg'
}
</script>

<style scoped>
.product-card {
  background: var(--color-surface-container-lowest, #ffffff);
  border: 4rpx solid var(--color-surface-variant, #e5e2db);
  border-radius: 24rpx;
  overflow: hidden;
}

.product-cover {
  position: relative;
  aspect-ratio: 1;
  background: var(--color-surface-container, #f0eee7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32rpx;
  box-sizing: border-box;
}

.product-img {
  width: 100%;
  height: 100%;
}

.placeholder-cover {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-img {
  width: 100%;
  height: 100%;
}

.suitable-tag {
  position: absolute;
  top: 16rpx;
  left: 16rpx;
  background: var(--color-primary-container, #76d7c4);
  color: var(--color-on-primary-container, #005d51);
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
  width: 20rpx;
  height: 20rpx;
  flex-shrink: 0;
}

.product-body {
  padding: 24rpx;
}

.product-name {
  font-size: 28rpx;
  font-weight: 600;
  line-height: 40rpx;
  color: var(--color-on-surface, #1c1c18);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
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
  width: 28rpx;
  height: 28rpx;
}

.color-tertiary {
  color: var(--color-tertiary, #8a5024);
}

.color-secondary {
  color: var(--color-secondary, #246293);
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
  color: var(--color-error, #ba1a1a);
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
  color: var(--color-outline, #6e7a76);
}

.skeleton-line {
  height: 32rpx;
  background: var(--color-surface-variant, #e5e2db);
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
