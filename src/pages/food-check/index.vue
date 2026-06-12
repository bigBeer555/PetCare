<template>
  <view class="page">
    <view class="top-bar">
      <view class="top-bar-left">
        <image
          class="avatar"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJQniLvRX7Kfzi6BRse7nUlSaHKVxm3kVWaZFhf65WYFTLu3Zsvng2J1qWEd9eQGEZJF8LXHsr7NTjz7AXi8bUm_vBKDEgTo1ernmBHA7-03450ECqgci9JfYm5SMVocvns5b6Xs3LuyH2abKFF-CjQ8wZqclNxkUiVlfp-75qLOIoqdXwqc6GJem1B-pNdTGaMH13J6m0hGZkq9VKQrxrLnYO00mbkRfYaZ2g2V13XzFhxn08ecxYRHrfGA0rPKAMJ-75PtW44g4"
        />
        <text class="brand-title">宠爱宝</text>
      </view>
      <view class="notification-btn" @click="onNotification">
        <text class="material-icons">notifications</text>
      </view>
    </view>

    <view class="main-content">
      <view class="search-bar">
        <text class="material-icons search-icon">search</text>
        <input class="search-input" type="text" :value="searchQuery" disabled />
      </view>

      <view class="product-card blurred">
        <view class="product-cover">
          <image
            class="cover-img"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeS-1dVIoByDphp8fdneU8HU1ja3nYvIzP_-YnALNi7E4lAjma4evxyfwpBnCkecfkAElr6B4INY7xJjC5_RvHrwsVGHKs-RJH_F6rFnMXMWjU5MBUzl3nMUN5gXj-B5bTtmvSD3saR_o5DU96wFMrjTnggJuPDnQuii_lg5ZrH2kOWX4StcSvaA_Xl96CL025io_IqoOJ7ma4IlKcoEmFY3KD-cOCxTPVrSKRPJrrKqrFYwrxpJ-uTBCTrqUmMUQcBZZ_0skg5Lc"
            mode="aspectFill"
          />
        </view>
        <view class="product-info">
          <text class="product-title">纯鲜无添加鸡肉冻干</text>
          <text class="product-desc">高蛋白低脂肪，猫狗通用零食</text>
        </view>
        <view class="buy-btn disabled">
          <text class="material-icons">shopping_cart_off</text>
          <text>立即购买</text>
        </view>
      </view>

      <view class="edu-card blurred">
        <view class="edu-header">
          <text class="material-icons edu-icon">health_and_safety</text>
          <text class="edu-title">健康科普</text>
        </view>
        <text class="edu-text">
          虽然鸡肉是优质蛋白，但部分毛孩子存在特异性过敏反应。常见症状包括皮肤瘙痒、红肿脱发或肠胃不适。
        </text>
      </view>
    </view>

    <view v-if="showWarning" class="modal-overlay">
      <view class="modal-card">
        <view class="modal-header">
          <text class="material-icons icon-fill warning-icon">warning</text>
          <text class="modal-title">警告</text>
        </view>
        <view class="modal-body">
          <text class="modal-text">
            您家宝贝带有
            <text class="allergy-tag">【鸡肉过敏】</text>
            标签，该商品含有高浓度鸡肉成分，请切勿喂食与购买！
          </text>
        </view>
        <view class="modal-btn" @click="onDismissWarning">
          <text>我知道了</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('鸡肉冻干')
const showWarning = ref(true)

const onNotification = () => {
  uni.showToast({ title: '通知', icon: 'none' })
}

const onDismissWarning = () => {
  showWarning.value = false
}
</script>

<style scoped>
.page {
  --color-primary: #006b5d;
  --color-on-primary-container: #005d51;
  --color-background: #fcf9f2;
  --color-on-surface: #1c1c18;
  --color-on-surface-variant: #3e4946;
  --color-surface-container-high: #ebe8e1;
  --color-surface-container-highest: #e5e2db;
  --color-surface: #fcf9f2;
  --color-surface-variant: #e5e2db;
  --color-secondary: #246293;
  --color-secondary-fixed: #cfe5ff;
  --color-on-secondary-container: #075283;
  --color-error: #ba1a1a;
  --color-error-container: #ffdad6;
  --color-on-error: #ffffff;
  --color-active-green: #76d7c4;
  --color-active-text: #005d51;
  --color-grey-text: #717171;
}

.page {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--color-background);
  color: var(--color-on-surface);
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
  box-sizing: border-box;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  border: 4rpx solid var(--color-surface-container-high);
}

.brand-title {
  font-size: 48rpx;
  font-weight: 700;
  color: var(--color-primary);
}

.notification-btn {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.main-content {
  padding: 160rpx 40rpx 200rpx;
  display: flex;
  flex-direction: column;
  gap: 48rpx;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 24rpx;
  background: var(--color-surface-container-high);
  border-radius: 19998rpx;
  padding: 24rpx 32rpx;
}

.search-icon {
  font-size: 48rpx !important;
  color: var(--color-on-surface-variant);
}

.search-input {
  flex: 1;
  font-size: 32rpx;
  color: var(--color-on-surface);
  background: transparent;
}

.blurred {
  opacity: 0.4;
  filter: blur(4rpx);
  pointer-events: none;
}

.product-card {
  background: var(--color-surface);
  border: 4rpx solid var(--color-surface-container-highest);
  border-radius: 24rpx;
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.product-cover {
  aspect-ratio: 4 / 3;
  border-radius: 16rpx;
  overflow: hidden;
  background: var(--color-surface-variant);
}

.cover-img {
  width: 100%;
  height: 100%;
}

.product-title {
  font-size: 44rpx;
  font-weight: 700;
  color: var(--color-on-surface);
}

.product-desc {
  font-size: 28rpx;
  color: var(--color-on-surface-variant);
  margin-top: 8rpx;
}

.buy-btn {
  width: 100%;
  padding: 32rpx;
  border-radius: 19998rpx;
  background: var(--color-surface-variant);
  color: var(--color-on-surface-variant);
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
}

.edu-card {
  background: var(--color-secondary-fixed);
  border: 4rpx solid #98cbff;
  border-radius: 24rpx;
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.edu-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  color: var(--color-secondary);
}

.edu-icon {
  font-size: 48rpx !important;
}

.edu-title {
  font-size: 32rpx;
  font-weight: 700;
}

.edu-text {
  font-size: 28rpx;
  line-height: 40rpx;
  color: var(--color-on-secondary-container);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(255, 218, 214, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
}

.modal-card {
  width: 100%;
  max-width: 768rpx;
  background: var(--color-surface);
  border-radius: 24rpx;
  padding: 32rpx;
  border: 4rpx solid var(--color-error-container);
  box-shadow: 0 16rpx 60rpx rgba(186, 26, 26, 0.15);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  color: var(--color-error);
  padding-bottom: 16rpx;
  border-bottom: 2rpx solid var(--color-error-container);
}

.warning-icon {
  font-size: 64rpx !important;
}

.modal-title {
  font-size: 48rpx;
  font-weight: 700;
}

.modal-body {
  text-align: center;
  padding: 32rpx 0;
}

.modal-text {
  font-size: 32rpx;
  line-height: 52rpx;
  color: var(--color-on-surface);
}

.allergy-tag {
  color: var(--color-error);
  font-weight: 700;
  background: rgba(255, 218, 214, 0.5);
  border-radius: 12rpx;
  padding: 0 8rpx;
}

.modal-btn {
  width: 100%;
  background: var(--color-error);
  color: var(--color-on-error);
  padding: 32rpx;
  border-radius: 19998rpx;
  font-size: 32rpx;
  text-align: center;
  box-shadow: 0 8rpx 24rpx rgba(186, 26, 26, 0.2);
}

</style>
