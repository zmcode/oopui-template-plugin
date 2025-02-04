<script lang="ts">
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 16,
    },
    spin: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)

    const getStyle = computed((): CSSProperties => {
      const { size, color } = props
      let s = `${size}`
      s = `${s.replace('px', '')}px`
      return {
        width: s,
        height: s,
        // fill: color,
      }
    })
    return { symbolId, getStyle }
  },
})
</script>

<template>
  <svg :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  display: inline-block;
  overflow: hidden;
  fill: currentcolor;
  vertical-align: -0.15em;
}
</style>
