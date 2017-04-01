import Vue from 'vue';
const preview = Vue.extend(require('./preview.vue'));
let instance

export const postPreview = (propsData = {

}) => {
    instance = new preview({
      el: document.createElement('div'),
      propsData
    });

}
