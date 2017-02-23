import Vue from 'admin/vue-i18n'
import Resource from 'vue-resource'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import VueValidator from 'vue-validator'

import App from './App.vue'
import router from './router'
import store from './store'

import * as filters from 'common/filters'
import { TOGGLE_SIDEBAR } from './store/mutation-types'

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


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
