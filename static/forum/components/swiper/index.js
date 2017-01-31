import Vue from 'vue';
const swiper = Vue.extend(require('./swiperContainer.vue'));
let instance

export const swiperContainer = (propsData = {

}) => {
  if (!instance) {
    instance = new swiper({
      el: document.createElement('div'),
      propsData
    });
  } else {
    instance.visible = true
  }
}