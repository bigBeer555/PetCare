<template>
  <view class="page">
    <view class="top-bar">
      <view class="top-bar-left">
        <view class="pet-icon">
          <text class="material-icons">pets</text>
        </view>
        <text class="brand-title">宠爱宝</text>
      </view>
      <view class="notification-btn" @click="onNotification">
        <text class="material-icons">notifications</text>
      </view>
    </view>

    <view class="main-content">
      <scroll-view class="breadcrumb-scroll" scroll-x :show-scrollbar="false">
        <view class="breadcrumb">
          <view class="breadcrumb-item">
            <text class="material-icons breadcrumb-icon">check_circle</text>
            <text>拉肚子</text>
          </view>
          <text class="material-icons arrow-icon">arrow_forward</text>
          <view class="breadcrumb-item">
            <text class="material-icons breadcrumb-icon">check_circle</text>
            <text>精神好/无呕吐</text>
          </view>
        </view>
      </scroll-view>

      <view class="result-card">
        <view class="result-icon-wrap">
          <text class="material-icons result-icon">diagnosis</text>
        </view>
        <view class="result-content">
          <text class="result-title">自查结果：\n疑似换粮或着凉</text>
          <text class="result-desc">
            根据跳跳当前的症状，这通常是轻微的肠胃不适，可能与近期饮食变化或环境温度有关。
          </text>
        </view>
      </view>

      <view class="advice-card">
        <view class="advice-header">
          <text class="material-icons icon-fill advice-pet-icon">pets</text>
          <text class="advice-label">跳跳的专属建议</text>
        </view>
        <text class="advice-text">
          因为跳跳带有
          <text class="tag-glass">玻璃胃</text>
          标签，肠胃较为敏感。
        </text>
        <view class="medicine-tip">
          <text class="material-icons medicine-icon">medication</text>
          <view class="medicine-content">
            <text class="medicine-title">建议配合益生菌使用</text>
            <text class="medicine-desc">
              帮助调节肠道菌群，缓解腹泻症状。观察24小时，如症状加重请及时就医。
            </text>
          </view>
        </view>
      </view>

      <view class="illustration-wrap">
        <view class="illustration-box">
          <text class="material-icons icon-fill illustration-icon">cruelty_free</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
const onNotification = () => {
  uni.showToast({ title: '通知', icon: 'none' })
}
</script>

<style scoped>
.page {
  --color-primary: #006b5d;
  --color-on-primary-container: #005d51;
  --color-background: #fcf9f2;
  --color-on-surface: #1c1c18;
  --color-on-surface-variant: #3e4946;
  --color-primary-container: #76d7c4;
  --color-tertiary: #8a5024;
  --color-tertiary-container: #ffb684;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-high: #ebe8e1;
  --color-surface-container: #f0eee7;
  --color-outline-variant: #bdc9c5;
  --color-active-green: #76d7c4;
  --color-active-text: #005d51;
  --color-grey-text: #717171;
}

.page {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--color-background);
  min-height: 100vh;
  padding-top: 128rpx;
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
  box-sizing: border-box;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.pet-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(118, 215, 196, 0.3);
  border: 4rpx solid rgba(0, 107, 93, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.brand-title {
  font-size: 48rpx;
  font-weight: 700;
  color: var(--color-on-primary-container);
}

.notification-btn {
  padding: 16rpx;
  color: var(--color-on-surface-variant);
}

.main-content {
  padding: 16rpx 40rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.breadcrumb-scroll {
  width: 100%;
  white-space: nowrap;
}

.breadcrumb {
  display: inline-flex;
  align-items: center;
  gap: 16rpx;
  padding-bottom: 16rpx;
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
  gap: 8rpx;
  background: var(--color-surface-container-high);
  padding: 8rpx 24rpx;
  border-radius: 19998rpx;
  font-size: 24rpx;
  font-weight: 600;
  color: var(--color-on-surface-variant);
}

.breadcrumb-icon {
  font-size: 32rpx !important;
}

.arrow-icon {
  font-size: 32rpx !important;
  color: var(--color-on-surface-variant);
}

.result-card,
.advice-card {
  background: var(--color-surface-container-lowest);
  border: 4rpx solid #f0ebe0;
  border-radius: 24rpx;
  padding: 32rpx;
}

.result-card {
  display: flex;
  gap: 24rpx;
  position: relative;
  overflow: hidden;
}

.result-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background: rgba(255, 182, 132, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.result-icon {
  font-size: 56rpx !important;
  color: var(--color-tertiary);
}

.result-title {
  font-size: 44rpx;
  font-weight: 700;
  line-height: 60rpx;
  color: var(--color-on-surface);
  white-space: pre-line;
}

.result-desc {
  font-size: 28rpx;
  line-height: 40rpx;
  color: var(--color-on-surface-variant);
  margin-top: 8rpx;
}

.advice-card {
  border-left: 8rpx solid var(--color-primary);
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.advice-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.advice-pet-icon {
  font-size: 40rpx !important;
  color: var(--color-primary);
}

.advice-label {
  font-size: 24rpx;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-primary);
}

.advice-text {
  font-size: 28rpx;
  line-height: 40rpx;
  color: var(--color-on-surface);
}

.tag-glass {
  display: inline-block;
  background: rgba(219, 234, 254, 0.5);
  color: #1d4ed8;
  padding: 4rpx 16rpx;
  border-radius: 19998rpx;
  border: 1rpx solid #bfdbfe;
  font-size: 24rpx;
  margin: 0 8rpx;
}

.medicine-tip {
  margin-top: 16rpx;
  background: rgba(118, 215, 196, 0.2);
  border-radius: 16rpx;
  padding: 24rpx;
  display: flex;
  gap: 24rpx;
  align-items: center;
}

.medicine-icon {
  font-size: 48rpx !important;
  color: var(--color-primary);
}

.medicine-title {
  font-size: 28rpx;
  font-weight: 700;
  color: var(--color-on-primary-container);
  display: block;
}

.medicine-desc {
  font-size: 24rpx;
  line-height: 32rpx;
  color: var(--color-on-surface-variant);
  margin-top: 8rpx;
  display: block;
}

.illustration-wrap {
  display: flex;
  justify-content: center;
  padding: 32rpx 0;
}

.illustration-box {
  width: 384rpx;
  height: 384rpx;
  border-radius: 24rpx;
  background: var(--color-surface-container-high);
  border: 4rpx solid #f0ebe0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.illustration-icon {
  font-size: 160rpx !important;
  color: var(--color-primary);
  opacity: 0.5;
}
</style>
