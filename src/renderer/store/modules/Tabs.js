const homeTab = { id: 'home', name: 'Home', connected: false, cursor: 0, keys: [], keyDetail: null }
const state = {
  tabs: [ homeTab ]
}

const mutations = {
  add (state, { tab }) {
    state.tabs = [ ...state.tabs, tab ]
  },
  connect (state, { tabId }) {
    const tabs = [ ...state.tabs ]
    const index = tabs.findIndex(v => v.id === tabId)
    if (index >= 0) {
      const tab = { ...tabs[index] }
      tab.connected = true
      tabs[index] = tab
      state.tabs = tabs
    }
  },
  dismiss (state, { tabId }) {
    const tabs = state.tabs.filter(v => v.id !== tabId)
    state.tabs = tabs
  },
  updateKeys (state, data) {
    const { cursor, keys, tabId } = data
    const tabs = [ ...state.tabs ]
    const index = tabs.findIndex(v => v.id === tabId)
    if (index >= 0) {
      const tab = { ...tabs[index] }
      tab.keys = tab.keys.concat(keys)
      tab.cursor = cursor
      tabs[index] = tab
      state.tabs = tabs
    }
  },
  updateKeyDetail (state, data) {
    const { keyDetail, tabId } = data
    const tabs = [ ...state.tabs ]
    const index = tabs.findIndex(v => v.id === tabId)
    if (index >= 0) {
      const tab = { ...tabs[index] }
      tab.keyDetail = keyDetail
      tabs[index] = tab
      state.tabs = tabs
    }
  },
  clearKeys (state, { tabId }) {
    const tabs = [ ...state.tabs ]
    const index = tabs.findIndex(v => v.id === tabId)
    if (index >= 0) {
      const tab = { ...tabs[index] }
      tab.keys = []
      tab.cursor = 0
      state.tabs[index] = tab
    }
  },
  updateSearchTxt (state, { tabId, searchTxt }) {
    const tabs = [ ...state.tabs ]
    const index = tabs.findIndex(v => v.id === tabId)
    if (index >= 0) {
      const tab = { ...tabs[index] }
      tab.searchTxt = searchTxt
      state.tabs[index] = tab
    }
  }
}

const actions = {
  addTab ({ commit }, { tab, index }) {
    const newTab = { connected: false, cursor: 0, keys: [], keyDetail: null, searchTxt: '', ...tab }
    commit('add', { tab: newTab, index })
  },
  connectTab ({ commit }, data) {
    commit('connect', data)
  },
  dismissTab ({ commit }, data) {
    commit('dismiss', data)
  },
  redisConnected ({ commit }, data) {
    commit('updateKeys', data)
  },
  updateKeys ({ commit }, data) {
    commit('updateKeys', data)
  },
  clearKeys ({ commit }, data) {
    commit('clearKeys', data)
  },
  updateKeyDetail ({ commit }, data) {
    commit('updateKeyDetail', data)
  },
  changeSearchTxt ({ commit }, data) {
    commit('updateSearchTxt', data)
  }
}

export default {
  state,
  mutations,
  actions
}
