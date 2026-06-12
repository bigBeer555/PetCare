<template>
  <view class="page">
    <!-- TopAppBar -->
    <view class="top-bar">
      <image
        class="avatar"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA61cPilVF0lUoWSxl5ohc0hgIREyHQsWwzbEpE3WgA9ArcPdY5rYdgn-QTXJ25QAciDwxLnJjY9T6aEQAOavldIfoO1iPcqkOONc4C6SVWPLWR6ACIh2uS82qyxji78MT5ZngtBTkc9OiZ2Vyw80Qo1Jw9LEMne_piO42vrlZObZZ5L63E_C5IJ42RcLBTK5iHOBFExRtul3-cHaR1irQrUXanvqO1iMtMpag_yeMKlGzizmFgehyqahp7laNm7FI8kxdp36IFzUw"
      />
      <text class="brand-title">宠爱宝</text>
      <view class="notification-btn" @click="onNotification">
        <text class="material-icons">notifications</text>
      </view>
    </view>

    <!-- Main Content -->
    <view class="main-content">
      <!-- Hero -->
      <view class="hero-section">
        <view class="hero-title">
          <text>开始今天的</text>
          <text class="hero-highlight">训练</text>
          <text>吧 ✨</text>
        </view>
        <text class="hero-desc">与毛孩子建立更深的羁绊</text>
      </view>

      <!-- Category Tags -->
      <scroll-view class="category-scroll" scroll-x :show-scrollbar="false">
        <view class="category-list">
          <view
            v-for="cat in categories"
            :key="cat.id"
            class="category-tag"
            :class="[cat.styleClass, { 'category-tag-active': activeCategory === cat.id }]"
            @click="onCategoryChange(cat.id)"
          >
            <text>{{ cat.label }}</text>
          </view>
        </view>
      </scroll-view>

      <!-- Course Cards -->
      <view class="course-list">
        <view
          v-for="course in courses"
          :key="course.id"
          class="course-card"
          @click="onCourseClick(course.id)"
        >
          <view class="course-cover">
            <image class="cover-img" :src="course.cover" mode="aspectFill" />
            <view class="play-overlay">
              <view class="play-btn">
                <text class="material-icons icon-fill">play_arrow</text>
              </view>
            </view>
            <view class="duration-badge">
              <text>{{ course.duration }}</text>
            </view>
          </view>

          <view class="course-body">
            <text class="course-title">{{ course.title }}</text>

            <view class="course-meta">
              <view class="difficulty-tag">
                <text
                  class="material-icons difficulty-icon"
                  :class="course.difficultyIconClass"
                >{{ course.difficultyIcon }}</text>
                <text class="difficulty-text">{{ course.difficulty }}</text>
              </view>
              <view class="participants">
                <text class="material-icons participants-icon">group</text>
                <text class="participants-text">{{ course.participants }} 人在学</text>
              </view>
            </view>

            <view class="course-footer">
              <view class="instructor">
                <image class="instructor-avatar" :src="course.instructorAvatar" />
                <text class="instructor-name">{{ course.instructor }}</text>
              </view>
              <view
                class="action-btn"
                :class="course.actionType === 'primary' ? 'action-btn-primary' : 'action-btn-outline'"
                @click.stop="onStartLearning(course.id)"
              >
                <text>{{ course.actionText }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Category {
  id: string
  label: string
  styleClass: string
}

interface Course {
  id: number
  title: string
  cover: string
  duration: string
  difficulty: string
  difficultyIcon: string
  difficultyIconClass: string
  participants: string
  instructor: string
  instructorAvatar: string
  actionText: string
  actionType: 'primary' | 'outline'
}

const activeCategory = ref('all')

const categories: Category[] = [
  { id: 'all', label: '全部课程', styleClass: 'tag-all' },
  { id: 'potty', label: '定点排便', styleClass: 'tag-secondary' },
  { id: 'jumping', label: '纠正扑人', styleClass: 'tag-tertiary' },
  { id: 'social', label: '社会化训练', styleClass: 'tag-neutral' },
  { id: 'recall', label: '唤回训练', styleClass: 'tag-neutral' },
]

const courses: Course[] = [
  {
    id: 1,
    title: '新手幼犬定点排便完全指南',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj-4wmNjI45bcos7_N4T_TFE6tNPN0Nc_0cqew8i-hS_Qj9C7CpakT6LctlZUaXw8HiYe1CaE8CLOGFosJaEKAedHEjHRAKBXOX0dLAPUMqxQubmygJmlir2hQXqN4Evn4CvLeFrzowvOzUmUpl4GulC92-BiPqLO5NIoe6dN5YVGh0fIt5chOpfO57HnTeKV_id07JL6yk7eT1eNqXTX-zfazhKxrHtaRS8jevDulgD_COJj3pg-1mI471ublgL29EYAvYkGIp7c',
    duration: '12:45',
    difficulty: '入门级别',
    difficultyIcon: 'signal_cellular_alt_1_bar',
    difficultyIconClass: 'icon-tertiary',
    participants: '1.2w',
    instructor: '张教练',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_XIxC9V0yQy8bzCXTRrpzVklhPzcxWWdOjl-hdgFYH9YRUbWlknXZXGgO8Lj7qnjFWAzhzPYELpBtTSj8pN7lgBFef8sSX80atzDRQDBVtJV4ilecrmvtZfACApASIsmm1x4kRKrQK5T0u2PZGeKJb8-zaFRuKx2N6Jxvn1rcDIDvgFP4l3pBFumVxMMqi6Eg-QLgvv2Lk8A175nxEu7iI6zsKfRKcl6yRKX3jIskiYUsTbTFUL5RwVDuKqKjxZIsZQbjwesuOTs',
    actionText: '开始学习',
    actionType: 'primary',
  },
  {
    id: 2,
    title: '温柔制止狗狗激动扑人行为',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG5TAnddN8M_2FOeRs8oO9pMINgD0VWXTqHugP9Uxho9bNYPx0UlJci7i2Xgyi3zpL_lI9z35OgSsmX4-jasEKdFgch89ebFBSUFnN4IYmHLjIleCipDdPqaDcxEsBCiTzfcvvPNZW6AXqZqLtP2OPz7AgRXbc7lu_di5JD6D7nQdn36jrMNm6_KpHf9xqxVDYf4qQ1TtZvnA9u0brifsoNbAz-FQhVsFj4gZHpmV-orjjf8aFgAITLi4Qm4LLV4AEPixkukAM6ok',
    duration: '08:20',
    difficulty: '进阶级别',
    difficultyIcon: 'signal_cellular_alt_2_bar',
    difficultyIconClass: 'icon-secondary',
    participants: '8,540',
    instructor: '李行为学专家',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW4DfvHHOflAoTJNCV2JJnTsADU1gN9FgJ9WqVHUZ1qcVcVku6VJCizwvzpXx9x8eveL-jrjJlwkUJCmCHiTkadAwRhp66mmhKCDZnnSD_aIZzNzRTAhJat6J1y7fmk4DHZkI5Cr0OTAldsfdBNimiyh9FWBNE7N8lKiHCKQeiaecz7L4GjhHsjn-2y4bwgt5PEi7OmXdLgUsXmM5SiISqeGIhi1L_gI0onq9LWbO1Vcpo2-am-rrAOqdN8B4nGGIZjtqrZ2pN6Fo',
    actionText: '继续学习',
    actionType: 'outline',
  },
]

const onNotification = () => {
  uni.showToast({ title: '通知', icon: 'none' })
}

const onCategoryChange = (id: string) => {
  activeCategory.value = id
}

const onCourseClick = (id: number) => {
  uni.showToast({ title: `查看课程 #${id}`, icon: 'none' })
}

const onStartLearning = (id: number) => {
  uni.showToast({ title: `开始学习课程 #${id}`, icon: 'none' })
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
  --color-on-background: #1c1c18;
  --color-primary-container: #76d7c4;
  --color-secondary: #246293;
  --color-secondary-fixed: #cfe5ff;
  --color-on-secondary-fixed: #001d33;
  --color-secondary-fixed-dim: #98cbff;
  --color-tertiary: #8a5024;
  --color-tertiary-fixed: #ffdcc6;
  --color-on-tertiary-fixed: #301400;
  --color-tertiary-fixed-dim: #ffb785;
  --color-surface-container: #f0eee7;
  --color-surface-container-high: #ebe8e1;
  --color-surface-container-lowest: #ffffff;
  --color-surface-variant: #e5e2db;
  --color-outline-variant: #bdc9c5;
  --color-inverse-surface: #31312c;
  --color-inverse-on-surface: #f3f0ea;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 32rpx;
  background: var(--color-background);
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 2rpx solid var(--color-outline-variant);
  flex-shrink: 0;
}

.brand-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 44rpx;
  font-weight: 700;
  line-height: 60rpx;
  letter-spacing: -0.01em;
  color: var(--color-primary);
}

.notification-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16rpx;
  color: var(--color-primary);
}

/* Main Content */
.main-content {
  max-width: 896rpx;
  margin: 0 auto;
  width: 100%;
}

/* Hero */
.hero-section {
  padding: 48rpx 40rpx 16rpx;
}

.hero-title {
  font-size: 48rpx;
  font-weight: 700;
  line-height: 64rpx;
  color: var(--color-on-surface);
  margin-bottom: 8rpx;
}

.hero-highlight {
  color: var(--color-primary);
}

.hero-desc {
  font-size: 28rpx;
  line-height: 40rpx;
  color: var(--color-on-surface-variant);
}

/* Category Tags */
.category-scroll {
  width: 100%;
  white-space: nowrap;
  padding: 16rpx 0;
  margin-bottom: 32rpx;
}

.category-list {
  display: inline-flex;
  gap: 16rpx;
  padding: 0 40rpx;
}

.category-tag {
  display: inline-flex;
  align-items: center;
  padding: 20rpx 40rpx;
  border-radius: 19998rpx;
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.category-tag-active.tag-all {
  background: var(--color-primary-container);
  color: var(--color-on-primary-container);
  border-bottom: 4rpx solid var(--color-primary);
}

.tag-all {
  background: var(--color-surface-container);
  color: var(--color-on-surface-variant);
}

.tag-secondary {
  background: var(--color-secondary-fixed);
  color: var(--color-on-secondary-fixed);
  border: 2rpx solid var(--color-secondary-fixed-dim);
}

.tag-tertiary {
  background: var(--color-tertiary-fixed);
  color: var(--color-on-tertiary-fixed);
  border: 2rpx solid var(--color-tertiary-fixed-dim);
}

.tag-neutral {
  background: var(--color-surface-container);
  color: var(--color-on-surface-variant);
  border: 2rpx solid var(--color-surface-container-high);
}

/* Course List */
.course-list {
  padding: 0 40rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.course-card {
  background: var(--color-surface-container-lowest);
  border-radius: 24rpx;
  border: 4rpx solid var(--color-surface-container-high);
  overflow: hidden;
}

.course-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: var(--color-surface-container-high);
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
}

.play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn {
  width: 96rpx;
  height: 96rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
}

.duration-badge {
  position: absolute;
  bottom: 24rpx;
  right: 24rpx;
  background: rgba(49, 49, 44, 0.8);
  color: var(--color-inverse-on-surface);
  padding: 8rpx 20rpx;
  border-radius: 19998rpx;
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
}

.course-body {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.course-title {
  font-size: 36rpx;
  font-weight: 700;
  line-height: 48rpx;
  color: var(--color-on-surface);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-meta {
  display: flex;
  align-items: center;
  gap: 32rpx;
  margin-top: 8rpx;
}

.difficulty-tag {
  display: flex;
  align-items: center;
  gap: 8rpx;
  background: var(--color-surface-container);
  padding: 8rpx 16rpx;
  border-radius: 12rpx;
  color: var(--color-on-surface-variant);
}

.difficulty-icon {
  font-size: 32rpx !important;
}

.icon-tertiary {
  color: var(--color-tertiary);
}

.icon-secondary {
  color: var(--color-secondary);
}

.difficulty-text {
  font-size: 22rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
}

.participants {
  display: flex;
  align-items: center;
  gap: 8rpx;
  color: var(--color-on-surface-variant);
}

.participants-icon {
  font-size: 32rpx !important;
}

.participants-text {
  font-size: 26rpx;
  line-height: 40rpx;
}

.course-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24rpx;
}

.instructor {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.instructor-avatar {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 2rpx solid var(--color-outline-variant);
}

.instructor-name {
  font-size: 22rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  color: var(--color-on-surface-variant);
}

.action-btn {
  padding: 16rpx 40rpx;
  border-radius: 19998rpx;
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
}

.action-btn-primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
  box-shadow: 0 8rpx 24rpx rgba(0, 107, 93, 0.2);
}

.action-btn-outline {
  background: transparent;
  border: 4rpx solid var(--color-primary);
  color: var(--color-primary);
  padding: 12rpx 40rpx;
}
</style>
