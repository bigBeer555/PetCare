<template>
  <view class="page">
    <PageNavBar
      title="任务管理"
      fixed
      bordered
      compact
      title-size="22"
      @back="onBack"
    />

    <view class="main-content">
      <view
        v-for="category in taskCategories"
        :key="category.id"
        class="category-section"
      >
        <view class="category-title">
          <image class="category-icon" :src="category.icon" mode="aspectFit" />
          <text>{{ category.label }}</text>
        </view>
        <view class="tag-list">
          <view
            v-for="tag in category.tags"
            :key="tag"
            class="tag-item"
            :class="[
              category.tagClass,
              { 'tag-item--active': isTagSelected(category.id, tag) },
            ]"
            @click="toggleTag(category.id, tag)"
          >
            <text>{{ tag }}</text>
          </view>
        </view>
      </view>

      <view class="detail-card">
        <view class="detail-row">
          <view class="detail-left">
            <view class="detail-icon-wrap">
              <image class="detail-icon" src="/static/svg/calendar.svg" mode="aspectFit" />
            </view>
            <view>
              <text class="detail-label">设置时间</text>
              <picker mode="time" :value="taskTime" @change="onTimeChange">
                <text class="detail-time">{{ taskTime }}</text>
              </picker>
            </view>
          </view>
          <view class="detail-right">
            <text class="detail-label">提醒频率</text>
            <picker
              mode="selector"
              :range="frequencyOptions"
              :value="frequencyIndex"
              @change="onFrequencyChange"
            >
              <view class="frequency-picker">
                <text>{{ frequencyOptions[frequencyIndex] }}</text>
                <image class="frequency-arrow" src="/static/svg/down-select.svg" mode="aspectFit" />
              </view>
            </picker>
          </view>
        </view>

        <view class="note-section">
          <text class="detail-label">添加备注 (可选)</text>
          <textarea
            v-model="note"
            class="note-input"
            placeholder="例如：加一点益生菌..."
            maxlength="200"
          />
        </view>
      </view>

      <view class="illustration-section">
        <image class="illustration-img" :src="illustrationUrl" mode="aspectFit" />
        <text class="illustration-quote">“健康的小习惯，是长久陪伴的关键”</text>
      </view>
    </view>

    <view class="bottom-action">
      <view class="submit-btn" @click="onSubmit">
        <text>确认添加</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageNavBar from '@/components/page-nav-bar/index.vue'

const illustrationUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAMr3-S5uVp_mcRto4m5Wmp6-BVTBykkATA_JKsKypecabDLowj_g8m4gnTWUKi2SLTzhEyF-wjV_V5LTAxy6aC3R7Kmey1UDVGRnWAWcWSFlIkQJC7DSPT7YPLLT6ifwkhtnl64fGRhefiOCdvgXkG6mIsJ9BZqpA-acdTydydpIMz5CvnxnjrrXLzalUIiN6DttrGnVg0wdou3dgc6uiPFrQ5PSWlZUJ9E0bLR-ypdmpsyRDqgq77E3IwMEDwCCQ7phGhgTIz5uA'

const taskCategories = [
  {
    id: 'feeding',
    label: '喂食',
    icon: '/static/svg/feeding.svg',
    tagClass: 'tag-feeding',
    tags: ['早餐', '午餐', '晚餐', '零食'],
  },
  {
    id: 'medical',
    label: '医疗',
    icon: '/static/svg/exceptional.svg',
    tagClass: 'tag-medical',
    tags: ['喂药', '注射', '滴眼液'],
  },
  {
    id: 'daily',
    label: '日常',
    icon: '/static/svg/animal-paw.svg',
    tagClass: 'tag-daily',
    tags: ['遛狗', '梳毛', '洗澡'],
  },
  {
    id: 'health',
    label: '健康',
    icon: '/static/svg/remind.svg',
    tagClass: 'tag-health',
    tags: ['驱虫', '疫苗', '称重'],
  },
]

const frequencyOptions = ['每天', '每周', '每月', '不重复']

const selectedTags = ref<Record<string, string[]>>({
  feeding: [],
  medical: [],
  daily: [],
  health: [],
})
const taskTime = ref('08:00')
const frequencyIndex = ref(0)
const note = ref('')

const onBack = () => {
  uni.navigateBack({ fail: () => uni.switchTab({ url: '/pages/index/index' }) })
}

const isTagSelected = (categoryId: string, tag: string) =>
  selectedTags.value[categoryId]?.includes(tag)

const toggleTag = (categoryId: string, tag: string) => {
  const list = selectedTags.value[categoryId] || []
  const index = list.indexOf(tag)
  if (index >= 0) {
    list.splice(index, 1)
  } else {
    list.push(tag)
  }
  selectedTags.value[categoryId] = [...list]
}

const onTimeChange = (e: { detail: { value: string } } | Event) => {
  if (!('detail' in e)) return
  taskTime.value = e.detail.value
}

const onFrequencyChange = (e: { detail: { value: string } } | Event) => {
  if (!('detail' in e)) return
  frequencyIndex.value = Number(e.detail.value)
}

const getSelectedCount = () =>
  Object.values(selectedTags.value).reduce((sum, tags) => sum + tags.length, 0)

const onSubmit = () => {
  if (getSelectedCount() === 0) {
    uni.showToast({ title: '请选择任务类型', icon: 'none' })
    return
  }
  uni.showToast({ title: '任务已添加', icon: 'success' })
  setTimeout(() => onBack(), 400)
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
  --color-outline: #6e7a76;
  --color-outline-variant: #bdc9c5;
  --color-primary-container: #76d7c4;
  --color-surface-container: #f0eee7;
  --color-surface-variant: #e5e2db;
  --color-surface-container-lowest: #ffffff;
  --color-card-stroke: #f0ebe0;
  --color-on-secondary-container: #075283;
  --color-on-tertiary-container: #7b4419;
}

.page {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--color-background);
  min-height: 100vh;
}

.main-content {
  padding: 32rpx 40rpx 220rpx;
  max-width: 1344rpx;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.category-section {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 12rpx;
  font-size: 32rpx;
  font-weight: 700;
  line-height: 44rpx;
  color: var(--color-on-surface-variant);
}

.category-icon {
  width: 36rpx;
  height: 36rpx;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tag-item {
  padding: 12rpx 32rpx;
  border-radius: 19998rpx;
  border: 1rpx solid;
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
}

.tag-feeding {
  background: #ffedce;
  color: var(--color-on-tertiary-container);
  border-color: #e0c7a1;
}

.tag-medical {
  background: #e3f2fd;
  color: var(--color-on-secondary-container);
  border-color: #adc7db;
}

.tag-daily {
  background: #fce4ec;
  color: #880e4f;
  border-color: #e5b3c5;
}

.tag-health {
  background: #e8f5e9;
  color: #1b5e20;
  border-color: #a5d6a7;
}

.tag-item--active {
  box-shadow: 0 0 0 4rpx rgba(0, 107, 93, 0.35);
  transform: scale(1.03);
}

.detail-card {
  background: var(--color-surface-container-lowest);
  border: 4rpx solid var(--color-card-stroke);
  border-radius: 24rpx;
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.detail-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24rpx;
}

.detail-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
  flex: 1;
  min-width: 0;
}

.detail-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: var(--color-primary-container);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.detail-icon {
  width: 36rpx;
  height: 36rpx;
}

.detail-label {
  display: block;
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  color: var(--color-outline);
  margin-bottom: 8rpx;
}

.detail-time {
  font-size: 36rpx;
  font-weight: 700;
  line-height: 48rpx;
  color: var(--color-primary);
}

.detail-right {
  text-align: right;
  flex-shrink: 0;
}

.frequency-picker {
  display: inline-flex;
  align-items: center;
  gap: 8rpx;
  background: rgba(229, 226, 219, 0.45);
  border-radius: 19998rpx;
  padding: 8rpx 24rpx;
  font-size: 24rpx;
  font-weight: 600;
  color: var(--color-on-surface);
}

.frequency-arrow {
  width: 20rpx;
  height: 20rpx;
}

.note-section {
  padding-top: 16rpx;
  border-top: 2rpx solid var(--color-surface-variant);
}

.note-input {
  width: 100%;
  min-height: 160rpx;
  margin-top: 12rpx;
  padding: 24rpx;
  border-radius: 16rpx;
  background: var(--color-surface-container);
  font-size: 28rpx;
  line-height: 40rpx;
  color: var(--color-on-surface);
  box-sizing: border-box;
}

.illustration-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx 0 16rpx;
}

.illustration-img {
  width: 384rpx;
  height: 384rpx;
}

.illustration-quote {
  margin-top: 16rpx;
  padding: 0 48rpx;
  font-size: 28rpx;
  line-height: 40rpx;
  font-style: italic;
  text-align: center;
  color: var(--color-outline);
}

.bottom-action {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  padding: 24rpx 40rpx calc(24rpx + env(safe-area-inset-bottom));
  background: rgba(252, 249, 242, 0.88);
  backdrop-filter: blur(12px);
}

.submit-btn {
  max-width: 1344rpx;
  margin: 0 auto;
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: 32rpx;
  border-radius: 19998rpx;
  font-size: 36rpx;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 8rpx 32rpx rgba(0, 107, 93, 0.2);
}
</style>
