import Vue from 'vue';
const preView = Vue.extend(require('./preView.vue'));


export const preViewNote = (propsData = {
  
}) => {
  let instance = new preView({
    el: document.createElement('div'),
    propsData
  });
}