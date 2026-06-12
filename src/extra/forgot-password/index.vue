<template>
  <view class="page">
    <PageNavBar title="找回密码" fixed bordered compact title-size="40rpx" />

    <view class="main-content">
      <view class="hero-section">
        <view class="hero-image-wrap">
          <image
            class="hero-image"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvJaB36DM4FZ94RXyv3TuM0kYkTBYx_yTpPOHdnce_kVbJlEWfUS8hYfHSEzCBgo0TvJO4DbLcf1AWXDj_iuLw45CgQixGJFq75ulqnRrphrfwGIdr0RS79mhUztH_tgsAXNsXynx_sIpzuGmZoIpXkEWplqT7e5a7qRWvqlpV6c7QW5tDi_oOdX6o6wZ95cOee6Gyj_PTZxK-nCZZ-75YmLY5rwBwjoR3bybKpWlgRYbD2rE2xHapx5J8h9OtBJB8LVGk9JeDLuI"
            mode="aspectFit"
          />
        </view>
        <text class="hero-desc">验证身份后即可重置您的密码</text>
      </view>

      <view class="form-card">
        <view class="form-fields">
          <view class="form-group">
            <text class="form-label">手机号 / 邮箱</text>
            <view class="pill-input">
              <input
                v-model="account"
                class="input-field"
                type="text"
                placeholder="请输入手机号或邮箱"
              />
              <image
                class="input-suffix-icon input-icon-account"
                src="/static/svg/reset-account.svg"
                mode="aspectFit"
              />
            </view>
          </view>

          <view class="form-group">
            <text class="form-label">验证码</text>
            <view class="otp-row">
              <view class="pill-input input-flex">
                <input
                  v-model="otpCode"
                  class="input-field"
                  type="text"
                  placeholder="验证码"
                />
                <image
                  class="input-suffix-icon input-icon-code"
                  src="/static/svg/reset-code.svg"
                  mode="aspectFit"
                />
              </view>
              <view
                class="otp-btn"
                :class="{ 'otp-btn-disabled': countdown > 0 }"
                @click="onGetOtp"
              >
                <text>{{ otpBtnText }}</text>
              </view>
            </view>
          </view>

          <view class="form-group">
            <text class="form-label">新密码</text>
            <view class="pill-input">
              <input
                v-model="newPassword"
                class="input-field"
                :password="!showPassword"
                placeholder="请输入新密码"
              />
              <view class="toggle-btn" @click="showPassword = !showPassword">
                <image
                  class="input-icon-eye"
                  src="/static/svg/reset-eye-hide.svg"
                  mode="aspectFit"
                />
              </view>
            </view>
          </view>

          <view class="form-group">
            <text class="form-label">确认新密码</text>
            <view class="pill-input">
              <input
                v-model="confirmPassword"
                class="input-field"
                :password="!showConfirmPassword"
                placeholder="请再次输入新密码"
              />
              <image
                class="input-suffix-icon input-icon-pwd"
                src="/static/svg/reset-pwd.svg"
                mode="aspectFit"
              />
            </view>
          </view>
        </view>

        <view class="submit-wrap">
          <view class="submit-btn" @click="onSubmit">
            <text>重置密码</text>
            <image
              class="submit-btn-icon"
              src="/static/svg/btn-success.svg"
              mode="aspectFit"
            />
          </view>
        </view>
      </view>

      <view class="footer-links">
        <text class="contact-link" @click="onContact">遇到问题？联系客服</text>
        <text class="copyright">宠爱宝 © 2024 安全加密连接</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import PageNavBar from '@/components/page-nav-bar/index.vue'

const account = ref('')
const otpCode = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const countdown = ref(0)

let timer: ReturnType<typeof setInterval> | null = null

const otpBtnText = computed(() =>
  countdown.value > 0 ? `${countdown.value}s` : '获取验证码'
)

const onGetOtp = () => {
  if (countdown.value > 0) return
  if (!account.value) {
    uni.showToast({ title: '请先输入手机号或邮箱', icon: 'none' })
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
  if (!account.value || !otpCode.value || !newPassword.value || !confirmPassword.value) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    uni.showToast({ title: '两次密码不一致', icon: 'none' })
    return
  }
  uni.showToast({ title: '密码重置成功', icon: 'success' })
}

const onContact = () => {
  uni.showToast({ title: '联系客服', icon: 'none' })
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.page {
  --color-primary: #006b5d;
  --color-on-primary: #ffffff;
  --color-background: #fcf9f2;
  --color-on-surface: #1c1c18;
  --color-on-surface-variant: #3e4946;
  --color-surface-container-low: #f6f3ec;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container: #f0eee7;
  --color-outline: #6e7a76;
  --color-outline-variant: #bdc9c5;
  --color-secondary-container: #8fc6fd;
  --color-on-secondary-container: #075283;
}

.page {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--color-background);
  color: var(--color-on-surface);
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 16rpx 40rpx;
  overflow: hidden;
}

.hero-section {
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16rpx;
}

.hero-image-wrap {
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 8rpx;
  background: var(--color-surface-container-low);
  border-radius: 24rpx;
  border: 2rpx solid var(--color-surface-container);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-image {
  width: 112rpx;
  height: 112rpx;
  opacity: 0.8;
}

.hero-desc {
  font-size: 26rpx;
  line-height: 36rpx;
  color: var(--color-on-surface-variant);
  text-align: center;
  max-width: 560rpx;
}

.form-card {
  flex: 1;
  min-height: 0;
  width: 100%;
  background: var(--color-surface-container-lowest);
  border: 2rpx solid var(--color-surface-container);
  border-radius: 24rpx;
  padding: 24rpx 32rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.form-label {
  font-size: 24rpx;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-outline);
  margin-left: 16rpx;
}

.pill-input {
  display: flex;
  align-items: center;
  width: 100%;
  background: var(--color-surface-container-low);
  border: none;
  border-radius: 19998rpx;
  padding: 24rpx 40rpx;
  box-sizing: border-box;
}

.input-flex {
  flex: 1;
  min-width: 0;
}

.input-field {
  flex: 1;
  min-width: 0;
  font-size: 30rpx;
  line-height: 44rpx;
  color: var(--color-on-surface);
  background: transparent;
}

.input-suffix-icon {
  flex-shrink: 0;
  margin-left: 24rpx;
}

.input-icon-account {
  width: 32rpx;
  height: 32rpx;
}

.input-icon-code {
  width: 32rpx;
  height: 40rpx;
}

.input-icon-eye {
  width: 44rpx;
  height: 40rpx;
}

.input-icon-pwd {
  width: 32rpx;
  height: 42rpx;
}

.toggle-btn {
  flex-shrink: 0;
  margin-left: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.otp-row {
  display: flex;
  gap: 16rpx;
  align-items: center;
}

.otp-btn {
  flex-shrink: 0;
  padding: 24rpx 32rpx;
  border-radius: 19998rpx;
  background: var(--color-secondary-container);
  color: var(--color-on-secondary-container);
  font-size: 24rpx;
  font-weight: 600;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.otp-btn-disabled {
  opacity: 0.5;
}

.submit-wrap {
  margin-top: 32rpx;
  padding-bottom: 8rpx;
}

.submit-btn {
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: 28rpx 32rpx;
  border-radius: 19998rpx;
  font-size: 36rpx;
  font-weight: 700;
  line-height: 48rpx;
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

.footer-links {
  flex-shrink: 0;
  margin-top: 16rpx;
  margin-bottom: 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.contact-link {
  font-size: 24rpx;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-primary);
}

.copyright {
  font-size: 20rpx;
  color: var(--color-outline-variant);
  opacity: 0.6;
}
</style>
