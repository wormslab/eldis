<template>
  <section class="redis-key-list-content">
    <div class="redis-key-item-container" v-for="key in keys" :key="key" :data-key="key" @click="handleClickKey(key)">
      <i class="key-item-icon fa fa-file-contract"></i>
      <span>{{key}}</span>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      item: null
    }
  },
  props: {
    keys: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleClickKey (key) {
      this.$emit('select', key)
    }
  }
}
</script>

<style scoped lang="scss">
.redis-key-list-content {
  .redis-key-item-container {
    margin-left: 17px;
    padding: 7px;
    .key-item-icon {
      color: #999;
    }
    transition: .3s;
  }
  .redis-key-item-container:hover {
    background: #D0D0D0;
  }
}
</style>
