<template>
  <view class="page">
    <view class="brand-header">
      <image
        class="brand-logo"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmFdZlq3qE1B-enmodGQ_fhzL8kvx5bUfPzxgfaWKYqzN4P-8gESE_iuTDTP4k7EWXT8POF8Upwa9I8pv4WRkp3OQ1fk9wSOnmyM3F79trs9n66eYx2yUPx8RRsR7CzKxRojaNJKHjTpg2PoWvOwmUaJ38oqMYR8CfgoNqw7Qyz3n1OkApSmHSNkTc1bAhl-ksZX2m-MO7o9EUrcLUsGJORqO6XVl7ksfnMe4G9zMbil1r_K2v7cZh7CRWRvCgChEHRk5R1YzX1cc"
      />
      <text class="brand-title">宠爱宝</text>
      <text class="brand-slogan">懂宠物，更懂你</text>
    </view>

    <view class="main-content">
      <view class="tab-switcher">
        <view
          class="tab-item"
          :class="{ 'tab-active': loginType === 'password' }"
          @click="loginType = 'password'"
        >
          <text>密码登录</text>
        </view>
        <view
          class="tab-item"
          :class="{ 'tab-active': loginType === 'code' }"
          @click="loginType = 'code'"
        >
          <text>验证码登录</text>
        </view>
      </view>

      <view class="form-section">
        <view class="pill-input">
          <image
            class="input-prefix-icon"
            src="/static/svg/account.svg"
            mode="aspectFit"
          />
          <input v-model="account" class="input-field" type="text" placeholder="手机号 / 邮箱" />
        </view>

        <view class="pill-input">
          <image
            class="input-prefix-icon"
            :src="loginType === 'password' ? '/static/svg/login-pwd.svg' : '/static/svg/email.svg'"
            mode="aspectFit"
          />
          <input
            v-model="credential"
            class="input-field"
            :password="loginType === 'password' && !showPassword"
            :placeholder="loginType === 'password' ? '请输入密码' : '请输入验证码'"
          />
          <view v-if="loginType === 'password'" class="toggle-btn" @click="showPassword = !showPassword">
            <image
              class="toggle-icon"
              :src="showPassword ? '/static/svg/eye-hide.svg' : '/static/svg/eye.svg'"
              mode="aspectFit"
            />
          </view>
        </view>

        <view class="action-links">
          <text class="link-text" @click="onForgotPassword">忘记密码？</text>
          <text class="link-register" @click="onRegister">立即注册</text>
        </view>

        <view class="login-btn" @click="onLogin">
          <text>登录</text>
        </view>
      </view>

      <view class="third-party">
        <view class="divider-row">
          <view class="divider-line" />
          <text class="divider-text">其他登录方式</text>
          <view class="divider-line" />
        </view>
        <view class="social-row">
          <view class="social-btn" @click="onWechatLogin">
            <image
              class="social-icon wechat-icon"
              src="/static/svg/wechat.svg"
              mode="aspectFit"
            />
          </view>
          <view class="social-btn" @click="onAppleLogin">
            <image
              class="social-icon apple-icon"
              src="/static/svg/iphone.svg"
              mode="aspectFit"
            />
          </view>
        </view>
      </view>
    </view>

    <view class="footer">
      <view class="agreement-row" @click="agreed = !agreed">
        <image
          class="agreement-icon"
          :src="agreed ? '/static/svg/agreement_s.svg' : '/static/svg/agreement_n.svg'"
          mode="aspectFit"
        />
        <text class="agreement-text">
          我已阅读并同意
          <text class="agreement-link">《用户协议》</text>
          和
          <text class="agreement-link">《隐私政策》</text>
          ，并授权宠爱宝获取我的公开个人信息。
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loginWithWechat, handleApiError } from '@/utils/auth'

const loginType = ref<'password' | 'code'>('password')
const account = ref('')
const credential = ref('')
const showPassword = ref(false)
const agreed = ref(false)
const loggingIn = ref(false)

const onLogin = () => {
  if (!agreed.value) {
    uni.showToast({ title: '请先同意用户协议', icon: 'none' })
    return
  }
  uni.showToast({ title: '密码/验证码登录暂未开放', icon: 'none' })
}

const onForgotPassword = () => {
  uni.navigateTo({ url: '/extra/forgot-password/index' })
}

const onRegister = () => {
  uni.navigateTo({ url: '/extra/register/index' })
}

const onWechatLogin = async () => {
  if (!agreed.value) {
    uni.showToast({ title: '请先同意用户协议', icon: 'none' })
    return
  }
  if (loggingIn.value) return

  loggingIn.value = true
  try {
    await loginWithWechat()
    uni.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack({ fail: () => uni.switchTab({ url: '/pages/profile/index' }) })
    }, 400)
  } catch (error) {
    handleApiError(error, '微信登录失败')
  } finally {
    loggingIn.value = false
  }
}

const onAppleLogin = () => {
  uni.showToast({ title: 'Apple 登录暂未开放', icon: 'none' })
}
</script>

<style scoped>
.page {
  --color-primary: #006b5d;
  --color-on-primary: #ffffff;
  --color-on-primary-fixed-variant: #005046;
  --color-background: #fcf9f2;
  --color-on-surface: #1c1c18;
  --color-on-surface-variant: #3e4946;
  --color-surface-container: #f0eee7;
  --color-surface-container-high: #ebe8e1;
  --color-surface-container-low: #f6f3ec;
  --color-surface-container-lowest: #ffffff;
  --color-outline: #6e7a76;
  --color-outline-variant: #bdc9c5;
  --color-secondary: #246293;
}

.page {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--color-background);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.brand-header {
  padding: 128rpx 40rpx 80rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.brand-logo {
  width: 192rpx;
  height: 192rpx;
  border-radius: 50%;
  border: 4rpx solid #f0ebe0;
  margin-bottom: 32rpx;
}

.brand-title {
  font-size: 48rpx;
  font-weight: 700;
  color: var(--color-primary);
}

.brand-slogan {
  font-size: 28rpx;
  color: var(--color-on-surface-variant);
  margin-top: 8rpx;
}

.main-content {
  flex: 1;
  padding: 0 40rpx;
  max-width: 896rpx;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.tab-switcher {
  display: flex;
  background: var(--color-surface-container);
  border-radius: 19998rpx;
  padding: 8rpx;
  border: 2rpx solid rgba(189, 201, 197, 0.3);
  margin-bottom: 48rpx;
}

.tab-item {
  flex: 1;
  padding: 24rpx 32rpx;
  border-radius: 19998rpx;
  text-align: center;
  font-size: 24rpx;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-on-surface-variant);
}

.tab-active {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.pill-input {
  display: flex;
  align-items: center;
  background: var(--color-surface-container-low);
  border-radius: 19998rpx;
  padding: 32rpx 48rpx;
  border: 4rpx solid transparent;
}

.input-prefix {
  font-size: 48rpx !important;
  color: var(--color-outline);
  margin-right: 24rpx;
}

.input-prefix-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.input-field {
  flex: 1;
  font-size: 28rpx;
  color: var(--color-on-surface);
  background: transparent;
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-icon {
  width: 44rpx;
  height: 30rpx;
  flex-shrink: 0;
}

.action-links {
  display: flex;
  justify-content: space-between;
  padding: 0 16rpx;
}

.link-text {
  font-size: 24rpx;
  font-weight: 600;
  color: var(--color-outline);
}

.link-register {
  font-size: 24rpx;
  font-weight: 700;
  color: var(--color-secondary);
}

.login-btn {
  margin-top: 32rpx;
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: 32rpx;
  border-radius: 19998rpx;
  font-size: 44rpx;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 8rpx 32rpx rgba(0, 107, 93, 0.2);
}

.third-party {
  margin-top: 96rpx;
  text-align: center;
}

.divider-row {
  display: flex;
  align-items: center;
  margin-bottom: 48rpx;
}

.divider-line {
  flex: 1;
  height: 2rpx;
  background: rgba(189, 201, 197, 0.5);
}

.divider-text {
  padding: 0 32rpx;
  font-size: 24rpx;
  font-weight: 600;
  color: var(--color-outline);
}

.social-row {
  display: flex;
  justify-content: center;
  gap: 48rpx;
}

.social-btn {
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  background: var(--color-surface-container-lowest);
  border: 4rpx solid #f0ebe0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icon {
  flex-shrink: 0;
}

.wechat-icon {
  width: 40rpx;
  height: 40rpx;
}

.apple-icon {
  width: 30rpx;
  height: 44rpx;
}

.footer {
  padding: 40rpx;
  padding-bottom: 48rpx;
}

.agreement-row {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
  max-width: 640rpx;
  margin: 0 auto;
}

.agreement-icon {
  width: 40rpx;
  height: 40rpx;
  margin-top: 2rpx;
  flex-shrink: 0;
}

.agreement-text {
  font-size: 24rpx;
  line-height: 40rpx;
  color: var(--color-on-surface-variant);
}

.agreement-link {
  color: var(--color-primary);
  font-weight: 700;
}
</style>
