
import Vue from 'vue'
import VueRouter from 'vue-router'
import routerMap from './common/routers'
import VueResource from 'vue-resource'
import VueValidator from './components/fvVueValidator/vue-validator'
import VueI18n from 'vue-i18n'
import locales from './common/i18n'

Vue.use(VueI18n)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueValidator)

Vue.config.lang = 'cn'

Vue.http.headers.common['x-csrf-token'] = window.acsConfig.csrfToken

Object.keys(locales).forEach(function(lang) {
  Vue.locale(lang, locales[lang])
})

let router = routerMap(VueRouter)

let App = new Vue({
  router,
}).$mount('#app')