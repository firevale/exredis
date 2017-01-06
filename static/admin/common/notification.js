import Vue from 'vue'
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
