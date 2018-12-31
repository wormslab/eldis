<template>
  <section class="entry-page-content">
    <redis :tabId="tabId" v-if="isConnected"/>
    <connect :tabId="tabId" v-else/>
  </section>
</template>

<script>
import Connect from '../components/Window/Connect'
import Redis from '../components/Window/Redis'
export default {
  computed: {
    tabId () {
      return this.$route.params.tabId
    },
    tab () {
      return this.$store.state.Tabs.tabs.find(v => v.id === this.tabId)
    },
    isConnected () {
      return (this.tab || {}).connected
    }
  },
  components: {
    Connect,
    Redis
  }
}
</script>

<style lang="scss" scoped>
.redis-page-content {
  .lhs-content {
    width: 500px;
    height: calc(100vh - 30px);
    padding: 20px;
    overflow: auto;
    position: absolute;
    .search-box-container {
      padding: 15px;
      position: relative;
    }
    .redis-key-list-container {
      margin-top: 45px;
    }
  }
  .rhs-content {
    margin-left: 500px;
    height: calc(100vh - 30px);
  }
  
}
</style>
