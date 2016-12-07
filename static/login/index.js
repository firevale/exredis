import Vue from 'vue'
import VueRouter from 'vue-router'
import routerMap from './common/routers'
import VueResource from 'vue-resource'
import VueValidator from './components/fvVueValidator/vue-validator'
import VueI18n from 'vue-i18n'
import locales from './common/i18n'
import utils from './common/utils'
import nativeApi from './common/nativeApi'
import store from './store'
import filters from './common/filters'

Vue.use(VueI18n)
Vue.use(VueResource)
Vue.use(VueValidator)
Vue.use(VueRouter)

Vue.config.lang = window.acsConfig.locale || 'zh-hans'

console.log(store.state.app.appId, store.state.app.deviceId)

Vue.http.headers.common['x-csrf-token'] = window.acsConfig.csrfToken
Vue.http.headers.common['acs-app-id'] = utils.getAppId()
Vue.http.headers.common['acs-device-id'] = utils.getDeviceId()

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

Object.keys(filters).forEach(function(k) {
  Vue.filter(k, filters[k])
})

// insert popstate event listener before router, 
// by doing so, we can change transition name while user press "Back" button
window.addEventListener('popstate', _ => {
  store.commit('SET_TRANSITION_NAME', 'slide-right')  
})

let router = routerMap(VueRouter)

router.afterEach(route => {
  // store.commit('SET_CAN_GO_BACK', typeof history.length > 1)
})

let App = new Vue({
  router,
  store,
}).$mount('#app')

