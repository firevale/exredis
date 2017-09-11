import Vue from 'vue'

const ModalDialog = Vue.extend(require('./modal'))

export default {
  showModal: function(propsData) {
    return new ModalDialog({ el: document.createElement('div'), propsData, })
  },
  show: function(propsData) {
    return new ModalDialog({ el: document.createElement('div'), propsData, })
  }
}