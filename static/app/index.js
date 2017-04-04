import 'babel-polyfill'

import VueRouter from 'vue-router'
import Vue from './vue-installed'

import locales from './i18n'
import store from './store'
import routerMap from './routes'

import * as filters from 'common/js/filters'

require('quill/assets/snow.styl')
require('quill/assets/core.styl')

require('app/scss/app.scss')

Vue.config.lang = window.acsConfig.locale || 'zh-hans'

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

Object.keys(filters).forEach(function (k) {
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
  router,
  store,
}).$mount('#app')
