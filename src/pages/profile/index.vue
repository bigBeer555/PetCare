<template>
  <view class="page">
    <PageNavBar
      variant="brand"
      :title="navTitle"
      sticky
      title-size="24"
      :avatar="navAvatar"
    >
      <template #right>
        <view class="nav-actions">
          <view class="nav-action-btn" @click.stop="onNotification">
            <view class="nav-action-icon nav-action-icon--message" />
          </view>
          <view class="nav-action-btn" @click.stop="onSettings">
            <view class="nav-action-icon nav-action-icon--settings" />
          </view>
        </view>
      </template>
    </PageNavBar>

    <view class="main-content">
      <view class="profile-section" @click="onProfileTap">
        <image class="user-avatar" mode="aspectFit" :src="userAvatar" />
        <view class="user-info">
          <view class="user-name-row">
            <text class="user-name">{{ userName }}</text>
            <view v-if="loggedIn" class="level-badge">
              <image class="level-icon" src="/static/svg/level-star.svg" mode="aspectFit" />
              <text>LV.3</text>
            </view>
          </view>
          <text class="user-bio">{{ userBio }}</text>
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
            <image class="chevron-icon" src="/static/svg/manage-more.svg" mode="aspectFit" />
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
            <!-- <view class="add-pet-btn" @click="onAddPet">
              <image class="add-pet-icon" src="/static/svg/add-label.svg" mode="aspectFit" />
              <text class="add-pet-text">添加宠物</text>
            </view> -->
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
            <image class="function-icon-img" :src="fn.icon" mode="aspectFit" />
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
            <image class="menu-icon" :src="item.icon" mode="aspectFit" />
            <text class="menu-label">{{ item.label }}</text>
          </view>
          <image class="menu-arrow" src="/static/svg/item-arrow-right.svg" mode="aspectFit" />
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import PageNavBar from '@/components/page-nav-bar/index.vue'
import { getAuthMe } from '@/api/auth'
import { fetchPets } from '@/api/pets'
import { ensureLoggedIn, handleApiError } from '@/utils/auth'
import { defaultPetRef, syncDefaultPetFromList } from '@/utils/default-pet'
import { getPetAvatarUrl, mapPetToProfileCard } from '@/utils/pet-mapper'
import { getStoredUser, isLoggedIn } from '@/utils/storage'

const DEFAULT_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAYAsCG7wotY1r9MFn-eeL1qC0JDe6CumJj50s1BDG_roN1wEhWwcWfC1zPtEyFfQiZwmk2JrPbYB2Q-kTLx5KvNUJ-ORXYBOCDRAOGMghIQvq-pqhwDObzvRkZ5vxZg3JKpFgxeJFLnlKiH3G8UH-CYbThADi4ZB6vrQaM0QJXVigwGLLKyM8As398H0ZG90VqJfLTN7U2Dbwr2Hiojoh84Y1vef5S4VHW1_zf88gO5vDBz-hisHo1kduDt_BnEolDEnVveoFZh0Y'

const loggedIn = ref(false)
const userName = ref('未登录')
const userBio = ref('登录后可同步您的宠物档案')
const userAvatar = ref(DEFAULT_AVATAR)
const navTitle = computed(() => defaultPetRef.value?.name || '宠爱宝')
const navAvatar = computed(() =>
  defaultPetRef.value ? getPetAvatarUrl(defaultPetRef.value) : '',
)

const pets = ref<ReturnType<typeof mapPetToProfileCard>[]>([])

const stats = [
  { value: '1.2k', label: '获赞' },
  { value: '358', label: '粉丝' },
  { value: '82', label: '关注' },
  { value: '15', label: '发帖' },
]

const functions = [
  { id: 'orders', label: '订单管理', icon: '/static/svg/order.svg', bgClass: 'bg-secondary' },
  { id: 'appointment', label: '预约挂号', icon: '/static/svg/calendar.svg', bgClass: 'bg-primary' },
  { id: 'schedule', label: '课程表', icon: '/static/svg/class-form.svg', bgClass: 'bg-tertiary' },
]

const menuItems = [
  { id: 'favorites', label: '我的收藏', icon: '/static/svg/collection.svg' },
  { id: 'posts', label: '我的动态', icon: '/static/svg/dynamic.svg' },
  { id: 'address', label: '地址管理', icon: '/static/svg/address.svg' },
  { id: 'help', label: '帮助与反馈', icon: '/static/svg/feedback.svg' },
  { id: 'service', label: '联系客服', icon: '/static/svg/customer-service.svg' },
]

const applyGuestState = () => {
  loggedIn.value = false
  userName.value = '未登录'
  userBio.value = '登录后可同步您的宠物档案'
  userAvatar.value = DEFAULT_AVATAR
  pets.value = []
  defaultPetRef.value = null
}

const loadProfile = async () => {
  if (!isLoggedIn()) {
    const cached = getStoredUser()
    if (cached) {
      userName.value = cached.nickname || '微信用户'
      userAvatar.value = cached.avatarUrl || DEFAULT_AVATAR
    } else {
      applyGuestState()
    }
    return
  }

  loggedIn.value = true
  try {
    const [user, petList] = await Promise.all([getAuthMe(), fetchPets()])
    userName.value = user.nickname || '微信用户'
    userBio.value = '爱宠物，更爱生活'
    userAvatar.value = user.avatarUrl || DEFAULT_AVATAR
    pets.value = petList.map(mapPetToProfileCard)
    syncDefaultPetFromList(petList)
  } catch (error) {
    handleApiError(error, '加载资料失败')
  }
}

onShow(() => {
  loadProfile()
})

const onProfileTap = () => {
  if (!loggedIn.value) {
    uni.navigateTo({ url: '/extra/login/index' })
  }
}

const onNotification = () => uni.showToast({ title: '通知', icon: 'none' })
const onSettings = () => uni.showToast({ title: '设置', icon: 'none' })
const onManagePets = () => {
  if (!ensureLoggedIn()) return
  uni.navigateTo({ url: '/extra/pet-list/index' })
}
const onAddPet = () => {
  if (!ensureLoggedIn()) return
  uni.navigateTo({ url: '/extra/add-pet/index' })
}
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

.main-content {
  padding: 32rpx 40rpx 48rpx;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.nav-action-btn {
  width: 76rpx;
  height: 76rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nav-action-icon {
  width: var(--page-nav-bar-icon-size, 62rpx);
  height: var(--page-nav-bar-icon-size, 62rpx);
  background-color: var(--color-primary, #006b5d);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: var(--page-nav-bar-icon-mask-size, 132%);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: var(--page-nav-bar-icon-mask-size, 132%);
  -webkit-filter: var(--page-nav-bar-icon-bold-filter);
  filter: var(--page-nav-bar-icon-bold-filter);
  flex-shrink: 0;
}

.nav-action-icon--message {
  -webkit-mask-image: url('/static/svg/message.svg');
  mask-image: url('/static/svg/message.svg');
}

.nav-action-icon--settings {
  -webkit-mask-image: url('/static/svg/settings.svg');
  mask-image: url('/static/svg/settings.svg');
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
  width: 24rpx;
  height: 24rpx;
  flex-shrink: 0;
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

.chevron-icon {
  width: 10rpx;
  height: 16rpx;
  margin-left: 4rpx;
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
  min-width: 320rpx;
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

.add-pet-icon {
  width: 48rpx;
  height: 48rpx;
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

.function-icon-img {
  width: 48rpx;
  height: 48rpx;
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
  width: 40rpx;
  height: 40rpx;
  flex-shrink: 0;
}

.menu-label {
  font-size: 32rpx;
  color: var(--color-on-surface);
}

.menu-arrow {
  width: 24rpx;
  height: 24rpx;
  flex-shrink: 0;
}
</style>
