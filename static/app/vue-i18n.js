import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locales from './i18n'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: window.acsConfig.locale || 'zh-hans',
  messages: locales
})
