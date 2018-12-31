import Vue from 'vue'
import axios from 'axios'
import TreeView from 'vue-json-tree-view'

import App from './App'
import router from './router'
import store from './store'

import VeeValidate from 'vee-validate'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(TreeView)
Vue.use(VeeValidate, {
  errorBagName: 'vErrors',
  fieldsBagName: 'vFields'
})

export const messageBus = new Vue({})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
