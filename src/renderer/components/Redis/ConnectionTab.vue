<template>
  <section :class="{ 'connection-tab-content': true, active }" 
           @mouseover="handleMouseover"
           @mouseleave="handleMouseleave"
           @click="handleClickTab"
  >
    {{tab.name}}
    <i v-if="hover && tab.id !== 'home'" class="icon fa fa-times-circle" @click="handleClickDismiss"></i>
  </section>
</template>

<script>
export default {
  data () {
    return {
      hover: false
    }
  },
  props: {
    tab: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickTab () {
      this.$emit('select', { tab: this.tab, index: this.index })
    },
    handleMouseover () {
      this.hover = true
    },
    handleMouseleave () {
      this.hover = false
    },
    handleClickDismiss () {
      this.$emit('dismiss', { tab: this.tab, index: this.index })
    }
  }
}
</script>

<style lang="scss" scoped>
.connection-tab-content {
  flex: 1 1 140px;
  max-width: 170px;
  text-align: center;
  position: relative;
  &.active {
    background-color: #34495e;
  }
  .icon {
    position: absolute;
    color: #95a5a6;
    right: 0;
    top: 7px;
    width: 30px;
    height: 30px;
  }
}
</style>
