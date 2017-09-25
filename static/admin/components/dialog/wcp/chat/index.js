import Vue from 'vue'

const Dialog = Vue.extend(require('./dialog'));

export const showChatDialog = (propsData = {
  visible: true
}) => {
  let instance = new Dialog({
    el: document.createElement('div'),
    propsData
  });
}