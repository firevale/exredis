

import Vue from 'vue'
import VueRouter from 'vue-router'
import routerMap from './routers'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import VueI18n from 'vue-i18n'
import locales from './i18n'
// import   'vue-awesome'

console.log(VueValidator)

Vue.use(VueI18n)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueValidator)
Vue.config.lang = 'cn'

Object.keys(locales).forEach(function(lang) {
  Vue.locale(lang, locales[lang])
})
let router = routerMap(VueRouter)

let App = new Vue({
  router,
}).$mount('#app')