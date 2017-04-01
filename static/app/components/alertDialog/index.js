import Vue from 'vue'

const Dialog = Vue.extend(require('./alertDialog.vue'));

export default {
  showModal : function({message, onOk, onCancel,}) {
    let instance = new Dialog({el: document.createElement('div')});

    instance.message = message
    instance.onOk = onOk
    instance.onCancel = onCancel

    Vue.nextTick(_ => instance.visible = true)
  }
};
