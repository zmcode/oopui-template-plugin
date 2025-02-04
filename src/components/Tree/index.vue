<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

defineOptions({
  inheritAttrs: false,
})

defineProps({
  treeData: {
    type: Array,
    default() {
      return []
    },
  },
})

const attrs = useAttrs()
</script>

<template>
  <el-scrollbar class="bg-[var(--panel-content-bg)]">
    <el-tree
      :data="treeData" empty-text="暂无列表数据" node-key="key" :icon="ArrowRight" current-node-key="button" :props="{ label: 'name' }"
      v-bind="attrs"
    />
  </el-scrollbar>
</template>

<style scoped></style>
