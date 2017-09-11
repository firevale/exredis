import Vue from 'vue'

const ModalDialog = Vue.extend(require('./modal'))

export default {
  showMenu: function(menus, onSelect) {
    return new ModalDialog({ el: document.createElement('div'), propsData: { menus, onSelect } })
  },
  showMessage: function(message) {
    return new ModalDialog({ el: document.createElement('div'), propsData: { menus: [], message } })
  }
}