<template>
  <view class="waterfall">
    <view
      v-for="(column, colIndex) in columns"
      :key="colIndex"
      class="waterfall-column"
    >
      <ProductCard
        v-for="product in column"
        :key="product.id"
        :product="product"
        @click="emit('product-click', $event)"
      />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'ProductWaterfall',
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import ProductCard from '@/components/product-card/index.vue'
import type { ProductItem } from '@/components/product-card/types'

const props = defineProps<{
  products: ProductItem[]
}>()

const emit = defineEmits<{
  'product-click': [id: number]
}>()

const getItemWeight = (product: ProductItem) =>
  (product.name?.length ?? 8) / 16

const columns = computed(() => {
  const left: ProductItem[] = []
  const right: ProductItem[] = []
  let leftHeight = 0
  let rightHeight = 0

  props.products.forEach((product) => {
    const weight = getItemWeight(product)
    if (leftHeight <= rightHeight) {
      left.push(product)
      leftHeight += weight
    } else {
      right.push(product)
      rightHeight += weight
    }
  })

  return [left, right]
})
</script>

<style scoped>
.waterfall {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
}

.waterfall-column {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
</style>
