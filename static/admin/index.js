import Vue from 'admin/vue-i18n'
import Resource from 'vue-resource'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import VueValidator from 'vue-validator'

import App from './App.vue'
import router from './router'
import store from './store'

import 'common/date'

import * as filters from 'common/filters'
import { TOGGLE_SIDEBAR } from './store/mutation-types'

Vue.use(VueValidator)
Vue.use(Resource)
Vue.use(NProgress)

Vue.http.headers.common['x-csrf-token'] = window.acsConfig.csrfToken

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })
const { state } = store


router.beforeEach((route, redirect, next) => {
  if (state.main.device.isMobile && state.main.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  }
  next()
})

Object.keys(filters).forEach(key => {
  console.log(`add filter: ${key}`)
  Vue.filter(key, filters[key])
})

const app = new Vue({
  router,
  store,
  nprogress,
  ...App
})

app.$mount('#app')
