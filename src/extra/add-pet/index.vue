<template>
  <view class="page">
    <PageNavBar
      :title="pageTitle"
      fixed
      bordered
      compact
      title-size="22"
      :auto-back="false"
      @back="onBack"
    />

    <view class="main-content">
      <view class="upload-section" @click="onUploadPhoto">
        <view class="upload-circle" :class="{ 'upload-circle--filled': !!avatarPreview }">
          <image
            v-if="avatarPreview"
            class="upload-preview"
            :src="avatarPreview"
            mode="aspectFill"
          />
          <template v-else>
            <image class="upload-icon" src="/static/svg/upload.svg" mode="aspectFit" />
            <text class="upload-text">上传照片</text>
          </template>
        </view>
      </view>

      <view class="form-card">
        <view class="form-group">
          <text class="form-label">宠物名字</text>
          <view class="soft-input-wrap">
            <input v-model="petName" class="soft-input-field" type="text" placeholder="例如：毛豆" />
          </view>
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
              <image
                class="type-icon"
                :src="getSvgIconSrc(getTypeIconName(type.id), petType === type.id)"
                mode="aspectFit"
              />
              <text>{{ type.label }}</text>
            </view>
          </view>
        </view>

        <view class="form-row">
          <view class="form-group form-half">
            <text class="form-label">品种</text>
            <view class="soft-input-wrap input-with-icon">
              <input v-model="breed" class="soft-input-field soft-input-field--icon" type="text" placeholder="请选择" />
              <image class="field-icon" src="/static/svg/down-select.svg" mode="aspectFit" />
            </view>
          </view>
          <view class="form-group form-half">
            <text class="form-label">性别</text>
            <view class="gender-switch">
              <view
                class="gender-btn"
                :class="{ 'gender-active gender-active-male': gender === 'male' }"
                @click="gender = 'male'"
              >
                <image
                  class="gender-icon"
                  :src="getSvgIconSrc('male', gender === 'male', GENDER_ICON_ACTIVE.male)"
                  mode="aspectFit"
                />
                <text>弟弟</text>
              </view>
              <view
                class="gender-btn"
                :class="{ 'gender-active gender-active-female': gender === 'female' }"
                @click="gender = 'female'"
              >
                <image
                  class="gender-icon"
                  :src="getSvgIconSrc('female', gender === 'female', GENDER_ICON_ACTIVE.female)"
                  mode="aspectFit"
                />
                <text>妹妹</text>
              </view>
            </view>
          </view>
        </view>

        <view class="form-row">
          <view class="form-group form-half">
            <text class="form-label">生日</text>
            <picker mode="date" :value="birthday" @change="onBirthdayChange">
              <view class="soft-input-wrap input-with-icon">
                <text
                  class="soft-input-field picker-text"
                  :class="{ 'picker-text--placeholder': !birthday }"
                >{{ birthday || 'yy/mm/dd' }}</text>
                <image class="field-icon" src="/static/svg/calendar.svg" mode="aspectFit" />
              </view>
            </picker>
          </view>
          <view class="form-group form-half">
            <text class="form-label">体重</text>
            <view class="soft-input-wrap input-with-suffix">
              <input v-model="weight" class="soft-input-field soft-input-field--suffix" type="digit" placeholder="0.0" />
              <text class="suffix">kg</text>
            </view>
          </view>
        </view>
      </view>

      <view class="form-card default-card">
        <view class="default-row">
          <view class="default-copy">
            <text class="default-title">设为默认宠物</text>
            <text class="default-desc">首页与顶部导航将展示该宠物头像和昵称</text>
          </view>
          <switch :checked="isDefault" color="#006b5d" @change="onDefaultChange" />
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
            :class="{ 'tag-selected': selectedTags.includes(tag.id) }"
            :style="tagStyleMap[tag.id]"
            @click="toggleTag(tag.id)"
          >
            <text>{{ tag.label }}</text>
            <view class="tag-remove" @click.stop="removeTag(tag.id)">
              <text class="tag-remove-icon">×</text>
            </view>
          </view>
          <view class="tag-item tag-custom" @click="onCustomTag">
            <image class="add-icon" src="/static/svg/add-label.svg" mode="aspectFit" />
            <text>自定义</text>
          </view>
        </view>
      </view>
    </view>

    <view class="bottom-action">
      <view class="save-btn" :class="{ 'save-btn--loading': saving }" @click="onSave">
        <text>{{ saving ? '保存中...' : '保存档案' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import PageNavBar from '@/components/page-nav-bar/index.vue'
import { createPet, createPetTag, deletePetTag, fetchPet, updatePet } from '@/api/pets'
import { uploadImage } from '@/api/upload'
import { getSvgIconSrc, getTypeIconName, GENDER_ICON_ACTIVE } from './icons'
import { ensureLoggedIn, handleApiError } from '@/utils/auth'
import { refreshDefaultPet } from '@/utils/default-pet'
import {
  buildCreatePetPayload,
  formatBirthdayForPicker,
  mapApiToGender,
  mapSpeciesToPetType,
  type GenderId,
  type PetTypeId,
} from '@/utils/pet-mapper'
import {
  buildTagStyleMap,
  canAddMoreTags,
  MAX_PET_TAG_COUNT,
} from '@/utils/pet-tag-styles'

type LocalPetTag = {
  id: string
  label: string
  createdAt?: string
}

const editingPetId = ref('')
const pageTitle = computed(() => (editingPetId.value ? '编辑宠物档案' : '添加宠物档案'))
const saving = ref(false)
const loading = ref(false)

const petName = ref('')
const petType = ref<PetTypeId>('dog')
const breed = ref('')
const gender = ref<GenderId>('male')
const birthday = ref('')
const weight = ref('')
const selectedTags = ref<string[]>([])
const avatarLocalPath = ref('')
const avatarUrl = ref('')
const isDefault = ref(false)

const avatarPreview = computed(() => avatarLocalPath.value || avatarUrl.value || '')

const petTypes: { id: PetTypeId; label: string }[] = [
  { id: 'dog', label: '狗狗' },
  { id: 'cat', label: '猫咪' },
  { id: 'other', label: '其他' },
]

const tags = ref<LocalPetTag[]>([])
const initialServerTagIds = ref<string[]>([])

const tagStyleMap = computed(() => buildTagStyleMap(tags.value))

const isLocalTagId = (id: string) => id.startsWith('local-')

const createLocalTag = (label: string, id?: string): LocalPetTag => ({
  id: id ?? `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  label,
})

const onBack = () => {
  uni.navigateBack({ fail: () => uni.switchTab({ url: '/pages/profile/index' }) })
}

const onUploadPhoto = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      avatarLocalPath.value = res.tempFilePaths[0]
    },
  })
}

const loadPetForEdit = async (id: string) => {
  loading.value = true
  try {
    const pet = await fetchPet(id)
    petName.value = pet.name
    petType.value = mapSpeciesToPetType(pet.species)
    breed.value = pet.breed || ''
    gender.value = mapApiToGender(pet.gender)
    birthday.value = formatBirthdayForPicker(pet.birthday)
    weight.value = pet.weight != null ? String(pet.weight) : ''
    avatarUrl.value = pet.avatarUrl || ''
    avatarLocalPath.value = ''
    isDefault.value = pet.isDefault ?? false

    tags.value = (pet.tags || []).map((tag) => ({
      id: String(tag.id),
      label: tag.label,
      createdAt: tag.createdAt,
    }))
    initialServerTagIds.value = tags.value.map((tag) => tag.id)
    selectedTags.value = tags.value.map((tag) => tag.id)
  } catch (error) {
    handleApiError(error, '加载宠物档案失败')
    setTimeout(() => onBack(), 300)
  } finally {
    loading.value = false
  }
}

onLoad((query) => {
  if (!ensureLoggedIn()) return
  const id = typeof query?.id === 'string' ? query.id : ''
  if (id) {
    editingPetId.value = id
    loadPetForEdit(id)
  }
})

const onBirthdayChange = (e: { detail: { value: string } }) => {
  birthday.value = e.detail.value
}

const onDefaultChange = (e: { detail: { value: boolean } } | Event) => {
  if (!('detail' in e)) return
  isDefault.value = e.detail.value
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
  uni.showModal({
    title: '添加标签',
    editable: true,
    placeholderText: '请输入标签名称',
    success: (res) => {
      if (!res.confirm) return

      const label = res.content?.trim()
      if (!label) {
        uni.showToast({ title: '请输入标签名称', icon: 'none' })
        return
      }
      if (label.length > 10) {
        uni.showToast({ title: '标签最多10个字', icon: 'none' })
        return
      }
      if (tags.value.some((tag) => tag.label === label)) {
        uni.showToast({ title: '标签已存在', icon: 'none' })
        return
      }
      if (!canAddMoreTags(tags.value.length)) {
        uni.showToast({ title: `最多添加 ${MAX_PET_TAG_COUNT} 个标签`, icon: 'none' })
        return
      }

      const localTag = createLocalTag(label)
      tags.value.push(localTag)
      selectedTags.value.push(localTag.id)
    },
  })
}

const removeTag = (id: string) => {
  const tag = tags.value.find((item) => item.id === id)
  if (!tag) return

  uni.showModal({
    title: '删除标签',
    content: `确定删除「${tag.label}」吗？`,
    success: (res) => {
      if (!res.confirm) return

      tags.value = tags.value.filter((item) => item.id !== id)
      const idx = selectedTags.value.indexOf(id)
      if (idx >= 0) {
        selectedTags.value.splice(idx, 1)
      }
    },
  })
}

const syncTagsOnSave = async (petId: string) => {
  for (const tagId of initialServerTagIds.value) {
    const stillInUi = tags.value.some((tag) => tag.id === tagId)
    const isSelected = selectedTags.value.includes(tagId)
    if (!stillInUi || !isSelected) {
      await deletePetTag(petId, tagId)
    }
  }

  const selectedLocalTags = tags.value.filter(
    (tag) => isLocalTagId(tag.id) && selectedTags.value.includes(tag.id),
  )
  for (const tag of selectedLocalTags) {
    await createPetTag(petId, { label: tag.label })
  }
}

const onSave = async () => {
  if (saving.value) return
  if (!ensureLoggedIn()) return

  if (!petName.value.trim()) {
    uni.showToast({ title: '请输入宠物名字', icon: 'none' })
    return
  }

  saving.value = true
  try {
    let nextAvatarUrl = avatarUrl.value
    if (avatarLocalPath.value) {
      const uploadResult = await uploadImage(avatarLocalPath.value)
      nextAvatarUrl = uploadResult.url
    }

    const payload = buildCreatePetPayload({
      name: petName.value,
      petType: petType.value,
      breed: breed.value,
      gender: gender.value,
      birthday: birthday.value,
      weight: weight.value,
      avatarUrl: nextAvatarUrl || undefined,
      isDefault: isDefault.value,
    })

    if (editingPetId.value) {
      await updatePet(editingPetId.value, payload)
      await syncTagsOnSave(editingPetId.value)
    } else {
      const created = await createPet(payload)
      await syncTagsOnSave(String(created.id))
    }

    await refreshDefaultPet()

    uni.showToast({ title: '档案保存成功', icon: 'success' })
    setTimeout(() => onBack(), 400)
  } catch (error) {
    handleApiError(error, '保存失败')
  } finally {
    saving.value = false
  }
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
  --color-placeholder: #808080;
}

.page {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--color-background);
  min-height: 100vh;
  padding-bottom: 200rpx;
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
  overflow: hidden;
}

.upload-circle--filled {
  border-style: solid;
  border-color: var(--color-primary-fixed);
}

.upload-preview {
  width: 100%;
  height: 100%;
}

.upload-icon {
  width: 64rpx;
  height: 64rpx;
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

.default-card {
  margin-top: 32rpx;
}

.default-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24rpx;
}

.default-copy {
  flex: 1;
  min-width: 0;
}

.default-title {
  display: block;
  font-size: 30rpx;
  font-weight: 700;
  color: var(--color-on-surface);
  margin-bottom: 8rpx;
}

.default-desc {
  display: block;
  font-size: 24rpx;
  line-height: 36rpx;
  color: var(--color-on-surface-variant);
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

.soft-input-wrap {
  display: flex;
  align-items: center;
  min-height: 88rpx;
  background: var(--color-surface-container-low);
  border: 2rpx solid transparent;
  border-radius: 19998rpx;
  padding: 24rpx 32rpx;
  box-sizing: border-box;
}

.soft-input-field {
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 40rpx;
  line-height: 40rpx;
  font-size: 28rpx;
  color: var(--color-on-background);
  background: transparent;
  box-sizing: border-box;
}

.soft-input-field::placeholder {
  color: var(--color-placeholder);
}

.picker-text--placeholder {
  color: var(--color-placeholder);
}

.soft-input-field--icon {
  padding-right: 48rpx;
}

.soft-input-field--suffix {
  padding-right: 64rpx;
}

.picker-text {
  display: block;
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
  width: 28rpx;
  height: 28rpx;
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

.type-icon {
  width: 48rpx;
  height: 48rpx;
  flex-shrink: 0;
  display: block;
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
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.gender-active-male {
  color: #1296db;
}

.gender-active-female {
  color: #9d174d;
}

.gender-icon {
  width: 40rpx;
  height: 40rpx;
  flex-shrink: 0;
  display: block;
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
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 16rpx 16rpx 16rpx 32rpx;
  border-radius: 19998rpx;
  font-size: 24rpx;
  font-weight: 600;
  border: 2rpx solid;
}

.tag-remove {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tag-remove-icon {
  font-size: 28rpx;
  line-height: 1;
  color: var(--color-outline);
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
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
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

.save-btn--loading {
  opacity: 0.7;
}
</style>
