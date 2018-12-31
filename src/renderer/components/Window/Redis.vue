<template>
  <section class="redis-page-content" ref="container">
    <div class="lhs-content" ref="lhs">
      <div class="search-box-container">
        <searchbox :value="searchTxt" @input="handleInputSearchTxt" />
      </div>
      <div class="redis-key-list-container">
        <redis-key-list :keys="keys" @select="handleClickKey" />
      </div>
    </div>
    <div class="rhs-content" ref="rhs">
      <redis-key-detail :item="keyDetail" v-if="keyDetail" />
    </div>
  </section>
</template>

<script>
import _ from 'underscore'

import RedisKeyList from '../Redis/KeyList'
import RedisKeyDetail from '../Redis/KeyDetail'
import Searchbox from '../Search/Searchbox'

export default {
  created () {
    this.$electron.ipcRenderer.on('redis-command-reply', this.handleRedisCommandReply)
  },
  mounted () {
    this.$refs.lhs.addEventListener('scroll', this.handleScroll)
  },
  data () {
    return {}
  },
  beforeDestroy () {
    this.$refs.lhs.removeEventListener('scroll', this.handleScroll)
    this.$electron.ipcRenderer.removeListener('redis-command-reply', this.handleRedisCommandReply)
  },
  props: {
    tabId: {
      type: String,
      required: true
    }
  },
  methods: {
    handleInputSearchTxt: _.debounce(async function (value) {
      if (!value) {
        value = '*'
      }
      await this.$store.dispatch('changeSearchTxt', { tabId: this.tabId, searchTxt: value })
      await this.$store.dispatch('clearKeys', { tabId: this.tabId })
      this.$electron.ipcRenderer.send('redis-command', 'scan', [ '0', 'MATCH', value, 'COUNT', '200' ], { task: 'redis-page-scan', tabId: this.$route.params.tabId })
    }, 500),
    handleFetchMore: _.debounce(function () {
      if (+this.cursor === 0) {
        return null
      }
      this.$electron.ipcRenderer.send('redis-command', 'scan', [ String(this.cursor), 'MATCH', this.searchTxt || '*', 'COUNT', '200' ], { task: 'redis-page-scan', tabId: this.$route.params.tabId })
    }, 500),
    handleClickKey (key) {
      this.$electron.ipcRenderer.send('redis-command', 'get', [ key ], { task: 'redis-page-get', tabId: this.tabId })
    },
    handleScroll () {
      const el = this.$refs.lhs
      if (el.scrollHeight - el.scrollTop === el.clientHeight) {
        this.handleFetchMore()
      }
    },
    async handleRedisCommandReply (event, data) {
      const tabId = this.tabId
      if (data.command === 'scan' && data.payload.task === 'redis-page-scan') {
        const [ cursor, keys ] = [ ...data.reply ]
        this.$store.dispatch('updateKeys', { cursor, keys, tabId })
      } else if (data.command === 'get' && data.payload.task === 'redis-page-get') {
        try {
          const keyDetail = JSON.parse(data.reply)
          this.$store.dispatch('updateKeyDetail', { keyDetail, tabId })
        } catch (err) {
          const keyDetail = { type: 'string', data: data.reply }
          this.$store.dispatch('updateKeyDetail', { keyDetail, tabId })
        }
      }
    }
  },
  computed: {
    tab () {
      return this.$store.state.Tabs.tabs.find(v => v.id === this.tabId)
    },
    keys () {
      return this.tab.keys
    },
    cursor () {
      return this.tab.cursor
    },
    keyDetail () {
      return this.tab.keyDetail
    },
    searchTxt () {
      return this.tab.searchTxt
    }
  },
  components: {
    RedisKeyList,
    RedisKeyDetail,
    Searchbox
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
      padding: 0 15px 15px 15px;
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
