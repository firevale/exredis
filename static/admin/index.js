import 'babel-polyfill'

import Vue from 'vue'
import {i18n} from 'admin/vue-i18n'
import Resource from 'vue-resource'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import VueI18n from 'vue-i18n'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'
import ServerApi from './serverApi'

import 'common/js/date'

import * as filters from 'common/js/filters'
import { TOGGLE_SIDEBAR } from './store/mutation-types'
import VueQuillEditor from 'common/components/quillEditor'

require('admin/scss/admin.scss')

Vue.use(VueI18n)
Vue.use(Vuelidate)
Vue.use(Resource)
Vue.use(NProgress)
Vue.use(ServerApi)
Vue.use(VueQuillEditor)

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
  i18n,
  router,
  store,
  nprogress,
  ...App
})

app.$mount('#app')
