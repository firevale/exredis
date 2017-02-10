import Vue from "./vue-i18n"
import {
  openNotification
} from './notification'


export const processAjaxError = e => {
  if (e.need_authentication) {
    window.location = `/login?redirect_uri=${btoa(window.location.href)}`
  } else {
    let message = Vue.t('admin.messages.unknownError')

    if (e.message) {
      message = e.message
    } else if (e.i18n_message) {
      message = Vue.t(e.i18n_message, e.i18n_message_object)
    }

    openNotification({
      title: Vue.t('admin.titles.requestFailed'),
      message: message,
      type: 'danger',
      duration: 6000,
    })
  }
}