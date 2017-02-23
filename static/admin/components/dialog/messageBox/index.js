import Vue from 'admin/vue-i18n'

const MessageBox = Vue.extend(require('./dialog'));

export const showMessageBox = (propsData = {
  visible: true
}) => {
  let instance = new MessageBox({
    el: document.createElement('div'),
    propsData
  });
}