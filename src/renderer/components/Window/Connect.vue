<template>
  <section class="home-page-content">
    <div class="quick-connect-list-container">
      <quick-connect-list :connects="_servers" :current="selectedConnect" @select="handleSelectItem" />
      <div class="quick-connect-menu-container">
        <quick-connect-menu @add-connect="handleAddConnect" @remove-connect="handleRemoveConnect" :current="selectedConnect"/>
      </div>
    </div>
    <div class="create-connect-container">
      <create-connect :connect="selectedConnect" @connect="handleClickConnect" />
    </div>
  </section>
</template>

<script>
import uuid from 'uuid/v1'
import { numberingWithDefault } from '../../lib/generator'

import QuickConnectList from '../Redis/QuickConnectList'
import QuickConnectMenu from '../Redis/QuickConnectMenu'
import CreateConnect from '../Redis/CreateConnect'

export default {
  created () {
    this.$electron.ipcRenderer.on('redis-connected', this.handleRedisConnected)
    this.$electron.ipcRenderer.on('res-connect-list', this.handleConnectList)
    this.$electron.ipcRenderer.send('req-connect-list')
  },
  data () {
    return {
      servers: {},
      selectedConnect: null
    }
  },
  beforeDestroy () {
    this.$electron.ipcRenderer.removeListener('redis-connected', this.handleRedisConnected)
    this.$electron.ipcRenderer.removeListener('res-connect-list', this.handleConnectList)
  },
  props: {
    tabId: {
      type: String,
      required: true
    }
  },
  methods: {
    handleSelectItem (connect) {
      this.selectedConnect = connect
    },
    handleAddConnect () {
      const DEFAULT_NAME = 'new-connect'
      const servers = { ...this.servers }
      const name = numberingWithDefault(DEFAULT_NAME, Object.keys(servers))
      const newConnect = {
        name: name,
        host: '',
        password: '',
        port: ''
      }
      this.$electron.ipcRenderer.send('req-add-connect', newConnect)
    },
    handleRemoveConnect () {
      const current = { ...this.selectedConnect }
      this.selectedConnect = null
      this.$electron.ipcRenderer.send('req-remove-connect', current)
    },
    async handleClickConnect (connect) {
      if (this.tab.id === 'home') {
        const id = uuid()
        const newTab = {
          id,
          name: connect.name || connect.host || 'eldis-connection'
        }
        await this.$store.dispatch('addTab', { tab: newTab })
        this.$electron.ipcRenderer.send('connect-redis', { connect, tabId: id })
      }
    },
    async handleRedisConnected (event, data) {
      const { tabId } = data
      await this.$store.dispatch('connectTab', { tabId })
      await this.$store.dispatch('updateKeys', data)
      this.$router.replace({ name: 'entry-page', params: { tabId } })
    },
    async handleConnectList (event, servers) {
      this.servers = servers
    }
  },
  computed: {
    tab () {
      const tabId = this.tabId
      return this.$store.state.Tabs.tabs.find(v => v.id === tabId)
    },
    _servers () {
      return Object.keys(this.servers).map(key => {
        return this.servers[key]
      })
    }
  },
  components: {
    QuickConnectList,
    QuickConnectMenu,
    CreateConnect
  }
}
</script>

<style lang="scss" scoped>
.home-page-content {
  .quick-connect-list-container {
    height: calc(100vh - 30px);
    background: #bdc3c7;
    width: 300px;
    position: absolute;
    padding: 20px;
    color: #000;
    .quick-connect-menu-container {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      padding: 5px;
    }
  }
  .create-connect-container {
    height: calc(100vh - 30px);
    margin-left: 300px;
    position: relative;
  }
}
</style>
