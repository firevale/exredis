import Vue from "./vue-i18n"
import {
  openNotification
} from './notification'


export const processAjaxError = e => {
  let message = Vue.t('admin.messages.unknownError')

  if (e.message) {
    message = e.message
  } else if (e.i18n_message) {
    message = Vue.t(e.i18n_message, e.i18n_message_object)
  }

  openNotification({
    title: Vue.t('admin.titles.updateFailed'),
    message: message,
    type: 'danger',
    duration: 6000,
  })
}