<template>
  <section class="key-detail-content">
    <tree-view :data="item" :options="{maxDepth: 3}"></tree-view>
  </section>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'JSON'
    },
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.key-detail-content {
  word-break: break-all;
}
</style>
