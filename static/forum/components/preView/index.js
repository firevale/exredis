import Vue from 'vue';
const preView = Vue.extend(require('./preView.vue'));
let instance

export const preViewNote = (propsData = {

}) => {
  if (!instance) {
    instance = new preView({
      el: document.createElement('div'),
      propsData
    });
  } else {
    instance.visible = true
  }

}