import 'babel-polyfill'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import VueQuillEditor from 'vue-quill-editor'

import routerMap from './routers'
import locales from './i18n'
import store from './store'
import ServerApi from './serverApi'

import * as filters from 'common/filters'
import * as acs from 'common/acs'

Vue.use(VueI18n)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueQuillEditor)
Vue.use(ServerApi)

Vue.config.lang = window.acsConfig.locale || 'zh-hans'

Vue.http.headers.common['x-csrf-token'] = window.acsConfig.csrfToken
Vue.http.headers.common['acs-app-id'] = acs.getAppId()
Vue.http.headers.common['acs-device-id'] = acs.getDeviceId()

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

Object.keys(filters).forEach(function (k) {
  Vue.filter(k, filters[k])
})

let router = routerMap(VueRouter)
router.transitionName = "slide-left"

let App = new Vue({
  router,
  store,
}).$mount('#app')
