<template>
  <view class="page">
    <!-- TopAppBar -->
    <view class="top-bar">
      <view class="top-bar-inner">
        <view class="top-bar-left">
          <image
            class="avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6qBHdRrthIXH3If6t490Oa7Z22NZxvVC79igKQoL-3CnU1t6R3fMM7BJ7mlp2yHVBCwdaVivzW1xFO6qWH3f_qkaCpRjS1sMa-Wolr3KJuZMsT2WDh87rOBVK3rmYjg33IvStM-3Yb3lXKUEW0H4_ZW_7OKiOWsOy9nTYvvK6I-Dw9ke6MsHHQhr-kb9A_kj4K0uiFFY7Quv0XW9I0oJeMej_F8Q_B2xyx8PFAzkn1TamlAS8R1nf2AJMCJBctXmvyqQlq4O1lDs"
          />
        </view>
        <text class="brand-title">宠爱宝</text>
        <view class="notification-btn" @click="onNotification">
          <text class="material-icons">notifications</text>
        </view>
      </view>
    </view>

    <!-- Main Content -->
    <view class="main-content">
      <view class="page-header">
        <text class="page-title">科学换粮计划</text>
        <text class="page-desc">呵护肠胃，平稳过渡每一天</text>
      </view>

      <!-- Today's Focus Card -->
      <view class="focus-card">
        <view class="focus-blob" />

        <view class="focus-header">
          <view>
            <text class="focus-badge">今日目标</text>
            <text class="focus-day">第 {{ currentDay }} 天</text>
          </view>
          <view class="calendar-btn" @click="onEditCalendar">
            <text class="material-icons">edit_calendar</text>
          </view>
        </view>

        <!-- Donut Chart -->
        <view class="donut-wrapper">
          <view class="donut-chart" :style="donutStyle" />
          <view class="donut-inner">
            <text class="donut-percent">{{ newFoodPercent }}%</text>
            <text class="donut-label">新粮比例</text>
          </view>
        </view>

        <!-- Feeding Details -->
        <view class="feeding-grid">
          <view class="feeding-item">
            <view class="feeding-dot dot-old" />
            <text class="feeding-label">旧粮 ({{ oldFoodPercent }}%)</text>
            <view class="feeding-amount">
              <text class="amount-value">{{ oldFoodGrams }}</text>
              <text class="amount-unit">g</text>
            </view>
          </view>
          <view class="feeding-item feeding-item-new">
            <view class="feeding-divider" />
            <view class="feeding-dot dot-new" />
            <text class="feeding-label feeding-label-new">新粮 ({{ newFoodPercent }}%)</text>
            <view class="feeding-amount">
              <text class="amount-value amount-value-new">{{ newFoodGrams }}</text>
              <text class="amount-unit amount-unit-new">g</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Timeline -->
      <view class="timeline-section">
        <text class="timeline-title">换粮进度</text>

        <view
          v-for="item in timeline"
          :key="item.id"
          class="timeline-item"
          :class="item.status"
        >
          <view v-if="item.status === 'current'" class="timeline-accent" />
          <view class="timeline-icon">
            <text
              v-if="item.status === 'completed'"
              class="material-icons icon-fill check-icon"
            >check_circle</text>
            <text
              v-else-if="item.status === 'current'"
              class="timeline-today"
            >今</text>
            <view v-else class="timeline-dot" />
          </view>
          <view class="timeline-content">
            <text class="timeline-label" :class="'label-' + item.status">{{ item.label }}</text>
            <view class="progress-bar">
              <view
                class="progress-fill"
                :class="'fill-' + item.status"
                :style="{ width: item.percent + '%' }"
              />
            </view>
          </view>
          <text class="timeline-percent" :class="'percent-' + item.status">{{ item.percent }}%</text>
        </view>
      </view>

      <!-- Tips -->
      <view class="tips-card">
        <text class="material-icons icon-fill tips-icon">info</text>
        <view class="tips-content">
          <text class="tips-title">换粮期观察建议</text>
          <text class="tips-text">
            换粮期间请密切观察宠物的便便形态与精神状态。若出现软便或呕吐，请暂停增加新粮比例，维持当前配比多观察两天。
          </text>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TimelineItem {
  id: number
  label: string
  percent: number
  status: 'completed' | 'current' | 'upcoming'
}

const currentDay = 3
const newFoodPercent = 50
const totalGrams = 150

const oldFoodPercent = computed(() => 100 - newFoodPercent)
const oldFoodGrams = computed(() => Math.round(totalGrams * oldFoodPercent.value / 100))
const newFoodGrams = computed(() => Math.round(totalGrams * newFoodPercent / 100))

const donutStyle = computed(() => ({
  background: `conic-gradient(#76d7c4 0% ${newFoodPercent}%, #f0eee7 ${newFoodPercent}% 100%)`,
}))

const timeline: TimelineItem[] = [
  { id: 1, label: '第1-2天', percent: 25, status: 'completed' },
  { id: 2, label: '第3-4天', percent: 50, status: 'current' },
  { id: 3, label: '第5-6天', percent: 75, status: 'upcoming' },
  { id: 4, label: '第7天', percent: 100, status: 'upcoming' },
]

const onNotification = () => {
  uni.showToast({ title: '通知', icon: 'none' })
}

const onEditCalendar = () => {
  uni.showToast({ title: '编辑换粮日历', icon: 'none' })
}
</script>

<style scoped>
.page {
  --color-primary: #006b5d;
  --color-on-primary-container: #005d51;
  --color-background: #fcf9f2;
  --color-on-surface: #1c1c18;
  --color-on-surface-variant: #3e4946;
  --color-outline: #6e7a76;
  --color-primary-container: #76d7c4;
  --color-primary-fixed: #93f4e0;
  --color-surface-container: #f0eee7;
  --color-surface-container-low: #f6f3ec;
  --color-surface-container-lowest: #ffffff;
  --color-surface-variant: #e5e2db;
  --color-outline-variant: #bdc9c5;
  --color-tertiary: #8a5024;
  --color-on-tertiary-container: #7b4419;
  --color-active-green: #76d7c4;
  --color-active-text: #005d51;
  --color-grey-text: #717171;
}

.page {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  background-color: var(--color-background);
  color: var(--color-on-surface);
  min-height: 100vh;
  position: relative;
}

@font-face {
  font-family: 'Material Symbols Outlined';
  font-style: normal;
  font-weight: 100 700;
  src: url(https://fonts.gstatic.com/s/materialsymbolsoutlined/v219/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1n-q_4MrImHCIJIZrDCvHeem.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 48rpx;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.icon-fill {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Top Bar */
.top-bar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: var(--color-background);
}

.top-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 32rpx;
  height: 120rpx;
  box-sizing: border-box;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
  width: 80rpx;
}

.avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  border: 4rpx solid var(--color-surface-variant);
}

.brand-title {
  font-size: 44rpx;
  font-weight: 700;
  line-height: 60rpx;
  letter-spacing: -0.01em;
  color: var(--color-on-primary-container);
}

.notification-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16rpx;
  color: var(--color-on-surface-variant);
  width: 80rpx;
}

/* Main Content */
.main-content {
  max-width: 1344rpx;
  margin: 0 auto;
  padding: 48rpx 40rpx;
  display: flex;
  flex-direction: column;
  gap: 48rpx;
  box-sizing: border-box;
  width: 100%;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.page-title {
  font-size: 48rpx;
  font-weight: 700;
  line-height: 64rpx;
  color: var(--color-on-surface);
}

.page-desc {
  font-size: 28rpx;
  line-height: 40rpx;
  color: var(--color-outline);
}

/* Focus Card */
.focus-card {
  position: relative;
  overflow: hidden;
  background: #ffffff;
  border: 4rpx solid var(--color-surface-variant);
  border-radius: 24rpx;
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.focus-blob {
  position: absolute;
  top: -80rpx;
  right: -80rpx;
  width: 256rpx;
  height: 256rpx;
  background: rgba(147, 244, 224, 0.2);
  border-radius: 50%;
  filter: blur(64rpx);
  pointer-events: none;
}

.focus-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32rpx;
}

.focus-badge {
  display: inline-block;
  padding: 8rpx 24rpx;
  background: var(--color-primary-container);
  color: var(--color-on-primary-container);
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  border-radius: 19998rpx;
  margin-bottom: 8rpx;
}

.focus-day {
  display: block;
  font-size: 44rpx;
  font-weight: 700;
  line-height: 60rpx;
  color: var(--color-on-surface);
}

.calendar-btn {
  color: var(--color-primary);
}

/* Donut Chart */
.donut-wrapper {
  position: relative;
  width: 320rpx;
  height: 320rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16rpx 0 48rpx;
}

.donut-chart {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: inset 0 4rpx 20rpx rgba(0, 0, 0, 0.02);
}

.donut-inner {
  position: absolute;
  width: 70%;
  height: 70%;
  background: var(--color-surface-container-lowest);
  border-radius: 50%;
  border: 2rpx solid var(--color-surface-variant);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.donut-percent {
  font-size: 44rpx;
  font-weight: 700;
  line-height: 60rpx;
  color: var(--color-primary);
}

.donut-label {
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  color: var(--color-outline);
}

/* Feeding Grid */
.feeding-grid {
  width: 100%;
  display: flex;
  background: var(--color-surface-container-low);
  border-radius: 16rpx;
  padding: 24rpx;
  gap: 24rpx;
}

.feeding-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx;
  position: relative;
}

.feeding-item-new {
  position: relative;
}

.feeding-divider {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2rpx;
  height: 64rpx;
  background: var(--color-outline-variant);
}

.feeding-dot {
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  margin-bottom: 16rpx;
}

.dot-old {
  background: var(--color-surface-container);
}

.dot-new {
  background: var(--color-primary-container);
}

.feeding-label {
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  color: var(--color-outline);
}

.feeding-label-new {
  color: var(--color-primary);
}

.feeding-amount {
  display: flex;
  align-items: baseline;
  margin-top: 8rpx;
}

.amount-value {
  font-size: 44rpx;
  font-weight: 700;
  line-height: 60rpx;
  color: var(--color-on-surface);
}

.amount-value-new {
  color: var(--color-primary);
}

.amount-unit {
  font-size: 28rpx;
  color: var(--color-on-surface);
  margin-left: 4rpx;
}

.amount-unit-new {
  color: var(--color-primary);
}

/* Timeline */
.timeline-section {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.timeline-title {
  font-size: 44rpx;
  font-weight: 700;
  line-height: 60rpx;
  color: var(--color-on-surface);
  margin-bottom: 16rpx;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 32rpx;
  border-radius: 24rpx;
  padding: 24rpx;
  position: relative;
  overflow: hidden;
}

.timeline-item.completed {
  background: rgba(246, 243, 236, 0.5);
}

.timeline-item.current {
  background: #ffffff;
  border: 4rpx solid var(--color-surface-variant);
}

.timeline-item.upcoming {
  background: var(--color-surface-container-lowest);
  border: 2rpx solid rgba(229, 226, 219, 0.5);
}

.timeline-accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 8rpx;
  background: var(--color-primary);
}

.timeline-icon {
  width: 64rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.check-icon {
  font-size: 40rpx !important;
  color: var(--color-primary);
}

.timeline-today {
  font-size: 24rpx;
  font-weight: 700;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  color: var(--color-primary);
}

.timeline-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: var(--color-surface-variant);
}

.timeline-content {
  flex: 1;
}

.timeline-label {
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
}

.label-completed {
  color: var(--color-outline);
}

.label-current {
  color: var(--color-on-surface);
}

.label-upcoming {
  color: var(--color-on-surface-variant);
}

.progress-bar {
  width: 100%;
  height: 16rpx;
  background: var(--color-surface-container);
  border-radius: 19998rpx;
  margin-top: 8rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 19998rpx;
}

.fill-completed {
  background: var(--color-outline-variant);
}

.fill-current {
  background: var(--color-primary-container);
}

.fill-upcoming {
  background: rgba(118, 215, 196, 0.4);
}

.timeline-percent {
  width: 96rpx;
  text-align: right;
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.percent-completed {
  color: var(--color-outline);
}

.percent-current {
  color: var(--color-primary);
}

.percent-upcoming {
  color: var(--color-on-surface-variant);
}

/* Tips */
.tips-card {
  background: #fff8f3;
  border: 2rpx solid #ffe8d6;
  border-radius: 24rpx;
  padding: 32rpx;
  display: flex;
  gap: 24rpx;
}

.tips-icon {
  font-size: 48rpx !important;
  color: var(--color-tertiary);
  margin-top: 8rpx;
  flex-shrink: 0;
}

.tips-content {
  display: flex;
  flex-direction: column;
}

.tips-title {
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  color: var(--color-on-tertiary-container);
  margin-bottom: 8rpx;
}

.tips-text {
  font-size: 28rpx;
  line-height: 44rpx;
  color: rgba(123, 68, 25, 0.8);
}
</style>
