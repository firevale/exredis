import Vue from 'vue'

const Dialog = Vue.extend(require('./menuModal.vue'))

export default {
  showModal : function(propsData) {
    return new Dialog({el: document.createElement('div'), propsData,})
  }
}
