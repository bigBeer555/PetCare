<template>
  <view class="page">
    <PageNavBar
      title="注册账号"
      fixed
      bordered
      compact
      title-size="40rpx"
      :auto-back="false"
      @back="onBack"
    />

    <view class="main-content">
      <view class="hero-section">
        <view class="hero-image-wrap">
          <image
            class="hero-image"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBafKJ4Qzcl6XmmLJ5Ovu6wazrJJiEoQowlxTJkFSBhKZiY7VOa1l4k6-iZA4O1SFn6Ulc-J9qMzPhCZhtGmdah8HmbCrmd2SAT-sN1VG-ke87Y4W8tx8oOUzqenoD4jeT-zWU9ReiRPSXJXnmjRzbd3zLPe36fK0EO3HWGQV6uQimAtzVZ_uV4KI98kBFo4llNh6X4EHzrh2VCdP-Axr2lndRSpdykr2Jem8DQP7mkjkovnIi_yegGAFg-4R9EhX_cy3vrkzyK0go"
            mode="aspectFill"
          />
        </view>
        <view class="deco-dot deco-dot-1" />
        <view class="deco-dot deco-dot-2" />
      </view>

      <view class="form-card">
        <view class="form-header">
          <text class="form-title">欢迎加入宠爱宝</text>
          <text class="form-subtitle">记录爱宠的每一刻</text>
        </view>

        <view class="form-body">
          <view class="input-row">
            <image
              class="row-prefix-icon row-icon-mobile"
              src="/static/svg/mobile.svg"
              mode="aspectFit"
            />
            <input v-model="phone" class="row-input" type="number" placeholder="请输入手机号" />
          </view>

          <view class="otp-row">
            <view class="input-row input-flex">
              <image
                class="row-prefix-icon row-icon-code"
                src="/static/svg/email.svg"
                mode="aspectFit"
              />
              <input v-model="otpCode" class="row-input" type="text" placeholder="短信验证码" />
            </view>
            <view
              class="otp-btn"
              :class="{ 'otp-btn-disabled': countdown > 0 }"
              @click="onGetOtp"
            >
              <text>{{ otpBtnText }}</text>
            </view>
          </view>

          <view class="input-row">
            <image
              class="row-prefix-icon row-icon-pwd"
              src="/static/svg/register-pwd.svg"
              mode="aspectFit"
            />
            <input
              v-model="password"
              class="row-input"
              :password="!showPassword"
              placeholder="设置密码 (6-20位)"
            />
            <view class="toggle-btn" @click="showPassword = !showPassword">
              <image
                class="toggle-icon"
                :src="showPassword ? '/static/svg/eye.svg' : '/static/svg/eye-hide.svg'"
                mode="aspectFit"
              />
            </view>
          </view>

          <view class="input-row">
            <image
              class="row-prefix-icon row-icon-confirm-pwd"
              src="/static/svg/confirm_pwd.svg"
              mode="aspectFit"
            />
            <input
              v-model="confirmPassword"
              class="row-input"
              :password="!showConfirmPassword"
              placeholder="确认密码"
            />
            <view class="toggle-btn" @click="showConfirmPassword = !showConfirmPassword">
              <image
                class="toggle-icon"
                :src="showConfirmPassword ? '/static/svg/eye.svg' : '/static/svg/eye-hide.svg'"
                mode="aspectFit"
              />
            </view>
          </view>

          <view class="submit-btn" @click="onSubmit">
            <text>立即注册</text>
            <image
              class="submit-btn-icon"
              src="/static/svg/btn-success.svg"
              mode="aspectFit"
            />
          </view>
        </view>
      </view>

      <view class="footer">
        <view class="agreement-row" @click="agreed = !agreed">
          <view class="checkbox" :class="{ 'checkbox-checked': agreed }">
            <image
              v-if="agreed"
              class="check-icon"
              src="/static/svg/btn-success.svg"
              mode="aspectFit"
            />
          </view>
          <text class="agreement-text">
            我已阅读并同意
            <text class="agreement-link">《用户协议》</text>
            和
            <text class="agreement-link">《隐私政策》</text>
          </text>
        </view>
        <view class="login-link" @click="onBack">
          <text>已有账号？立即登录</text>
          <image
            class="link-arrow-icon"
            src="/static/svg/nav-back.svg"
            mode="aspectFit"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import PageNavBar from '@/components/page-nav-bar/index.vue'

const phone = ref('')
const otpCode = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreed = ref(false)
const countdown = ref(0)

let timer: ReturnType<typeof setInterval> | null = null

const otpBtnText = computed(() =>
  countdown.value > 0 ? `${countdown.value}s` : '获取验证码'
)

const onBack = () => {
  uni.navigateTo({ url: '/extra/login/index' })
}

const onGetOtp = () => {
  if (countdown.value > 0) return
  if (!phone.value) {
    uni.showToast({ title: '请先输入手机号', icon: 'none' })
    return
  }
  countdown.value = 60
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0 && timer) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
  uni.showToast({ title: '验证码已发送', icon: 'none' })
}

const onSubmit = () => {
  if (!agreed.value) {
    uni.showToast({ title: '请先同意用户协议', icon: 'none' })
    return
  }
  if (!phone.value || !otpCode.value || !password.value || !confirmPassword.value) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  if (password.value !== confirmPassword.value) {
    uni.showToast({ title: '两次密码不一致', icon: 'none' })
    return
  }
  uni.showToast({ title: '注册成功', icon: 'success' })
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.page {
  --color-primary: #006b5d;
  --color-on-primary: #ffffff;
  --color-on-primary-container: #005d51;
  --color-on-primary-fixed-variant: #005046;
  --color-background: #fcf9f2;
  --color-on-surface: #1c1c18;
  --color-on-surface-variant: #3e4946;
  --color-surface: #fcf9f2;
  --color-surface-container-low: #f6f3ec;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-highest: #e5e2db;
  --color-surface-variant: #e5e2db;
  --color-outline: #6e7a76;
  --color-outline-variant: #bdc9c5;
  --color-primary-container: #76d7c4;
  --color-primary-fixed-dim: #76d7c4;
  --color-tertiary-fixed-dim: #ffb785;
  --color-secondary: #246293;
}

.page {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--color-background);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-content {
  width: 100%;
  max-width: 896rpx;
  padding: 0 40rpx;
  flex: 1;
  box-sizing: border-box;
}

.hero-section {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 64rpx 0;
}

.hero-image-wrap {
  width: 384rpx;
  height: 384rpx;
  border-radius: 50%;
  overflow: hidden;
  border: 4rpx solid var(--color-surface-variant);
  box-shadow: 0 8rpx 32rpx rgba(0, 107, 93, 0.05);
}

.hero-image {
  width: 100%;
  height: 100%;
  opacity: 0.9;
}

.deco-dot {
  position: absolute;
  border-radius: 50%;
}

.deco-dot-1 {
  top: 25%;
  left: 25%;
  width: 32rpx;
  height: 32rpx;
  background: rgba(255, 183, 133, 0.4);
}

.deco-dot-2 {
  bottom: 25%;
  right: 25%;
  width: 48rpx;
  height: 48rpx;
  background: rgba(118, 215, 196, 0.4);
}

.form-card {
  background: var(--color-surface-container-lowest);
  border-radius: 24rpx;
  padding: 32rpx;
  border: 2rpx solid var(--color-surface-container-highest);
  box-shadow: 0 8rpx 32rpx rgba(0, 107, 93, 0.05);
  margin-bottom: 48rpx;
}

.form-header {
  text-align: center;
  margin-bottom: 32rpx;
}

.form-title {
  font-size: 48rpx;
  font-weight: 700;
  color: var(--color-on-surface);
  display: block;
}

.form-subtitle {
  font-size: 28rpx;
  color: var(--color-on-surface-variant);
  margin-top: 8rpx;
  display: block;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.input-row {
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border-radius: 19998rpx;
  border: 2rpx solid var(--color-surface-variant);
  padding: 24rpx 32rpx;
}

.input-flex {
  flex: 1;
}

.row-prefix-icon {
  flex-shrink: 0;
  margin-right: 16rpx;
}

.row-icon-mobile {
  width: 24rpx;
  height: 34rpx;
}

.row-icon-code {
  width: 32rpx;
  height: 40rpx;
}

.row-icon-pwd {
  width: 24rpx;
  height: 32rpx;
}

.row-icon-confirm-pwd {
  width: 30rpx;
  height: 30rpx;
}

.row-input {
  flex: 1;
  min-width: 0;
  font-size: 28rpx;
  color: var(--color-on-surface);
  background: transparent;
}

.toggle-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-icon {
  width: 44rpx;
  height: 30rpx;
}

.otp-row {
  display: flex;
  gap: 16rpx;
}

.otp-btn {
  flex-shrink: 0;
  background: var(--color-primary-container);
  color: var(--color-on-primary-container);
  padding: 24rpx 32rpx;
  border-radius: 19998rpx;
  font-size: 24rpx;
  font-weight: 600;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
}

.otp-btn-disabled {
  opacity: 0.6;
}

.submit-btn {
  margin-top: 16rpx;
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: 32rpx;
  border-radius: 19998rpx;
  font-size: 44rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 107, 93, 0.2);
}

.submit-btn-icon {
  width: 40rpx;
  height: 40rpx;
  flex-shrink: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32rpx;
  padding-bottom: 64rpx;
}

.agreement-row {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
  max-width: 560rpx;
}

.checkbox {
  width: 32rpx;
  height: 32rpx;
  border-radius: 8rpx;
  border: 2rpx solid var(--color-outline-variant);
  margin-top: 4rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-checked {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.check-icon {
  width: 24rpx;
  height: 24rpx;
}

.agreement-text {
  font-size: 24rpx;
  line-height: 36rpx;
  color: var(--color-on-surface-variant);
}

.agreement-link {
  color: var(--color-secondary);
}

.login-link {
  display: flex;
  align-items: center;
  gap: 8rpx;
  color: var(--color-primary);
  font-size: 28rpx;
}

.link-arrow-icon {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
  transform: rotate(180deg);
}
</style>
