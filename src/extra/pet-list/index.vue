<template>
  <view class="page">
    <PageNavBar
      title="宠物档案管理"
      fixed
      bordered
      compact
      title-size="22"
      :auto-back="false"
      @back="onBack"
    />

    <view class="main-content">
      <view class="page-header">
        <text class="page-subtitle">您的萌宠家族</text>
        <view class="page-accent" />
      </view>

      <view class="pet-list">
        <view
          v-for="pet in pets"
          :key="pet.id"
          class="pet-card"
          @click="onPetDetail(pet.id)"
        >
          <view class="pet-avatar-wrap">
            <image class="pet-avatar" :src="pet.avatar" mode="aspectFill" />
            <view class="pet-badge-icon">
              <image class="pet-badge-img" :src="pet.badgeIcon" mode="aspectFit" />
            </view>
          </view>

          <view class="pet-info">
            <view class="pet-info-top">
              <view class="pet-meta">
                <text class="pet-name">{{ pet.name }}</text>
                <view class="pet-tags">
                  <text v-if="pet.isDefault" class="pet-tag tag-default">默认</text>
                  <text class="pet-tag" :class="pet.breedClass">{{ pet.breed }}</text>
                  <text class="pet-tag tag-age">{{ pet.age }}</text>
                </view>
              </view>
              <view class="edit-btn" @click.stop="onEditPet(pet.id)">
                <view class="edit-icon" />
              </view>
            </view>
          </view>
        </view>

        <view class="add-card" @click="onAddPet">
          <view class="add-card-icon-wrap">
            <view class="add-card-icon" />
          </view>
          <text class="add-card-text">添加新宠物</text>
        </view>
      </view>

      <view class="page-footer">
        <image
          class="footer-illustration"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs88FlAs_qdTIq79RECcthIlgZU6GOL5OVCGj--m1DXIgpe8Kqf9Dj8pkeOsx2burSSod4e2tCkjWbUgxAXZgu0Rb3qng7yIArBydv_iwc2ex1QUsRKyT0Afjzsqj929_d_QKDeQ536VhpCzLSb2EI7bjsxd23liq5ngrai4-Os39_HriqFzsiW34U10N8AVE0o5alXq3_pnLUcs-Pw8hRa9Yjt1lY7fmrcxrjYGEi1ESIhvCIAQKvwuY4MwT7MvlNvcBEeCxnVvo"
          mode="aspectFit"
        />
        <text class="footer-text">精心呵护每一个TA</text>
      </view>
    </view>

    <view class="fab" @click="onAddPet">
      <image class="fab-icon" src="/static/svg/add-label.svg" mode="aspectFit" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import PageNavBar from '@/components/page-nav-bar/index.vue'
import { fetchPets } from '@/api/pets'
import { ensureLoggedIn, handleApiError } from '@/utils/auth'
import { mapPetToListItem } from '@/utils/pet-mapper'

const pets = ref<ReturnType<typeof mapPetToListItem>[]>([])
const loading = ref(false)

const loadPets = async () => {
  if (!ensureLoggedIn()) return

  loading.value = true
  try {
    const data = await fetchPets()
    pets.value = data.map(mapPetToListItem)
  } catch (error) {
    handleApiError(error, '加载宠物列表失败')
  } finally {
    loading.value = false
  }
}

onShow(() => {
  loadPets()
})

const onBack = () => {
  uni.navigateBack({ fail: () => uni.switchTab({ url: '/pages/profile/index' }) })
}

const onAddPet = () => {
  uni.navigateTo({ url: '/extra/add-pet/index' })
}

const onEditPet = (id: string) => {
  uni.navigateTo({ url: `/extra/add-pet/index?id=${id}` })
}

const onPetDetail = (_id: string) => {
  uni.showToast({ title: '查看宠物详情', icon: 'none' })
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
  --color-primary-fixed: #93f4e0;
  --color-surface-container: #f0eee7;
  --color-surface-container-high: #ebe8e1;
  --color-surface-container-low: #f6f3ec;
  --color-surface-container-lowest: #ffffff;
  --color-outline-variant: #bdc9c5;
  --color-outline: #6e7a76;
  --color-card-stroke: #f0ebe0;
}

.page {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--color-background);
  min-height: 100vh;
}

.main-content {
  padding: 32rpx 40rpx 200rpx;
  max-width: 1344rpx;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 48rpx;
}

.page-subtitle {
  display: block;
  font-size: 32rpx;
  line-height: 48rpx;
  color: var(--color-on-surface-variant);
  margin-bottom: 8rpx;
}

.page-accent {
  width: 96rpx;
  height: 8rpx;
  background: var(--color-primary-container);
  border-radius: 19998rpx;
}

.pet-list {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.pet-card {
  display: flex;
  align-items: center;
  gap: 32rpx;
  padding: 32rpx;
  background: var(--color-surface-container-lowest);
  border-radius: 24rpx;
  border: 4rpx solid var(--color-card-stroke);
  box-shadow: 0 8rpx 40rpx rgba(0, 107, 93, 0.04);
}

.pet-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.pet-avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 8rpx solid rgba(118, 215, 196, 0.2);
  background: var(--color-surface-container);
}

.pet-badge-icon {
  position: absolute;
  right: -8rpx;
  bottom: -8rpx;
  width: 48rpx;
  height: 48rpx;
  padding: 8rpx;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pet-badge-img {
  width: 32rpx;
  height: 32rpx;
}

.pet-info {
  flex: 1;
  min-width: 0;
}

.pet-info-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16rpx;
}

.pet-meta {
  flex: 1;
  min-width: 0;
}

.pet-name {
  display: block;
  font-size: 44rpx;
  font-weight: 700;
  line-height: 60rpx;
  color: var(--color-on-surface);
}

.pet-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-top: 8rpx;
}

.pet-tag {
  padding: 4rpx 16rpx;
  border-radius: 19998rpx;
  font-size: 20rpx;
  font-weight: 700;
  border: 1rpx solid;
}

.tag-breed-blue {
  background: #dbeafe;
  color: #1e40af;
  border-color: #bfdbfe;
}

.tag-breed-pink {
  background: #fce7f3;
  color: #9d174d;
  border-color: #fbcfe8;
}

.tag-age {
  background: #fef3c7;
  color: #92400e;
  border-color: #fde68a;
}

.tag-default {
  background: rgba(118, 215, 196, 0.24);
  color: var(--color-on-primary-container);
  border-color: rgba(118, 215, 196, 0.5);
}

.edit-btn {
  flex-shrink: 0;
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: var(--color-surface-container-high);
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-icon {
  width: 36rpx;
  height: 36rpx;
  background-color: #3e4946;
  -webkit-mask-image: url('/static/svg/writting.svg');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  mask-image: url('/static/svg/writting.svg');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}

.add-card {
  width: 100%;
  height: 192rpx;
  border: 4rpx dashed var(--color-outline-variant);
  border-radius: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  background: transparent;
}

.add-card-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(118, 215, 196, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-card-icon {
  width: 40rpx;
  height: 40rpx;
  background-color: #006b5d;
  -webkit-mask-image: url('/static/svg/add-label.svg');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  mask-image: url('/static/svg/add-label.svg');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}

.add-card-text {
  font-size: 24rpx;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-primary);
  text-transform: uppercase;
}

.page-footer {
  margin-top: 48rpx;
  opacity: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-illustration {
  width: 480rpx;
  max-width: 100%;
  height: 240rpx;
  opacity: 0.5;
  filter: grayscale(100%);
}

.footer-text {
  margin-top: 16rpx;
  font-size: 24rpx;
  font-weight: 500;
  color: var(--color-on-surface-variant);
}

.fab {
  position: fixed;
  right: 48rpx;
  bottom: 192rpx;
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 32rpx rgba(0, 107, 93, 0.25);
  z-index: 50;
}

.fab-icon {
  width: 48rpx;
  height: 48rpx;
  filter: brightness(0) invert(1);
}
</style>
