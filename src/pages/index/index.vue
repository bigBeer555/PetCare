<template>
  <view class="page">
    <!-- Desktop TopAppBar -->
    <view class="top-bar-desktop">
      <view class="top-bar-inner">
        <view class="top-bar-left">
          <image class="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgA_nCPO4sssD2LDkN6DacqnpT4KNDe1U6yJovKATvuYimUIDOo2Kp58gHaSRKP4_CJlG66iKeWdUhK5jvSXdwabmV64BBImmaKDt20fZ7ccuaL7CXKgeCff_jpbIPkdQnkPzzA62ltVSPfbdZO5r2nPh33knIU4PWf1fHzLu48UVIaz6agMOh18jn9IG_vxqYRnMbxmJLzyB--DxjbG86UKT3pw_VexzbaX9l-BqJOdrWZYN3GvGzeD-stpYQUHl18ES-7iHkAds" />
          <text class="brand-title">宠爱宝</text>
        </view>
        <view class="top-bar-nav">
          <view class="nav-item nav-item-active" @click="onNav('home')">
            <image class="nav-icon" src="/static/svg/animal-paw.svg" mode="aspectFit" />
            <text>首页</text>
          </view>
          <view class="nav-item" @click="onNav('food')">
            <image class="nav-icon" src="/static/svg/food.svg" mode="aspectFit" />
            <text>能不能吃</text>
          </view>
          <view class="nav-item" @click="onNav('shop')">
            <image class="nav-icon" src="/static/svg/animal-other.svg" mode="aspectFit" />
            <text>避敏商城</text>
          </view>
          <view class="nav-item" @click="onNav('community')">
            <image class="nav-icon" src="/static/svg/wechat.svg" mode="aspectFit" />
            <text>训宠社群</text>
          </view>
          <view class="nav-item" @click="onNav('profile')">
            <image class="nav-icon" src="/static/svg/account.svg" mode="aspectFit" />
            <text>我的</text>
          </view>
        </view>
        <view class="top-bar-right">
          <image class="notification-icon" src="/static/svg/message.svg" mode="aspectFit" />
        </view>
      </view>
    </view>

    <!-- Mobile TopAppBar -->
    <PageNavBar
      variant="brand"
      title="宠爱宝"
      mobile-only
      sticky
      title-size="24"
      :avatar="mobileAvatar"
      @notification-click="onNotification"
    />

    <!-- Main Content -->
    <view class="main-content">
      <!-- Profile Header -->
      <view class="profile-section">
        <view class="profile-avatar-wrapper">
          <view class="profile-avatar">
            <image class="avatar-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIZe8qidozdJHcI6HDQml-BV2Y3f-g78oo3wD_genNQNnYT025KzVeZi8JtDJEhMFrA6V2kRInY6vGSN76uS2RoK3S_rPsa9fVQ1RJXfVmPP7nOkXta-tP0O2UKFf5L4_E6LNUH6Slq0C1NB2cOPHr7nzoW2V0t-ZVlPHfX8jmhakTIll-1KX6JwKelEVwixR-LzcUtQORRz3soF_-vIV2qVb0HA8cFeFqEUBmnuH7lDxOTXxuv2NIZZpArLCN8brwaKpyn-EIX1Y" />
          </view>
          <view class="badge-puppy">
            <image class="badge-icon" src="/static/svg/cate-label.svg" mode="aspectFit" />
            <text>幼犬</text>
          </view>
        </view>
        <view class="profile-info">
          <view class="profile-name-row">
            <text class="profile-name">跳跳</text>
            <image class="gender-icon" src="/static/svg/gender.svg" mode="aspectFit" />
          </view>
          <text class="profile-desc">杰克罗素梗 · 8个月 · 6.5kg</text>
        </view>
        <!-- Tags -->
        <view class="tags-row">
          <text class="tag tag-primary">玻璃胃</text>
          <text class="tag tag-error">鸡肉过敏</text>
          <text class="tag tag-secondary">幼犬</text>
          <text class="tag tag-muted">不爱喝水</text>
        </view>
        <!-- Family Sharing -->
        <view class="family-row">
          <view class="family-label">
            <image class="family-icon" src="/static/svg/family-share.svg" mode="aspectFit" />
            <text>家庭共享</text>
          </view>
          <view class="family-members">
            <image class="member-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgbOFy4h8uh5vycfw4exV7xm9ICA0oFexv1drJdyEj2iQxVjRdD6CLS_rAToZU1Ll3spsSzKcXBfBk7zspDgnN6cEaTNzVhejwRwSJCfg3CffSLE5BOx_HLjkej15qeb075YGoy3Ml7pir5GEX49qim4V8CNXeY4V_B17EhMnVzEUPhkNcDHLa_O1DbQ65SnjzbdBHWdsmDKK0IejnFmff_jXg_gIjf0E0z4D6cT-l3dzc4AiFmcL8iggdo-fIz5WuJa6KKWp1R1s" />
            <image class="member-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAaUyW2r3sD_Az0zGkmt3N5IVyj-FUogy9tUueM0HmEB-zV25oV94h6qkNCPzk9thL5-4iiC-QFgpe29e5CVNTVzdzqYXildrjWG2Nhj7onPpZj-rKloWuCtoKKsmwB7rQ8pC_Eqd1Bb4UUGgBKT_eSKR0XAVLdogm1axoIl545pY3ghCkiai4v6d0JjOSBNt2AgECYgPB0e7-J7w-9mu8wg9yZpf08mbMf37VaAP4_YLRONVgmz_5KZFpt-ngrWBhgltVK2V_Jv0" />
            <view class="member-add">
              <image class="member-add-icon" src="/static/svg/add-label.svg" mode="aspectFit" />
            </view>
          </view>
        </view>
      </view>

      <!-- Action Icons -->
      <view class="actions-row">
        <view class="action-item" @click="onAction('food')">
          <view class="action-icon action-icon-primary">
            <image class="action-icon-inner" src="/static/svg/food.svg" mode="aspectFit" />
          </view>
          <text class="action-label">能不能吃</text>
        </view>
        <view class="action-item" @click="onAction('feed')">
          <view class="action-icon action-icon-teal">
            <image class="action-icon-inner" src="/static/svg/smart.svg" mode="aspectFit" />
          </view>
          <text class="action-label">智能喂养</text>
        </view>
        <view class="action-item" @click="onAction('health')">
          <view class="action-icon action-icon-error">
            <image class="action-icon-inner" src="/static/svg/exceptional.svg" mode="aspectFit" />
          </view>
          <text class="action-label">异常自查</text>
        </view>
        <view class="action-item" @click="onAction('train')">
          <view class="action-icon action-icon-secondary">
            <image class="action-icon-inner" src="/static/svg/class.svg" mode="aspectFit" />
          </view>
          <text class="action-label">训宠课</text>
        </view>
      </view>

      <!-- Daily Tasks -->
      <view class="tasks-section">
        <view class="tasks-header">
          <text class="tasks-title">今日任务</text>
          <view class="tasks-all" @click="onAllTasks">
            <text>全部</text>
            <image class="chevron-icon" src="/static/svg/task-more.svg" mode="aspectFit" />
          </view>
        </view>
        <view class="tasks-list">
          <!-- Task 1: Completed -->
          <view class="task-card">
            <view class="task-icon-wrapper task-icon-done">
              <image class="task-icon" src="/static/svg/feeding.svg" mode="aspectFit" />
            </view>
            <view class="task-info">
              <text class="task-name">晚餐喂食</text>
              <text class="task-detail">18:00 · 120g 幼犬粮</text>
            </view>
            <view class="task-check">
              <image class="check-icon" src="/static/svg/check-success.svg" mode="aspectFit" />
            </view>
          </view>
          <!-- Task 2: Action Needed -->
          <view class="task-card">
            <view class="task-icon-wrapper task-icon-warn">
              <image class="task-icon" src="/static/svg/remind.svg" mode="aspectFit" />
            </view>
            <view class="task-info">
              <text class="task-name">内驱虫提醒</text>
              <text class="task-detail task-detail-warn">今天到期 · 请尽快完成</text>
            </view>
            <view class="task-btn" @click="onRecord">
              <text>记录</text>
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import PageNavBar from '@/components/page-nav-bar/index.vue'

const mobileAvatar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCLf1dEm0P0iLgUzCm6Qnmti5qHATwnCMx-Zd-uLiC0JGT99aIOxe9Ej2N86u0qdFnyd66NuC0B515jh_wow_pw76Ycc2iM-br7G9S3qujTnf9_zPE5BZEMdMLPmRlCNTq5EwIzQxiAEnGi_6ixKFej1cHasJDioNo3WeQ7BKF2IhIh5gwZWegCETgRQMX9LHiBr65T4tUwnbWTMD1dxw2Ki-yaRs3hXgNrMZ_xvjGXf2cD0wIm5ehfIiowmrRbcU-k_H64-ssdFrI'

const onNav = (target: string) => {
  uni.showToast({ title: `导航到: ${target}`, icon: 'none' })
}

const onAction = (target: string) => {
  uni.showToast({ title: `打开: ${target}`, icon: 'none' })
}

const onAllTasks = () => {
  uni.showToast({ title: '查看全部任务', icon: 'none' })
}

const onRecord = () => {
  uni.showToast({ title: '记录驱虫', icon: 'none' })
}

const onNotification = () => {
  uni.showToast({ title: '消息通知', icon: 'none' })
}

</script>

<style scoped>
/* ========== CSS Variables (Design Tokens) ========== */
.page {
  --color-primary: #5e8c83;
  --color-on-primary: #ffffff;
  --color-primary-container: #d9e8e5;
  --color-on-primary-container: #1a332e;
  --color-secondary: #a68b6d;
  --color-secondary-container: #f2ebd9;
  --color-on-secondary-container: #5c4d3c;
  --color-background: #fcf9f2;
  --color-surface: #ffffff;
  --color-surface-container: #f7f4ec;
  --color-surface-container-high: #f2efe7;
  --color-surface-container-highest: #edeae2;
  --color-on-background: #2c3331;
  --color-on-surface: #2c3331;
  --color-on-surface-variant: #5a6361;
  --color-outline-variant: #cbd6d3;
  --color-error: #ba1a1a;
  --color-error-container: #ffdad6;
  --color-active-green: #76d7c4;
  --color-active-text: #005d51;
  --color-grey-text: #717171;
}

.page {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  background-color: var(--color-background);
  color: var(--color-on-background);
  min-height: 100vh;
  position: relative;
}

.nav-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.notification-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

/* ========== Desktop Top Bar ========== */
.top-bar-desktop {
  display: none;
}

.top-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  border-bottom: 1px solid rgba(203, 214, 211, 0.3);
  background: var(--color-background);
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(94, 140, 131, 0.2);
}

.brand-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: #2c3331;
}

.top-bar-nav {
  display: flex;
  gap: 32px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: var(--color-on-surface-variant);
  cursor: pointer;
  transition: color 0.2s;
}

.nav-item-active {
  color: var(--color-primary);
}

.top-bar-right {
  cursor: pointer;
}

/* ========== Main Content ========== */
.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-sizing: border-box;
}

/* ========== Profile Section ========== */
.profile-section {
  background: rgba(247, 244, 236, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 2rem;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(203, 214, 211, 0.3);
}

.profile-avatar-wrapper {
  position: relative;
  margin-bottom: 16px;
}

.profile-avatar {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 4px solid var(--color-surface);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
}

.badge-puppy {
  position: absolute;
  bottom: 0;
  right: 4px;
  background: var(--color-secondary);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.04em;
  padding: 4px 12px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 2px solid var(--color-surface);
}

.badge-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.profile-info {
  text-align: center;
  margin-bottom: 24px;
}

.profile-name-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 4px;
}

.profile-name {
  font-size: 32px;
  font-weight: 800;
  line-height: 48px;
  letter-spacing: -0.02em;
  color: var(--color-on-background);
}

.gender-icon {
  width: 20px;
  height: 16px;
  flex-shrink: 0;
}

.profile-desc {
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: var(--color-on-surface-variant);
}

/* Tags */
.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 32px;
}

.tag {
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 700;
}

.tag-primary {
  background: rgba(94, 140, 131, 0.1);
  color: var(--color-primary);
}

.tag-error {
  background: var(--color-error-container);
  color: var(--color-error);
}

.tag-secondary {
  background: var(--color-secondary-container);
  color: var(--color-on-secondary-container);
}

.tag-muted {
  background: var(--color-surface-container-highest);
  color: var(--color-on-surface-variant);
}

/* Family Sharing */
.family-row {
  width: 100%;
  max-width: 384px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(203, 214, 211, 0.5);
}

.family-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-on-surface-variant);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.02em;
}

.family-icon {
  width: 14px;
  height: 15px;
  flex-shrink: 0;
}

.family-members {
  display: flex;
  align-items: center;
}

.member-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--color-surface);
  margin-left: -8px;
}

.member-avatar:first-child {
  margin-left: 0;
}

.member-add {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(94, 140, 131, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  border: 2px solid var(--color-surface);
  margin-left: -8px;
}

.member-add-icon {
  width: 20px;
  height: 20px;
}

/* ========== Action Icons ========== */
.actions-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 0 8px;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.action-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-icon-primary {
  background: rgba(94, 140, 131, 0.1);
  color: var(--color-primary);
}

.action-icon-teal {
  background: var(--color-primary-container);
  color: var(--color-primary);
}

.action-icon-error {
  background: var(--color-error-container);
  color: var(--color-error);
}

.action-icon-secondary {
  background: var(--color-secondary-container);
  color: var(--color-secondary);
}

.action-icon-inner {
  width: 32px;
  height: 32px;
}

.action-label {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: var(--color-on-background);
}

/* ========== Tasks Section ========== */
.tasks-section {
  margin-top: 8px;
}

.tasks-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 4px;
}

.tasks-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: var(--color-on-background);
}

.tasks-all {
  display: flex;
  align-items: center;
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.02em;
}

.chevron-icon {
  width: 6px;
  height: 9px;
  flex-shrink: 0;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-card {
  background: var(--color-surface);
  border-radius: 1.5rem;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid rgba(203, 214, 211, 0.3);
}

.task-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.task-icon {
  width: 48px;
  height: 48px;
}

.task-icon-done {
  background: transparent;
  color: var(--color-primary);
}

.task-icon-warn {
  background: transparent;
  color: var(--color-error);
}

.task-info {
  flex: 1;
}

.task-name {
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: var(--color-on-background);
  display: block;
}

.task-detail {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: var(--color-on-surface-variant);
  display: block;
}

.task-detail-warn {
  color: var(--color-error);
  font-weight: 600;
}

.task-check {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.check-icon {
  width: 32px;
  height: 32px;
}

.task-btn {
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.02em;
  padding: 8px 24px;
  border-radius: 9999px;
}

/* ========== Responsive ========== */
@media (min-width: 768px) {
  .top-bar-desktop {
    display: block;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .top-bar-mobile {
    display: none;
  }

  .main-content {
    padding: 16px 40px;
  }

  .profile-avatar {
    width: 160px;
    height: 160px;
  }

  .profile-name {
    font-size: 40px;
    line-height: 48px;
    letter-spacing: -0.02em;
  }
}

@media (max-width: 767px) {
  .top-bar-desktop {
    display: none;
  }
}
</style>
