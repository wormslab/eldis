<template>
  <section class="quick-connect-list-content">
    <div class="quick-connect-title">
      <i class="fa fa-bolt"></i>
      <span>Quick connect</span>
    </div>
    <div :class="{ 'quick-connect-item': true, active: active(connect) }" 
         @click="handleClickItem(connect)"
         v-for="connect in connects" :key="connect.name"
    >
      <i class="quick-connect-icon fa fa-hdd"></i>
      <span>{{connect.name}}</span>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    current: {
      type: Object,
      default: null
    },
    connects: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleClickItem (connect) {
      this.$emit('select', connect)
    },
    active (item) {
      const current = this.current || {}
      return current.name === item.name
    }
  },
  computed: {
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.quick-connect-list-content {
  position: relative;
  height: 100%;
  .quick-connect-title {
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .quick-connect-item {
    transition: .3s;
    cursor: pointer;
    &:hover {
      background-color: #d2d2d2;
    }
    &.active {
      background-color: #e2e2e2;
    }
    .quick-connect-icon {
      color: #666;
    }
    > span {
      font-size: 16px;
      margin-bottom: 5px;
    }
    padding: 10px 5px;
  }
  
}
</style>
