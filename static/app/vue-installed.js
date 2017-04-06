import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import VueTimeago from 'vue-timeago'
import Vuelidate from 'vuelidate'
import VueTouch from 'vue-touch'
import ServerApi from './serverApi'
import VueQuillEditor from 'common/components/quillEditor'

import * as acs from 'common/js/acs'

Vue.use(Vuelidate)
Vue.use(VueI18n)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueQuillEditor)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(ServerApi)
Vue.use(VueTimeago, {
  locale: 'zh-CN',
  locales: {
    'zh-CN': require('vue-timeago/locales/zh-CN.json')
  },
})

Vue.config.lang = window.acsConfig.locale || 'zh-hans'

Vue.http.headers.common['x-csrf-token'] = window.acsConfig.csrfToken
Vue.http.headers.common['acs-app-id'] = acs.getAppId()
Vue.http.headers.common['acs-device-id'] = acs.getDeviceId()

export default Vue
