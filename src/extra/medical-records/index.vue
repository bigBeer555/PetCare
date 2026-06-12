<template>
  <view class="page">
    <!-- TopAppBar -->
    <view class="top-bar">
      <view class="top-bar-left">
        <image
          class="avatar"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIBJm0KHPd582_IF0hvsXUBzy33m23eJaWlMBN2rL598Ii7viCgp5c0DQcOezm7GRTnainZ2dQ4is2Vl6-XxfBjeTZv_c-bRIJV3aTNrYvawBS63g6skJI8qdjVMYJsZsUol1h7roOVfyQZntxN6V7qkhWZUYTCAXER0dyvRKHBRniRefAV11SU-OxnFg6nPY6zT9Oy7tsgFByJ9nnzpKTHfTR_kilVPD-bFKSGAuSgRuDVzkZyeT5OnAvxSlHLc5ymaOAHkv5yUs"
        />
        <text class="brand-title">宠爱宝</text>
      </view>
      <view class="notification-btn" @click="onNotification">
        <text class="material-icons">notifications</text>
      </view>
    </view>

    <!-- Main Content -->
    <view class="main-content">
      <view class="page-header">
        <text class="page-title">电子病历档案</text>
        <text class="page-desc">在此查看和管理毛孩子的健康记录，随时掌握就诊历史。</text>
      </view>

      <view class="records-list">
        <view
          v-for="record in records"
          :key="record.id"
          class="record-card"
        >
          <view
            class="card-blob"
            :class="record.blobClass"
          />

          <view class="card-header">
            <view class="card-header-left">
              <view class="card-icon" :class="record.iconBgClass">
                <text class="material-icons icon-fill card-icon-inner">{{ record.icon }}</text>
              </view>
              <view class="card-meta">
                <text class="card-date">{{ record.date }}</text>
                <text class="card-doctor">{{ record.doctor }}</text>
              </view>
            </view>
            <text class="card-tag" :class="record.tagClass">{{ record.tag }}</text>
          </view>

          <view class="card-divider" />

          <view class="card-body">
            <view class="card-section">
              <view class="section-label">
                <text class="material-icons section-icon">diagnosis</text>
                <text>初步诊断</text>
              </view>
              <text class="section-text">{{ record.diagnosis }}</text>
            </view>
            <view class="card-section">
              <view class="section-label">
                <text class="material-icons section-icon">medication</text>
                <text>建议方案</text>
              </view>
              <text class="section-text">{{ record.plan }}</text>
            </view>
          </view>

          <view class="card-footer">
            <view class="detail-btn" @click="onViewDetail(record.id)">
              <text>查看详情</text>
              <text class="material-icons detail-arrow">arrow_forward</text>
            </view>
          </view>
        </view>

        <view class="list-end">
          <image
            class="list-end-img"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBITTlGFHooRhWBku5121IBmT6jkamyee0TroUI-aIAJDq2pgCHG2e48j7lOXXrMyCgvu_AaCQjtCcoT_f90y25aIlFaGaNEQ-8GuyuObD5eO3oHh-yIyBIaTI-D7qB35iZD9LP49VI_rimpLYdgU1Z5BgTvW-XZW9FrjtD0gPxqJrJc-P-yIr97XVBmqFINyEIYhzu_MFgrLOMSGLWDchFF0uDnAnnCGDJFWs5JbJhfMnSn19mxZxYhyURpIV4uh1bOzNt0paCKwI"
          />
          <text class="list-end-text">已展示所有历史记录</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
interface MedicalRecord {
  id: number
  date: string
  doctor: string
  tag: string
  icon: string
  diagnosis: string
  plan: string
  iconBgClass: string
  tagClass: string
  blobClass: string
}

const records: MedicalRecord[] = [
  {
    id: 1,
    date: '2023年10月25日',
    doctor: '张医生 | 宠康动物医院',
    tag: '皮肤诊疗',
    icon: 'stethoscope',
    diagnosis: '急性过敏性皮炎，伴随轻度局部细菌感染。',
    plan: '注射抗敏针剂一针；开具外用消炎药膏，每日涂抹两次；建议更换低敏处方粮观察一周。',
    iconBgClass: 'icon-bg-secondary',
    tagClass: 'tag-secondary',
    blobClass: 'blob-tertiary',
  },
  {
    id: 2,
    date: '2023年05月12日',
    doctor: '李医生 | 瑞鹏宠物医院',
    tag: '常规免疫',
    icon: 'vaccines',
    diagnosis: '健康状态良好，体温正常，心肺听诊无异常。',
    plan: '完成年度狂犬疫苗及多联疫苗加强针注射；进行体内外驱虫。',
    iconBgClass: 'icon-bg-primary',
    tagClass: 'tag-primary',
    blobClass: 'blob-primary',
  },
]

const onNotification = () => {
  uni.showToast({ title: '通知', icon: 'none' })
}

const onViewDetail = (id: number) => {
  uni.showToast({ title: `查看病历详情 #${id}`, icon: 'none' })
}
</script>

<style scoped>
.page {
  --color-primary: #006b5d;
  --color-on-primary-container: #005d51;
  --color-background: #fcf9f2;
  --color-on-surface: #1c1c18;
  --color-on-surface-variant: #3e4946;
  --color-secondary-fixed: #cfe5ff;
  --color-on-secondary-fixed-variant: #004a77;
  --color-on-secondary-container: #075283;
  --color-primary-container: #76d7c4;
  --color-primary-fixed: #93f4e0;
  --color-primary-fixed-dim: #76d7c4;
  --color-on-primary-fixed-variant: #005046;
  --color-tertiary-fixed: #ffdcc6;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container: #f0eee7;
  --color-surface-variant: #e5e2db;
  --color-outline-variant: #bdc9c5;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 32rpx;
  background: var(--color-background);
  position: sticky;
  top: 0;
  z-index: 40;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 2rpx solid var(--color-outline-variant);
}

.brand-title {
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
  border-radius: 50%;
  color: var(--color-on-surface-variant);
}

/* Main Content */
.main-content {
  padding: 48rpx 40rpx;
  display: flex;
  flex-direction: column;
  gap: 48rpx;
  box-sizing: border-box;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
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
  color: var(--color-on-surface-variant);
}

/* Records List */
.records-list {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.record-card {
  position: relative;
  overflow: hidden;
  background: var(--color-surface-container-lowest);
  border: 4rpx solid var(--color-surface-container);
  border-radius: 24rpx;
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.card-blob {
  position: absolute;
  right: -48rpx;
  top: -48rpx;
  width: 192rpx;
  height: 192rpx;
  border-radius: 50%;
  opacity: 0.2;
  pointer-events: none;
}

.blob-tertiary {
  background: var(--color-tertiary-fixed);
}

.blob-primary {
  background: var(--color-primary-fixed);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-header-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.card-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-bg-secondary {
  background: var(--color-secondary-fixed);
  color: var(--color-on-secondary-fixed-variant);
}

.icon-bg-primary {
  background: var(--color-primary-container);
  color: var(--color-on-primary-container);
}

.card-icon-inner {
  font-size: 40rpx !important;
}

.card-meta {
  display: flex;
  flex-direction: column;
}

.card-date {
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  color: var(--color-on-surface-variant);
  text-transform: uppercase;
}

.card-doctor {
  font-size: 32rpx;
  font-weight: 600;
  line-height: 48rpx;
  color: var(--color-on-surface);
}

.card-tag {
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  padding: 8rpx 24rpx;
  border-radius: 19998rpx;
}

.tag-secondary {
  background: var(--color-secondary-fixed);
  border: 2rpx solid #98cbff;
  color: var(--color-on-secondary-container);
}

.tag-primary {
  background: var(--color-primary-fixed);
  border: 2rpx solid var(--color-primary-fixed-dim);
  color: var(--color-on-primary-fixed-variant);
}

.card-divider {
  width: 100%;
  height: 2rpx;
  background: rgba(229, 226, 219, 0.6);
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.card-section {
  display: flex;
  flex-direction: column;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  color: var(--color-on-surface-variant);
  margin-bottom: 8rpx;
}

.section-icon {
  font-size: 32rpx !important;
}

.section-text {
  font-size: 28rpx;
  line-height: 40rpx;
  color: var(--color-on-surface);
}

.card-footer {
  padding-top: 16rpx;
}

.detail-btn {
  width: 100%;
  padding: 24rpx 0;
  border-radius: 19998rpx;
  border: 4rpx solid var(--color-primary);
  color: var(--color-primary);
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16rpx;
}

.detail-arrow {
  font-size: 36rpx !important;
}

/* List End */
.list-end {
  padding: 64rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
}

.list-end-img {
  width: 256rpx;
  height: 256rpx;
  margin-bottom: 32rpx;
}

.list-end-text {
  font-size: 24rpx;
  font-weight: 600;
  line-height: 32rpx;
  letter-spacing: 0.05em;
  color: var(--color-on-surface-variant);
}
</style>
