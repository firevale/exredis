import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locales from './i18n'
import ServerApi from './serverApi'

Vue.use(VueI18n)
Vue.use(ServerApi)
Vue.config.lang = window.acsConfig.locale || 'zh-hans'
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

export default Vue