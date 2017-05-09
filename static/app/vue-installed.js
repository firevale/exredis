import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTimeago from 'vue-timeago'
import VueI18n from 'vue-i18n'
import Vuelidate from 'vuelidate'
import VueTouch from 'common/components/vue-touch'
import VueLazyLoad from 'vue-lazyload'
import ServerApi from './serverApi'
import VueQuillEditor from 'common/components/quillEditor'
import * as acs from 'common/js/acs'

Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.use(VueQuillEditor)

Vue.use(VueLazyLoad, {
  listenEvents: [ 'scroll' ]
})
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueAxios, axios)
Vue.use(ServerApi)
Vue.use(VueTimeago, {
  locale: 'zh-CN',
  locales: {
    'zh-CN': require('vue-timeago/locales/zh-CN.json')
  },
})

import quillContent from 'common/components/quillContent'
import scroller from 'common/components/scroller'

Vue.component('quill-content', quillContent)
Vue.component('scroller', scroller)

axios.defaults.headers.common['x-csrf-token'] = window.acsConfig.csrfToken
axios.defaults.headers.common['acs-app-id'] = acs.getAppId()
axios.defaults.headers.common['acs-device-id'] = acs.getDeviceId()

export default Vue
