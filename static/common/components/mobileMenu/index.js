import Vue from 'vue'

const Menu = Vue.extend(require('./menu.vue'));

export const showMobileMenu = (propsData = {
  visible: true
}) => {
  let instance = new Menu({
    el: document.createElement('div'),
    propsData
  })

  return instance
}