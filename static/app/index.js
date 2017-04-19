import 'babel-polyfill'

import VueRouter from 'vue-router'
import Vue from './vue-installed'

import locales from './i18n'
import store from './store'
import routerMap from './routes'

import {i18n} from './vue-i18n'
import * as filters from 'common/js/filters'

require('app/scss/app.scss')

Object.keys(filters).forEach(function (k) {
  Vue.filter(k, filters[k])
})

const transitionSlideLeftToRight = 'slide-right'
const transitionSlideRightToLeft = 'slide-left'

// document.ontouchmove = e => e.preventDefault()

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
