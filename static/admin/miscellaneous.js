import { i18n } from './vue-i18n'
import Vue from 'vue'
import Notification from 'vue-bulma-notification'
const NotificationComponent = Vue.extend(Notification)
import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

export const openNotification = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 4500,
  container: '.notifications'
}) => {
  return new NotificationComponent({
    i18n,
    el: document.createElement('div'),
    propsData
  })
}

export const processAjaxError = e => {
  let message = i18n.t('admin.notification.message.unknownError')
  if (e.message) {
    message = e.message
  } else if (e.i18n_message) {
    message = i18n.t(e.i18n_message, e.i18n_message_object)
  }

  if (e.action == 'login') {
    window.location = `/login?redirect_uri=${btoa(window.location.href)}`
  } else if (e.action == 'forbiddenAccess') {
    showMessageBox({
      visible: true,
      title: i18n.t('admin.titles.warning'),
      message: message,
      type: 'danger',
      onOK: async _ => {
        window.location = `/login?redirect_uri=${btoa(window.location.href)}`
      },
    })
  } else {
    openNotification({
      title: i18n.t('admin.notification.title.failed'),
      message: message,
      type: 'danger',
      duration: 6000,
    })
  }
}