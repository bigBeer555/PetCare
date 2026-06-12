<template>
  <view class="page">
    <view class="top-bar">
      <view class="back-btn" @click="onBack">
        <text class="material-icons">arrow_back</text>
      </view>
      <text class="page-title">添加宠物档案</text>
      <view class="top-spacer" />
    </view>

    <view class="main-content">
      <view class="upload-section" @click="onUploadPhoto">
        <view class="upload-circle">
          <text class="material-icons upload-icon">add_a_photo</text>
          <text class="upload-text">上传照片</text>
        </view>
      </view>

      <view class="form-card">
        <view class="form-group">
          <text class="form-label">宠物名字</text>
          <input v-model="petName" class="soft-input" type="text" placeholder="例如：毛豆" />
        </view>

        <view class="form-group">
          <text class="form-label">宠物类型</text>
          <view class="type-row">
            <view
              v-for="type in petTypes"
              :key="type.id"
              class="type-btn"
              :class="{ 'type-btn-active': petType === type.id }"
              @click="petType = type.id"
            >
              <text class="material-icons" :class="{ 'icon-fill': petType === type.id }">{{ type.icon }}</text>
              <text>{{ type.label }}</text>
            </view>
          </view>
        </view>

        <view class="form-row">
          <view class="form-group form-half">
            <text class="form-label">品种</text>
            <view class="input-with-icon">
              <input v-model="breed" class="soft-input" type="text" placeholder="请选择" />
              <text class="material-icons field-icon">expand_more</text>
            </view>
          </view>
          <view class="form-group form-half">
            <text class="form-label">性别</text>
            <view class="gender-switch">
              <view
                class="gender-btn"
                :class="{ 'gender-active': gender === 'male' }"
                @click="gender = 'male'"
              >
                <text class="material-icons gender-icon">male</text>
                <text>弟弟</text>
              </view>
              <view
                class="gender-btn"
                :class="{ 'gender-active': gender === 'female' }"
                @click="gender = 'female'"
              >
                <text class="material-icons gender-icon">female</text>
                <text>妹妹</text>
              </view>
            </view>
          </view>
        </view>

        <view class="form-row">
          <view class="form-group form-half">
            <text class="form-label">生日</text>
            <picker mode="date" :value="birthday" @change="onBirthdayChange">
              <view class="input-with-icon">
                <text class="soft-input picker-text">{{ birthday || '选择日期' }}</text>
                <text class="material-icons field-icon">calendar_today</text>
              </view>
            </picker>
          </view>
          <view class="form-group form-half">
            <text class="form-label">体重</text>
            <view class="input-with-suffix">
              <input v-model="weight" class="soft-input" type="digit" placeholder="0.0" />
              <text class="suffix">kg</text>
            </view>
          </view>
        </view>
      </view>

      <view class="tags-section">
        <view class="tags-header">
          <text class="tags-title">个性标签</text>
          <text class="tags-optional">可选填</text>
        </view>
        <view class="tags-list">
          <view
            v-for="tag in tags"
            :key="tag.id"
            class="tag-item"
            :class="[tag.styleClass, { 'tag-selected': selectedTags.includes(tag.id) }]"
            @click="toggleTag(tag.id)"
          >
            <text>{{ tag.label }}</text>
          </view>
          <view class="tag-item tag-custom" @click="onCustomTag">
            <text class="material-icons add-icon">add</text>
            <text>自定义</text>
          </view>
        </view>
      </view>
    </view>

    <view class="bottom-action">
      <view class="save-btn" @click="onSave">
        <text>保存档案</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const petName = ref('')
const petType = ref('dog')
const breed = ref('')
const gender = ref<'male' | 'female'>('male')
const birthday = ref('')
const weight = ref('')
const selectedTags = ref(['puppy'])

const petTypes = [
  { id: 'dog', label: '狗狗', icon: 'pets' },
  { id: 'cat', label: '猫咪', icon: 'pets' },
  { id: 'other', label: '其他', icon: 'category' },
]

const tags = [
  { id: 'glass', label: '玻璃胃', styleClass: 'tag-secondary' },
  { id: 'allergy', label: '鸡肉过敏', styleClass: 'tag-tertiary' },
  { id: 'puppy', label: '幼犬期', styleClass: 'tag-primary' },
  { id: 'fat', label: '易胖体质', styleClass: 'tag-neutral' },
  { id: 'picky', label: '挑食', styleClass: 'tag-neutral' },
]

const onBack = () => {
  uni.navigateBack({ fail: () => uni.switchTab({ url: '/pages/profile/index' }) })
}

const onUploadPhoto = () => {
  uni.chooseImage({
    count: 1,
    success: () => uni.showToast({ title: '照片已选择', icon: 'none' }),
  })
}

const onBirthdayChange = (e: { detail: { value: string } }) => {
  birthday.value = e.detail.value
}

const toggleTag = (id: string) => {
  const idx = selectedTags.value.indexOf(id)
  if (idx >= 0) {
    selectedTags.value.splice(idx, 1)
  } else {
    selectedTags.value.push(id)
  }
}

const onCustomTag = () => {
  uni.showToast({ title: '添加自定义标签', icon: 'none' })
}

const onSave = () => {
  if (!petName.value) {
    uni.showToast({ title: '请输入宠物名字', icon: 'none' })
    return
  }
  uni.showToast({ title: '档案保存成功', icon: 'success' })
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
  --color-primary-fixed: #93f4e0;
  --color-secondary-fixed: #cfe5ff;
  --color-on-secondary-container: #075283;
  --color-tertiary-fixed: #ffdcc6;
  --color-on-tertiary-container: #7b4419;
  --color-surface-container-low: #f6f3ec;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-high: #ebe8e1;
  --color-surface-variant: #e5e2db;
  --color-outline: #6e7a76;
  --color-outline-variant: #bdc9c5;
  --color-primary-fixed-dim: #76d7c4;
}

.page {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--color-background);
  min-height: 100vh;
  padding-bottom: 200rpx;
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
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 40rpx;
  background: var(--color-background);
}

.back-btn {
  padding: 16rpx;
  margin-left: -16rpx;
  color: var(--color-on-surface-variant);
}

.page-title {
  font-size: 44rpx;
  font-weight: 700;
  color: var(--color-primary);
}

.top-spacer {
  width: 80rpx;
}

.main-content {
  padding: 32rpx 40rpx;
  display: flex;
  flex-direction: column;
  gap: 48rpx;
  max-width: 1344rpx;
  margin: 0 auto;
}

.upload-section {
  display: flex;
  justify-content: center;
}

.upload-circle {
  width: 256rpx;
  height: 256rpx;
  border-radius: 50%;
  border: 4rpx dashed var(--color-outline-variant);
  background: var(--color-surface-container-lowest);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-on-surface-variant);
}

.upload-icon {
  font-size: 64rpx !important;
  margin-bottom: 8rpx;
}

.upload-text {
  font-size: 24rpx;
  font-weight: 600;
}

.form-card {
  background: var(--color-surface-container-lowest);
  border-radius: 24rpx;
  padding: 32rpx;
  border: 2rpx solid var(--color-surface-variant);
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.form-row {
  display: flex;
  gap: 24rpx;
}

.form-half {
  flex: 1;
}

.form-label {
  font-size: 24rpx;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-on-surface-variant);
}

.soft-input {
  width: 100%;
  background: var(--color-surface-container-low);
  border: 2rpx solid transparent;
  border-radius: 19998rpx;
  padding: 24rpx 32rpx;
  font-size: 28rpx;
  color: var(--color-on-background);
  box-sizing: border-box;
}

.picker-text {
  display: block;
  line-height: 40rpx;
}

.input-with-icon,
.input-with-suffix {
  position: relative;
}

.field-icon {
  position: absolute;
  right: 24rpx;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40rpx !important;
  color: var(--color-on-surface-variant);
  pointer-events: none;
}

.suffix {
  position: absolute;
  right: 32rpx;
  top: 50%;
  transform: translateY(-50%);
  font-size: 28rpx;
  color: var(--color-on-surface-variant);
}

.type-row {
  display: flex;
  gap: 24rpx;
}

.type-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx;
  border-radius: 24rpx;
  border: 2rpx solid var(--color-surface-variant);
  background: var(--color-surface-container-low);
  color: var(--color-on-surface-variant);
  font-size: 24rpx;
  font-weight: 600;
  gap: 8rpx;
}

.type-btn-active {
  border: 4rpx solid var(--color-primary);
  background: rgba(147, 244, 224, 0.2);
  color: var(--color-primary);
}

.gender-switch {
  display: flex;
  background: var(--color-surface-container-low);
  border-radius: 19998rpx;
  padding: 8rpx;
  border: 2rpx solid var(--color-surface-variant);
}

.gender-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  padding: 16rpx;
  border-radius: 19998rpx;
  font-size: 24rpx;
  font-weight: 600;
  color: var(--color-on-surface-variant);
}

.gender-active {
  background: var(--color-surface-container-lowest);
  color: var(--color-primary);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.gender-icon {
  font-size: 40rpx !important;
}

.tags-section {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.tags-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tags-title {
  font-size: 36rpx;
  font-weight: 700;
  color: var(--color-on-background);
}

.tags-optional {
  font-size: 28rpx;
  color: var(--color-outline);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tag-item {
  padding: 16rpx 32rpx;
  border-radius: 19998rpx;
  font-size: 24rpx;
  font-weight: 600;
  border: 2rpx solid;
}

.tag-secondary {
  border-color: var(--color-secondary-fixed);
  background: rgba(207, 229, 255, 0.2);
  color: var(--color-on-secondary-container);
}

.tag-tertiary {
  border-color: var(--color-tertiary-fixed);
  background: rgba(255, 220, 198, 0.2);
  color: var(--color-on-tertiary-container);
}

.tag-primary {
  border-color: var(--color-primary-fixed);
  background: var(--color-primary-fixed);
  color: var(--color-on-primary-container);
}

.tag-neutral {
  border-color: var(--color-surface-variant);
  background: var(--color-surface-container-low);
  color: var(--color-on-surface-variant);
}

.tag-selected {
  box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
}

.tag-custom {
  border-style: dashed;
  border-color: var(--color-outline);
  color: var(--color-outline);
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.add-icon {
  font-size: 32rpx !important;
}

.bottom-action {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 32rpx 40rpx;
  background: rgba(252, 249, 242, 0.9);
  border-top: 2rpx solid var(--color-surface-variant);
  box-sizing: border-box;
  z-index: 50;
}

.save-btn {
  max-width: 1344rpx;
  margin: 0 auto;
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: 32rpx;
  border-radius: 19998rpx;
  font-size: 36rpx;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 107, 93, 0.15);
}
</style>
