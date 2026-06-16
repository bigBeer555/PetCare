<template>
  <view
    class="page-nav-bar-host"
    :class="{ 'page-nav-bar-host--mobile-only': mobileOnly }"
  >
    <!-- 默认导航：返回 + 标题 -->
    <view
      v-if="variant === 'default'"
      class="page-nav-bar"
      :class="navBarClass"
      :style="navBarStyle"
    >
      <view v-if="showBack" class="page-nav-bar__back" @click="handleBack">
        <image
          class="page-nav-bar__back-icon"
          :src="backIcon"
          mode="aspectFit"
        />
      </view>
      <view v-else class="page-nav-bar__placeholder" />

      <text class="page-nav-bar__title" :style="{ fontSize: titleFontSize }">
        {{ title }}
      </text>

      <view class="page-nav-bar__right">
        <slot name="right">
          <view
            class="page-nav-bar__placeholder"
            :style="rightPlaceholderStyle"
          />
        </slot>
      </view>
    </view>

    <!-- 品牌导航：头像 + 标题 + 通知 -->
    <view
      v-else
      class="page-nav-bar page-nav-bar--brand"
      :class="navBarClass"
      :style="navBarStyle"
    >
      <view class="page-nav-bar__brand-left">
        <image
          v-if="avatar"
          class="page-nav-bar__avatar"
          :src="avatar"
          mode="aspectFill"
        />
        <text class="page-nav-bar__brand-title" :style="{ fontSize: titleFontSize }">
          {{ title }}
        </text>
      </view>
      <view class="page-nav-bar__brand-right" @click="handleNotification">
        <slot name="right">
          <view class="page-nav-bar__notification" />
        </slot>
      </view>
    </view>

    <view
      v-if="fixed && fixedPlaceholder"
      class="page-nav-bar__spacer"
      :class="{
        'page-nav-bar__spacer--safe-area': safeArea,
        'page-nav-bar__spacer--compact': compact && variant === 'default',
        'page-nav-bar__spacer--brand': variant === 'brand',
      }"
      :style="spacerStyle"
    />
  </view>
</template>

<script lang="ts">
export default {
  name: 'PageNavBar',
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'

type NavVariant = 'default' | 'brand'

const props = withDefaults(
  defineProps<{
    title: string
    variant?: NavVariant
    showBack?: boolean
    fixed?: boolean
    sticky?: boolean
    bordered?: boolean
    compact?: boolean
    mobileOnly?: boolean
    safeArea?: boolean
    avoidCapsule?: boolean
    fixedPlaceholder?: boolean
    autoBack?: boolean
    fallbackUrl?: string
    backIcon?: string
    notificationIcon?: string
    avatar?: string
    titleSize?: number | string
    maxWidth?: string
  }>(),
  {
    variant: 'default',
    showBack: true,
    fixed: false,
    sticky: false,
    bordered: false,
    compact: false,
    mobileOnly: false,
    safeArea: true,
    avoidCapsule: true,
    fixedPlaceholder: true,
    autoBack: true,
    fallbackUrl: '/pages/index/index',
    backIcon: '/static/svg/nav-back.svg',
    notificationIcon: '/static/svg/message.svg',
    titleSize: 22,
    maxWidth: '100%',
  }
)

const emit = defineEmits<{
  back: []
  'notification-click': []
}>()

const safeAreaTop = ref(0)
const capsulePaddingRight = ref(0)
const brandContentHeight = ref(112)

const pxToRpx = (px: number, screenWidth: number) =>
  Math.round((px * 750) / screenWidth)

const initLayout = () => {
  uni.getSystemInfo({
    success: ({ statusBarHeight = 0, screenWidth = 375, uniPlatform }) => {
      safeAreaTop.value = pxToRpx(statusBarHeight, screenWidth)

      if (!props.avoidCapsule || uniPlatform !== 'mp-weixin') return

      const menuButton = uni.getMenuButtonBoundingClientRect?.()
      if (!menuButton?.width) return

      capsulePaddingRight.value = pxToRpx(
        screenWidth - menuButton.left + 8,
        screenWidth
      )

      if (props.variant === 'brand') {
        const rowHeight =
          menuButton.height + (menuButton.top - statusBarHeight) * 2
        brandContentHeight.value = pxToRpx(rowHeight, screenWidth)
      }
    },
  })
}

initLayout()

const titleFontSize = computed(() => {
  if (typeof props.titleSize === 'number') {
    return `${props.titleSize * 2}rpx`
  }
  return props.titleSize
})

const defaultContentHeight = computed(() => (props.compact ? 96 : 128))

const contentHeight = computed(() =>
  props.variant === 'brand' ? brandContentHeight.value : defaultContentHeight.value
)

const totalHeight = computed(() =>
  contentHeight.value + (props.safeArea ? safeAreaTop.value : 0)
)

const navBarClass = computed(() => ({
  'page-nav-bar--fixed': props.fixed,
  'page-nav-bar--sticky': props.sticky,
  'page-nav-bar--bordered': props.bordered,
  'page-nav-bar--safe-area': props.safeArea,
  'page-nav-bar--compact': props.compact && props.variant === 'default',
}))

const navBarStyle = computed(() => {
  const style: Record<string, string> = {
    maxWidth: props.maxWidth,
  }

  const basePaddingRight =
    props.variant === 'brand'
      ? 40
      : props.compact
        ? 40
        : 40

  const paddingRight = Math.max(basePaddingRight, capsulePaddingRight.value)
  style.paddingRight = `${paddingRight}rpx`

  if (!props.safeArea) {
    style.minHeight = `${contentHeight.value}rpx`
    return style
  }

  if (safeAreaTop.value > 0) {
    style.paddingTop = `${safeAreaTop.value}rpx`
    style.minHeight = `${totalHeight.value}rpx`
  }

  return style
})

const rightPlaceholderStyle = computed(() => {
  if (capsulePaddingRight.value <= 0) return undefined
  return { width: `${capsulePaddingRight.value}rpx` }
})

const spacerStyle = computed(() => {
  if (!props.safeArea || safeAreaTop.value <= 0) return undefined
  return { height: `${totalHeight.value}rpx` }
})

const handleBack = () => {
  emit('back')
  if (!props.autoBack) return
  uni.navigateBack({
    fail: () => uni.navigateTo({ url: props.fallbackUrl }),
  })
}

const handleNotification = () => {
  emit('notification-click')
}
</script>

<style scoped>
.page-nav-bar-host {
  --page-nav-bar-icon-size: 62rpx;
  --page-nav-bar-icon-mask-size: 132%;
  --page-nav-bar-icon-bold-filter: drop-shadow(1rpx 0 0 #006b5d)
    drop-shadow(-1rpx 0 0 #006b5d) drop-shadow(0 1rpx 0 #006b5d)
    drop-shadow(0 -1rpx 0 #006b5d) drop-shadow(0.8rpx 0.8rpx 0 #006b5d)
    drop-shadow(-0.8rpx -0.8rpx 0 #006b5d);
  width: 100%;
}

.page-nav-bar-host--mobile-only {
  display: flex;
}

@media (min-width: 768px) {
  .page-nav-bar-host--mobile-only {
    display: none;
  }
}

.page-nav-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 40rpx;
  padding-bottom: 0;
  padding-left: 40rpx;
  box-sizing: border-box;
  background: var(--color-background, #fcf9f2);
}

.page-nav-bar--brand {
  padding-top: 0;
  padding-left: 40rpx;
  min-height: 112rpx;
}

.page-nav-bar--safe-area {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  min-height: calc(128rpx + constant(safe-area-inset-top));
  min-height: calc(128rpx + env(safe-area-inset-top));
}

.page-nav-bar--brand.page-nav-bar--safe-area {
  min-height: calc(112rpx + constant(safe-area-inset-top));
  min-height: calc(112rpx + env(safe-area-inset-top));
}

.page-nav-bar--compact.page-nav-bar--safe-area {
  min-height: calc(96rpx + constant(safe-area-inset-top));
  min-height: calc(96rpx + env(safe-area-inset-top));
}

.page-nav-bar--compact .page-nav-bar__back,
.page-nav-bar--compact .page-nav-bar__placeholder {
  width: 80rpx;
  height: 80rpx;
}

.page-nav-bar--compact .page-nav-bar__back-icon {
  width: 80rpx;
  height: 80rpx;
}

.page-nav-bar--compact .page-nav-bar__right {
  min-width: 80rpx;
}

.page-nav-bar--fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
}

.page-nav-bar--sticky {
  position: sticky;
  top: 0;
  z-index: 50;
}

.page-nav-bar--bordered {
  border-bottom: 2rpx solid var(--color-outline-variant, #bdc9c5);
}

.page-nav-bar__spacer {
  width: 100%;
  flex-shrink: 0;
}

.page-nav-bar__spacer--safe-area {
  height: calc(128rpx + constant(safe-area-inset-top));
  height: calc(128rpx + env(safe-area-inset-top));
}

.page-nav-bar__spacer--brand.page-nav-bar__spacer--safe-area {
  height: calc(112rpx + constant(safe-area-inset-top));
  height: calc(112rpx + env(safe-area-inset-top));
}

.page-nav-bar__spacer--compact.page-nav-bar__spacer--safe-area {
  height: calc(96rpx + constant(safe-area-inset-top));
  height: calc(96rpx + env(safe-area-inset-top));
}

.page-nav-bar__back,
.page-nav-bar__placeholder {
  width: 80rpx;
  height: 80rpx;
  flex-shrink: 0;
}

.page-nav-bar__back {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.page-nav-bar__back-icon {
  width: 80rpx;
  height: 80rpx;
}

.page-nav-bar__title {
  font-weight: 700;
  color: var(--color-primary, #006b5d);
}

.page-nav-bar__right {
  min-width: 80rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.page-nav-bar__brand-left {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.page-nav-bar__avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 2rpx solid rgba(94, 140, 131, 0.2);
  flex-shrink: 0;
}

.page-nav-bar__brand-title {
  font-weight: 700;
  line-height: 1.4;
  color: #2c3331;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.page-nav-bar__brand-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 76rpx;
  min-height: 76rpx;
}

.page-nav-bar__brand-right :deep(.nav-actions) {
  display: flex;
  align-items: center;
}

.page-nav-bar__brand-right :deep(.nav-action-btn) {
  width: 76rpx;
  height: 76rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.page-nav-bar__notification {
  width: var(--page-nav-bar-icon-size);
  height: var(--page-nav-bar-icon-size);
  background-color: var(--color-primary, #006b5d);
  -webkit-mask-image: url('/static/svg/message.svg');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: var(--page-nav-bar-icon-mask-size);
  mask-image: url('/static/svg/message.svg');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: var(--page-nav-bar-icon-mask-size);
  -webkit-filter: var(--page-nav-bar-icon-bold-filter);
  filter: var(--page-nav-bar-icon-bold-filter);
  flex-shrink: 0;
}
</style>
