import 'babel-polyfill'

import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'
import Vuelidate from 'vuelidate'

import routerMap from './routers'
import locales from './i18n'
import store from './store'
import ServerApi from './serverApi'

import * as filters from 'common/js/filters'
import * as acs from 'common/js/acs'

require('login/scss/login.scss')

Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.use(ServerApi)

axios.defaults.headers.common['x-csrf-token'] = acs.csrfToken
axios.defaults.headers.common['acs-app-id'] = acs.getAppId()
axios.defaults.headers.common['acs-device-id'] = acs.getDeviceId()

const i18n = new VueI18n({
  locale: acs.locale,
  messages: locales
})

Object.keys(filters).forEach(k => {
  Vue.filter(k, filters[k])
})

const transitionSlideLeftToRight = 'slide-right'
const transitionSlideRightToLeft = 'slide-left'

// insert popstate event listener before router,
// by doing so, we can change transition name while user press "Back" button
window.addEventListener('popstate', _ => {
  store.commit('SET_TRANSITION_NAME', transitionSlideLeftToRight)
})

let router = routerMap(VueRouter)

router.afterEach(route => {
  Vue.nextTick(_ => store.commit('SET_TRANSITION_NAME', transitionSlideRightToLeft))
})

let App = new Vue({
  i18n,
  router,
  store,
}).$mount('#app')