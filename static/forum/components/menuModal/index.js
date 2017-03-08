import Vue from 'vue';

const Dialog = Vue.extend(require('./menuModal.vue'));

export default {
  showModal : function(list, onOk, defaultSelected) {
    let instance = new Dialog({el: document.createElement('div')});
    list
      ? instance.list = list
      : ''
    instance.onOk = onOk
    defaultSelected
      ? instance.selectedItem = defaultSelected
      : ''
    Vue.nextTick(_ => instance.visible = true)
  }
};
