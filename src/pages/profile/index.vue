<template>
  <view class="page">
    <view class="top-bar">
      <view class="top-bar-left">
        <text class="material-icons icon-fill brand-icon">pets</text>
        <text class="brand-title">宠爱宝</text>
      </view>
      <view class="top-bar-right">
        <view class="icon-btn" @click="onNotification">
          <text class="material-icons">notifications</text>
        </view>
        <view class="icon-btn" @click="onSettings">
          <text class="material-icons">settings</text>
        </view>
      </view>
    </view>

    <view class="main-content">
      <view class="profile-section">
        <image
          class="user-avatar"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYAsCG7wotY1r9MFn-eeL1qC0JDe6CumJj50s1BDG_roN1wEhWwcWfC1zPtEyFfQiZwmk2JrPbYB2Q-kTLx5KvNUJ-ORXYBOCDRAOGMghIQvq-pqhwDObzvRkZ5vxZg3JKpFgxeJFLnlKiH3G8UH-CYbThADi4ZB6vrQaM0QJXVigwGLLKyM8As398H0ZG90VqJfLTN7U2Dbwr2Hiojoh84Y1vef5S4VHW1_zf88gO5vDBz-hisHo1kduDt_BnEolDEnVveoFZh0Y"
        />
        <view class="user-info">
          <view class="user-name-row">
            <text class="user-name">林小暖</text>
            <view class="level-badge">
              <text class="material-icons icon-fill level-icon">stars</text>
              <text>LV.3</text>
            </view>
          </view>
          <text class="user-bio">爱狗狗，也爱生活。每一天都要陪布丁去草坪跑跑～</text>
        </view>
      </view>

      <view class="stats-card">
        <view v-for="stat in stats" :key="stat.label" class="stat-item">
          <text class="stat-value">{{ stat.value }}</text>
          <text class="stat-label">{{ stat.label }}</text>
        </view>
      </view>

      <view class="pets-section">
        <view class="section-header">
          <text class="section-title">宠物档案</text>
          <view class="manage-btn" @click="onManagePets">
            <text>管理</text>
            <text class="material-icons chevron">chevron_right</text>
          </view>
        </view>
        <scroll-view class="pets-scroll" scroll-x :show-scrollbar="false">
          <view class="pets-list">
            <view v-for="pet in pets" :key="pet.id" class="pet-card">
              <image class="pet-avatar" :src="pet.avatar" :class="pet.borderClass" />
              <text class="pet-name">{{ pet.name }}</text>
              <text class="pet-desc">{{ pet.desc }}</text>
              <text class="pet-tag" :class="pet.tagClass">{{ pet.tag }}</text>
            </view>
            <view class="add-pet-btn" @click="onAddPet">
              <text class="material-icons">add_circle</text>
              <text class="add-pet-text">添加宠物</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <view class="function-grid">
        <view
          v-for="fn in functions"
          :key="fn.label"
          class="function-item"
          @click="onFunction(fn.id)"
        >
          <view class="function-icon" :class="fn.bgClass">
            <text class="material-icons icon-fill" :class="fn.colorClass">{{ fn.icon }}</text>
          </view>
          <text class="function-label">{{ fn.label }}</text>
        </view>
      </view>

      <view class="menu-list">
        <view
          v-for="item in menuItems"
          :key="item.label"
          class="menu-item"
          @click="onMenu(item.id)"
        >
          <view class="menu-left">
            <text class="material-icons menu-icon">{{ item.icon }}</text>
            <text class="menu-label">{{ item.label }}</text>
          </view>
          <text class="material-icons menu-arrow">chevron_right</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
const stats = [
  { value: '1.2k', label: '获赞' },
  { value: '358', label: '粉丝' },
  { value: '82', label: '关注' },
  { value: '15', label: '发帖' },
]

const pets = [
  {
    id: 1,
    name: '布丁',
    desc: '金毛 · 2岁',
    tag: '疫苗已打',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp5eWXHUzzsQLNTckgxaXjRDQAU6-uJnPLfx8uJ0lnbxvOxJhMeQYXE-FaS0GK159ZtXCm3gMIOdl4IlvluGZdmRKd5tOQl8YW-XiJupP-bQct4Hk2HxffTKsWzqCZyO6AlEZEfARYqf4cpW5CeMGNiw6O19edyJKZo7PCtyBIFB0WbSlzjqTbIoJJ2cMuObuXhGIYzOpjbYRu9ptOdTxr1zSPn2CCBzvLa3LB4FBX-KAoGV-WIohmCnfGqPSdPiqTZsTds4o0nng',
    borderClass: 'border-primary',
    tagClass: 'tag-secondary',
  },
  {
    id: 2,
    name: '雪球',
    desc: '布偶 · 1岁',
    tag: '驱虫已做',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNFslBUwpMrXlvbuU8DXMatwHy5TQXPnNy226rjYr0BACnwYEVDAt3JePh29GhnvcSgMfjDlz24my0UQUbbqZbgL1f0GQNrmevdCRNtynFxY7BMiY6ctddHPth25bFnSECuIc7c8qCy43KfLW7iar2qP4l_m8jdCptqvXGxaqo5WCpLiPH5VaPubj0IYzF2duwz67G2GrV2nzyFNP1Gkt6VndOR7PxUZB09gXcAe_SsSaKmZhdDgz4N-He9bsm5ZWVcbHQCZw6wps',
    borderClass: 'border-tertiary',
    tagClass: 'tag-tertiary',
  },
]

const functions = [
  { id: 'orders', label: '订单管理', icon: 'package_2', bgClass: 'bg-secondary', colorClass: 'color-secondary' },
  { id: 'appointment', label: '预约挂号', icon: 'event_available', bgClass: 'bg-primary', colorClass: 'color-primary' },
  { id: 'schedule', label: '课程表', icon: 'calendar_month', bgClass: 'bg-tertiary', colorClass: 'color-tertiary' },
]

const menuItems = [
  { id: 'favorites', label: '我的收藏', icon: 'favorite' },
  { id: 'posts', label: '我的动态', icon: 'chat_bubble' },
  { id: 'address', label: '地址管理', icon: 'location_on' },
  { id: 'help', label: '帮助与反馈', icon: 'help' },
  { id: 'service', label: '联系客服', icon: 'support_agent' },
]

const onNotification = () => uni.showToast({ title: '通知', icon: 'none' })
const onSettings = () => uni.showToast({ title: '设置', icon: 'none' })
const onManagePets = () => uni.showToast({ title: '管理宠物档案', icon: 'none' })
const onAddPet = () => uni.navigateTo({ url: '/extra/add-pet/index' })
const onFunction = (id: string) => uni.showToast({ title: id, icon: 'none' })
const onMenu = (id: string) => uni.showToast({ title: id, icon: 'none' })
</script>

<style scoped>
.page {
  --color-primary: #006b5d;
  --color-on-primary-container: #005d51;
  --color-background: #fcf9f2;
  --color-surface: #fcf9f2;
  --color-on-surface: #1c1c18;
  --color-on-surface-variant: #3e4946;
  --color-primary-container: #76d7c4;
  --color-primary-fixed: #93f4e0;
  --color-secondary: #246293;
  --color-secondary-fixed: #cfe5ff;
  --color-on-secondary-fixed-variant: #004a77;
  --color-secondary-container: #8fc6fd;
  --color-tertiary: #8a5024;
  --color-tertiary-fixed: #ffdcc6;
  --color-on-tertiary-fixed: #301400;
  --color-on-tertiary-fixed-variant: #6d390e;
  --color-tertiary-container: #ffb684;
  --color-surface-container: #f0eee7;
  --color-surface-container-high: #ebe8e1;
  --color-surface-container-low: #f6f3ec;
  --color-surface-container-lowest: #ffffff;
  --color-outline-variant: #bdc9c5;
  --color-outline: #6e7a76;
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
  background: var(--color-surface);
  border-bottom: 2rpx solid var(--color-outline-variant);
  box-sizing: border-box;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.brand-icon {
  color: var(--color-primary);
}

.brand-title {
  font-size: 48rpx;
  font-weight: 700;
  color: var(--color-primary);
}

.top-bar-right {
  display: flex;
  gap: 32rpx;
}

.icon-btn {
  color: var(--color-on-surface-variant);
}

.main-content {
  padding: 160rpx 40rpx 48rpx;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 32rpx;
  margin-bottom: 48rpx;
}

.user-avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.user-info {
  flex: 1;
}

.user-name-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 8rpx;
}

.user-name {
  font-size: 44rpx;
  font-weight: 700;
  color: var(--color-on-surface);
}

.level-badge {
  display: flex;
  align-items: center;
  gap: 4rpx;
  background: var(--color-tertiary-fixed);
  color: var(--color-on-tertiary-fixed);
  padding: 4rpx 16rpx;
  border-radius: 19998rpx;
  font-size: 20rpx;
  font-weight: 600;
}

.level-icon {
  font-size: 24rpx !important;
}

.user-bio {
  font-size: 28rpx;
  color: var(--color-on-surface-variant);
  line-height: 40rpx;
}

.stats-card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  border: 2rpx solid var(--color-surface-container-high);
  margin-bottom: 48rpx;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 44rpx;
  font-weight: 700;
  color: var(--color-primary);
}

.stat-label {
  font-size: 24rpx;
  font-weight: 600;
  color: var(--color-on-surface-variant);
}

.pets-section {
  margin-bottom: 48rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.section-title {
  font-size: 44rpx;
  font-weight: 700;
  color: var(--color-on-surface);
}

.manage-btn {
  display: flex;
  align-items: center;
  color: var(--color-primary);
  font-size: 24rpx;
  font-weight: 600;
}

.chevron {
  font-size: 32rpx !important;
}

.pets-scroll {
  width: 100%;
  white-space: nowrap;
}

.pets-list {
  display: inline-flex;
  gap: 32rpx;
  padding-bottom: 16rpx;
}

.pet-card {
  min-width: 400rpx;
  background: #fff;
  padding: 32rpx;
  border-radius: 24rpx;
  border: 2rpx solid var(--color-surface-container-high);
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.pet-avatar {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  margin-bottom: 16rpx;
  border: 4rpx solid;
}

.border-primary {
  border-color: var(--color-primary-fixed);
}

.border-tertiary {
  border-color: var(--color-tertiary-fixed);
}

.pet-name {
  font-weight: 700;
  color: var(--color-on-surface);
}

.pet-desc {
  font-size: 24rpx;
  color: var(--color-on-surface-variant);
  margin-bottom: 24rpx;
}

.pet-tag {
  font-size: 20rpx;
  padding: 8rpx 24rpx;
  border-radius: 19998rpx;
  border-bottom: 4rpx solid;
}

.tag-secondary {
  background: var(--color-secondary-fixed);
  color: var(--color-on-secondary-fixed-variant);
  border-color: var(--color-secondary-container);
}

.tag-tertiary {
  background: var(--color-tertiary-fixed);
  color: var(--color-on-tertiary-fixed-variant);
  border-color: var(--color-tertiary-container);
}

.add-pet-btn {
  min-width: 240rpx;
  background: var(--color-surface-container-low);
  border: 4rpx dashed var(--color-outline-variant);
  border-radius: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  color: var(--color-outline);
  flex-shrink: 0;
}

.add-pet-text {
  font-size: 24rpx;
  font-weight: 600;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32rpx;
  margin-bottom: 48rpx;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.function-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.bg-secondary {
  background: var(--color-secondary-fixed);
}

.bg-primary {
  background: var(--color-primary-fixed);
}

.bg-tertiary {
  background: var(--color-tertiary-fixed);
}

.color-secondary {
  color: var(--color-secondary);
}

.color-primary {
  color: var(--color-primary);
}

.color-tertiary {
  color: var(--color-tertiary);
}

.function-label {
  font-size: 24rpx;
  font-weight: 600;
}

.menu-list {
  background: #fff;
  border-radius: 24rpx;
  border: 2rpx solid var(--color-surface-container-high);
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
  border-bottom: 2rpx solid var(--color-surface-container-low);
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.menu-icon {
  color: var(--color-on-surface-variant);
}

.menu-label {
  font-size: 32rpx;
  color: var(--color-on-surface);
}

.menu-arrow {
  color: var(--color-outline-variant);
}
</style>
