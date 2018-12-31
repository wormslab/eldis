<template>
  <div id="app">
    <div class="connection-tabs-container">
      <connection-tab :tab="tab"
                      :index="index"
                      :active="tab.id === tabId"
                      v-for="(tab, index) in tabs" :key="tab.id" 
                      @select="handleSelectTab"
                      @dismiss="handleDismissTab"
      />
      <div class="connection-tab-container add-connection-tab-container" @click="handleAddTab">
        <i class="fa fa-plus"></i>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import uuid from 'uuid/v1'
import ConnectionTab from './components/Redis/ConnectionTab'
export default {
  name: 'eldis',
  methods: {
    handleAddTab () {
      const newTab = {
        id: uuid(),
        name: 'eldis-tab'
      }
      this.$store.dispatch('addTab', { tab: newTab })
    },
    handleSelectTab ({ tab, index }) {
      this.$router.replace({ name: 'entry-page', params: { tabId: tab.id } })
    },
    async handleDismissTab ({ tab, index }) {
      this.$electron.ipcRenderer.send('disconnect-redis', { tabId: tab.id })
      await this.$store.dispatch('dismissTab', { tabId: this.tabId })
      setTimeout(() => {
        const nextTab = this.tabs[index - 1]
        this.$router.replace({ name: 'entry-page', params: { tabId: nextTab.id } })
      }, 0)
    }
  },
  computed: {
    tabId () {
      return this.$route.params.tabId
    },
    tabs () {
      return this.$store.state.Tabs.tabs
    },
    tab () {
      const tabId = this.tabId
      return this.tabs.find(v => v.id === tabId)
    }
  },
  components: {
    ConnectionTab
  }
}
</script>

<style lang="scss" scoped>
.connection-tabs-container {
  display: flex;
  flex-wrap: nowrap;
  height: 30px;
  background-color: #2c3e50;
  color: #FFF;
  line-height: 30px;
  cursor: pointer;
  .add-connection-tab-container {
    width: 30px;
    text-align: center;
  }
}
</style>
