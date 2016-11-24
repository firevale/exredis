import Vue from 'vue'
import VueRouter from 'vue-router'
import routerMap from './common/routers'
import VueResource from 'vue-resource'
import VueValidator from './components/fvVueValidator/vue-validator'
import VueI18n from 'vue-i18n'
import locales from './common/i18n'
import nativeApi from './common/nativeApi'
import store from './store'

Vue.use(VueI18n)
Vue.use(VueResource)
Vue.use(VueValidator)
Vue.use(VueRouter)

Vue.config.lang = window.acsConfig.locale || 'zh-hans'

Vue.http.headers.common['x-csrf-token'] = window.acsConfig.csrfToken
Vue.http.headers.common['acs-app-id'] = nativeApi.getAppId()
Vue.http.headers.common['acs-device-id'] = nativeApi.getDeviceId()

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

let router = routerMap(VueRouter)

let App = new Vue({
  router,
  store,
}).$mount('#app')