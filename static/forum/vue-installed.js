import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import VueQuillEditor from 'vue-quill-editor'
import VueTimeago from 'vue-timeago'
import ServerApi from './serverApi'

import * as acs from 'common/acs'

Vue.use(VueI18n)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueQuillEditor)
Vue.use(ServerApi)
Vue.use(VueTimeago, {
  locale: 'zh-CN',
  locales: {
    'zh-CN': require('vue-timeago/locales/zh-CN.json')
  }
})

Vue.config.lang = window.acsConfig.locale || 'zh-hans'

Vue.http.headers.common['x-csrf-token'] = window.acsConfig.csrfToken
Vue.http.headers.common['acs-app-id'] = acs.getAppId()
Vue.http.headers.common['acs-device-id'] = acs.getDeviceId()

export default Vue
