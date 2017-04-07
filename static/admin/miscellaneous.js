import Vue from './vue-i18n'
import Notification from 'vue-bulma-notification'
const NotificationComponent = Vue.extend(Notification)

export const openNotification = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 4500,
  container: '.notifications'
}) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
}

export const processAjaxError = e => {
  if (e.need_authentication) {
    window.location = `/login?redirect_uri=${btoa(window.location.href)}`
  } else {
    let message = Vue.t('admin.notification.message.unknownError')

    if (e.message) {
      message = e.message
    } else if (e.i18n_message) {
      message = Vue.t(e.i18n_message, e.i18n_message_object)
    }

    openNotification({
      title: Vue.t('admin.notification.title.failed'),
      message: message,
      type: 'danger',
      duration: 6000,
    })
  }
}