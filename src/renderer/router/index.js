import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/redis/:tabId',
      name: 'entry-page',
      component: require('@/pages/entry').default
    },
    {
      path: '/', redirect: '/redis/home'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
